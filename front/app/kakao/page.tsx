"use client";

import { useSearchParams } from "next/navigation";
// pages/auth/kakao/callback.tsx
import { useEffect } from "react";
import { useKakaoStore } from "../../store/loginStore";

export default function KakaoCallback() {
  const router = useSearchParams();
  const kakaoStore = useKakaoStore();

  useEffect(() => {
    const code = router.get("code");

    if (code) {
      if (window.opener) {
        window.opener.postMessage(
          {
            type: "KAKAO_AUTH_SUCCESS",
            payload: {
              code,
            },
          },
          window.location.origin,
        );
        window.close(); // 팝업 닫기
      }
    }
  }, [router]);

  return <p>로그인 중입니다...</p>;
}
