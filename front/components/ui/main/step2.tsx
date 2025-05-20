"use client";

import Components from "@components/shadcn";
import { ChevronLeft } from "@node_modules/@deemlol/next-icons/build";
import { useStepStore } from "@store/frontStore";
import { motion } from "framer-motion";

export default function Step2(data: { categorys: string[] }) {
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

  const stepHandler = (data: string) => {
    stepStore.setStep(2);
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
          text-[--black]
          font-[700]
          text-[30px]
          leading-[1.2]
          sm:text-[50px]
        "
      >
        대구광역시로
      </h1>
      <h1
        className="
          text-[--black]
          font-[700]
          text-[30px]
          leading-[1.2]
          mb-[10px]
          sm:text-[50px]
        "
      >
        여행 떠나시는군요 !
      </h1>
      <p
        className="
          text-[16px]
          mb-[30px]
          sm:text-[25px]
        "
      >
        어떤 여행을 하실건가요 ?
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
          w-full
          flex-wrap
        "
      >
        {data.categorys.map((data, idx) => {
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
