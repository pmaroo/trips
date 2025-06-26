import { Metadata } from "next";
import ClientPage from "./clientPage"; // CSR 컴포넌트
import axios from "axios";

export const metadata: Metadata = {
  title: "Complete",
  description: "Complete page description",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const apiClient = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/plan`,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  try {
    const { data } = await apiClient.post("/id", {
      id: parseInt(id),
    });

    return <ClientPage planData={data} />;
  } catch (error: any) {
    console.error("Error fetching plan:", error?.response?.data || error);
    return <div>데이터를 불러오지 못했습니다.</div>;
  }
}
