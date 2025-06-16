"use client";

import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

import { toast } from "sonner";
import { imageUpload, latlongAPI } from "@lib/api/common.api";
import { useImageState, useLatLongState } from "@store/commonStore";
import { useFindPlaceStore, useResultPlan } from "@store/planStore";
import {
  createPlan,
  placeFind,
  planListById,
  updatePlan,
} from "@lib/api/plan.api";
import { CreatePlan, PlanListById } from "@/types/plan";
import { useRouter } from "next/navigation";

// 일정 수정하기
export const useUpdatePlan = (onSuccessCallback: () => void) => {
  const resultPlan = useResultPlan((state) => state);

  return useMutation({
    mutationFn: (planData: any) => updatePlan(planData),
    onSuccess: async (data) => {
      resultPlan.setPlan(data);
      toast("일정이 수정되었습니다.");
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      toast(error?.response.data.message);
    },
  });
};

// 장소 검색하기
export const useFindPlace = (onSuccessCallback: () => void) => {
  const findPlaceStore = useFindPlaceStore((state) => state);
  return useMutation({
    mutationFn: (planData: { keyword: string }) => placeFind(planData),
    onSuccess: async (data) => {
      findPlaceStore.setPlace(data);
      toast("검색 완료");
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      toast(error?.response.data.message);
    },
  });
};

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
