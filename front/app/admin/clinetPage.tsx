"use client";

import { Button } from "@app/components/ui/shadcn/button";
import { Input } from "@app/components/ui/shadcn/input";

export default function ClientPage() {
  return (
    <>
      <article
        className="
          flex
          items-center
          justify-center
          h-screen
          overflow-hidden
          bg-[var(--sidebar-accent)]
        "
      >
        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            shadow-md
            rounded-[10px]
            size-[500px]
            bg-[var(--sidebar-border)]
            px-[100px]
          "
        >
          <h1
            className="
              font-[700]
              text-[20px]
              mb-[20px]
            "
          >
            관리자 로그인
          </h1>
          <Input
            className="
              w-full
              bg-[var(--background)]
              h-[40px]
              text-[13px]
              mb-[5px]
            "
          />
          <Input
            className="
              w-full
              bg-[var(--background)]
              h-[40px]
              text-[13px]
              mb-[5px]
            "
            type="password"
          />
          <Button
            className="w-full "
          >
            로그인
          </Button>
        </div>
      </article>
    </>
  );
}
