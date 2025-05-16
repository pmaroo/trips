"use client";

import Components from "@components/shadcn";
import { ChevronLeft } from "@node_modules/@deemlol/next-icons/build";
import { useState } from "react";
import { useStepStore } from "@store/frontStore";
import { motion } from "framer-motion";
import { addDays } from "@node_modules/date-fns/addDays";
import { ko } from "date-fns/locale";
import Car from "@components/svg/car";
import Bus from "@components/svg/bus";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Step6() {
  const { Button, Input } = Components;
  //////////////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////
  // HOOK
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  // STORE
  //////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////
  // FORM
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  // USEEFFECT
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  // TOGGLE
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  // HANDLER
  //////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////
  //  TABLE
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////

  return (
    <>
      <ul
        className="
          flex
          flex-row
          items-center
          justify-center
          relative
          size-full
          bg-[--white]
        "
      >
        <motion.li
          className="
            flex
            flex-col
            items-center
            justify-center
            h-full
            w-[50%]
            p-[100px]
          "
        >
          <h1
            className="
              text-[--black]
              font-[700]
              text-[50px]
              leading-[1.2]
            "
          >
            여행 비서, AI마루가
          </h1>

          <h1
            className="
              text-[--black]
              font-[700]
              text-[50px]
              leading-[1.2]
              mb-[10px]
            "
          >
            박은비님의 여행일정을 생성 중 입니다 !
          </h1>
          <p
            className="
              text-[25px]
              mb-[30px]
            "
          >
            최적의 여행 일정을 AI마루가 계획중입니다.
          </p>

          <DotLottieReact
            src="https://lottie.host/2d553345-1f87-4bdb-917f-ca2db66781bd/ZT8Wjzhcvy.lottie"
            loop
            autoplay
          />
        </motion.li>
      </ul>
    </>
  );
}
