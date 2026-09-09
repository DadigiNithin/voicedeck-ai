"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Play, Square, Sparkles, Loader2 } from "lucide-react";
import { tts } from "@/lib/tts";

interface TTSPlayerProps {
  textToSpeak: string;
  title?: string;
  className?: string;
  compact?: boolean;
}

export default function TTSPlayer({
  textToSpeak,
  title = "Read Aloud",
  className = "",
  compact = false,
}: TTSPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [useGeminiNarration, setUseGeminiNarration] = useState(false);

  useEffect(() => {
    // Stop speech on unmount
    return () => {
      tts.stop();
    };
  }, []);

  const handleTogglePlay = async () => {
    if (isPlaying) {
      tts.stop();
      setIsPlaying(false);
      return;
    }

    if (!textToSpeak.trim()) return;

    let targetText = textToSpeak;

    if (useGeminiNarration) {
      setIsLoading(true);
      try {
        const res = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: textToSpeak, mode: "script" }),
        });
        const data = await res.json();
        if (data.processedText) {
          targetText = data.processedText;
        }
      } catch (e) {
        console.warn("Gemini script generation fallback:", e);
      } finally {
        setIsLoading(false);
      }
    }

    tts.speak(targetText, {
      rate: speechRate,
      onStart: () => setIsPlaying(true),
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false),
    });
  };

  const handleStop = () => {
    tts.stop();
    setIsPlaying(false);
  };

  if (compact) {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleTogglePlay}
          disabled={isLoading}
          className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ${
            isPlaying
              ? "bg-red-600 hover:bg-red-700 text-white animate-pulse"
              : "bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] text-white"
          }`}
        >
          {isLoading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : isPlaying ? (
            <Square className="w-3.5 h-3.5 fill-current" />
          ) : (
            <Volume2 className="w-3.5 h-3.5" />
          )}
          {isPlaying ? "Stop" : title}
        </motion.button>
      </div>
    );
  }

  return (
    <div
      className={`bg-[#FFFDF7] border border-[#6D28D9]/10 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 backdrop-blur-md shadow-sm ${className}`}
    >
      <div className="flex items-center gap-2.5">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleTogglePlay}
          disabled={isLoading}
          className={`w-9 h-9 rounded-2xl flex items-center justify-center text-white transition-all shadow-sm cursor-pointer ${
            isPlaying
              ? "bg-red-600 hover:bg-red-700 shadow-red-600/30"
              : "bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] shadow-[#6D28D9]/20"
          }`}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : isPlaying ? (
            <Square className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current ml-0.5" />
          )}
        </motion.button>

        <div>
          <div className="text-[#35115F] text-xs font-bold flex items-center gap-1.5">
            {isPlaying ? (
              <span className="text-emerald-700 flex items-center gap-1 font-bold">
                <Volume2 className="w-3.5 h-3.5 animate-bounce" /> Speaking…
              </span>
            ) : (
              <span>{title}</span>
            )}
          </div>
          <div className="text-[#5C4E4E] text-[11px] font-medium">
            {isPlaying ? "Click to stop narration" : "Click to read text aloud"}
          </div>
        </div>
      </div>

      {/* Waveform visualization */}
      {isPlaying && (
        <div className="flex items-center gap-1 h-5 px-2">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                height: ["20%", "90%", "30%"],
              }}
              transition={{
                duration: 0.4 + (i % 4) * 0.15,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className="w-1 bg-gradient-to-t from-[#6D28D9] to-[#7C3AED] rounded-full"
            />
          ))}
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-2">
        {/* Speed Selector */}
        <select
          value={speechRate}
          onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
          className="bg-[#FFF8E8] border border-[#6D28D9]/15 text-[#35115F] text-xs rounded-xl px-2 py-1 outline-none font-mono font-medium cursor-pointer shadow-sm"
        >
          <option value={0.8}>0.8x</option>
          <option value={1.0}>1.0x</option>
          <option value={1.2}>1.2x</option>
          <option value={1.5}>1.5x</option>
        </select>

        {/* Gemini Enhancement Toggle */}
        <button
          onClick={() => setUseGeminiNarration(!useGeminiNarration)}
          className={`px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 transition-all cursor-pointer shadow-sm ${
            useGeminiNarration
              ? "bg-[#EDE3FF] border-[#6D28D9]/30 text-[#35115F]"
              : "bg-white border-[#6D28D9]/10 text-[#5C4E4E] hover:text-[#211A1A]"
          }`}
          title="Enhance narration script with Gemini AI"
        >
          <Sparkles className="w-3 h-3 text-[#6D28D9]" />
          AI Script
        </button>
      </div>
    </div>
  );
}
