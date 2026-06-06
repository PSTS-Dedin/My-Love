import { ArrowDown, Sparkles } from "lucide-react";
import BowCorners from "@/components/BowCorners";
import Reveal from "@/components/Reveal";
import { loveProfile } from "@/data/loveContent";

export default function Hero() {
  return (
    <header id="topo" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute -left-24 top-[-140px] h-[420px] w-[420px] rounded-full bg-pink-300/55 blur-3xl" />
        <div className="absolute -right-16 top-16 h-[520px] w-[520px] rounded-full bg-violet-300/45 blur-3xl" />
        <div className="absolute bottom-[-220px] left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-orange-200/30 blur-3xl" />
      </div>
      <BowCorners className="opacity-80" />

      <div className="relative">
        <div className="container px-4">
          <div className="mx-auto flex min-h-[82vh] max-w-5xl flex-col justify-center py-20 sm:py-28">
            <Reveal>
              <div className="sticker-love self-start">
                <Sparkles className="h-4 w-4 text-pink-500" />
                <span>
                  feito com carinho <span className="font-love text-base leading-none text-pink-500">pra Marcela</span>
                </span>
              </div>
            </Reveal>

            <Reveal delayMs={80}>
              <h1 className="mt-8 font-display text-5xl leading-[0.95] tracking-[-0.02em] text-zinc-950 sm:text-7xl">
                {loveProfile.headline}
              </h1>
            </Reveal>

            <Reveal delayMs={140}>
              <p className="mt-6 max-w-2xl text-base text-zinc-900/70 sm:text-lg">
                {loveProfile.subheadline}
              </p>
            </Reveal>

            <Reveal delayMs={200}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href="#carta"
                  className="btn-love-primary"
                >
                  Começar
                </a>
                <div className="text-sm text-zinc-200/70">
                  <span className="text-zinc-950">De:</span> {loveProfile.fromName}
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </div>
    </header>
  );
}
