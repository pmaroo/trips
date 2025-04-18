"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import Components from "@app/components/ui/shadcn/index";

export default function Login() {
  const { Button, Input } = Components;
  const [isLogin, setIsLogin] = useState<Boolean>(true);

  const loginHandler = useCallback(() => {
    setIsLogin(!isLogin);
  }, [isLogin]);
  return (
    <>
      <motion.div
        animate={{
          transform: isLogin ? `translateX(-100%)` : `translateX(0)`,
        }}
        transition={{ duration: 0.7, ease: "ease" }}
        style={{
          width: `100%`,
          height: `100vh`,
          position: `fixed`,
          top: `0`,
          left: `0`,
          zIndex: `1000`,
        }}
      >
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
              className="
                w-full
              "
              onClick={loginHandler}
            >
              로그인
            </Button>
          </div>
        </article>
      </motion.div>
    </>
  );
}
