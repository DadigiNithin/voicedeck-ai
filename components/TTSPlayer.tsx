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
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md ${
            isPlaying
              ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
              : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white"
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
      className={`bg-white/[0.04] border border-white/10 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 backdrop-blur-md ${className}`}
    >
      <div className="flex items-center gap-2.5">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleTogglePlay}
          disabled={isLoading}
          className={`w-9 h-9 rounded-lg flex items-center justify-center text-white transition-all shadow-lg ${
            isPlaying
              ? "bg-red-500 hover:bg-red-600 shadow-red-500/30"
              : "bg-gradient-to-r from-purple-600 to-blue-600 shadow-purple-500/30"
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
          <div className="text-white text-xs font-semibold flex items-center gap-1.5">
            {isPlaying ? (
              <span className="text-green-400 flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5 animate-bounce" /> Speaking…
              </span>
            ) : (
              <span>{title}</span>
            )}
          </div>
          <div className="text-gray-400 text-[11px]">
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
              className="w-1 bg-gradient-to-t from-purple-500 to-blue-400 rounded-full"
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
          className="bg-black/40 border border-white/10 text-gray-300 text-xs rounded-lg px-2 py-1 outline-none font-mono"
        >
          <option value={0.8}>0.8x</option>
          <option value={1.0}>1.0x</option>
          <option value={1.2}>1.2x</option>
          <option value={1.5}>1.5x</option>
        </select>

        {/* Gemini Enhancement Toggle */}
        <button
          onClick={() => setUseGeminiNarration(!useGeminiNarration)}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium border flex items-center gap-1 transition-all ${
            useGeminiNarration
              ? "bg-purple-500/20 border-purple-500/60 text-purple-300"
              : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
          }`}
          title="Enhance narration script with Gemini AI"
        >
          <Sparkles className="w-3 h-3 text-purple-400" />
          AI Script
        </button>
      </div>
    </div>
  );
}
