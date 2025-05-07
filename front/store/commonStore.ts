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
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  clearAccessToken: () => void;
  refreshToken: string | null;
  setRefreshToken: (refreshToken: string) => void;
  clearRefreshToken: () => void;
}

export const useTokenState = create<TokenState>((set) => ({
  accessToken: null,
  setAccessToken: (accessToken) => set({ accessToken }),
  clearAccessToken: () => set({ accessToken: null }),
  refreshToken: null,
  setRefreshToken: (refreshToken) => set({ refreshToken }),
  clearRefreshToken: () => set({ refreshToken: null }),
}));
