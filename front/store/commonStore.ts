import { JwtUserDTO } from "../types/user";
import { create } from "zustand";

interface MeState {
  me: JwtUserDTO | null;
  setMe: (me: JwtUserDTO) => void;
  clearMe: () => void;
}

export const useMeState = create<MeState>((set) => ({
  me: null,
  setMe: (me) => set({ me }),
  clearMe: () => set({ me: null }),
}));

interface TokenState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const useTokenState = create<TokenState>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
  clearToken: () => set({ token: null }),
}));
