"use client";

import Components from "@components/shadcn";
import { useState } from "react";
import { useStepStore } from "@store/frontStore";
import { motion } from "framer-motion";

import { useDatePickerState } from "@react-stately/datepicker";
import { useDatePicker } from "@react-aria/datepicker";
import { useRef } from "react";
import Calender from "./calender";
import { usePlanStore } from "@store/planStore";
import { PlanDateType } from "@/types/plan";

export default function Step3() {
  const { Button } = Components;

  //////////////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////////////

  const [selectData, setSelectData] = useState<PlanDateType[] | null>(null);

  console.log(selectData);

  //////////////////////////////////////////////////////////////
  // HOOK
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  // STORE
  //////////////////////////////////////////////////////////////

  const stepStore = useStepStore((state) => state);
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

  const stepHandler = async () => {
    await planStore.setPlan({
      date: selectData,
    });
    stepStore.setStep(4);
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
        여행 테마는
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
        {planStore && planStore.plan.category}으로 떠나시는군요 !
      </h1>
      <p
        className="
          text-[16px]
          mb-[30px]
          sm:text-[25px]
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
        className="flex flex-row flex-wrap items-center justify-center w-full "
      >
        <Calender setSelectData={setSelectData} />
      </motion.div>
    </>
  );
}
