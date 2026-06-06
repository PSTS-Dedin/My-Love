import { Heart, LockKeyhole, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Dialog from "@/components/Dialog";
import Reveal from "@/components/Reveal";
import { surprise } from "@/data/loveContent";
import { useLoveStore } from "@/store/loveStore";

export default function Surprise() {
  const open = useLoveStore((s) => s.surpriseOpen);
  const setOpen = useLoveStore((s) => s.setSurpriseOpen);
  const [taps, setTaps] = useState(0);
  const target = 7;

  useEffect(() => {
    if (open) setTaps(0);
  }, [open]);

  const pct = Math.min(1, taps / target);
  const mood = useMemo(() => {
    if (taps === 0) return "Tá pronta? Aperta com jeitinho.";
    if (taps < target) return "Mais mais mais… quase lá!";
    return "Aaaaa agora sim. Pode ler ♡";
  }, [taps, target]);

  return (
    <>
      <div className="rounded-3xl border border-pink-200/70 bg-white/75 p-6 backdrop-blur-sm sm:p-10">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="grid gap-3">
            <Reveal>
              <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.22em] text-pink-600/70">
                <LockKeyhole className="h-4 w-4" />
                segredo
              </div>
            </Reveal>
            <Reveal delayMs={90}>
              <div className="font-display text-3xl text-zinc-950 sm:text-4xl">{surprise.title}</div>
            </Reveal>
            <Reveal delayMs={140}>
              <div className="max-w-xl text-sm leading-relaxed text-zinc-900/70 sm:text-base">
                Um presente pequeno. Um sorriso grande.
              </div>
            </Reveal>
          </div>

          <Reveal delayMs={180}>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="btn-love-primary"
            >
              <Sparkles className="h-4 w-4" />
              {surprise.ctaOpen}
            </button>
          </Reveal>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen} title="Para você">
        <div className="grid gap-4">
          <div className="grid gap-4 rounded-2xl border border-pink-200/70 bg-white/80 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs font-extrabold tracking-[0.18em] text-zinc-950/70">mini desbloqueio</div>
              <div className="font-display text-xs tracking-[0.22em] text-pink-700/70">bate o coração</div>
            </div>

            <button
              type="button"
              onClick={() => setTaps((v) => Math.min(target, v + 1))}
              className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-pink-200/70 bg-white/80 px-4 py-4 text-sm font-extrabold text-zinc-900 transition hover:bg-white"
            >
              <Heart className="h-5 w-5 text-pink-500 transition group-active:scale-110" />
              {taps < target ? "apertar pra liberar" : "liberado"}
            </button>

            <div className="grid gap-2">
              <div className="h-2 overflow-hidden rounded-full border border-pink-200/70 bg-white/80">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-pink-500/60 via-pink-300/60 to-violet-300/50 transition-[width] duration-300"
                  style={{ width: `${pct * 100}%` }}
                />
              </div>
              <div className="text-sm font-bold text-zinc-950/70">{mood}</div>
            </div>

            {taps >= target ? (
              <div className="grid gap-2 rounded-2xl border border-pink-200/70 bg-white/80 p-5">
                {surprise.lines.map((line, idx) => (
                  <Reveal key={idx} delayMs={idx * 90}>
                    <div className="font-display text-2xl leading-tight text-zinc-950 sm:text-3xl">{line}</div>
                  </Reveal>
                ))}
              </div>
            ) : null}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="btn-love-ghost"
            >
              {surprise.ctaClose}
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
