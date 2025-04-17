import { PlanDTO } from "./plan";
import { TagDTO } from "./tag";

export interface CategoryDTO {
  id: number;
  name: string;
  Tag: TagDTO[];
  Plan: PlanDTO[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCategory {
  name: string;
}

export interface UpdateCategory {
  id: number;
  name?: string;
}

export interface DeleteCategory {
  id: number;
}
