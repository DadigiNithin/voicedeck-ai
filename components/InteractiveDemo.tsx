"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Trash2,
  Upload,
  Loader2,
  CheckCircle2,
  Presentation,
  Mic,
  FileAudio,
  FileVideo,
  X,
  Play,
  Square,
  AlertCircle,
} from "lucide-react";
import { type Slide } from "@/data/mockData";
import { generateSlidesFromTranscript, transcribeAudio } from "@/lib/slideGenerator";
import { downloadPresentationAsPptx } from "@/lib/exportPptx";
import { sleep } from "@/lib/utils";
import TTSPlayer from "@/components/TTSPlayer";

type Tab = "transcript" | "upload" | "record";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  url: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function InteractiveDemo() {
  const [activeTab, setActiveTab] = useState<Tab>("transcript");
  const [transcript, setTranscript] = useState("");
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [generatingProgress, setGeneratingProgress] = useState(0);
  const [isDownloadingPpt, setIsDownloadingPpt] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);
  const recordTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const [presentationTitle, setPresentationTitle] = useState<string>("");
  const [presentationSubtitle, setPresentationSubtitle] = useState<string>("");
  const [agenda, setAgenda] = useState<string[]>([]);

  // ── Toast helper ──────────────────────────────────────────────────────────
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // ── Process a File object ─────────────────────────────────────────────────
  const processFile = useCallback(async (file: File) => {
    console.log("Selected file:", file.name, file.type, file.size);

    const isAudio = file.type.startsWith("audio/");
    const isVideo = file.type.startsWith("video/");
    const isValidExt = file.name.match(/\.(mp3|wav|m4a|mp4|webm|ogg|flac|aac)$/i);

    if (!isAudio && !isVideo && !isValidExt) {
      const errorMsg = "Unsupported file format. Please upload MP3, WAV, MP4, M4A, OGG, or WebM.";
      console.error("Errors:", errorMsg);
      showToast(`❌ ${errorMsg}`);
      return;
    }

    const url = URL.createObjectURL(file);
    setUploadedFile({ name: file.name, size: file.size, type: file.type, url });
    setSlides([]);
    setPresentationTitle("");
    setPresentationSubtitle("");
    setAgenda([]);
    setIsDone(false);

    // Dynamic file transcription via Gemini API
    setIsTranscribing(true);
    showToast(`🎤 Transcribing audio file "${file.name}" with Gemini API…`);

    try {
      console.log("Upload request:", file.name);
      console.log("Gemini API request: sending file to /api/transcribe");

      const resultTranscript = await transcribeAudio(file);

      console.log("Gemini response:");
      console.log("Transcript:", resultTranscript);

      setIsTranscribing(false);
      setTranscript(resultTranscript);
      showToast(`✅ Audio transcribed successfully! Review your transcript & click Generate Slides.`);
      setActiveTab("transcript");
    } catch (err: any) {
      setIsTranscribing(false);
      if (err.message?.includes("rate limit") || err.message?.includes("Quota")) {
        console.warn("[Transcribe Warning]", err.message);
        showToast(`⏳ ${err.message}`);
      } else {
        console.error("Transcription Error:", err);
        showToast(`❌ Transcription failed: ${err.message || "Failed to process audio"}`);
      }
    }
  }, []);

  // ── File input change ─────────────────────────────────────────────────────
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = "";
  };

  // ── Drag & Drop ───────────────────────────────────────────────────────────
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  // ── Generate slides ───────────────────────────────────────────────────────
  const handleGenerate = async () => {
    if (!transcript.trim()) {
      showToast("⚠️ Transcript is empty. Please upload audio or enter text.");
      return;
    }

    setIsGenerating(true);
    setIsDone(false);
    setSlides([]);
    setPresentationTitle("");
    setPresentationSubtitle("");
    setAgenda([]);
    setGeneratingProgress(0);

    const tick = setInterval(() => {
      setGeneratingProgress((p) => (p < 90 ? p + 5 : p));
    }, 150);

    try {
      console.log("Gemini API request: sending transcript to /api/generate-slides");
      const result = await generateSlidesFromTranscript(transcript);

      console.log("Gemini response slide generation:", result);

      clearInterval(tick);
      setGeneratingProgress(100);
      await sleep(300);

      setSlides(result.slides);
      if (result.presentationTitle) setPresentationTitle(result.presentationTitle);
      if (result.presentationSubtitle) setPresentationSubtitle(result.presentationSubtitle);
      if (result.agenda) setAgenda(result.agenda);

      setIsDone(true);
      setActiveSlide(0);
      showToast(`✨ ${result.slides.length} slides generated from your transcript!`);
    } catch (err: any) {
      console.error("Slide Generation Error:", err);
      clearInterval(tick);
      showToast(`❌ Slide generation failed: ${err.message || "Failed to generate slides"}`);
    } finally {
      clearInterval(tick);
      setIsGenerating(false);
    }
  };

  // ── Clear ─────────────────────────────────────────────────────────────────
  const handleClear = () => {
    setTranscript("");
    setSlides([]);
    setPresentationTitle("");
    setPresentationSubtitle("");
    setAgenda([]);
    setIsDone(false);
    setActiveSlide(0);
    setUploadedFile(null);
    setGeneratingProgress(0);
    showToast("Cleared transcript and slides.");
  };

  // ── Download PPTX ─────────────────────────────────────────────────────────
  const handleDownloadPptx = async () => {
    if (!slides || slides.length === 0) {
      showToast("⚠️ No slides available to download. Generate slides first!");
      return;
    }
    try {
      setIsDownloadingPpt(true);
      showToast("📥 Generating PowerPoint presentation file...");
      await downloadPresentationAsPptx(
        slides,
        presentationTitle || "VoiceDeck Presentation",
        presentationSubtitle
      );
      showToast("✅ PowerPoint presentation downloaded successfully!");
    } catch (err: any) {
      console.error("PPTX Download error:", err);
      showToast(`❌ Download failed: ${err.message || "Could not generate PPTX file"}`);
    } finally {
      setIsDownloadingPpt(false);
    }
  };

  // ── Copy Direct PPT Link ──────────────────────────────────────────────────
  const handleCopyPptLink = () => {
    if (typeof window === "undefined" || !slides || slides.length === 0) {
      showToast("⚠️ Generate slides first before copying PPT link!");
      return;
    }
    const params = new URLSearchParams();
    if (presentationTitle) params.set("title", presentationTitle);
    if (presentationSubtitle) params.set("subtitle", presentationSubtitle);
    params.set("slides", JSON.stringify(slides));

    const directPptLink = `${window.location.origin}/api/export-pptx?${params.toString()}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(directPptLink);
    }
    showToast("🔗 Direct PPT Link copied! Open this link in any browser tab to download/view your PowerPoint deck.");
  };

  const speechRecognitionRef = useRef<any>(null);

  // ── Recording ─────────────────────────────────────────────────────────────
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;

      mr.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mr.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const file = new File([blob], `voice-recording-${Date.now()}.webm`, {
          type: "audio/webm",
        });
        processFile(file);
      };

      // Try Web Speech API for real-time live voice recognition
      const SpeechRecognition =
        typeof window !== "undefined" &&
        ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.onresult = (event: any) => {
            let liveText = "";
            for (let i = 0; i < event.results.length; i++) {
              liveText += event.results[i][0].transcript;
            }
            if (liveText.trim()) {
              setTranscript(liveText);
            }
          };
          recognition.start();
          speechRecognitionRef.current = recognition;
        } catch (e) {
          console.warn("SpeechRecognition start warning:", e);
        }
      }

      mr.start();
      setIsRecording(true);
      setRecordingTime(0);
      recordTimerRef.current = setInterval(() => {
        setRecordingTime((t) => t + 1);
      }, 1000);
      showToast("🔴 Recording started… Speak into your microphone!");
    } catch {
      showToast("❌ Microphone access denied. Please allow microphone permission.");
    }
  };

  const stopRecording = () => {
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch (e) {}
      speechRecognitionRef.current = null;
    }
    mediaRecorderRef.current?.stop();
    if (recordTimerRef.current) clearInterval(recordTimerRef.current);
    setIsRecording(false);
    showToast("⏹ Recording stopped. Transcribing audio…");
  };

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  // ── Tabs config ───────────────────────────────────────────────────────────
  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "transcript", label: "Transcript", icon: Presentation },
    { id: "upload", label: "Upload File", icon: Upload },
    { id: "record", label: "Record", icon: Mic },
  ];

  return (
    <section id="demo" className="py-24 relative bg-[#FFF8E8]">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(109,40,217,0.06),transparent_60%)] pointer-events-none" />

      {/* Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 40, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-8 left-1/2 z-[100] bg-[#211A1A] text-[#FFF8E8] text-sm font-medium px-5 py-3 rounded-full shadow-2xl border border-[#6D28D9]/20"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EDE3FF] text-[#6D28D9] text-xs font-mono font-bold uppercase tracking-widest mb-4 shadow-sm border border-[#6D28D9]/10">
            <Presentation className="w-3.5 h-3.5" />
            INTERACTIVE STUDIO // LIVE AI ENGINE
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-[#211A1A] mb-4 uppercase tracking-tight">
            INTERACTIVE <span className="bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] bg-clip-text text-transparent">DEMO</span>
          </h2>
          <p className="text-[#5C4E4E] text-base sm:text-lg font-sans max-w-xl mx-auto font-medium">
            Upload audio, record your voice, or paste raw transcripts — watch VoiceDeck AI synthesize executive slide decks in real-time.
          </p>
        </motion.div>

        {/* Demo Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ── Left Panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#FFFDF7] border border-[#6D28D9]/15 rounded-3xl overflow-hidden flex flex-col shadow-xl"
          >
            {/* Tab Bar */}
            <div className="flex border-b border-[#6D28D9]/10 bg-[#FFF8E8]/60 p-1.5 gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider transition-all rounded-2xl cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-white text-[#35115F] shadow-sm"
                      : "text-[#5C4E4E] hover:text-[#211A1A]"
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6 flex-1 flex flex-col">
              {/* ── Transcript Tab ── */}
              {activeTab === "transcript" && (
                <div className="flex flex-col flex-1 gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[#6E5D5D] text-xs font-medium">
                      {transcript.length} characters
                    </span>
                    <div className="flex gap-2">
                      {transcript.length > 0 && (
                        <span className="text-emerald-700 text-xs font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Ready to generate
                        </span>
                      )}
                    </div>
                  </div>

                  <textarea
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    placeholder={`Paste your meeting transcript here…\n\nExample: Today's meeting discussed quarterly revenue growth, marketing budget increase, hiring plans and future roadmap.`}
                    className="flex-1 w-full min-h-[200px] bg-[#FFF8E8]/60 border border-[#6D28D9]/15 rounded-2xl text-[#211A1A] placeholder-[#9E8B8B] text-sm leading-relaxed resize-none focus:outline-none focus:border-[#6D28D9] font-mono p-4 transition-colors shadow-inner"
                  />

                  {/* TTS Player for Transcript */}
                  {transcript.trim() && (
                    <TTSPlayer
                      textToSpeak={transcript}
                      title="Listen to Full Transcript"
                    />
                  )}

                  {/* Uploaded file badge */}
                  {uploadedFile && (
                    <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-emerald-600/10 border border-emerald-600/20">
                      {uploadedFile.type.startsWith("video/") ? (
                        <FileVideo className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                      ) : (
                        <FileAudio className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-emerald-900 font-semibold truncate">
                          {uploadedFile.name}
                        </div>
                        <div className="text-xs text-[#5C4E4E]">
                          {formatBytes(uploadedFile.size)} · Transcribed ✓
                        </div>
                      </div>
                      <button
                        onClick={() => setUploadedFile(null)}
                        className="text-[#6E5D5D] hover:text-red-700 p-1 rounded-full hover:bg-black/5 transition-colors flex-shrink-0 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-auto">
                    <motion.button
                      onClick={handleGenerate}
                      disabled={!transcript.trim() || isGenerating || isTranscribing}
                      whileHover={{ scale: transcript.trim() ? 1.02 : 1 }}
                      whileTap={{ scale: transcript.trim() ? 0.98 : 1 }}
                      className="flex-1 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] hover:from-[#5B21B6] hover:to-[#6D28D9] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#6D28D9]/20 flex items-center justify-center gap-2 transition-all text-xs uppercase tracking-wider cursor-pointer"
                    >
                      {isTranscribing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Transcribing…
                        </>
                      ) : isGenerating ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Generating…
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4" />
                          Generate Slides
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      onClick={handleClear}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title="Clear all"
                      className="px-4 py-3.5 rounded-full border border-[#6D28D9]/15 hover:border-red-600/50 text-[#5C4E4E] hover:text-red-700 bg-white transition-all cursor-pointer shadow-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              )}

              {/* ── Upload Tab ── */}
              {activeTab === "upload" && (
                <div className="flex flex-col gap-4 flex-1">
                  {/* Drop Zone */}
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => fileRef.current?.click()}
                    className={`flex-1 min-h-[220px] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-200 ${
                      isDragging
                        ? "border-[#6D28D9] bg-[#EDE3FF]/50 scale-[1.01]"
                        : "border-[#6D28D9]/20 hover:border-[#6D28D9]/50 hover:bg-[#FFF8E8]/70 bg-[#FFF8E8]/30"
                    }`}
                  >
                    {isTranscribing ? (
                      <div className="flex flex-col items-center gap-3">
                        <div className="relative">
                          <div className="w-14 h-14 rounded-full border-2 border-[#6D28D9]/30 animate-ping absolute inset-0" />
                          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] flex items-center justify-center relative shadow-md">
                            <Loader2 className="w-6 h-6 text-white animate-spin" />
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-[#211A1A] font-bold text-sm">
                            Transcribing audio…
                          </p>
                          <p className="text-[#5C4E4E] text-xs mt-1 font-medium">
                            Converting your audio to text
                          </p>
                        </div>
                      </div>
                    ) : uploadedFile ? (
                      <div className="flex flex-col items-center gap-3 text-center px-6">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-600/10 border border-emerald-600/20 flex items-center justify-center">
                          <CheckCircle2 className="w-7 h-7 text-emerald-700" />
                        </div>
                        <div>
                          <p className="text-[#211A1A] font-bold text-sm">
                            {uploadedFile.name}
                          </p>
                          <p className="text-[#5C4E4E] text-xs mt-1 font-medium">
                            {formatBytes(uploadedFile.size)} · Transcript ready
                          </p>
                        </div>
                        {uploadedFile.type.startsWith("audio/") && (
                          <audio
                            src={uploadedFile.url}
                            controls
                            className="w-full max-w-xs mt-2 rounded-2xl"
                            onClick={(e) => e.stopPropagation()}
                          />
                        )}
                        {uploadedFile.type.startsWith("video/") && (
                          <video
                            src={uploadedFile.url}
                            controls
                            className="w-full max-w-xs mt-2 rounded-2xl"
                            onClick={(e) => e.stopPropagation()}
                          />
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setUploadedFile(null);
                            setTranscript("");
                          }}
                          className="text-xs text-red-700 hover:text-red-900 flex items-center gap-1 transition-colors mt-1 font-semibold cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" /> Remove file
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="w-16 h-16 rounded-2xl bg-[#EDE3FF] flex items-center justify-center text-[#6D28D9]">
                          <Upload className="w-8 h-8" />
                        </div>
                        <div className="text-center px-6">
                          <p className="text-[#211A1A] font-bold text-sm">
                            {isDragging ? "Drop your file here" : "Drop audio / video here"}
                          </p>
                          <p className="text-[#5C4E4E] text-xs mt-1 font-medium">
                            or click to browse · MP3, WAV, MP4, M4A, OGG, WebM
                          </p>
                          <p className="text-[#6E5D5D] text-xs mt-0.5 font-mono">up to 500 MB</p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Hidden file input */}
                  <input
                    ref={fileRef}
                    type="file"
                    accept="audio/*,video/*,.mp3,.wav,.mp4,.m4a,.ogg,.webm,.flac,.aac"
                    className="hidden"
                    onChange={handleFileInputChange}
                  />

                  {/* Supported formats */}
                  <div className="flex flex-wrap gap-2">
                    {["MP3", "WAV", "MP4", "M4A", "OGG", "WebM", "FLAC", "AAC"].map(
                      (fmt) => (
                        <span
                          key={fmt}
                          className="px-3 py-1 rounded-full bg-white border border-[#6D28D9]/10 text-[#5C4E4E] text-xs font-mono font-medium shadow-sm"
                        >
                          .{fmt.toLowerCase()}
                        </span>
                      )
                    )}
                  </div>

                  {/* Go generate button */}
                  {uploadedFile && !isTranscribing && (
                    <motion.button
                      onClick={() => setActiveTab("transcript")}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] flex items-center justify-center gap-2 shadow-lg shadow-[#6D28D9]/20 text-xs uppercase tracking-wider cursor-pointer"
                    >
                      <Zap className="w-4 h-4" />
                      Generate Slides from Transcript
                    </motion.button>
                  )}
                </div>
              )}

              {/* ── Record Tab ── */}
              {activeTab === "record" && (
                <div className="flex flex-col items-center justify-center gap-6 flex-1 py-6">
                  {/* Mic visual */}
                  <div className="relative">
                    {isRecording && (
                      <>
                        <div className="absolute inset-0 rounded-full bg-red-600/20 animate-ping scale-150" />
                        <div className="absolute inset-0 rounded-full bg-red-600/10 animate-ping scale-125 animation-delay-150" />
                      </>
                    )}
                    <div
                      className={`relative w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${
                        isRecording
                          ? "bg-gradient-to-br from-red-600 to-rose-700 shadow-red-600/30"
                          : "bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] shadow-[#6D28D9]/30"
                      }`}
                    >
                      <Mic className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* Timer */}
                  <div className="text-center">
                    {isRecording ? (
                      <>
                        <div className="text-4xl font-bold text-[#211A1A] font-mono">
                          {formatTime(recordingTime)}
                        </div>
                        <div className="text-red-700 text-sm mt-1 flex items-center justify-center gap-1.5 font-semibold">
                          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                          Recording…
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-[#211A1A] font-bold text-base">
                          Record Your Meeting
                        </div>
                        <div className="text-[#5C4E4E] text-sm mt-1 font-medium">
                          Click the button below to start recording
                        </div>
                      </>
                    )}
                  </div>

                  {/* Record / Stop button */}
                  {isRecording ? (
                    <motion.button
                      onClick={stopRecording}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white bg-red-600 hover:bg-red-700 shadow-md shadow-red-600/30 transition-all cursor-pointer text-xs uppercase tracking-wider"
                    >
                      <Square className="w-4 h-4 fill-current" />
                      Stop Recording
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={startRecording}
                      whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(109,40,217,0.3)" }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] shadow-lg shadow-[#6D28D9]/20 transition-all cursor-pointer text-xs uppercase tracking-wider"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      Start Recording
                    </motion.button>
                  )}

                  <div className="flex items-center gap-2 text-[#6E5D5D] text-xs font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Requires microphone permission
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* ── Right Panel — Slide Preview ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#FFFDF7] border border-[#6D28D9]/15 rounded-3xl overflow-hidden flex flex-col shadow-xl"
          >
            {/* Panel Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#6D28D9]/10 bg-[#FFF8E8]/60 flex-shrink-0">
              <div className="flex items-center gap-2">
                <Presentation className="w-4 h-4 text-[#6D28D9]" />
                <span className="text-[#35115F] font-bold text-sm">Live Preview</span>
              </div>
              {slides.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#35115F] bg-[#EDE3FF] border border-[#6D28D9]/10 px-3 py-1 rounded-full font-bold">
                    {slides.length} slides generated
                  </span>
                  <button
                    onClick={handleClear}
                    className="p-1.5 text-[#6E5D5D] hover:text-red-700 hover:bg-black/5 rounded-full transition-colors cursor-pointer"
                    title="Clear results"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            <div className="p-5 flex-1 overflow-y-auto">
              {/* ── Loading State ── */}
              {isGenerating && (
                <div className="flex flex-col items-center justify-center h-64 gap-5">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-2 border-[#6D28D9]/30 animate-ping absolute inset-0" />
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] flex items-center justify-center relative shadow-md">
                      <Zap className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[#211A1A] font-bold mb-1">Processing…</div>
                    <div className="text-[#5C4E4E] text-sm font-medium">
                      Analyzing transcript and generating slides
                    </div>
                  </div>
                  <div className="w-48 space-y-1">
                    <div className="flex justify-between text-xs text-[#6E5D5D] mb-1 font-mono">
                      <span>Progress</span>
                      <span>{generatingProgress}%</span>
                    </div>
                    <div className="h-1.5 bg-black/5 rounded-full overflow-hidden">
                      <motion.div
                        animate={{ width: `${generatingProgress}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-[#6D28D9] to-[#7C3AED]"
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ── Transcribing State ── */}
              {isTranscribing && !isGenerating && (
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-2 border-[#6D28D9]/30 animate-ping absolute inset-0" />
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] flex items-center justify-center relative shadow-md">
                      <Mic className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[#211A1A] font-bold mb-1">Transcribing Audio…</div>
                    <div className="text-[#5C4E4E] text-sm font-medium">
                      Converting speech to text
                    </div>
                  </div>
                  <div className="w-48 h-1.5 bg-black/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "70%" }}
                      transition={{ duration: 2.5, ease: "easeOut" as const }}
                      className="h-full rounded-full bg-gradient-to-r from-[#6D28D9] to-[#7C3AED]"
                    />
                  </div>
                </div>
              )}

              {/* ── Empty State ── */}
              {!isGenerating && !isTranscribing && slides.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 gap-4 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#EDE3FF] flex items-center justify-center shadow-sm text-[#6D28D9]">
                    <Presentation className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-[#211A1A] font-bold mb-1">No slides generated yet</div>
                    <div className="text-[#5C4E4E] text-sm max-w-xs font-medium">
                      Upload an audio recording, record your voice, or paste a transcript — then click{" "}
                      <span className="text-[#6D28D9] font-bold">Generate Slides</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Slides ── */}
              <AnimatePresence>
                {!isGenerating && !isTranscribing && slides.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-3"
                  >
                    {/* Presentation Title Banner */}
                    {presentationTitle && (
                      <div className="bg-[#EDE3FF]/60 border border-[#6D28D9]/15 rounded-2xl p-4 mb-3">
                        <div className="text-[#211A1A] font-bold text-base">{presentationTitle}</div>
                        {presentationSubtitle && (
                          <div className="text-[#5C4E4E] text-xs mt-0.5 font-medium">{presentationSubtitle}</div>
                        )}
                        {agenda.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {agenda.map((item, idx) => (
                              <span
                                key={idx}
                                className="px-2.5 py-0.5 rounded-full bg-white border border-[#6D28D9]/10 text-[#211A1A] text-[10px] font-medium shadow-sm"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Slide Navigator tabs */}
                    <div className="flex gap-2 flex-wrap mb-4">
                      {slides.map((slide, i) => (
                        <button
                          key={slide.id}
                          onClick={() => setActiveSlide(i)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                            activeSlide === i
                              ? "bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] text-white shadow-md"
                              : "bg-white border border-[#6D28D9]/10 text-[#5C4E4E] hover:text-[#211A1A] hover:bg-[#EDE3FF]/40"
                          }`}
                        >
                          Slide {i + 1}
                        </button>
                      ))}
                    </div>

                    {/* TTS Narration for Active Slide */}
                    {slides[activeSlide] && (
                      <TTSPlayer
                        textToSpeak={`${slides[activeSlide].title}. ${
                          slides[activeSlide].subtitle ? slides[activeSlide].subtitle + ". " : ""
                        }${slides[activeSlide].bullets.join(". ")}`}
                        title={`Listen to Slide ${activeSlide + 1}`}
                      />
                    )}

                    {/* Active Slide Big Preview */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeSlide}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="relative bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] rounded-3xl p-6 overflow-hidden shadow-xl"
                      >
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white blur-2xl" />
                          <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white blur-2xl" />
                        </div>
                        <div className="relative">
                          <div className="text-3xl mb-2">{slides[activeSlide]?.icon}</div>
                          <h3 className="text-white font-bold text-xl mb-1">
                            {slides[activeSlide]?.title}
                          </h3>
                          {slides[activeSlide]?.subtitle && (
                            <p className="text-white/90 text-xs mb-3 italic font-medium">
                              {slides[activeSlide]?.subtitle}
                            </p>
                          )}
                          <ul className="space-y-2 mt-3">
                            {slides[activeSlide]?.bullets.map((bullet, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className="flex items-start gap-2 text-white text-sm font-medium"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0 mt-1.5" />
                                {bullet}
                              </motion.li>
                            ))}
                          </ul>

                          {/* Speaker Notes */}
                          {slides[activeSlide]?.speakerNotes && (
                            <div className="mt-4 pt-3 border-t border-white/20 text-xs text-white/80 italic">
                              <span className="font-semibold text-white">🎙️ Speaker Notes: </span>
                              {slides[activeSlide]?.speakerNotes}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Slide List */}
                    <div className="space-y-2 mt-3">
                      {slides.map((slide, i) => (
                        <motion.div
                          key={slide.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                          onClick={() => setActiveSlide(i)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all cursor-pointer ${
                            activeSlide === i
                              ? "bg-[#EDE3FF] border border-[#6D28D9]/20"
                              : "hover:bg-[#FFF8E8] border border-transparent"
                          }`}
                        >
                          <span className="text-lg">{slide.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold text-[#211A1A] truncate">
                              {slide.title}
                            </div>
                            <div className="text-xs text-[#5C4E4E] font-medium">
                              {slide.bullets.length} bullet points
                            </div>
                          </div>
                          <div onClick={(e) => e.stopPropagation()}>
                            <TTSPlayer
                              compact
                              textToSpeak={`${slide.title}. ${slide.bullets.join(". ")}`}
                              title="Play"
                            />
                          </div>
                          {activeSlide === i && (
                            <CheckCircle2 className="w-4 h-4 text-[#6D28D9] flex-shrink-0" />
                          )}
                        </motion.div>
                      ))}
                    </div>

                    {/* Export Row */}
                    <div className="flex gap-2 mt-4 pt-4 border-t border-[#6D28D9]/10">
                      <button
                        onClick={handleDownloadPptx}
                        disabled={isDownloadingPpt || slides.length === 0}
                        className="flex-1 py-3 rounded-full border border-[#6D28D9]/20 hover:border-[#6D28D9]/40 text-[#6D28D9] bg-[#EDE3FF] hover:bg-[#EDE3FF]/80 text-xs font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-sm"
                      >
                        {isDownloadingPpt ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" /> Generating PPTX...
                          </>
                        ) : (
                          <>📥 Download PPTX</>
                        )}
                      </button>
                      <button
                        onClick={handleCopyPptLink}
                        disabled={slides.length === 0}
                        className="flex-1 py-3 rounded-full border border-[#6D28D9]/15 hover:border-[#6D28D9]/40 text-[#211A1A] bg-white hover:bg-[#FFF8E8] text-xs font-bold transition-all cursor-pointer disabled:opacity-50 shadow-sm"
                      >
                        🔗 Copy PPT Link
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
