import { create } from "zustand";

interface jwtState {
  isJwt: boolean | null;
  setJwt: (isJwt: boolean) => void;
  clearJwt: () => void;
}

export const useJwtStore = create<jwtState>((set) => ({
  isJwt: null,
  setJwt: (isJwt) => set({ isJwt }),
  clearJwt: () => set({ isJwt: null }),
}));
