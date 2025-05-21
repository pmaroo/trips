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

export interface PlanDateType {
  year: string;
  month: string;
  day: string;
}

export interface CreatePlan {
  CategoryId?: number; // 카테고리
  categoryName?: string;
  region?: string; // 지역
  date?: PlanDateType[]; // 날짜
  traffic?: string; // 교통수단
  stayPrice?: number; // 숙소가격
}
