import { Music2, ExternalLink } from "lucide-react";
import Reveal from "@/components/Reveal";
import { playlist } from "@/data/loveContent";

export default function Playlist() {
  return (
    <div className="grid gap-3">
      {playlist.map((p, idx) => (
        <Reveal key={`${p.title}-${idx}`} delayMs={idx * 70}>
          <div className="rounded-3xl border border-pink-200/70 bg-white/75 p-5 backdrop-blur-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-pink-200/70 bg-white/70">
                    <Music2 className="h-4 w-4 text-pink-500" />
                  </span>
                  <div className="min-w-0">
                    <div className="truncate font-display text-lg text-zinc-950">{p.title}</div>
                    <div className="truncate text-xs font-bold text-zinc-950/60">{p.artist ?? " "}</div>
                  </div>
                </div>
                <div className="mt-3 text-sm leading-relaxed text-zinc-950/75">{p.note}</div>
              </div>
              {p.url ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-love-ghost px-4 py-2 text-xs"
                >
                  ouvir
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : null}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
