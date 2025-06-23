"use client";

import { useRouter, useSearchParams } from "next/navigation";
// pages/auth/kakao/callback.tsx
import { useEffect } from "react";
import axios from "@node_modules/axios";
import { useLogin } from "@hooks/reactQuery/useUser";
import { CreateUser } from "@/types/user";

export default function KakaoCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { Kakao } = window;

  const login = useLogin(() => {
    router.push("/");
  });

  useEffect(() => {
    if (searchParams.get("code")) {
      let code = searchParams.get("code");
      let grantType = "authorization_code";
      let clientId = "26df7dfd151672851ce1a3808d2441e6";
      const redirectUrl = "http://localhost:3000/kakao";

      // 2. 받아온 code로 토큰 요청
      axios
        .post(
          `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${clientId}&redirect_uri=${redirectUrl}&code=${code}`,
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          },
        )
        .then(async (res) => {
          // 3. 토큰으로 JS사용하도록 토큰 보내기
          await Kakao.Auth.setAccessToken(res.data.access_token);
          // 4. 토큰으로 사용자정보 불러오기
          await Kakao.API.request({
            url: "/v2/user/me",
          })
            .then((response) => {
              // 5. 서버로 신호보내기
              const createData: CreateUser = {
                email: response.kakao_account.email,
                password: response.kakao_account.email,
                userName: response.kakao_account.name,
                nickName: response.kakao_account.profile.nickname,
                isAdmin: false,
                type: "kakao",
              };
              login.mutate(createData);
            })
            .catch((error) => {
              console.log(error, "2");
            });
        })
        .catch((error) => {
          console.log(error, "1");
        });
    }
  }, [searchParams.get("code")]);

  return <p>로그인 중입니다...</p>;
}
