import { Slide, generatedSlides } from "@/data/mockData";
import { sleep } from "@/lib/utils";

export interface GenerationResult {
  slides: Slide[];
  slideCount: number;
  processingTime: number;
}

export async function generateSlidesFromTranscript(
  transcript: string
): Promise<GenerationResult> {
  // Simulate AI processing delay
  await sleep(2500);

  const words = transcript.toLowerCase().split(" ");
  const slideCount = Math.min(
    Math.max(3, Math.floor(words.length / 20)),
    generatedSlides.length
  );

  return {
    slides: generatedSlides.slice(0, slideCount),
    slideCount,
    processingTime: 2.5,
  };
}

export async function transcribeAudio(file: File): Promise<string> {
  // Mock transcription delay
  await sleep(3000);
  return `This is a mock transcription of ${file.name}. In a real implementation, this would contain the actual transcribed content from the audio file using a speech-to-text service like OpenAI Whisper or Google Speech-to-Text API.`;
}
