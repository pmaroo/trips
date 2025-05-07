import { CreateTag, DeleteTag, UpdateTag } from "../../types/tag";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/tag", // api 주소
  headers: { "content-Type": "application/json" },
  withCredentials: true, // ✅ 쿠키 포함 요청
});

export const tagList = async () => {
  const { data } = await apiClient.post("/");
  return data;
};

export const createTag = async (tagData: CreateTag): Promise<CreateTag> => {
  const { data } = await apiClient.post<CreateTag>("/create", { tagData });
  return data;
};

export const updateTag = async (tagData: UpdateTag): Promise<UpdateTag> => {
  const { data } = await apiClient.post<UpdateTag>("/update", { tagData });
  return data;
};

export const deleteTag = async (tagData: DeleteTag): Promise<DeleteTag> => {
  const { data } = await apiClient.post<DeleteTag>("/delete", tagData);
  return data;
};
