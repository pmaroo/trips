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

export default function Step4() {
  const { Button } = Components;
  //////////////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////
  // HOOK
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  // STORE
  //////////////////////////////////////////////////////////////

  const stepStore = useStepStore();

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

  const stepHandler = () => {
    stepStore.setStep(4);
  };
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
            1월 20일 ~ 1월 25일에
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
            여행을 떠나시는군요 !
          </h1>
          <p
            className="
              text-[25px]
              mb-[30px]
            "
          >
            여행 교통수단은 어떤걸 이용하실건가요 ?
          </p>
          <motion.p
            initial={{ y: 0 }}
            animate={{ y: -10 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="
              w-full
              text-[13px]
              mb-[5px]
              text-[--grey]
            "
          >
            클릭 !
          </motion.p>

          <motion.ul
            className="
              flex
              flex-row
              items-center
              w-full
              flex-wrap
              justify-between
            "
          >
            <li
              className="
                flex
                flex-col
                items-center
                justify-center
                w-[calc(50%-10px)]
                h-[300px]
                border-2
                border-[--grey2]
                rounded-[10px]
                shadow-sm
                duration-500
                cursor-pointer
                hover:bg-[--lightGrey]
              "
              onClick={stepHandler}
            >
              <Car />
              <p
                className="
                  text-[20px]
                  font-[700]
                  mt-[20px]
                "
              >
                차량
              </p>
            </li>
            <li
              className="
                flex
                flex-col
                items-center
                justify-center
                w-[calc(50%-10px)]
                h-[300px]
                border-2
                border-[--grey2]
                rounded-[10px]
                shadow-sm
                duration-500
                cursor-pointer
                hover:bg-[--lightGrey]
              "
              onClick={stepHandler}
            >
              <Bus />
              <p
                className="
                  text-[20px]
                  font-[700]
                  mt-[20px]
                "
              >
                대중교통
              </p>
            </li>
          </motion.ul>
        </motion.li>
      </ul>
    </>
  );
}
