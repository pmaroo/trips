import { CreatePlan } from "@/types/plan";
import { create } from "zustand";

interface PlanState {
  plan: CreatePlan | null;
  setPlan: (plan: CreatePlan) => void;
  clearPlan: () => void;
}

export const usePlanStore = create<PlanState>((set) => ({
  plan: null,
  setPlan: (newPlan) =>
    set((state) => {
      return { plan: { ...state.plan, ...newPlan } };
    }),
  clearPlan: () => set({ plan: null }),
}));
