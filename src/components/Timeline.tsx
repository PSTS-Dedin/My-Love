import { Calendar } from "lucide-react";
import Reveal from "@/components/Reveal";
import { timeline } from "@/data/loveContent";
import { cn } from "@/lib/utils";

export default function Timeline() {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-pink-300/80 via-pink-300/30 to-transparent sm:block" />
      <div className="grid gap-6">
        {timeline.map((item, idx) => (
          <Reveal key={item.title} delayMs={idx * 90}>
            <div
              className={cn(
                "relative rounded-3xl border border-pink-200/70 bg-white/75 p-6 backdrop-blur-sm",
                "shadow-[0_24px_90px_rgba(236,72,153,0.16)]",
                "sm:pl-12",
              )}
            >
              <div className="absolute left-[-10px] top-8 hidden h-5 w-5 rounded-full border border-pink-200/70 bg-white sm:block">
                <div className="absolute inset-0 m-auto h-2 w-2 rounded-full bg-pink-500/70" />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-pink-200/80 bg-white/90 px-3 py-1 text-xs font-extrabold text-zinc-950/80">
                  <Calendar className="h-3.5 w-3.5 text-pink-500" />
                  {item.dateLabel}
                </div>
                <div className="font-display text-xl text-zinc-950">{item.title}</div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-950/75 sm:text-base">{item.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
