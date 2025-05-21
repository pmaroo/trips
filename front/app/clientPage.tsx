"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Components from "@components/shadcn";
import Main from "@components/ui/main";
import Step1 from "@components/ui/main/step1";
import { useStepStore } from "@store/frontStore";
import Step2 from "@components/ui/main/step2";
import Step3 from "@components/ui/main/step3";
import Step4 from "@components/ui/main/step4";
import Step5 from "@components/ui/main/step5";
import Step6 from "@components/ui/main/step6";
import useDeviceSize from "@hooks/useDeviceSize";
import { useMeState } from "@store/commonStore";
import { useKakaoStore } from "@store/loginStore";
import { ChevronLeft } from "lucide-react";
import { CategoryDTO, UpdateCategory } from "@/types/category";

export default function ClientPage({
  categoryData,
}: {
  categoryData: CategoryDTO[];
}) {
  const { Button, Progress } = Components;
  //////////////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////////////
  const [isStart, setIsStart] = useState<boolean>(false);

  //////////////////////////////////////////////////////////////
  // HOOK
  //////////////////////////////////////////////////////////////
  const { isDesktop, isTablet, isMobile } = useDeviceSize();

  //////////////////////////////////////////////////////////////
  // STORE
  //////////////////////////////////////////////////////////////

  const stepStore = useStepStore();
  const meStore = useMeState();
  const kakaoStore = useKakaoStore();

  //////////////////////////////////////////////////////////////
  // FORM
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  // USEEFFECT
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  // TOGGLE
  //////////////////////////////////////////////////////////////

  const startToggle = () => {
    setIsStart(!isStart);
  };

  //////////////////////////////////////////////////////////////
  // HANDLER
  //////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////
  //  TABLE
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////

  const koreanRegions = [
    "서울특별시",
    "부산광역시",
    "대구광역시",
    "인천광역시",
    "광주광역시",
    "대전광역시",
    "울산광역시",
    "경기도",
    "강원특별자치도",
    "충청북도",
    "충청남도",
    "전라북도",
    "전라남도",
    "경상북도",
    "경상남도",
    "제주특별자치도",
  ];

  return (
    <>
      {/* 시작화면 */}
      <Main isStart={isStart} startToggle={startToggle} />

      <article
        className="
          flex
          flex-col
          items-center
          justify-center
          w-screen
          h-screen
        "
      >
        <div
          className="
            w-full
            fixed
            top-0
            left-0
            p-[10px]
            z-[9]
          "
        >
          <Progress
            value={stepStore.step * 20}
            className="
              mb-[10px]
            "
          />

          <ul
            className="
              flex
              flex-row
              items-center
              justify-start
            "
          >
            <motion.li
              initial={{ x: 0 }}
              whileHover={{
                x: 10,
                transition: {
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
              className="
                cursor-pointer
              "
            >
              <ChevronLeft />
            </motion.li>
          </ul>
        </div>
        <ul
          className="
            flex
            flex-row
            items-center
            justify-center
            relative
            size-full
            bg-[hsl(var(--background))]
          "
        >
          <motion.li
            className="
              flex
              flex-col
              items-center
              justify-center
              w-full
              h-full
              p-[20px]
              sm:w-[1000px]
              sm:p-[100px]
            "
          >
            {stepStore.step === 0 && <Step1 koreanRegions={koreanRegions} />}
            {stepStore.step === 1 && <Step2 categorys={categoryData} />}
            {stepStore.step === 2 && <Step3 />}
            {stepStore.step === 3 && <Step4 />}
            {stepStore.step === 4 && <Step5 />}
            {stepStore.step === 5 && <Step6 />}
          </motion.li>
        </ul>
      </article>
    </>
  );
}
