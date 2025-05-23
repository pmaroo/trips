import { CreatePlan } from "@/types/plan";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/logic", // api 주소
  headers: { "content-Type": "application/json" },
  withCredentials: true, // ✅ 쿠키 포함 요청
});

export const createPlan = async (planData: CreatePlan): Promise<CreatePlan> => {
  console.log(planData);
  const { data } = await apiClient.post<CreatePlan>("/find", planData);
  return data;
};
