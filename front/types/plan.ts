import { z } from "zod";
import { UserDTO } from "./user";

export interface PlanDTO {
  id?: number;
  UserId?: number;
  CategoryId?: number; // 카테고리
  category?: string;
  destination?: Coordinate; // 지역
  date?: PlanDateType[]; // 날짜
  traffic?: string; // 교통수단
  budget?: number; // 숙소가격
  start?: Coordinate; // 출발주소
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

export interface DayPlace {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string; // 중심좌표까지의 거리
  id: string; // 장소ID
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string; // 도로명주소
  x: string;
  y: string;
  startDistance?: number; // 출발지점에서 거리
  duration?: number;
  name?: string;
  collection?: string;
  thumbnail_url: string;
  image_url: string;
  width?: number;
  height?: number;
  display_stiename?: string;
  doc_url?: string;
  datetime?: Date;
}

export interface CreatePlan {
  id?: number;
  UserId?: number;
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

export const keywordSchema = z.object({
  keyword: z.string().min(1, "검색어는 필수입니다."),
});
