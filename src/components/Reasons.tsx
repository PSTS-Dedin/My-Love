import { useMemo, useState } from "react";
import { Shuffle } from "lucide-react";
import Reveal from "@/components/Reveal";
import { reasons } from "@/data/loveContent";

function shuffle<T>(arr: T[]) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Reasons() {
  const [seed, setSeed] = useState(0);
  const [limit, setLimit] = useState(8);

  const items = useMemo(() => shuffle(reasons), [seed]);
  const visible = items.slice(0, Math.min(limit, items.length));

  return (
    <div className="rounded-3xl border border-pink-200/70 bg-white/75 p-6 backdrop-blur-sm sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm font-bold text-zinc-900/60">
          Eu te amo porque…
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSeed((v) => v + 1)}
            className="btn-love-ghost px-4 py-2 text-xs"
          >
            <Shuffle className="h-3.5 w-3.5 text-pink-500" />
            embaralhar
          </button>
          <button
            type="button"
            onClick={() => setLimit((v) => (v >= reasons.length ? 6 : v + 4))}
            className="btn-love-primary px-4 py-2 text-xs"
          >
            mais
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {visible.map((r, idx) => (
          <Reveal key={`${r.id}-${seed}`} delayMs={idx * 45}>
            <div className="rounded-full border border-pink-200/70 bg-white/70 px-4 py-2 text-sm font-bold text-zinc-900/80 shadow-[0_18px_60px_rgba(236,72,153,0.16)]">
              {r.text}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
