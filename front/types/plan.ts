import { z } from "zod";
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

export interface DayPlace {
  name: string; // 장소 이름
  address: string; // 주소
  lat: number; // 위도
  lng: number; // 경도
  distance: number; // 도보 거리 (미터 단위)
  duration: number; // 소요 시간 (초 단위)
  number: string; // 전화번호
  icon: string; // 아이콘 이미지 (기본 아이콘)
  iconUrl: string; // 아이콘 이미지 (핀 모양)
  iconBgColor: string; // 아이콘 배경색
  photos: string; // base64로 인코딩된 대표 이미지
  placeId: string;
  rating: number;
  reviews: [];
  servesBeer: boolean;
  servesBrunch: boolean;
  servesDinner: boolean;
  servesLunch: boolean;
  servesWine: boolean;
  takeout: boolean;
  url: string;
  userRatingsTotal: number;
  vicinity: string;
  types?: string;
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

export const keywordSchema = z.object({
  keyword: z.string().min(1, "검색어는 필수입니다."),
});
