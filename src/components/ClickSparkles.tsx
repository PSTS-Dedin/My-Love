import { useEffect, useRef, useState } from "react";

type Sparkle = {
  id: string;
  x: number;
  y: number;
  size: number;
  rot: number;
  hue: number;
  delayMs: number;
  kind: "star" | "heart";
};

const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;

export default function ClickSparkles() {
  const [items, setItems] = useState<Sparkle[]>([]);
  const timers = useRef<number[]>([]);
  const reduceRef = useRef(false);
  const lastHoverRef = useRef(0);

  useEffect(() => {
    return () => {
      for (const t of timers.current) window.clearTimeout(t);
      timers.current = [];
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceRef.current = mq.matches;
    const onMq = (e: MediaQueryListEvent) => {
      reduceRef.current = e.matches;
    };
    mq.addEventListener("change", onMq);

    const spawn = (baseX: number, baseY: number, count: number, kind?: Sparkle["kind"]) => {
      if (reduceRef.current) return;
      const batch: Sparkle[] = Array.from({ length: count }).map((_, idx) => {
        const angle = (idx / count) * Math.PI * 2;
        const radius = 8 + (idx % 3) * 6;
        const x = baseX + Math.cos(angle) * radius;
        const y = baseY + Math.sin(angle) * radius;
        const size = 8 + (idx % 4) * 3;
        const rot = Math.floor(Math.random() * 180);
        const hue = 310 + ((idx * 17) % 70);
        const delayMs = (idx % 4) * 18;
        const k: Sparkle["kind"] = kind ?? (idx % 2 === 0 ? "heart" : "star");
        return { id: uid(), x, y, size, rot, hue, delayMs, kind: k };
      });

      setItems((prev) => [...prev, ...batch]);
      const removeIds = batch.map((b) => b.id);
      const t = window.setTimeout(() => {
        setItems((prev) => prev.filter((p) => !removeIds.includes(p.id)));
      }, 820);
      timers.current.push(t);
    };

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest?.("input[type='range']")) return;
      spawn(e.clientX, e.clientY, 8);
    };

    const onPointerOver = (e: PointerEvent) => {
      const now = Date.now();
      if (now - lastHoverRef.current < 220) return;
      const el = (e.target as HTMLElement | null)?.closest?.("button, a");
      if (!el) return;
      if (!(el.classList.contains("btn-love-primary") || el.classList.contains("btn-love-ghost"))) return;
      lastHoverRef.current = now;
      const r = el.getBoundingClientRect();
      spawn(r.left + r.width * 0.65, r.top + r.height * 0.35, 4, "star");
      spawn(r.left + r.width * 0.35, r.top + r.height * 0.55, 3, "heart");
    };

    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerover", onPointerOver, { passive: true });
    return () => {
      mq.removeEventListener("change", onMq);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerover", onPointerOver);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60]">
      {items.map((s) => (
        <span
          key={s.id}
          className="click-sparkle"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            transform: `translate(-50%, -50%) rotate(${s.rot}deg)`,
            ["--sparkle-c1" as any]: `hsl(${s.hue} 94% 70%)`,
            ["--sparkle-c2" as any]: `hsl(${(s.hue + 38) % 360} 98% 92%)`,
            animationDelay: `${s.delayMs}ms`,
          }}
        >
          <span className={`click-sparkle__shape ${s.kind === "heart" ? "click-sparkle__heart" : "click-sparkle__star"}`} />
        </span>
      ))}
    </div>
  );
}
