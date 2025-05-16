import { UserDTO } from "./user";

export interface PlanDTO {
  id: number;
  UserId: number;
  CategoryId: number;
  region: string;
  schedule: string;
  date: string;
  User: UserDTO;
  Category: [];
  Place: [];
  traffic: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePlan {
  CategoryId?: number; // 카테고리
  region?: string; // 지역
  date?: string; // 날짜
  traffic?: string; // 교통수단
  stayPrice?: number; // 숙소가격
}
