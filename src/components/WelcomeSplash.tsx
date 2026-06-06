import { useEffect, useMemo, useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import BowCorners from "@/components/BowCorners";
import { loveProfile } from "@/data/loveContent";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "love-splash-seen";

export default function WelcomeSplash() {
  const [open, setOpen] = useState(() => localStorage.getItem(STORAGE_KEY) !== "1");

  const title = useMemo(() => `Para ${loveProfile.forName}`, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center p-6">
      <div className="absolute inset-0 bg-white/65 backdrop-blur-md" />
      <div className="absolute inset-0 kawaii-bg opacity-70" />
      <div className="noise absolute inset-0 opacity-[0.06]" />

      <div
        className={cn(
          "relative w-full max-w-[560px] overflow-hidden rounded-[2.5rem] border border-pink-200/80 bg-white/90 p-8 text-center shadow-[0_40px_140px_rgba(236,72,153,0.22)]",
          "backdrop-blur",
        )}
      >
        <BowCorners className="opacity-80" />

        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-pink-200/70 bg-white/70 px-4 py-2 text-xs font-extrabold text-zinc-900 shadow-[0_18px_70px_rgba(236,72,153,0.18)]">
          <Sparkles className="h-4 w-4 text-pink-500" />
          <span>um presente bem fofo</span>
        </div>

        <div className="mt-8 font-display text-5xl leading-[0.95] text-zinc-950 sm:text-6xl">{title}</div>
        <div className="mt-4 text-sm font-bold leading-relaxed text-zinc-950/75">
          tem fotos, memória e uma musiquinha de fundo bem baixinho
        </div>

        <button
          type="button"
          className="btn-love-primary mt-10 w-full"
          onClick={() => {
            localStorage.setItem(STORAGE_KEY, "1");
            window.dispatchEvent(new Event("love-audio-tryplay"));
            setOpen(false);
          }}
        >
          <Heart className="h-4 w-4 text-pink-500" />
          Abrir presente
        </button>

        <div className="mt-4 text-xs font-bold text-zinc-950/50">
          se a música não começar, clica mais uma vez em qualquer lugar
        </div>
      </div>
    </div>
  );
}

