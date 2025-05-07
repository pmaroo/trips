"use client";

import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

import { toast } from "sonner";
import { imageUpload } from "@lib/api/common.api";
import { useImageState } from "@store/commonStore";

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
