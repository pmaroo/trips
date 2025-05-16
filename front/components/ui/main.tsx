"use client";

import { motion } from "framer-motion";
import Components from "@components/shadcn";

export default function Main(data: {
  isStart: boolean;
  startToggle: Function;
}) {
  const { Button } = Components;

  return (
    <motion.article
      className="
        flex
        flex-col
        items-center
        justify-center
        size-full
        fixed
        top-[0]
        left-[0]
        bg-[--white]
        z-[1000]
      "
      initial={{ y: 0 }}
      animate={{ y: data.isStart ? `-100%` : 0 }}
      transition={{ duration: 1, ease: [0.24, 0.29, 1, -0.56] }}
    >
      <h1
        className="
          text-center
          text-[100px]
          font-[700]
          leading-[1.1]
          mb-[30px]
        "
      >
        당신만을 위한
        <br />
        나만의{" "}
        <span
          className="
            text-[--main]
          "
        >
          여행
        </span>{" "}
        비서
      </h1>
      <p
        className="
          text-[--grey]
          mb-[50px]
        "
      >
        언제 어디든 일정계획 맡겨만 주세요.
      </p>

      <Button
        className="
          w-[300px]
          h-[50px]
          text-[20px]
          font-[700]
        "
        onClick={() => data.startToggle()}
      >
        여행 떠나기
      </Button>
    </motion.article>
  );
}
