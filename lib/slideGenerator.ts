export interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  bullets: string[];
  speakerNotes?: string;
  icon: string;
  gradient: string;
}

export interface GenerationResult {
  slides: Slide[];
  slideCount: number;
  processingTime: number;
  presentationTitle?: string;
  presentationSubtitle?: string;
  agenda?: string[];
}

export async function transcribeAudio(file: File): Promise<string> {
  console.log("[Client] Selected file:", file.name, file.type, `${(file.size / (1024 * 1024)).toFixed(2)} MB`);
  console.log("[Client] Upload request sent to /api/transcribe");

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/transcribe", {
    method: "POST",
    body: formData,
  });

  const responseText = await response.text();
  let data: any = {};
  try {
    data = responseText ? JSON.parse(responseText) : {};
  } catch (err) {
    console.error("[Client] Non-JSON response from /api/transcribe:", responseText);
    throw new Error(`Transcribe server error (${response.status}): ${responseText.substring(0, 120)}`);
  }

  if (!response.ok || !data.success) {
    const errorMsg = data.error || `Upload failed with status ${response.status}`;
    if (response.status === 429 || errorMsg.includes("rate limit") || errorMsg.includes("Quota")) {
      console.warn("[Client] Transcribe API Rate Limit Warning:", errorMsg);
    } else {
      console.error("[Client] Transcribe API Error:", errorMsg);
    }
    throw new Error(errorMsg);
  }

  console.log("[Client] Gemini response transcript received successfully!");
  console.log("[Client] Transcript length:", data.transcript?.length);
  console.log("[Client] Transcript preview:", data.transcript?.substring(0, 150) + "...");

  return data.transcript;
}

export async function generateSlidesFromTranscript(
  transcript: string
): Promise<GenerationResult> {
  console.log("[Client] Slide generation request sent to /api/generate-slides");
  console.log("[Client] Transcript length:", transcript.length);

  const response = await fetch("/api/generate-slides", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ transcript }),
  });

  const responseText = await response.text();
  let data: any = {};
  try {
    data = responseText ? JSON.parse(responseText) : {};
  } catch (err) {
    console.error("[Client] Non-JSON response from /api/generate-slides:", responseText);
    throw new Error(`Slide generator server error (${response.status}): ${responseText.substring(0, 120)}`);
  }

  if (!response.ok || !data.success) {
    const errorMsg = data.error || `Slide generation failed with status ${response.status}`;
    if (response.status === 429 || errorMsg.includes("rate limit") || errorMsg.includes("Quota")) {
      console.warn("[Client] Slide Generation API Rate Limit Warning:", errorMsg);
    } else {
      console.error("[Client] Slide Generation API Error:", errorMsg);
    }
    throw new Error(errorMsg);
  }

  console.log("[Client] Slide generation response received successfully!");
  console.log("[Client] Generated slides count:", data.slides?.length);
  console.log("[Client] Presentation Title:", data.presentationTitle);

  return {
    slides: data.slides,
    slideCount: data.slides?.length || 0,
    processingTime: 1.5,
    presentationTitle: data.presentationTitle,
    presentationSubtitle: data.presentationSubtitle,
    agenda: data.agenda,
  };
}
