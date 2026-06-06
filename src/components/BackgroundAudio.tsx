import { useEffect, useMemo, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "bg-music-enabled";
const STORAGE_VOLUME_KEY = "bg-music-volume";
const AUDIO_SRC = "/One%20Less%20Lonely%20Girl%20-%20Justin%20Bieber%20-%20Spotimate.app.mp3";
const DEFAULT_VOLUME = 0.08;

type Status = "idle" | "playing" | "paused" | "blocked";

export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const tryPlayRef = useRef<(() => void) | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [enabled, setEnabled] = useState<boolean>(() => {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "0") return false;
    if (v === "1") return true;
    return true;
  });
  const [volume, setVolume] = useState<number>(() => {
    const raw = localStorage.getItem(STORAGE_VOLUME_KEY);
    const n = raw ? Number(raw) : NaN;
    if (Number.isFinite(n)) return Math.min(1, Math.max(0, n));
    return DEFAULT_VOLUME;
  });

  const label = useMemo(() => {
    if (!enabled) return "Música desligada";
    if (status === "playing") return "Música tocando";
    if (status === "paused") return "Música pausada";
    if (status === "blocked") return "Clique pra tocar";
    return "Música";
  }, [enabled, status]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
  }, [enabled]);

  useEffect(() => {
    localStorage.setItem(STORAGE_VOLUME_KEY, String(volume));
    const a = audioRef.current;
    if (a) a.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!enabled) {
      const a = audioRef.current;
      if (a) {
        a.pause();
        setStatus("paused");
      }
      return;
    }

    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = volume;
    audio.preload = "auto";
    audioRef.current = audio;

    const tryPlay = async () => {
      try {
        await audio.play();
        setStatus("playing");
      } catch {
        setStatus("blocked");
      }
    };

    tryPlayRef.current = () => {
      void tryPlay();
    };

    void tryPlay();

    const onFirstGesture = () => {
      if (!enabled) return;
      void tryPlay();
    };

    window.addEventListener("pointerdown", onFirstGesture, { once: true });
    window.addEventListener("keydown", onFirstGesture, { once: true });

    const onTryPlay = () => {
      if (!enabled) return;
      void tryPlay();
    };

    window.addEventListener("love-audio-tryplay", onTryPlay);

    return () => {
      window.removeEventListener("pointerdown", onFirstGesture);
      window.removeEventListener("keydown", onFirstGesture);
      window.removeEventListener("love-audio-tryplay", onTryPlay);
      audio.pause();
      audioRef.current = null;
      tryPlayRef.current = null;
    };
  }, [enabled, volume]);

  const toggleEnabled = () => {
    setEnabled((v) => !v);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[70] flex items-center gap-2">
      <div className="hidden rounded-full border border-pink-200/70 bg-white/80 px-3 py-2 text-xs font-extrabold text-zinc-950/70 shadow-[0_12px_40px_rgba(236,72,153,0.14)] backdrop-blur sm:block">
        {label}
      </div>
      <div className="flex items-center gap-2 rounded-full border border-pink-200/70 bg-white/80 px-3 py-2 shadow-[0_12px_40px_rgba(236,72,153,0.14)] backdrop-blur">
        <input
          aria-label="Volume da música"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-16 accent-pink-500 sm:w-24"
        />
      </div>
      <button
        type="button"
        onClick={toggleEnabled}
        aria-label={enabled ? "Silenciar música" : "Ativar música"}
        className={cn(
          "btn-love-primary h-11 w-11 p-0",
          enabled ? "" : "opacity-90",
        )}
      >
        {enabled ? <Volume2 className="h-5 w-5 text-pink-600" /> : <VolumeX className="h-5 w-5 text-pink-600" />}
      </button>
    </div>
  );
}
