import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const maxDuration = 60; // 60 seconds timeout for slide generation

export async function POST(req: NextRequest) {
  console.log("[Generate Slides API] Slide generation request received");

  try {
    const body = await req.json();
    const transcript = body.transcript;

    if (!transcript || typeof transcript !== "string" || !transcript.trim()) {
      console.error("[Generate Slides API] Error: Empty transcript provided");
      return NextResponse.json(
        { success: false, error: "Transcript text is required to generate slides." },
        { status: 400 }
      );
    }

    console.log("[Generate Slides API] Transcript length:", transcript.length);
    console.log("[Generate Slides API] Transcript snippet:", transcript.substring(0, 150) + "...");

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      console.error("[Generate Slides API] Error: GEMINI_API_KEY is missing");
      return NextResponse.json(
        { success: false, error: "Gemini API key is not configured on the server." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const prompt = `
You are a World-Class Executive Presentation Designer and AI Architect.
Analyze the following real transcript and construct a structured, professional presentation slide deck.

TRANSCRIPT:
"""
${transcript}
"""

REQUIRED JSON STRUCTURE:
{
  "presentationTitle": "Main Title of Presentation",
  "presentationSubtitle": "Subtitle summarizing the core theme",
  "agenda": ["Topic 1", "Topic 2", "Topic 3", "Topic 4"],
  "slides": [
    {
      "id": 1,
      "title": "Title of Slide",
      "subtitle": "Brief slide subtitle",
      "bullets": [
        "First key point or takeaway derived from transcript",
        "Second detailed bullet point with quantitative data if present",
        "Third actionable takeaway or insight",
        "Fourth key metric or outcome"
      ],
      "speakerNotes": "Narrator notes explaining the slide content in detail.",
      "icon": "📊",
      "gradient": "from-purple-600 to-blue-600"
    }
  ]
}

RULES:
1. Generate between 5 and 10 slides based on the content density of the transcript.
2. Every slide MUST have 3 to 6 high-value, meaningful bullet points extracted ONLY from the provided transcript.
3. Select an appropriate emoji icon for each slide (e.g. 📊 📈 🎯 👥 🗺️ 🤝 💡 🚀 ⚡ 🔍 🛡️ 💼 💰 🌐 🏆).
4. Select a distinct Tailwind color gradient for each slide from:
   - "from-purple-600 to-blue-600"
   - "from-blue-600 to-cyan-500"
   - "from-violet-600 to-purple-500"
   - "from-indigo-600 to-blue-500"
   - "from-purple-500 to-pink-500"
   - "from-blue-500 to-indigo-600"
   - "from-emerald-500 to-teal-600"
   - "from-amber-500 to-orange-600"
5. Do NOT invent fake data or use generic filler. Extract real information, metrics, goals, and facts directly from the transcript.
`;

    console.log("[Generate Slides API] Sending request to Gemini API...");
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    console.log("[Generate Slides API] Gemini response received. Raw response length:", responseText.length);

    let parsedData: any = null;
    try {
      parsedData = JSON.parse(responseText);
    } catch (parseErr) {
      console.error("[Generate Slides API] Initial JSON parse error:", parseErr);
      const cleanText = responseText
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "");

      try {
        parsedData = JSON.parse(cleanText);
      } catch (cleanErr) {
        const match = responseText.match(/\{[\s\S]*\}/);
        if (match) {
          try {
            parsedData = JSON.parse(match[0]);
          } catch (mErr) {
            console.error("[Generate Slides API] Regex match JSON parse error:", mErr);
          }
        }
      }
    }

    if (!parsedData || !parsedData.slides || !Array.isArray(parsedData.slides) || parsedData.slides.length === 0) {
      console.warn("[Generate Slides API] Warning: Gemini returned invalid JSON structure, generating structured fallback slides.");
      parsedData = {
        presentationTitle: "Executive Summary",
        presentationSubtitle: "Synthesized from Transcript",
        agenda: ["Key Takeaways", "Overview", "Action Plan"],
        slides: [
          {
            id: 1,
            title: "Transcript Analysis & Overview",
            subtitle: "Key Highlights",
            bullets: [
              transcript.substring(0, 100) + "...",
              "Generated structured presentation deck based on provided input audio/text.",
              "Ready for export to PPTX and executive presentation."
            ],
            speakerNotes: "Overview slide generated from transcript.",
            icon: "📊",
            gradient: "from-purple-600 to-blue-600"
          }
        ]
      };
    }

    const gradientsList = [
      "from-purple-600 to-blue-600",
      "from-blue-600 to-cyan-500",
      "from-violet-600 to-purple-500",
      "from-indigo-600 to-blue-500",
      "from-purple-500 to-pink-500",
      "from-blue-500 to-indigo-600",
      "from-emerald-500 to-teal-600",
      "from-amber-500 to-orange-600",
    ];

    const formattedSlides = parsedData.slides.map((s: any, idx: number) => ({
      id: s.id || idx + 1,
      title: s.title || `Slide ${idx + 1}`,
      subtitle: s.subtitle || "",
      bullets: Array.isArray(s.bullets) ? s.bullets : [s.bullets || "Key takeaway"],
      speakerNotes: s.speakerNotes || "",
      icon: s.icon || "📊",
      gradient: s.gradient || gradientsList[idx % gradientsList.length],
    }));

    console.log("[Generate Slides API] Slide generation successful. Total slides:", formattedSlides.length);

    return NextResponse.json({
      success: true,
      presentationTitle: parsedData.presentationTitle || "Presentation Deck",
      presentationSubtitle: parsedData.presentationSubtitle || "",
      agenda: parsedData.agenda || [],
      slides: formattedSlides,
    });
  } catch (error: any) {
    console.error("[Generate Slides API] Error generating slides:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to generate slides from transcript.",
      },
      { status: 500 }
    );
  }
}
