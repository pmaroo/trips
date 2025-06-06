import { CategoryDTO } from "./category";
import { PlaceDTO } from "./place";
import { UserDTO } from "./user";

export interface PlanDTO {
  id: number;
  UserId: number;
  CategoryId: number;
  region: string;
  schedule: string;
  date: Date;
  User: UserDTO;
  Category: CategoryDTO;
  Place: PlaceDTO[];
  traffic: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Location {
  name: string;
  lat: number;
  lng: number;
}

export interface SimpleDate {
  year: string;
  month: string;
  day: string;
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
}

export interface CreatePlan {
  id?: number;
  UserId: number;
  CategoryId: number;
  category: string;
  destination: Location;
  start: Location;
  date: SimpleDate[]; // 날짜 정보 배열
  days: DayPlace[][]; // 각 날짜별 장소 배열
  traffic: string; // 예: '차량', '도보'
  originDate: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UpdatePlan {
  id: number;
  UserId: number;
  CategoryId: number;
  region: string;
  schedule: string;
  date: Date;
  traffic: string;
}

export interface DeletePlan {
  id: number;
}
