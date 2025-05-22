"use client";

import Components from "@components/shadcn";
import { useState } from "react";
import { useStepStore } from "@store/frontStore";
import { motion } from "framer-motion";

import Car from "@components/svg/car";
import Bus from "@components/svg/bus";
import useDeviceSize from "@hooks/useDeviceSize";
import { usePlanStore } from "@store/planStore";

export default function Step4() {
  const { Button } = Components;
  //////////////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////
  // HOOK
  //////////////////////////////////////////////////////////////
  const { isDesktop, isTablet, isMobile } = useDeviceSize();
  //////////////////////////////////////////////////////////////
  // STORE
  //////////////////////////////////////////////////////////////

  const stepStore = useStepStore();
  const planStore = usePlanStore((state) => state);

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

  const stepHandler = async (data: string) => {
    await planStore.setPlan({
      traffic: data,
    });
    stepStore.setStep(5);
  };
  //////////////////////////////////////////////////////////////
  //  TABLE
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////

  return (
    <>
      <h1
        className="
          text-[hsl(var(--foreground))]
          font-[700]
          text-[30px]
          leading-[1.2]
          sm:text-[50px]
        "
      >
        {planStore && planStore.plan.date[0].month}월{" "}
        {planStore && planStore.plan.date[0].day}일 ~{" "}
        {planStore && planStore.plan.date[1].month}월{" "}
        {planStore && planStore.plan.date[1].day}일에
      </h1>
      <h1
        className="
          text-[hsl(var(--foreground))]
          font-[700]
          text-[30px]
          leading-[1.2]
          mb-[10px]
          sm:text-[50px]
        "
      >
        여행을 떠나시는군요 !
      </h1>
      <p
        className="
          text-[16px]
          mb-[30px]
          sm:text-[25px]
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
            h-[150px]
            border-2
            border-[--grey2]
            rounded-[10px]
            shadow-sm
            duration-500
            cursor-pointer
            sm:h-[300px]
            hover:bg-[hsl(var(--border))]
          "
          onClick={() => stepHandler("차량")}
        >
          <Car width={isMobile ? "40" : "84"} height={isMobile ? "35" : "88"} />
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
            h-[150px]
            border-2
            border-[--grey2]
            rounded-[10px]
            shadow-sm
            duration-500
            cursor-pointer
            sm:h-[300px]
            hover:bg-[hsl(var(--border))]
          "
          onClick={() => stepHandler("대중교통")}
        >
          <Bus width={isMobile ? "40" : "84"} height={isMobile ? "35" : "88"} />
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
    </>
  );
}
