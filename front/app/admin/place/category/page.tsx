import axios from "axios";
import ClientPage from "./clientPage";

export default async function Page() {
  const apiClient = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/category`, // api 주소
    headers: { "content-Type": "application/json" },
    withCredentials: true, // ✅ 쿠키 포함 요청
  });

  const categoryList = async () => {
    const { data } = await apiClient.post("/");

    return data;
  };

  const data = await categoryList();

  return (
    <>
      <ClientPage data={data} />
    </>
  );
}
