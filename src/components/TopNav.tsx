import { Heart } from "lucide-react";
import { loveProfile } from "@/data/loveContent";
import { cn } from "@/lib/utils";

const links = [
  { href: "#carta", label: "Carta" },
  { href: "#timeline", label: "Linha do tempo" },
  { href: "#galeria", label: "Galeria" },
  { href: "#playlist", label: "Playlist" },
];

export default function TopNav() {
  return (
    <div className="sticky top-0 z-40 border-b border-pink-200/70 bg-white/65 backdrop-blur-xl">
      <div className="container px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <a href="#topo" className="group inline-flex items-center gap-2">
            <span
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-xl border border-pink-200/70 bg-white/80",
                "shadow-[0_0_0_1px_rgba(236,72,153,0.06),0_18px_60px_rgba(236,72,153,0.18)]",
              )}
            >
              <Heart className="h-4 w-4 text-pink-500" />
            </span>
            <span className="hidden font-display text-sm text-zinc-950 sm:inline">
              Para {loveProfile.forName}
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3 py-2 text-xs font-extrabold text-zinc-900/70 transition hover:bg-pink-100 hover:text-zinc-950"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="#surpresa"
            className="btn-love-ghost"
          >
            Surpresa <span className="font-love text-sm leading-none text-pink-500">psst</span>
          </a>
        </div>
      </div>
    </div>
  );
}
