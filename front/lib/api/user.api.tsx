import {
  CreateUser,
  ExitUser,
  LoginUser,
  LogoutUser,
  UpdateUser,
  UserDTO,
} from "../../types/user";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/user", // api 주소
  headers: { "content-Type": "application/json" },
  withCredentials: true,
});

export const createAdminUser = async (
  userData: CreateUser,
): Promise<CreateUser> => {
  const { data } = await apiClient.post<CreateUser>("/create", userData);
  return data;
};

export const adminUserList = async (isAdmin: boolean): Promise<UserDTO[]> => {
  const response = await apiClient.post<UserDTO>("/all", { isAdmin });
  return Array.isArray(response.data) ? response.data : [];
};

export const updateUser = async (userData: UpdateUser): Promise<UpdateUser> => {
  const { data } = await apiClient.post<UpdateUser>("/update", userData);
  return data;
};

export const exitUser = async (userData: ExitUser): Promise<ExitUser> => {
  const { data } = await apiClient.post<ExitUser>("/exit", userData);
  return data;
};

export const adminLoginUser = async (userData: LoginUser) => {
  const { data } = await apiClient.post("/adminLogin", userData);
  return data;
};

export const logoutUser = async (userData: LogoutUser) => {
  const { data } = await apiClient.post("/logout", userData);
  return data;
};
