import { useEffect, useMemo, useRef, useState, type MutableRefObject, type PointerEvent as ReactPointerEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Dialog from "@/components/Dialog";
import Reveal from "@/components/Reveal";
import { gallery as allGallery } from "@/data/gallery";
import { cn } from "@/lib/utils";

const pickRouletteItems = () => {
  const user = allGallery.filter((g) => g.id.startsWith("u"));
  if (user.length >= 3) return user;
  return allGallery.slice(0, 8);
};

export default function PhotoRoulette() {
  const items = useMemo(() => pickRouletteItems(), []);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const hoverRef = useRef(false);
  const reduceMotionRef = useRef(false);
  const [dragDx, setDragDx] = useState(0);
  const dragWidthRef = useRef(0);
  const dragRef = useRef<{
    pointerId: number;
    x: number;
    y: number;
    dx: number;
    moved: boolean;
  } | null>(null);
  const preventClickRef = useRef(false);

  const [modalDragDx, setModalDragDx] = useState(0);
  const modalDragWidthRef = useRef(0);
  const modalDragRef = useRef<{
    pointerId: number;
    x: number;
    y: number;
    dx: number;
    moved: boolean;
  } | null>(null);
  const preventModalTapRef = useRef(false);

  const mod = (v: number) => {
    if (items.length === 0) return 0;
    return (v + items.length) % items.length;
  };

  const prev = () => setIndex((v) => mod(v - 1));
  const next = () => setIndex((v) => mod(v + 1));
  const prevModal = () => setModalIndex((v) => mod(v - 1));
  const nextModal = () => setModalIndex((v) => mod(v + 1));

  useEffect(() => {
    if (items.length <= 1) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotionRef.current = mq.matches;
    const onMq = (e: MediaQueryListEvent) => {
      reduceMotionRef.current = e.matches;
    };
    mq.addEventListener("change", onMq);

    const t = window.setInterval(() => {
      if (reduceMotionRef.current) return;
      if (hoverRef.current) return;
      setIndex((v) => (v + 1) % items.length);
    }, 3200);
    return () => {
      mq.removeEventListener("change", onMq);
      window.clearInterval(t);
    };
  }, [items.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (open) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, items.length]);

  useEffect(() => {
    if (items.length === 0) return;
    const preload = (idx: number) => {
      const src = items[mod(idx)]?.src;
      if (!src) return;
      const img = new Image();
      img.decoding = "async";
      img.src = src;
    };
    preload(index + 1);
    preload(index + 2);
    preload(index - 1);
  }, [index, items.length]);

  useEffect(() => {
    if (!open) return;
    const preload = (idx: number) => {
      const src = items[mod(idx)]?.src;
      if (!src) return;
      const img = new Image();
      img.decoding = "async";
      img.src = src;
    };
    preload(modalIndex + 1);
    preload(modalIndex - 1);
  }, [open, modalIndex, items.length]);

  const setPreventClick = (ref: MutableRefObject<boolean>) => {
    ref.current = true;
    window.setTimeout(() => {
      ref.current = false;
    }, 0);
  };

  const onCoverPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.setPointerCapture(e.pointerId);
    dragWidthRef.current = el.getBoundingClientRect().width;
    dragRef.current = { pointerId: e.pointerId, x: e.clientX, y: e.clientY, dx: 0, moved: false };
    setDragDx(0);
  };

  const onCoverPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d || d.pointerId !== e.pointerId) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.moved) {
      if (Math.abs(dx) < 6) return;
      if (Math.abs(dx) < Math.abs(dy) * 1.15) return;
      d.moved = true;
    }
    d.dx = dx;
    setDragDx(dx);
  };

  const onCoverPointerUp = (goPrev: () => void, goNext: () => void) => (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    dragRef.current = null;
    setDragDx(0);
    if (!d || d.pointerId !== e.pointerId) return;
    const threshold = Math.max(56, dragWidthRef.current * 0.16);
    if (!d.moved) return;
    setPreventClick(preventClickRef);
    if (Math.abs(d.dx) < threshold) return;
    if (d.dx > 0) goPrev();
    else goNext();
  };

  const onCoverPointerCancel = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    dragRef.current = null;
    setDragDx(0);
    if (!d || d.pointerId !== e.pointerId) return;
    if (d.moved) setPreventClick(preventClickRef);
  };

  const onModalPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.setPointerCapture(e.pointerId);
    modalDragWidthRef.current = el.getBoundingClientRect().width;
    modalDragRef.current = { pointerId: e.pointerId, x: e.clientX, y: e.clientY, dx: 0, moved: false };
    setModalDragDx(0);
  };

  const onModalPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = modalDragRef.current;
    if (!d || d.pointerId !== e.pointerId) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.moved) {
      if (Math.abs(dx) < 6) return;
      if (Math.abs(dx) < Math.abs(dy) * 1.15) return;
      d.moved = true;
    }
    d.dx = dx;
    setModalDragDx(dx);
  };

  const onModalPointerUp = (goPrev: () => void, goNext: () => void) => (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = modalDragRef.current;
    modalDragRef.current = null;
    setModalDragDx(0);
    if (!d || d.pointerId !== e.pointerId) return;
    const threshold = Math.max(64, modalDragWidthRef.current * 0.18);
    if (!d.moved) return;
    setPreventClick(preventModalTapRef);
    if (Math.abs(d.dx) < threshold) return;
    if (d.dx > 0) goPrev();
    else goNext();
  };

  const onModalPointerCancel = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = modalDragRef.current;
    modalDragRef.current = null;
    setModalDragDx(0);
    if (!d || d.pointerId !== e.pointerId) return;
    if (d.moved) setPreventClick(preventModalTapRef);
  };

  const pickOffsetItem = (offset: number) => items[mod(index + offset)] ?? null;
  const coverOffsets = items.length <= 1 ? [0] : items.length === 2 ? [-1, 0] : [-2, -1, 0, 1, 2];
  const dragProgress = dragWidthRef.current ? Math.max(-1, Math.min(1, dragDx / dragWidthRef.current)) : 0;

  return (
    <>
      <div
        className="relative overflow-hidden rounded-[2.25rem] border border-pink-200/80 bg-white/85 p-6 shadow-[0_30px_120px_rgba(236,72,153,0.18)] backdrop-blur-sm sm:p-10"
        onMouseEnter={() => {
          hoverRef.current = true;
        }}
        onMouseLeave={() => {
          hoverRef.current = false;
        }}
      >
        <div className="absolute inset-0 opacity-70">
          <div className="absolute -left-20 top-6 h-44 w-44 rounded-full bg-pink-300/40 blur-3xl" />
          <div className="absolute -right-16 bottom-8 h-52 w-52 rounded-full bg-violet-300/35 blur-3xl" />
        </div>

        <div className="relative grid">
          <Reveal delayMs={120}>
            <div className="relative mx-auto w-full max-w-[680px]">
              <div
                className={cn(
                  "relative aspect-[4/5] overflow-hidden rounded-[2.4rem] border border-pink-200/70 bg-white",
                  "shadow-[0_30px_120px_rgba(236,72,153,0.22)]",
                )}
                style={{ perspective: "1100px" }}
              >
                <div
                  className="absolute inset-0"
                  onPointerDown={onCoverPointerDown}
                  onPointerMove={onCoverPointerMove}
                  onPointerUp={onCoverPointerUp(prev, next)}
                  onPointerCancel={onCoverPointerCancel}
                  style={{ touchAction: "pan-y" }}
                >
                  {coverOffsets.map((off) => {
                    const it = pickOffsetItem(off);
                    if (!it) return null;
                    const offFx = off + dragProgress;
                    const abs = Math.abs(offFx);
                    const x = offFx * 34;
                    const rotateY = offFx * -26;
                    const rotateZ = offFx * -1.2;
                    const scale = 1 - abs * 0.06;
                    const z = 170 - abs * 88;
                    const opacity = 1 - abs * 0.22;
                    const blur = abs === 0 ? 0 : abs < 1.3 ? 0.3 : 0.85;
                    const zIndex = 20 - Math.round(abs * 2);
                    const shade = Math.min(0.22, abs * 0.12);
                    const dragging = dragRef.current?.moved ?? false;

                    return (
                      <button
                        key={`${it.id}-${off}`}
                        type="button"
                        aria-label="Abrir foto"
                        onClick={() => {
                          if (preventClickRef.current) return;
                          setModalIndex(mod(index + off));
                          setOpen(true);
                        }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{
                          width: "78%",
                          height: "86%",
                          transform: `translate(-50%, -50%) translateX(${x}%) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) translateZ(${z}px) scale(${scale})`,
                          opacity,
                          filter: `blur(${blur}px)`,
                          zIndex,
                          transformStyle: "preserve-3d",
                          backfaceVisibility: "hidden",
                          transition: dragging
                            ? "none"
                            : "transform 520ms cubic-bezier(0.2, 0.9, 0.2, 1), opacity 520ms cubic-bezier(0.2, 0.9, 0.2, 1), filter 520ms cubic-bezier(0.2, 0.9, 0.2, 1)",
                        }}
                      >
                        <div className="photo-frame relative h-full w-full overflow-hidden">
                          <img
                            src={it.src}
                            alt=""
                            draggable={false}
                            className="h-full w-full object-cover"
                            loading={off === 0 ? "eager" : "lazy"}
                          />
                          <div
                            aria-hidden
                            className="absolute inset-0"
                            style={{
                              background: `linear-gradient(${offFx < 0 ? 90 : 270}deg, rgba(0,0,0,${shade}), transparent 52%)`,
                              opacity: abs === 0 ? 0 : 1,
                              mixBlendMode: "multiply",
                            }}
                          />
                        </div>
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    aria-label="Voltar"
                    onClick={prev}
                    className="absolute inset-y-0 left-0 w-1/3"
                  />
                  <button
                    type="button"
                    aria-label="Próxima"
                    onClick={next}
                    className="absolute inset-y-0 right-0 w-1/3"
                  />
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-[2.4rem] ring-1 ring-pink-300/40" />
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <button type="button" onClick={prev} aria-label="Voltar" className="btn-love-ghost h-10 w-10 p-0">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-2 overflow-x-auto py-1">
                  {items.map((it, i) => (
                    <button
                      key={it.id}
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={`Foto ${i + 1}`}
                      className={cn(
                        "relative h-10 w-10 shrink-0 overflow-hidden rounded-2xl border bg-white shadow-[0_12px_40px_rgba(236,72,153,0.12)] transition",
                        i === index ? "border-pink-300 ring-2 ring-pink-300/40" : "border-pink-200/70",
                      )}
                    >
                      <img src={it.src} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
                <button type="button" onClick={next} aria-label="Próxima" className="btn-love-primary h-10 w-10 p-0">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        {open ? (
          <div
            className="relative overflow-hidden rounded-3xl"
            onPointerDown={onModalPointerDown}
            onPointerMove={onModalPointerMove}
            onPointerUp={onModalPointerUp(prevModal, nextModal)}
            onPointerCancel={onModalPointerCancel}
            style={{ touchAction: "pan-y" }}
          >
            <div
              className="photo-frame overflow-hidden"
              style={{
                transform: `translate3d(${modalDragDx}px, 0, 0)`,
                transition: modalDragRef.current?.moved ? "none" : "transform 320ms cubic-bezier(0.2, 0.9, 0.2, 1)",
              }}
            >
              <img src={items[mod(modalIndex)]?.src ?? ""} alt="" className="h-auto w-full select-none" draggable={false} />
            </div>
            <button
              type="button"
              aria-label="Voltar"
              onClick={() => {
                if (preventModalTapRef.current) return;
                prevModal();
              }}
              className="absolute inset-y-0 left-0 w-1/3"
            />
            <button
              type="button"
              aria-label="Próxima"
              onClick={() => {
                if (preventModalTapRef.current) return;
                nextModal();
              }}
              className="absolute inset-y-0 right-0 w-1/3"
            />
          </div>
        ) : null}
      </Dialog>
    </>
  );
}
