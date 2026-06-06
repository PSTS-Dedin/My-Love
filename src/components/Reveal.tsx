import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  className?: string;
  children: React.ReactNode;
  delayMs?: number;
};

export default function Reveal({ className, children, delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  const style = useMemo<React.CSSProperties>(
    () => ({
      transitionDelay: `${delayMs}ms`,
    }),
    [delayMs],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.18, rootMargin: "60px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={style} className={cn("reveal", visible && "reveal--on", className)}>
      {children}
    </div>
  );
}

