import { cn } from "@/lib/utils";

type BowCornersProps = {
  className?: string;
};

function Bow({ className }: { className: string }) {
  return (
    <span className={cn("bow", className)}>
      <span className="bow-loop bow-loop--l" />
      <span className="bow-loop bow-loop--r" />
      <span className="bow-knot" />
    </span>
  );
}

export default function BowCorners({ className }: BowCornersProps) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      <Bow className="bow--tl" />
      <Bow className="bow--tr" />
      <Bow className="bow--bl" />
      <Bow className="bow--br" />
    </div>
  );
}

