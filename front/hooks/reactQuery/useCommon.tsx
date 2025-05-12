"use client";

import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

import { toast } from "sonner";
import { imageUpload, latlongAPI } from "@lib/api/common.api";
import { useImageState, useLatLongState } from "@store/commonStore";

// 카테고리 삭제하기
export const useImageUpload = (onSuccessCallback: () => void) => {
  const imageStore = useImageState((state) => state);

  return useMutation({
    mutationFn: (imageData: FormData) => imageUpload(imageData),
    onSuccess: async (data) => {
      imageStore.addImages(data.url);
      toast("이미지가 업로드되었습니다.");
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      toast(error?.response.data.message);
    },
  });
};

export const useLatLongAPI = (onSuccessCallback: () => void) => {
  const latLongstore = useLatLongState((state) => state);

  return useMutation({
    mutationFn: (address: string) => latlongAPI(address),
    onSuccess: async (data) => {
      latLongstore.setLatLong({
        lat: data.documents[0].address.x,
        long: data.documents[0].address.y,
      });
      console.log(data);
      toast("주소 및 위도 경도를 저장했습니다.");
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      toast(error?.response.data.message);
    },
  });
};
