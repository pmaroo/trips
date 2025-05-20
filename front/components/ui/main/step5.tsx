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
          text-[--black]
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
          text-[--black]
          font-[700]
          text-[30px]
          leading-[1.2]
          mb-[10px]
          sm:text-[50px]
        "
      >
        차량으로 이동하시는군요!
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
            onClick={stepHandler}
            variant="outline"
          >
            50,000원
          </Button>
          <Button
            className="
              mr-[5px]
              mb-[5px]
            "
            onClick={stepHandler}
            variant="outline"
          >
            100,000원
          </Button>
          <Button
            className="
              mr-[5px]
              mb-[5px]
            "
            onClick={stepHandler}
            variant="outline"
          >
            150,000원
          </Button>
          <Button
            className="
              mr-[5px]
              mb-[5px]
            "
            onClick={stepHandler}
            variant="outline"
          >
            200,000원
          </Button>
          <Button
            className="
              mr-[5px]
              mb-[5px]
            "
            onClick={stepHandler}
            variant="outline"
          >
            300,000원
          </Button>
          <Button
            className="
              mr-[5px]
              mb-[5px]
            "
            onClick={stepHandler}
            variant="outline"
          >
            40,000원
          </Button>
          <Button
            className="
              mr-[5px]
              mb-[5px]
            "
            onClick={stepHandler}
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
          onClick={stepHandler}
        >
          <Input
            placeholder="숙소 최대 금액을 입력해주세요."
            type="number"
            onKeyDown={(e) => e.keyCode === 13 && stepHandler()}
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
