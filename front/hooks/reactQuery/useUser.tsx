"use client";

import {
  adminLoginUser,
  adminUserList,
  createAdminUser,
  exitUser,
  updateUser,
} from "@lib/api/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateUser,
  ExitUser,
  LoginUser,
  UpdateUser,
  UserDTO,
} from "../../types/user";
import { toast } from "sonner";
import { useJwtStore } from "@store/jwtStore";

// useQuery : R 정보를 불러올때 (자동실행) 캐시초기화/갱신할때
// useMutation : CUD 정보를 보낼때 (수동실행)

export const useAdminUser = (isAdmin: boolean) => {
  return useQuery<UserDTO[]>({
    queryKey: ["adminUser", true],
    queryFn: () => adminUserList(isAdmin),
  });
};

export const useCreateUser = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: CreateUser) => createAdminUser(userData),
    // Mutation 성공후 리렌더링 필요없이 백그라운드에서 데이터를 다시 가져옴
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["adminUser"] });
      toast("회원가입을 완료했습니다.");
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      toast(error?.response.data.message);
    },
  });
};

export const useUpdateUser = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: UpdateUser) => updateUser(userData),
    // Mutation 성공후 리렌더링 필요없이 백그라운드에서 데이터를 다시 가져옴
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["adminUser"] });
      toast("회원정보를 수정했습니다.");
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      toast(error?.response.data.message);
    },
  });
};

export const useExitUser = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: ExitUser) => exitUser(userData),
    // Mutation 성공후 리렌더링 필요없이 백그라운드에서 데이터를 다시 가져옴
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["adminUser"] });
      toast("회원을 탈퇴시켰습니다.");
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      toast(error?.response.data.message);
    },
  });
};

export const useAdminLoginUser = (onSuccessCallback: () => void) => {
  const jwtStore = useJwtStore((state) => state);

  return useMutation({
    mutationFn: (userData: LoginUser) => adminLoginUser(userData),
    // Mutation 성공후 리렌더링 필요없이 백그라운드에서 데이터를 다시 가져옴
    onSuccess: async (data: string) => {
      jwtStore.setJwt(true);

      onSuccessCallback?.();
    },
    onError: (error: any) => {
      toast(error?.response.data.message);
    },
  });
};
