"use client";

import Components from "@components/shadcn";
import KakaoIcon from "@components/svg/kakaoIcon";

export function Kakao(data: { onClick: Function }) {
  const { Button } = Components;

  return (
    <Button
      className="
        bg-[#FFE812]
        text-[#3a1d1d]
        h-[50px]
        hover:bg-[#ff9]
      "
      onClick={() => data.onClick()}
    >
      <KakaoIcon /> 카카오로그인
    </Button>
  );
}
