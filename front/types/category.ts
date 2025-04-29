import { PlanDTO } from "./plan";
import { z } from "zod";

// TYPE
export interface CategoryDTO {
  id: number;
  name: string;
  Tag: [];
  Plan: PlanDTO[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategory {
  name: string;
}

// SCHEMA
export const createCategorySchema = z.object({
  name: z.string().min(1, "카테고리명은 필수입니다."),
});
