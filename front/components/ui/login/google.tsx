"use client";

import Components from "@components/shadcn";
import GoogleIcon from "@components/svg/googleIcon";

export function Google() {
  const { Button } = Components;

  return (
    <Button
      className="
        bg-[--lightGrey2]
        text-[#4285F4]
        h-[50px]
        hover:bg-[--lightGrey]
      "
    >
      <GoogleIcon /> 구글로그인
    </Button>
  );
}
