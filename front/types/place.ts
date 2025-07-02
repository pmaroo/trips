import { z } from "zod";
import { TagDTO } from "./tag";

// TYPE
export interface PlaceDTO {
  id: number;
  name: string;
  address: string;
  detailAddress: string;
  postcode: string;
  lat: string;
  lng: string;
  descript: string;
  image?: string;
  Tag: TagDTO[];
  // Plan: PlanDTO[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePlace {
  name: string;
  address: string;
  detailAddress: string;
  postcode: string;
  lat: string;
  lng: string;
  descript: string;
  image?: string;
  Tag: { tag: string }[];
}

export interface UpdatePlace {
  id: number;
  name: string;
  address: string;
  detailAddress: string;
  postcode: string;
  lat: string;
  lng: string;
  descript: string;
  image?: string;
}

export interface DeletePlace {
  id: number;
}

export interface CreatePlaceTag {
  id: number;
  Tag: { tag: string }[];
}

export interface FindPlaceDTO {
  address: string;
}

// SCHEMA
export const placeDTOSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "이름은 필수입니다."),
  address: z.string().min(1, "주소는 필수입니다."),
  detailAddress: z.string(),
  postcode: z.string().min(1, "우편번호는 필수입니다."),
  lat: z.string(),
  lng: z.string(),
  descript: z.string().min(1, "내용은 필수입니다."),
  image: z.string(),
  createdAt: z.date(),
});

export const createPlaceSchema = z.object({
  name: z.string().min(1, "이름은 필수입니다."),
  address: z.string().min(1, "주소는 필수입니다."),
  detailAddress: z.string(),
  postcode: z.string().min(1, "우편번호는 필수입니다."),
  lat: z.string(),
  lng: z.string(),
});

export const updatePlaceSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "이름은 필수입니다."),
  address: z.string().min(1, "주소는 필수입니다."),
  detailAddress: z.string(),
  postcode: z.string().min(1, "우편번호는 필수입니다."),
  lat: z.string(),
  lng: z.string(),
  descript: z.string().min(1, "내용은 필수입니다."),
  image: z.string().optional(),
});

export const createPlaceTagSchema = z.object({
  id: z.string(),
});
