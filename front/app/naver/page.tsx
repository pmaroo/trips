"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useNaverLoginQuery } from "@hooks/reactQuery/useLogin";

export default function NaverCallBack() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const naverTokenQuery = useNaverLoginQuery(() => {
    router.push(`/`);
  });

  useEffect(() => {
    if (searchParams.get("code")) {
      const code = searchParams.get("code");
      const state = searchParams.get("state");

      naverTokenQuery.mutate({ code, state });
    }
  }, [searchParams.get("code")]);

  return <p>로그인 중입니다...</p>;
}
