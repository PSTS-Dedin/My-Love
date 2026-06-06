import { useMemo } from "react";

type FloatSpec = {
  leftPct: number;
  size: number;
  durationMs: number;
  delayMs: number;
  opacity: number;
  kind: "heart" | "star";
};

const makeItems = (count: number) => {
  const out: FloatSpec[] = [];
  for (let i = 0; i < count; i += 1) {
    const leftPct = (i * 73) % 100;
    const size = 10 + ((i * 9) % 18);
    const durationMs = 8500 + ((i * 900) % 8500);
    const delayMs = ((i * 650) % 5200) - 3800;
    const opacity = 0.18 + ((i * 11) % 20) / 100;
    const kind: FloatSpec["kind"] = i % 3 === 0 ? "star" : "heart";
    out.push({ leftPct, size, durationMs, delayMs, opacity, kind });
  }
  return out;
};

export default function KawaiiField() {
  const items = useMemo(() => makeItems(20), []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((it, idx) => (
        <span
          key={idx}
          className="kawaii-float"
          style={{
            left: `${it.leftPct}%`,
            width: `${it.size}px`,
            height: `${it.size}px`,
            animationDuration: `${it.durationMs}ms`,
            animationDelay: `${it.delayMs}ms`,
            opacity: it.opacity,
          }}
        >
          <span className={it.kind === "heart" ? "kawaii-heart" : "kawaii-star"} />
        </span>
      ))}
    </div>
  );
}

