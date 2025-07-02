import { PlanDTO } from "./plan";
import { TagDTO, UpdateTag } from "./tag";

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
  Tag: TagDTO[];
  Plan: PlanDTO[];
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
}

export interface DeletePlace {
  id: string;
}

export interface UpdatePlaceTag {
  id: number;
  name: string;
  Tag: { tag: string }[];
}

export interface FindPlaceDTO {
  address: string;
}
