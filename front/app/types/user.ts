export interface UserDTO {
  id: number;
  email: string;
  userName: string;
  nickName: string;
  type: string;
  // Plan: PlanDTO[];
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}
