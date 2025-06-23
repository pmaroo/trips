"use client";

import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { googleLoginAPI, naverLoginAPI } from "@lib/api/login.api";
import { GoogleTokenDTO, NaverTokenDTO } from "@/types/login";
import { useMeState } from "@store/commonStore";

// 네이버 로그인
export const useNaverLoginQuery = (onSuccessCallback: () => void) => {
  const meStore = useMeState((state) => state);

  return useMutation({
    mutationFn: (tokenData: NaverTokenDTO) => naverLoginAPI(tokenData),
    onSuccess: async (data) => {
      meStore.setMe(data);
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      toast(error?.response.data.message);
    },
  });
};

// 구글 로그인
export const useGoogleLoginQuery = (onSuccessCallback: () => void) => {
  const meStore = useMeState((state) => state);

  return useMutation({
    mutationFn: (tokenData: GoogleTokenDTO) => googleLoginAPI(tokenData),
    onSuccess: async (data) => {
      meStore.setMe(data);
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      toast(error?.response.data.message);
    },
  });
};
