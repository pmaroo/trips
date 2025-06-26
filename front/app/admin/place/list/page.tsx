// Page.jsx (서버 컴포넌트)
import { Metadata } from "@node_modules/next";
import ClientPage from "./clientPage";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { adminUserList } from "@lib/api/user.api";
import axios from "@node_modules/axios";

export default async function Page() {
  const queryClient = new QueryClient();

  // SSR
  await queryClient.prefetchQuery({
    queryKey: ["adminUser", true],
    queryFn: () => adminUserList(true),
  });

  const apiClient = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/user`, // api 주소
    headers: { "content-Type": "application/json" },
    withCredentials: true, // ✅ 쿠키 포함 요청
  });

  const userList = async () => {
    const { data } = await apiClient.post("/all", { isAdmin: true });
    return data;
  };

  const data = await userList();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientPage data={data.data} />
    </HydrationBoundary>
  );
}
