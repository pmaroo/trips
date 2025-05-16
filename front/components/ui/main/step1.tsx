"use client";

import Components from "@components/shadcn";
import { ChevronLeft } from "@node_modules/@deemlol/next-icons/build";
import { useStepStore } from "@store/frontStore";
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
    stepStore.setStep(1);
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
            환영합니다.
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
            박은비님의 여행비서, AI마루입니다.
          </h1>
          <p
            className="
              text-[25px]
              mb-[30px]
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
        </motion.li>
      </ul>
    </>
  );
}
