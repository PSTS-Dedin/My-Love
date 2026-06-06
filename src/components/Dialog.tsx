import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import BowCorners from "@/components/BowCorners";
import { cn } from "@/lib/utils";

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  className?: string;
  children: React.ReactNode;
};

export default function Dialog({ open, onOpenChange, title, className, children }: DialogProps) {
  const ref = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onClose = () => onOpenChange(false);
    const onCancel = (e: Event) => {
      e.preventDefault();
      onOpenChange(false);
      el.close();
    };

    el.addEventListener("close", onClose);
    el.addEventListener("cancel", onCancel);

    return () => {
      el.removeEventListener("close", onClose);
      el.removeEventListener("cancel", onCancel);
    };
  }, [onOpenChange]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (open) {
      if (!el.open) el.showModal();
      return;
    }

    if (el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClick={(e) => {
        if (e.target === e.currentTarget) onOpenChange(false);
      }}
      className={cn(
        "backdrop:bg-pink-500/20 backdrop:backdrop-blur-sm",
        "w-[min(720px,calc(100vw-24px))] rounded-3xl border border-pink-200/70 bg-white/85 p-0 text-zinc-900 shadow-[0_30px_120px_rgba(236,72,153,0.22)]",
      )}
    >
      <div className={cn("relative p-6 sm:p-8", className)}>
        <BowCorners className="opacity-70" />
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          aria-label="Fechar"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-pink-200/70 bg-white/80 text-zinc-900 transition hover:bg-white"
        >
          <X className="h-4 w-4" />
        </button>
        {title ? <div className="pr-10 font-display text-xl text-zinc-950">{title}</div> : null}
        <div className={cn(title ? "mt-4" : "")}>{children}</div>
      </div>
    </dialog>
  );
}
