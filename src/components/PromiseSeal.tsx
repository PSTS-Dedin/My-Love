import { CheckCircle2 } from "lucide-react";
import Reveal from "@/components/Reveal";
import { promise } from "@/data/loveContent";

export default function PromiseSeal() {
  return (
    <div className="grid gap-6 rounded-3xl border border-pink-200/70 bg-white/75 p-6 backdrop-blur-sm sm:grid-cols-[1.2fr_0.8fr] sm:items-center sm:p-10">
      <div className="grid gap-3">
        <Reveal>
          <div className="font-display text-2xl text-zinc-950 sm:text-3xl">{promise.title}</div>
        </Reveal>
        <Reveal delayMs={90}>
          <div className="text-sm leading-relaxed text-zinc-900/70 sm:text-base">{promise.text}</div>
        </Reveal>
      </div>
      <Reveal delayMs={160}>
        <div className="relative overflow-hidden rounded-3xl border border-pink-200/70 bg-white/70 p-6 shadow-[0_22px_80px_rgba(236,72,153,0.16)]">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-pink-300/40 blur-2xl" />
          <div className="absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-violet-300/30 blur-2xl" />
          <div className="relative grid gap-3">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.2em] text-zinc-900/60">
              <CheckCircle2 className="h-4 w-4 text-pink-500" />
              {promise.seal}
            </div>
            <div className="font-display text-3xl leading-[0.9] text-zinc-950">∞</div>
            <div className="text-xs font-bold text-zinc-900/50">presente, sempre que eu puder</div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
