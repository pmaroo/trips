"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function Leins() {
  useEffect(() => {
    // 클라이언트에서만 실행되도록 처리
    const lenis = new Lenis({
      autoRaf: true,
    });

    // // 스크롤 이벤트 처리
    // lenis.on("scroll", (e) => {
    //   console.log(e);
    // });

    // 컴포넌트 언마운트 시 cleanup
    return () => {
      lenis.destroy(); // 인스턴스를 정리합니다.
    };
  }, []);

  return null;
}
