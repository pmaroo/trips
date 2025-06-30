"use client";

import Components from "@components/shadcn";
import NaverIcon from "@components/svg/naverIcon";
import { useEffect, useRef } from "react";

export function Naver() {
  const { Button } = Components;
  const stateRef = useRef<string>("");

  useEffect(() => {
    const { naver_id_login } = window;
    // const login = new naver_id_login(
    //   "n3PeuCW9wnyTixQ4nRtv",
    //   "http://localhost:3000/naver",
    // );
    const login = new naver_id_login(
      "n3PeuCW9wnyTixQ4nRtv",
      "https://trips-ebon.vercel.app/naver",
    );

    const state = login.getUniqState(); // CSRF 방지용 state
    login.setState(state);
    login.setDomain("https://trips-ebon.vercel.app");
    // login.setDomain("http://localhost:3000");
    stateRef.current = state;
  }, []);

  const handleClick = () => {
    const clientId = "n3PeuCW9wnyTixQ4nRtv";
    // const clientId = "n3PeuCW9wnyTixQ4nRtv";
    const redirectUri = encodeURIComponent(
      "https://trips-ebon.vercel.app/naver",
    );
    // const redirectUri = encodeURIComponent("http://localhost:3000/naver");
    const state = stateRef.current;

    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;

    // 로그인 시도
    window.location.href = naverAuthUrl;
  };

  return (
    <Button
      className="
        bg-[#03C75A]
        text-[hsl(var(--background))]
        h-[50px]
        hover:bg-[#c2eec7]
      "
      onClick={handleClick}
    >
      <NaverIcon /> 네이버 로그인
    </Button>
  );
}
