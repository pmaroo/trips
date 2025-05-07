import { z } from "zod";

// TYPE
export interface PlaceDTO {
  id: number;
  name: string;
  address: string;
  detailAddress: string;
  postcode: string;
  lat: number;
  lng: number;
  descript: string;
  image?: string;
  source: string;
  //   Tag: TagDTO[];
  //   Plan: PlanDTO[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePlace {
  name: string;
  address: string;
  detailAddress: string;
  postcode: string;
  lat: number;
  lng: number;
  descript: string;
  image?: string;
  source: string;
}

export interface UpdatePlace {
  id: number;
  name: string;
  address: string;
  detailAddress: string;
  postcode: string;
  lat: number;
  lng: number;
  descript: string;
  image?: string;
  source: string;
}

export interface DeletePlace {
  id: number;
}

// SCHEMA
export const placeDTOSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "이름은 필수입니다."),
  address: z.string().min(1, "주소는 필수입니다."),
  detailAddress: z.string(),
  postcode: z.string().min(1, "우편번호는 필수입니다."),
  lat: z.number(),
  lng: z.number(),
  descript: z.string().min(1, "내용은 필수입니다."),
  image: z.string(),
  source: z.string(),
  createdAt: z.date(),
});

export const createPlaceSchema = z.object({
  name: z.string().min(1, "이름은 필수입니다."),
  address: z.string().min(1, "주소는 필수입니다."),
  detailAddress: z.string(),
  postcode: z.string().min(1, "우편번호는 필수입니다."),
  lat: z.number(),
  lng: z.number(),
  descript: z.string().min(1, "내용은 필수입니다."),
  image: z.string(),
  source: z.string(),
});

export const updatePlaceSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "이름은 필수입니다."),
  address: z.string().min(1, "주소는 필수입니다."),
  detailAddress: z.string(),
  postcode: z.string().min(1, "우편번호는 필수입니다."),
  lat: z.number(),
  lng: z.number(),
  descript: z.string().min(1, "내용은 필수입니다."),
  image: z.string(),
  source: z.string(),
});
