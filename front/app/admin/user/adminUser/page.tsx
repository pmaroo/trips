// Page.jsx (서버 컴포넌트)
import { Metadata } from "@node_modules/next";
import ClientPage from "./clientPage";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { adminUserList } from "@lib/api/user.api";
import { cookies } from "next/headers";

export default async function Page() {
  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;

  // SSR
  await queryClient.prefetchQuery({
    queryKey: ["adminUser"],
    queryFn: () => adminUserList(true),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientPage />
    </HydrationBoundary>
  );
}
