import { useMemo } from "react";
import { gallery as allGallery } from "@/data/gallery";
import { cn } from "@/lib/utils";

type Tile = {
  id: string;
  src: string;
  r: number;
  s: number;
  o: number;
};

const pickSources = () => {
  const user = allGallery.filter((g) => g.id.startsWith("u")).map((g) => g.src);
  if (user.length > 0) return user;
  return allGallery.slice(0, 10).map((g) => g.src);
};

const makeTiles = (count: number, sources: string[]) => {
  const tiles: Tile[] = [];
  for (let i = 0; i < count; i += 1) {
    const src = sources[i % sources.length] ?? "";
    const r = ((i * 17) % 15) - 7;
    const s = 0.92 + ((i * 13) % 18) / 100;
    const o = 0.08 + ((i * 11) % 10) / 100;
    tiles.push({ id: `t${i}`, src, r, s, o });
  }
  return tiles;
};

type PhotoMosaicBgProps = {
  className?: string;
};

export default function PhotoMosaicBg({ className }: PhotoMosaicBgProps) {
  const sources = useMemo(() => pickSources(), []);
  const tiles = useMemo(() => makeTiles(60, sources), [sources]);

  if (sources.length === 0) return null;

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute inset-0 mosaic-fade" />
      <div className="absolute inset-0 mosaic-veil" />
      <div className="absolute -inset-10 grid grid-cols-6 gap-3 sm:grid-cols-10 sm:gap-4 mosaic-grid">
        {tiles.map((t) => (
          <div
            key={t.id}
            className="mosaic-tile"
            style={{
              backgroundImage: `url(${t.src})`,
              transform: `rotate(${t.r}deg) scale(${t.s})`,
              opacity: t.o,
            }}
          />
        ))}
      </div>
    </div>
  );
}
