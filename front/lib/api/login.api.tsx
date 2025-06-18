import { NaverTokenDTO } from "@/types/login";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/auth", // api 주소
  headers: { "content-Type": "application/json" },
  withCredentials: true,
});

export const naverLoginAPI = async (tokenData: NaverTokenDTO) => {
  const { data } = await apiClient.post("/naver", tokenData);
  return data;
};
