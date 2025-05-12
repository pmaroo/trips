import axios from "axios";
import ClientPage from "./clientPage";

export default async function Page() {
  let data = null;

  const apiClient = axios.create({
    baseURL: "http://localhost:8080/api", // api 주소
    headers: { "content-Type": "application/json" },
    withCredentials: true, // ✅ 쿠키 포함 요청
  });

  const placeList = async () => {
    const { data } = await apiClient.post("/place");
    return data;
  };

  const { placeData } = await placeList();

  data = {
    placeData,
  };

  return (
    <>
      <ClientPage data={data} />
    </>
  );
}
