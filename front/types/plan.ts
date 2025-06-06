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

export interface Coordinate {
  lat: number;
  lng: number;
  name: string;
}

export interface CreatePlan {
  id?: number;
  CategoryId?: number; // 카테고리
  category?: string;
  destination?: Coordinate; // 지역
  date?: PlanDateType[]; // 날짜
  traffic?: string; // 교통수단
  budget?: number; // 숙소가격
  start?: Coordinate; // 출발주소
}

export interface PlanListById {
  id: number;
}
