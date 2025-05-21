"use client";

import Components from "@components/shadcn";
import { useMeState } from "@store/commonStore";
import { useStepStore } from "@store/frontStore";
import { usePlanStore } from "@store/planStore";
import { motion } from "framer-motion";

export default function Step1(data: { koreanRegions: string[] }) {
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

  const stepStore = useStepStore((state) => state);
  const planStore = usePlanStore((state) => state);
  const meStore = useMeState((state) => state);

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
    await planStore.setPlan({ region: data });
    stepStore.setStep(1);
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
        환영합니다.
      </h1>
      <h1
        className="
          text-center
          text-[hsl(var(--foreground))]
          font-[700]
          text-[30px]
          leading-[1.2]
          mb-[10px]
          sm:text-[50px]
        "
      >
        {meStore.me && meStore.me.userName}님의 여행비서,
        <br
          className="
            flex
            sm:hidden
          "
        />{" "}
        AI마루입니다.
      </h1>
      <p
        className="
          text-[16px]
          mb-[30px]
          sm:text-[25px]
        "
      >
        어디로 여행 가실 계획이신가요 ?
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
      <motion.div
        className="
          flex
          flex-row
          items-center
          justify-start
          flex-wrap
        "
      >
        {data.koreanRegions.map((data, idx) => {
          return (
            <Button
              key={idx}
              className="
                mr-[5px]
                mb-[5px]
              "
              onClick={() => stepHandler(data)}
              variant="outline"
            >
              {data}
            </Button>
          );
        })}
      </motion.div>
    </>
  );
}
