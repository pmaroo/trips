"use client";

import Components from "@components/shadcn";
import GoogleIcon from "@components/svg/googleIcon";
import { useEffect, useRef } from "react";
import axios from "axios";
import { useGoogleLoginQuery } from "@hooks/reactQuery/useLogin";

export function Google() {
  const { Button } = Components;
  const tokenClientRef = useRef<any>(null);

  const googleLogin = useGoogleLoginQuery(() => {});

  useEffect(() => {
    if (window.google) {
      tokenClientRef.current = window.google.accounts.oauth2.initTokenClient({
        client_id:
          "717522797797-dht72v669q7kfrvo7qr0slq67pirqgn0.apps.googleusercontent.com",
        scope: "email profile openid",
        callback: (response) => {
          if (response.access_token) {
            console.log("Access Token:", response.access_token);

            googleLogin.mutate(response.access_token);

            // 또는, 아래와 같이 ID Token 방식도 가능:
            // send token to backend to verify & login
          } else {
            console.error("Login failed or closed");
          }
        },
      });
    }
  }, []);

  const handleLoginClick = () => {
    tokenClientRef.current?.requestAccessToken();
  };

  return (
    <Button
      className="
        bg-[--lightGrey2]
        text-[#4285F4]
        h-[50px]
        hover:bg-[--lightGrey]
      "
      id="google-login-button"
      onClick={handleLoginClick}
    >
      <GoogleIcon /> 구글로그인
    </Button>
  );
}
