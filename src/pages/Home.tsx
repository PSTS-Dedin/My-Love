import Hero from "@/components/Hero";
import KawaiiField from "@/components/KawaiiField";
import LetterBlock from "@/components/LetterBlock";
import Playlist from "@/components/Playlist";
import PhotoMosaicBg from "@/components/PhotoMosaicBg";
import PhotoRoulette from "@/components/PhotoRoulette";
import Section from "@/components/Section";
import Surprise from "@/components/Surprise";
import Timeline from "@/components/Timeline";
import TopNav from "@/components/TopNav";

export default function Home() {
  return (
    <div className="relative">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="kawaii-bg absolute inset-0" />
        <PhotoMosaicBg className="opacity-100" />
        <div className="kawaii-dots absolute inset-0 opacity-40" />
        <div className="noise absolute inset-0 opacity-[0.08]" />
        <KawaiiField />
      </div>

      <TopNav />
      <Hero />

      <main>
        <Section id="carta" eyebrow="Começa aqui" title="Uma carta que eu quis deixar no mundo">
          <LetterBlock />
        </Section>

        <Section id="timeline" eyebrow="A nossa história" title="Linha do tempo (do jeito que eu lembro)">
          <Timeline />
        </Section>

        <Section id="galeria" eyebrow="Memórias" title="Galeria de pequenos universos">
          <PhotoRoulette />
        </Section>

        <Section id="playlist" eyebrow="Trilha sonora" title="Playlist pra quando você quiser voltar aqui">
          <Playlist />
        </Section>

        <Section id="surpresa" eyebrow="Agora" title="Última página (a melhor)">
          <Surprise />
        </Section>
      </main>
      <footer className="border-t border-pink-200/70 py-14">
        <div className="container px-4">
          <div className="mx-auto max-w-5xl text-center">
            <div className="font-love text-lg text-pink-500">Gustavo ♡ Marcela</div>
            <div className="mt-2 text-xs font-bold text-zinc-950/55">feito com amor</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
