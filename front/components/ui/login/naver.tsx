"use client";

import Components from "@components/shadcn";
import NaverIcon from "@components/svg/naverIcon";

export function Naver() {
  const { Button } = Components;

  return (
    <Button
      className="
        bg-[#03C75A]
        text-[hsl(var(--background))]
        h-[50px]
        hover:bg-[#c2eec7]
      "
    >
      <NaverIcon /> 네이버로그인
    </Button>
  );
}
