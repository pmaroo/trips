import {
  CategoryDTO,
  CreateCategory,
  DeleteCategory,
  UpdateCategory,
} from "../../types/category";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/category", // api 주소
  headers: { "content-Type": "application/json" },
  withCredentials: true, // ✅ 쿠키 포함 요청
});

export const createCategory = async (
  categoryData: CreateCategory,
): Promise<CreateCategory> => {
  const { data } = await apiClient.post<CreateCategory>("/create", {
    categoryData,
  });
  return data;
};

export const categoryList = async (): Promise<CategoryDTO> => {
  const { data } = await apiClient.post("/");
  return data;
};

export const updateCategory = async (
  categoryData: UpdateCategory,
): Promise<UpdateCategory> => {
  const { data } = await apiClient.post<UpdateCategory>("/update", {
    categoryData,
  });

  return data;
};

export const deleteCategory = async (categoryData: DeleteCategory) => {
  const { data } = await apiClient.post("/delete", categoryData);
  return data;
};
