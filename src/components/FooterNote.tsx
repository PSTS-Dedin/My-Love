import { useMemo, useState } from "react";
import { Check, Trash2 } from "lucide-react";
import { loveProfile } from "@/data/loveContent";
import { useLoveStore } from "@/store/loveStore";

export default function FooterNote() {
  const guestNote = useLoveStore((s) => s.guestNote);
  const setGuestNote = useLoveStore((s) => s.setGuestNote);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const helper = useMemo(() => {
    if (!savedAt) return "Esse recado fica salvo só neste navegador.";
    return `Salvo às ${savedAt}.`;
  }, [savedAt]);

  return (
    <footer className="border-t border-pink-200/70 py-16">
      <div className="container px-4">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 rounded-3xl border border-pink-200/70 bg-white/75 p-6 backdrop-blur-sm sm:p-10">
            <div className="grid gap-2">
              <div className="font-display text-2xl text-zinc-950">Deixa um recado pra mim</div>
              <div className="text-sm font-bold text-zinc-950/65">{helper}</div>
            </div>

            <textarea
              value={guestNote}
              onChange={(e) => setGuestNote(e.target.value)}
              rows={4}
              placeholder="Escreve aqui…"
              className="w-full resize-none rounded-2xl border border-pink-200/70 bg-white/80 p-4 text-sm text-zinc-900 placeholder:text-zinc-500/50 outline-none ring-0 transition focus:border-pink-300 focus:bg-white"
            />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs font-bold text-zinc-950/60">
                {loveProfile.fromName} • feito com amor
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSavedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
                  }}
                  className="btn-love-primary px-5 py-2.5 text-xs"
                >
                  <Check className="h-4 w-4" />
                  salvar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setGuestNote("");
                    setSavedAt(null);
                  }}
                  className="btn-love-ghost"
                >
                  <Trash2 className="h-4 w-4" />
                  limpar
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center text-xs font-bold text-zinc-900/35">
            © {new Date().getFullYear()} • Para {loveProfile.forName}
          </div>
        </div>
      </div>
    </footer>
  );
}
