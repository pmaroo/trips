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

export interface CreatePlan {
  UserId: number;
  CategoryId: number;
  region: string;
  schedule: string;
  date: Date;
  traffic: string;
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
