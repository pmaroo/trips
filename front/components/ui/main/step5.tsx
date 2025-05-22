"use client";

import Components from "@components/shadcn";
import { useState } from "react";
import { useStepStore } from "@store/frontStore";
import { motion } from "framer-motion";

import Car from "@components/svg/car";
import Bus from "@components/svg/bus";
import { usePlanStore } from "@store/planStore";

export default function Step5() {
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

  const stepHandler = async (data: number) => {
    await planStore.setPlan({ stayPrice: data });
    stepStore.setStep(6);
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
        여행을
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
        {planStore && planStore.plan.traffic}으로 이동하시는군요!
      </h1>
      <p
        className="
          text-[16px]
          mb-[30px]
          sm:text-[25px]
        "
      >
        1박의 숙소 금액은 어느정도 생각하시나요 ?
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
        클릭 혹은 엔터 !
      </motion.p>

      <motion.ul
        className="
          flex
          flex-row
          items-center
          justify-start
          w-full
          flex-wrap
        "
      >
        <li
          className="
            flex
            flex-row
            items-center
            justify-start
            w-full
            flex-wrap
          "
        >
          <Button
            className="
              mr-[5px]
              mb-[5px]
            "
            onClick={() => stepHandler(50000)}
            variant="outline"
          >
            50,000원
          </Button>
          <Button
            className="
              mr-[5px]
              mb-[5px]
            "
            onClick={() => stepHandler(100000)}
            variant="outline"
          >
            100,000원
          </Button>
          <Button
            className="
              mr-[5px]
              mb-[5px]
            "
            onClick={() => stepHandler(150000)}
            variant="outline"
          >
            150,000원
          </Button>
          <Button
            className="
              mr-[5px]
              mb-[5px]
            "
            onClick={() => stepHandler(200000)}
            variant="outline"
          >
            200,000원
          </Button>
          <Button
            className="
              mr-[5px]
              mb-[5px]
            "
            onClick={() => stepHandler(300000)}
            variant="outline"
          >
            300,000원
          </Button>
          <Button
            className="
              mr-[5px]
              mb-[5px]
            "
            onClick={() => stepHandler(400000)}
            variant="outline"
          >
            40,000원
          </Button>
          <Button
            className="
              mr-[5px]
              mb-[5px]
            "
            onClick={() => stepHandler(500000)}
            variant="outline"
          >
            500,000원
          </Button>
        </li>
        <li
          className="
            flex
            items-center
            justify-center
            w-full
            space-x-2
            mt-[10px]
            sm:w-[60%]
          "
        >
          <Input
            placeholder="숙소 최대 금액을 입력해주세요."
            type="number"
            // onKeyDown={(e) => e.keyCode === 13 && stepHandler()}
          />
          <p
            className="
              text-[18px]
              font-[700]
              text-[--darkGrey2]
            "
          >
            원
          </p>
        </li>
      </motion.ul>
    </>
  );
}
