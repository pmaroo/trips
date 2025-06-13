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
  datetime?: string;
  status: number;
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
