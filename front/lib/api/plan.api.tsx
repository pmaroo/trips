import { CreatePlan, PlanListById } from "@/types/plan";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/logic", // api 주소
  headers: { "content-Type": "application/json" },
  withCredentials: true, // ✅ 쿠키 포함 요청
});

export const apiPlanClient = axios.create({
  baseURL: "http://localhost:8080/api/plan", // api 주소
  headers: { "content-Type": "application/json" },
  withCredentials: true, // ✅ 쿠키 포함 요청
});

export const placeFind = async (planData: { keyword: string }) => {
  const { data } = await apiClient.post("/find/place", planData);
  return data;
};

export const planListById = async (
  planData: PlanListById,
): Promise<PlanListById> => {
  const { data } = await apiPlanClient.post<PlanListById>("/id", planData);
  return data;
};

export const createPlan = async (planData: CreatePlan): Promise<CreatePlan> => {
  const { data } = await apiClient.post<CreatePlan>("/find", planData);
  return data;
};
