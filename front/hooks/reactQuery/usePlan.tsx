"use client";

import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

import { toast } from "sonner";
import { imageUpload, latlongAPI } from "@lib/api/common.api";
import { useImageState, useLatLongState } from "@store/commonStore";
import { useResultPlan } from "@store/planStore";
import { createPlan } from "@lib/api/logic.api";
import { CreatePlan } from "@/types/plan";

// 카테고리 삭제하기
export const useCreatePlan = (onSuccessCallback: () => void) => {
  const resultPlan = useResultPlan((state) => state);

  return useMutation({
    mutationFn: (planData: CreatePlan) => createPlan(planData),
    onSuccess: async (data) => {
      resultPlan.setPlan(data);
      toast("완성");
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      toast(error?.response.data.message);
    },
  });
};
