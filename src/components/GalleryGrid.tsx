import { useMemo } from "react";
import { Image as ImageIcon } from "lucide-react";
import Dialog from "@/components/Dialog";
import Reveal from "@/components/Reveal";
import { gallery } from "@/data/gallery";
import { cn } from "@/lib/utils";
import { useLoveStore } from "@/store/loveStore";

export default function GalleryGrid() {
  const openId = useLoveStore((s) => s.galleryOpenId);
  const setOpenId = useLoveStore((s) => s.setGalleryOpenId);

  const selected = useMemo(() => gallery.find((g) => g.id === openId) ?? null, [openId]);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((g, idx) => (
          <Reveal key={g.id} delayMs={idx * 60}>
            <button
              type="button"
              onClick={() => setOpenId(g.id)}
              className={cn(
                "group relative overflow-hidden rounded-3xl border border-pink-200/70 bg-white/75 text-left backdrop-blur-sm",
                "shadow-[0_22px_80px_rgba(236,72,153,0.16)] transition hover:-translate-y-0.5 hover:border-pink-300",
              )}
            >
              <div className="aspect-[16/11] w-full overflow-hidden">
                <img
                  src={g.src}
                  alt={g.title}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.04] group-hover:opacity-100"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="rounded-2xl border border-pink-200/70 bg-white/85 p-4 backdrop-blur-md">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate font-display text-lg text-zinc-950">{g.title}</div>
                    </div>
                    <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-pink-200/70 bg-white text-zinc-900">
                      <ImageIcon className="h-4 w-4 text-pink-500" />
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <Dialog open={!!selected} onOpenChange={(v) => setOpenId(v ? openId : null)} title={selected?.title}>
        {selected ? (
          <div className="grid gap-4">
            <div className="overflow-hidden rounded-2xl border border-pink-200/70 bg-white/70">
              <img src={selected.src} alt={selected.title} className="h-auto w-full" />
            </div>
          </div>
        ) : null}
      </Dialog>
    </>
  );
}
