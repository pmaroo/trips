import { GoogleTokenDTO, NaverTokenDTO } from "@/types/login";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/auth`, // api 주소
  headers: { "content-Type": "application/json" },
  withCredentials: true,
});

export const naverLoginAPI = async (tokenData: NaverTokenDTO) => {
  const { data } = await apiClient.post("/naver", tokenData);
  return data;
};

export const googleLoginAPI = async (tokenData: GoogleTokenDTO) => {
  const { data } = await apiClient.post("/google", { accessToken: tokenData });
  return data;
};
