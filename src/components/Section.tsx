import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
};

export default function Section({ id, eyebrow, title, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-28 py-16 sm:py-20", className)}>
      <div className="container px-4">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-3">
            {eyebrow ? (
              <div className="text-xs font-extrabold tracking-[0.26em] text-pink-700/80">{eyebrow}</div>
            ) : null}
            <h2 className="font-display text-3xl text-zinc-950 sm:text-4xl">{title}</h2>
          </div>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </section>
  );
}
