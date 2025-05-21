import { PlanDTO } from "./plan";
import { z } from "zod";
import { TagDTO } from "./tag";

// TYPE
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

// SCHEMA
export const createCategorySchema = z.object({
  name: z.string().min(1, "카테고리명은 필수입니다."),
});

export const updateCategorySchema = z.object({
  id: z.string(),
  name: z.string().min(1, "카테고리명은 필수입니다."),
});

export const categoryDTOSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "카테고리명은 필수입니다."),
  createdAt: z.date(),
});
