import axios from "axios";
import ClientPage from "./clientPage";

export default async function Page() {
  const apiClient = axios.create({
    baseURL: "http://localhost:8080/api/place", // api 주소
    headers: { "content-Type": "application/json" },
    withCredentials: true, // ✅ 쿠키 포함 요청
  });

  const placeList = async () => {
    const { data } = await apiClient.post("/");
    return data;
  };

  const { data } = await placeList();

  return (
    <>
      <ClientPage data={data} />
    </>
  );
}
