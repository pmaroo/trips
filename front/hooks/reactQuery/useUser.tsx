"use client";

import {
  adminLoginUser,
  adminUserList,
  createAdminUser,
  exitUser,
  getUser,
  loginUser,
  logoutUser,
  updateUser,
} from "@lib/api/user.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateUser,
  ExitUser,
  JwtUserDTO,
  LoginUser,
  LogoutUser,
  UpdateUser,
  UserDTO,
} from "../../types/user";
import { toast } from "sonner";
import { useMeState } from "@store/commonStore";

// useQuery : R 정보를 불러올때 (자동실행) 캐시초기화/갱신할때
// useMutation : CUD 정보를 보낼때 (수동실행)

// 회원리스트 가져오기
export const useAdminUser = (isAdmin: boolean) => {
  return useQuery<UserDTO[]>({
    queryKey: ["adminUser", isAdmin],
    queryFn: () => adminUserList(isAdmin),
  });
};

// 회원가입
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

// 회원수정
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

// 회원탈퇴
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

// 회원로그인
export const useLogin = (onSuccessCallback: () => void) => {
  const meStore = useMeState((state) => state);

  return useMutation({
    mutationFn: (userData: CreateUser) => loginUser(userData),
    // Mutation 성공후 리렌더링 필요없이 백그라운드에서 데이터를 다시 가져옴
    onSuccess: async (data: UserDTO) => {
      
      const jwtData: JwtUserDTO = {
        id: data.id,
        email: data.email,
        userName: data.userName,
        nickName: data.nickName,
        isAdmin: data.isAdmin,
      };

      meStore.setMe(jwtData);

      onSuccessCallback?.();
    },
    onError: (error: any) => {
      toast(error?.response.data.message);
    },
  });
};

// 관리자계정로그인
export const useAdminLoginUser = (onSuccessCallback: () => void) => {
  const meStore = useMeState((state) => state);

  return useMutation({
    mutationFn: (userData: LoginUser) => adminLoginUser(userData),
    // Mutation 성공후 리렌더링 필요없이 백그라운드에서 데이터를 다시 가져옴
    onSuccess: async (data: UserDTO) => {
      const jwtData: JwtUserDTO = {
        id: data.id,
        email: data.email,
        userName: data.userName,
        nickName: data.nickName,
        isAdmin: data.isAdmin,
      };

      meStore.setMe(jwtData);

      onSuccessCallback?.();
    },
    onError: (error: any) => {
      toast(error?.response.data.message);
    },
  });
};

// 로그아웃
export const useLogoutUser = (onSuccessCallback: () => void) => {
  return useMutation({
    mutationFn: (userData: LogoutUser) => logoutUser(userData),
    // Mutation 성공후 리렌더링 필요없이 백그라운드에서 데이터를 다시 가져옴
    onSuccess: async () => {
      toast("로그아웃 되었습니다.");
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      toast(error?.response.data.message);
    },
  });
};

// 회원정보 가져오기
export const useLoginUser = (id: string) => {
  return useQuery<UserDTO>({
    queryKey: ["getUser", id],
    queryFn: () => getUser(id),
  });
};
