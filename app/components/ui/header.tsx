"use client";

import * as Icon from "@deemlol/next-icons";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import debounce from "lodash/debounce";

export default function Header() {
  const [isMenu, setIsMenu] = useState<Boolean>(false);
  const [isScroll, setIsScroll] = useState<Boolean>(true);

  const menuFlag = useCallback(() => {
    setIsMenu(!isMenu);
  }, [isMenu]);

  useEffect(() => {
    const scrollEvent = () => {
      if (window.scrollY === 0) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    window.addEventListener("scroll", scrollEvent);

    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, []);

  return (
    <>
      <motion.div
        animate={{
          transform: isScroll ? `translateY(0px)` : `translateY(-60px)`,
        }}
        transition={{ duration: isScroll ? 0.3 : 0.3, ease: "easeOut" }}
        style={{
          position: `fixed`,
          top: `0`,
          left: `0`,
          width: `100%`,
        }}
      >
        <header
          className="
          flex
          flex-row
          items-center
          w-full
          justify-between
          h-[60px]
          bg-black
          px-[20px]
          z-[100]
        "
        >
          <p className="text-white ">로고</p>
          <nav className="flex flex-row w-auto ">
            <ul className="flex flex-row ">
              <li
                className="
                text-white
                text-[13px]
                cursor-pointer
              "
              >
                <a>로그인</a>
              </li>

              <li
                className="
                text-[#bbb]
                text-[13px]
                mx-[10px]
              "
              >
                <p>|</p>
              </li>
              <li
                className="
                text-white
                text-[13px]
                cursor-pointer
              "
              >
                <a>회원가입</a>
              </li>
            </ul>
            <p
              className="
              ml-[10px]
              cursor-pointer
            "
              onClick={menuFlag}
            >
              {isMenu ? (
                <Icon.X size={18} color="#ffffff" />
              ) : (
                <Icon.AlignJustify size={18} color="#ffffff" />
              )}
            </p>
          </nav>
        </header>
      </motion.div>
    </>
  );
}
// 주의점
// app은 서버에서 렌더링 되는 서버 컴포넌트이기 때문에
// react hook 사용시 "use client"로 클라이언트 컴포넌트로 명시해야 사용 가능

// pages를 사용하지 않고 app 을 사용하는 이유
// 1. 서버 컴포넌트 기본적용
// 서버 컴포넌트이기 때문에 불필요한 js가 클라이언트에 전달되는걸 방지하고 결과만 클라이언트로 보내기때문에 렌더링 성능이 좋아짐
