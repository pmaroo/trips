import { UserDTO } from "./user";

export interface PlanDTO {
  id: string;
  UserId: string;
  CategoryId: string;
  region: string;
  schedule: string;
  date: string;
  User: UserDTO;
  Category: [];
  Place: [];
  traffic: string;
  createdAt: string;
  updatedAt: string;
}
