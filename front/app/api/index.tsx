import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://~~~~~/api", // api 주소
  headers: { "content-Type": "application/json" },
});

export const fetchAttractions = async (): Promise<[]> => {
  const { data } = await apiClient.get<[]>(`/`);

  return data;
};
