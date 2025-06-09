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

interface ResultPlanState {
  plan: any;
  setPlan: (plan: any) => void;
  clearPlan: () => void;
}

export const useResultPlan = create<ResultPlanState>((set) => ({
  plan: null,
  setPlan: (plan) => set({ plan }),
  clearPlan: () => set({ plan: null }),
}));

interface FindPlaceState {
  place: any;
  setPlace: (place: any) => void;
  clearPlace: () => void;
}

export const useFindPlaceStore = create<FindPlaceState>((set) => ({
  place: null,
  setPlace: (place) => set({ place }),
  clearPlace: () => set({ place: null }),
}));
