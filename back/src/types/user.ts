// DTO(Data Transfer Object)
// API별로 나누는 이유

import { PlanDTO } from "./plan";

// 명확성과 어떤 항목이 필수인지 확인 가능
export interface UserDTO {
  id: number;
  email: string;
  password: string;
  userName: string;
  nickName: string;
  type: string;
  Plan: PlanDTO[];
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUser {
  email: string;
  password: string;
  userName: string;
  nickName: string;
  isAdmin: boolean;
  type: string;
}

export interface UpdateUser {
  id: number;
  email?: string;
  password?: string;
  userName?: string;
  nickName?: string;
}

export interface JwtUserDTO {
  email: string;
  userName: string;
  nickNmae: string;
  isAdmin: boolean;
}

export interface ExitUser {
  id: number;
  isDelete: boolean;
  reason: string;
}
