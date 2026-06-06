import Reveal from "@/components/Reveal";
import { loveLetter } from "@/data/loveContent";

export default function LetterBlock() {
  return (
    <div className="grid gap-6 rounded-3xl border border-pink-200/70 bg-white/75 p-6 shadow-[0_30px_120px_rgba(236,72,153,0.18)] backdrop-blur-sm sm:p-10">
      <Reveal>
        <p className="text-sm font-extrabold tracking-[0.18em] text-pink-700/80">uma carta aberta</p>
      </Reveal>
      <div className="grid gap-5">
        {loveLetter.map((p, idx) => (
          <Reveal key={idx} delayMs={idx * 90}>
            <p className="text-base leading-relaxed text-zinc-950/85 sm:text-lg">{p}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
