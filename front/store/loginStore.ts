import { KakaoDTO } from "@/types/login";
import { create } from "zustand";

interface KakaoState {
  profile: KakaoDTO | null;
  setProfile: (profile: KakaoDTO) => void;
  clearProfile: () => void;
}

export const useKakaoStore = create<KakaoState>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  clearProfile: () => set({ profile: null }),
}));
