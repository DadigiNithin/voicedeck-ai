import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const maxDuration = 60; // 60 seconds timeout for audio transcription

export async function POST(req: NextRequest) {
  console.log("[Transcribe API] Received upload request");

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      console.error("[Transcribe API] Error: No file provided in request");
      return NextResponse.json(
        { success: false, error: "No audio or video file provided." },
        { status: 400 }
      );
    }

    console.log("[Transcribe API] Selected file:", {
      name: file.name,
      type: file.type,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
    });

    // Validate file type
    const isAudio = file.type.startsWith("audio/");
    const isVideo = file.type.startsWith("video/");
    if (!isAudio && !isVideo && !file.name.match(/\.(mp3|wav|m4a|mp4|webm|ogg|flac|aac)$/i)) {
      console.error("[Transcribe API] Error: Unsupported file format:", file.type);
      return NextResponse.json(
        {
          success: false,
          error: "Unsupported file format. Please upload MP3, WAV, MP4, M4A, OGG, or WebM.",
        },
        { status: 400 }
      );
    }

    // Get Gemini API Key
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      console.error("[Transcribe API] Error: GEMINI_API_KEY is not configured.");
      return NextResponse.json(
        {
          success: false,
          error: "Gemini API key is not configured on the server. Please check .env.local",
        },
        { status: 500 }
      );
    }

    // Read file buffer & convert to base64
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = buffer.toString("base64");

    // Map mimeType for Gemini inlineData
    let mimeType = file.type || "audio/mp3";
    if (file.name.endsWith(".mp3")) mimeType = "audio/mp3";
    else if (file.name.endsWith(".wav")) mimeType = "audio/wav";
    else if (file.name.endsWith(".m4a")) mimeType = "audio/m4a";
    else if (file.name.endsWith(".webm")) mimeType = "audio/webm";
    else if (file.name.endsWith(".mp4")) mimeType = "video/mp4";
    else if (file.name.endsWith(".ogg")) mimeType = "audio/ogg";

    console.log("[Transcribe API] Sending Gemini API request with mimeType:", mimeType);

    const genAI = new GoogleGenerativeAI(apiKey);
    const prompt =
      "You are an expert audio transcription system. Please provide an accurate, complete verbatim text transcription of all spoken words in this recording. Do not summarize, skip, or add meta commentary. Output ONLY the transcribed text.";

    // Active working models
    const candidateModels = [
      "gemini-2.5-flash",
      "gemini-flash-latest",
    ];

    let rawTranscript = "";
    let lastError: any = null;

    for (const modelName of candidateModels) {
      try {
        console.log(`[Transcribe API] Trying model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });

        const result = await model.generateContent([
          {
            inlineData: {
              mimeType,
              data: base64Data,
            },
          },
          { text: prompt },
        ]);

        const response = await result.response;
        rawTranscript = response.text().trim();

        if (rawTranscript) {
          console.log(`[Transcribe API] Transcription succeeded with model ${modelName}. Length: ${rawTranscript.length}`);
          break;
        }
      } catch (err: any) {
        console.warn(`[Transcribe API] Model ${modelName} failed:`, err.message);
        lastError = err;
      }
    }

    if (!rawTranscript) {
      const isQuota = lastError?.message?.includes("429") || lastError?.message?.includes("Quota");
      const userMessage = isQuota
        ? "Gemini API rate limit reached. Please wait ~30 seconds before retrying audio upload."
        : lastError?.message || "Gemini returned an empty transcript for this audio file.";

      return NextResponse.json(
        {
          success: false,
          error: userMessage,
        },
        { status: isQuota ? 429 : 500 }
      );
    }

    return NextResponse.json({
      success: true,
      transcript: rawTranscript,
      fileName: file.name,
      fileSize: file.size,
    });
  } catch (error: any) {
    console.error("[Transcribe API] Error processing audio transcription:", error);
    const isQuota = error.message?.includes("429") || error.message?.includes("Quota");
    return NextResponse.json(
      {
        success: false,
        error: isQuota
          ? "Gemini API rate limit reached. Please wait ~30 seconds before uploading again."
          : error.message || "Failed to transcribe audio file using Gemini API.",
      },
      { status: isQuota ? 429 : 500 }
    );
  }
}
