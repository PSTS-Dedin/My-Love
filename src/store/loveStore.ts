import { create } from "zustand";
import { persist } from "zustand/middleware";

type LoveState = {
  surpriseOpen: boolean;
  setSurpriseOpen: (open: boolean) => void;
  galleryOpenId: string | null;
  setGalleryOpenId: (id: string | null) => void;
  guestNote: string;
  setGuestNote: (value: string) => void;
};

export const useLoveStore = create<LoveState>()(
  persist(
    (set) => ({
      surpriseOpen: false,
      setSurpriseOpen: (open) => set({ surpriseOpen: open }),
      galleryOpenId: null,
      setGalleryOpenId: (id) => set({ galleryOpenId: id }),
      guestNote: "",
      setGuestNote: (value) => set({ guestNote: value }),
    }),
    {
      name: "love-site",
      partialize: (state) => ({ guestNote: state.guestNote }),
    },
  ),
);

