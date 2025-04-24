import { z } from "zod";

export interface UserDTO {
  id: number;
  email: string;
  userName: string;
  nickName: string;
  type: string;
  // Plan: PlanDTO[];
  isAdmin: string;
  isDelete: boolean;
  reason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TestUser {
  id: number;
  name: string;
  email: string;
}

export const userSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "이름은 필수입니다."),
  email: z
    .string()
    .min(1, "이메일은 필수입니다.")
    .email("올바른 이메일 형식이 아닙니다."),
});

export const userDTOSchema = z.object({
  id: z.number(),
  email: z
    .string()
    .min(1, "이메일은 필수입니다.")
    .email("올바른 이메일 형식이 아닙니다."),
  userName: z.string().min(1, "이름은 필수입니다."),
  nickName: z.string().min(1, "닉네임은 필수입니다."),
  type: z.string(),
  createdAt: z.string(),
  isDelete: z.boolean(),
  reason: z.string().min(1, "탈퇴 이유를 작성해주세요."),
});
