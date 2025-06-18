import { create } from "zustand";

interface KakaoState {
  profile: string | null;
  setProfile: (profile: string) => void;
  clearProfile: () => void;
}

export const useKakaoStore = create<KakaoState>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  clearProfile: () => set({ profile: null }),
}));

////////////////////////////////////////////////////////
