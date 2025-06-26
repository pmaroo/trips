import axios from "@node_modules/axios";
import ClientPage from "./clientPage";

export default async function Page() {
  const apiClient = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/plan`, // api 주소
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // ✅ 쿠키 포함 요청(서버컴포넌트에서 실상 필요X)
  });

  const planList = async () => {
    try {
      const { data } = await apiClient.post("/user");

      return data;
    } catch (error) {
      console.log(error.response.data.message || error);
    }
  };

  const plan = await planList();

  return (
    <>
      <ClientPage plan={plan} />
    </>
  );
}
