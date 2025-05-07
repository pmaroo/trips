import { z } from "zod";

// TYPE
export interface TagDTO {
  id: number;
  tag: string;
  // Category: CategoryDTO[];
  // Place: PlaceDTO[];
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

// SCHEMA
export const tagDTOSchema = z.object({
  id: z.number(),
  tag: z.string().min(1, "태그명은 필수입니다."),
  createdAt: z.date(),
});

export const createTagSchema = z.object({
  tag: z.string().min(1, "태그명은 필수입니다."),
});

export const updateTagSchema = z.object({
  id: z.string(),
  tag: z.string().min(1, "태그명은 필수입니다."),
});
