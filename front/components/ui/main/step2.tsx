"use client";

import Components from "@components/shadcn";
import { useStepStore } from "@store/frontStore";
import { usePlanStore } from "@store/planStore";
import { CategoryDTO } from "@/types/category";
import { motion } from "framer-motion";

export default function Step2({ categorys }: { categorys: CategoryDTO[] }) {
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

  const stepHandler = (data: CategoryDTO) => {
    planStore.setPlan({
      // region: planStore.plan.region,
      CategoryId: data.id,
      categoryName: data.name,
    });
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
        {categorys &&
          categorys.map((data, idx) => {
            return (
              <Button
                className="
                  mr-[5px]
                  mb-[5px]
                "
                onClick={() => stepHandler(data)}
                variant="outline"
                key={data.id}
              >
                {data.name}
              </Button>
            );
          })}
      </motion.div>
    </>
  );
}
