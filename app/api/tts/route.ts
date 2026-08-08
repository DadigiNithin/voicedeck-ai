import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const { text, mode } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Text prompt is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
    
    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

        const prompt = mode === "script"
          ? `Convert the following presentation content into an engaging 2-sentence spoken narration script suitable for Text-to-Speech voiceover: "${text}"`
          : `Clean and format this presentation text for clear, natural Text-to-Speech voice synthesis (remove bullet characters, expand abbreviations): "${text}"`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        return NextResponse.json({
          success: true,
          processedText: responseText.trim(),
          originalText: text,
        });
      } catch (geminiErr: any) {
        console.warn("Gemini API call note:", geminiErr?.message || geminiErr);
      }
    }

    // Fallback if API key has quota limits or offline
    return NextResponse.json({
      success: true,
      processedText: text.replace(/[•\-*\d.]+/g, "").trim(),
      originalText: text,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to process TTS text" },
      { status: 500 }
    );
  }
}
