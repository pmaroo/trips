"use client";

import Components from "@components/shadcn";
import { useEffect, useState } from "react";
import { useMeState } from "@store/commonStore";
import { useStepStore } from "@store/frontStore";
import { usePlanStore } from "@store/planStore";
import { motion } from "framer-motion";
import DaumPostcodeEmbed from "react-daum-postcode";

export default function Step7() {
  const { Button, Input, Dialog, DialogContent, DialogTitle, DialogTrigger } =
    Components;
  //////////////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////////////
  const [isAddress, setIsAddress] = useState<boolean>(false);
  const [addressInput, setAddressInput] = useState<string>("");
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

  const addressToggle = () => {
    setIsAddress(!isAddress);
  };

  //////////////////////////////////////////////////////////////
  // HANDLER
  //////////////////////////////////////////////////////////////

  const stepHandler = async () => {
    await planStore.setPlan({ startAddress: addressInput });
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
          text-[hsl(var(--foreground))]
          font-[700]
          text-[30px]
          leading-[1.2]
          sm:text-[50px]
        "
      >
        {planStore && planStore.plan.region}로
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
        여행 떠나시는군요 !
      </h1>
      <p
        className="
          text-[16px]
          mb-[30px]
          sm:text-[25px]
        "
      >
        어디서 출발 하실 계획이신가요 ?
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
          items-start
          w-full
          mb-[10px]
        "
      >
        <Button onClick={stepHandler}>출발지 확정</Button>
      </div>
      <motion.div
        className="
          flex
          flex-row
          items-center
          justify-start
          w-full
          space-x-2
        "
      >
        <Input
          value={addressInput}
          placeholder="주소를 검색해주세요."
          disabled={true}
        />{" "}
        <Dialog onOpenChange={addressToggle} open={isAddress}>
          <DialogTrigger asChild>
            <Button onClick={addressToggle}>검색</Button>
          </DialogTrigger>
          <DialogTitle></DialogTitle>
          <DialogContent
            className="
              h-[600px]
            "
          >
            <DaumPostcodeEmbed
              style={{ height: `100%` }}
              onComplete={(data) => {
                setAddressInput(data.address);
                setIsAddress(false);
              }}
              autoClose={false}
            />
          </DialogContent>
        </Dialog>
      </motion.div>
    </>
  );
}
