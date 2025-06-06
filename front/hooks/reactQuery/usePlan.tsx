"use client";

import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

import { toast } from "sonner";
import { imageUpload, latlongAPI } from "@lib/api/common.api";
import { useImageState, useLatLongState } from "@store/commonStore";
import { useResultPlan } from "@store/planStore";
import { createPlan, planListById } from "@lib/api/plan.api";
import { CreatePlan, PlanListById } from "@/types/plan";
import { useRouter } from "next/navigation";

// 일정 검색하기
export const usePlanListById = (data: PlanListById) => {
  return useQuery<{}>({
    queryKey: ["planListById"],
    queryFn: () => planListById(data),
  });
};

// 일정 생성하기
export const useCreatePlan = (onSuccessCallback: () => void) => {
  const resultPlan = useResultPlan((state) => state);
  const router = useRouter();

  return useMutation({
    mutationFn: (planData: CreatePlan) => createPlan(planData),
    onSuccess: async (data) => {
      resultPlan.setPlan(data);
      // toast("완성");
      router.push(`/${data.id}`);
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      toast(error?.response.data.message);
    },
  });
};
