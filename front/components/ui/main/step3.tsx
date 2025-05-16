"use client";

import Components from "@components/shadcn";
import { ChevronLeft } from "@node_modules/@deemlol/next-icons/build";
import { useState } from "react";
import { useStepStore } from "@store/frontStore";
import { motion } from "framer-motion";
import { addDays } from "@node_modules/date-fns/addDays";
import { ko } from "date-fns/locale";

export default function Step3() {
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
    stepStore.setStep(3);
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
            여행 테마는
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
            커플여행으로 떠나시는군요 !
          </h1>
          <p
            className="
              text-[25px]
              mb-[30px]
            "
          >
            여행은 언제 가실 예정이신가요 ?
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
          <div
            className="
              flex
              flex-col
              items-start
              justify-center
              w-full
              mb-[10px]
            "
          >
            <Button onClick={() => stepHandler()}>날짜확정</Button>
          </div>
          <motion.div
            className="
              flex
              flex-row
              items-center
              justify-center
              w-full
              flex-wrap
            "
          >
            {/* <Calendar
              locale={ko}
              initialFocus
              mode="range"
              numberOfMonths={2}
              selected={date}
              onSelect={setDate}
              defaultMonth={date?.from}
              className="
                flex
                w-full
                h-[380px]
              "
              classNames={{
                months:
                  "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
                month: "space-y-4 w-full flex flex-col",
                table: "w-full h-full border-collapse space-y-1",
                head_row: "",
                row: "w-full mt-2",
              }}
            /> */}
          </motion.div>
        </motion.li>
      </ul>
    </>
  );
}
