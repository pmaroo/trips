"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  createUserSchema,
  exitUserSchema,
  loginUserSchema,
  updateUserSchema,
  userDTOSchema,
} from "../../types/user";

type userDTOType = z.infer<typeof userDTOSchema>;
type createUserType = z.infer<typeof createUserSchema>;
type exitUserType = z.infer<typeof exitUserSchema>;
type loginUserType = z.infer<typeof loginUserSchema>;

export function useCreateUserForm() {
  return useForm<createUserType>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: "",
      password: "",
      userName: "",
      nickName: "",
      isAdmin: true,
      type: "관리자회원가입",
    },
  });
}

export function useUserDTOForm() {
  return useForm<userDTOType>({
    resolver: zodResolver(userDTOSchema),
  });
}

export function useUpdateUserForm() {
  return useForm<userDTOType>({
    resolver: zodResolver(updateUserSchema),
  });
}

export function useExitUserForm() {
  return useForm<exitUserType>({
    resolver: zodResolver(exitUserSchema),
    defaultValues: {
      reason: "", // 기본값을 빈 문자열로 설정
      userName: "",
      createdAt: new Date(),
      isDelete: false,
      id: 0,
    },
  });
}

export function useLoginUserForm() {
  return useForm<loginUserType>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
}
