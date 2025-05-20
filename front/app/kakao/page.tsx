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
      fetch("http://localhost:8080/api/auth/kakao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          // 로그인 처리 (토큰 저장, 리디렉션 등)
          if (window.opener) {
            window.opener.postMessage(
              {
                type: "KAKAO_AUTH_SUCCESS",
                payload: {
                  data,
                },
              },
              window.location.origin,
            );
            window.close(); // 팝업 닫기
          }
        });
    }
  }, [router]);

  return <p>로그인 중입니다...</p>;
}
