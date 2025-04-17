import { CategoryDTO } from "./category";
import { PlaceDTO } from "./place";

export interface TagDTO {
  id: number;
  tag: string;
  Category: CategoryDTO[];
  Place: PlaceDTO[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTag {
  tag: string;
}

export interface UpdateTag {
  id: number;
  tag?: string;
}

export interface DeleteTag {
  id: number;
}
