"use client";

import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

import { toast } from "sonner";
import {
  CreatePlace,
  CreatePlaceTag,
  DeletePlace,
  PlaceDTO,
  UpdatePlace,
} from "@/types/place";
import {
  createPlace,
  createPlaceTag,
  deletePlace,
  placeList,
  updatePlace,
} from "@lib/api/place.api";

// 장소 태그 추가하기
export const useCreatePlaceTag = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (placeData: CreatePlaceTag) => createPlaceTag(placeData),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["placeList"] });
      toast("태그를 추가했습니다.");
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      toast(error?.response.data.message);
    },
  });
};

// 장소 삭제하기
export const useDeletePlace = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (placeData: DeletePlace) => deletePlace(placeData),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["placeList"] });
      toast("카테고리를 삭제했습니다.");
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      toast(error?.response.data.message);
    },
  });
};

// 장소 수정하기
export const useUpdatePlace = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (placeData: UpdatePlace) => updatePlace(placeData),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["placeList"] });
      toast("카테고리를 수정했습니다.");
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      toast(error?.response.data.message);
    },
  });
};

// 장소 만들기
export const useCreatePlace = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (placeData: CreatePlace) => createPlace(placeData),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["placeList"] });
      toast("카테고리를 생성했습니다.");
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      toast(error?.response.data.message);
    },
  });
};

// 장소 가져오기
export const usePlaceList = () => {
  return useQuery<PlaceDTO[]>({
    queryKey: ["placeList"],
    queryFn: () => placeList(),
  });
};
