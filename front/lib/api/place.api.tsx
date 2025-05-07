import { CreatePlace, DeletePlace, UpdatePlace } from "@/types/place";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/place", // api 주소
  headers: { "content-Type": "application/json" },
  withCredentials: true, // ✅ 쿠키 포함 요청
});

export const placeList = async () => {
  const { data } = await apiClient.post("/");
  return data;
};

export const createPlace = async (
  placeData: CreatePlace,
): Promise<CreatePlace> => {
  const { data } = await apiClient.post<CreatePlace>("/create", { placeData });
  return data;
};

export const updatePlace = async (
  placeData: UpdatePlace,
): Promise<UpdatePlace> => {
  const { data } = await apiClient.post<UpdatePlace>("/update", { placeData });
  return data;
};

export const deletePlace = async (
  placeData: DeletePlace,
): Promise<DeletePlace> => {
  const { data } = await apiClient.post<DeletePlace>("/delete", placeData);
  return data;
};
