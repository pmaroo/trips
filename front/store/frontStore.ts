import { CreatePlan } from "@/types/plan";
import { create } from "zustand";

interface StepState {
  step: number;
  setStep: (step: number) => void;
  clearStep: () => void;
}

export const useStepStore = create<StepState>((set) => ({
  step: 0,
  setStep: (step) => set({ step }),
  clearStep: () => set({ step: 0 }),
}));

interface CreatePlanState {
  plan: CreatePlan | null;
  setPlan: (plan: CreatePlan) => void;
  clearPlan: () => void;
}

export const useCreatePlanStore = create<CreatePlanState>((set) => ({
  plan: null,
  setPlan: (plan) => set({ plan }),
  clearPlan: () => set({ plan: null }),
}));
