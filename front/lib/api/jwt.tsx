import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/auth", // api 주소
  headers: { "content-Type": "application/json" },
  withCredentials: true, // ✅ 쿠키 포함 요청
});

export const verify = async (token: string) => {
  const { data } = await apiClient.post("/verify", token);
  return data;
};
