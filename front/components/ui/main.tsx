"use client";

import { motion } from "framer-motion";
import Components from "@components/shadcn";
import { Kakao } from "./login/kakao";
import { Naver } from "./login/naver";
import { Google } from "./login/google";
import {
  AirPlane,
  AlarmClock,
  Briefcase,
  House,
  PlusCircle,
  Truck,
} from "@node_modules/@deemlol/next-icons/build";
import { useEffect, useState } from "react";
import { useMeState } from "@store/commonStore";
import axios from "axios";
import { useKakaoStore } from "@store/loginStore";

export default function Main(data: {
  isStart: boolean;
  startToggle: Function;
}) {
  const {
    Button,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } = Components;
  //////////////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////////////
  const [isCreate, setIsCreate] = useState<boolean>(false);
  //////////////////////////////////////////////////////////////
  // HOOK
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  // STORE
  //////////////////////////////////////////////////////////////
  const meStore = useMeState();
  const kakaoStore = useKakaoStore();
  //////////////////////////////////////////////////////////////
  // FORM
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  // USEEFFECT
  //////////////////////////////////////////////////////////////
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      const { type, payload } = event.data;
      if (type === "KAKAO_AUTH_SUCCESS") {
        kakaoStore.setProfile(payload); // 예: access_token 저장
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [kakaoStore]);

  //////////////////////////////////////////////////////////////
  // TOGGLE
  //////////////////////////////////////////////////////////////
  const createToggle = () => {
    setIsCreate(!isCreate);
  };
  //////////////////////////////////////////////////////////////
  // HANDLER
  //////////////////////////////////////////////////////////////

  const kakaoLogin = () => {
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=9c5894d38bae2a1785adabd46325ccc6&redirect_uri=http://localhost:3000/kakao`;
    window.open(
      kakaoAuthURL,
      "_blank", // 새 창 (또는 새 탭)
      "width=500,height=600", // 옵션: 팝업 형태로 열기
    );
  };

  //////////////////////////////////////////////////////////////
  //  TABLE
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////

  return (
    <motion.article
      className="
        flex
        flex-col
        items-center
        justify-center
        size-full
        fixed
        top-[0]
        left-[0]
        bg-[--white]
        z-[10]
      "
      initial={{ y: 0 }}
      animate={{ y: data.isStart ? `-100%` : 0 }}
      transition={{ duration: 1, ease: [0.24, 0.29, 1, -0.56] }}
    >
      <h1
        className="
          text-center
          text-[50px]
          font-[700]
          leading-[1.1]
          mb-[30px]
          sm:text-[100px]
        "
      >
        당신만을 위한
        <br />
        나만의{" "}
        <span
          className="
            text-[--main]
          "
        >
          여행
        </span>{" "}
        비서
      </h1>
      <p
        className="
          text-[--grey]
          mb-[50px]
        "
      >
        언제 어디든 일정계획 맡겨만 주세요.
      </p>

      <Dialog open={isCreate} onOpenChange={createToggle}>
        <DialogTrigger asChild>
          <Button
            className="
              w-[300px]
              h-[50px]
              text-[20px]
              font-[700]
            "
          >
            여행 떠나기
          </Button>
        </DialogTrigger>

        {meStore.me ? (
          <DialogContent
            className="
              w-[auto]
              max-w-auto
            "
          >
            <DialogHeader
              className="
                mb-[10px]
              "
            >
              <DialogTitle
                className="
                  text-center
                "
              >
                일정을 선택해주세요.
              </DialogTitle>
            </DialogHeader>

            <div
              className="
                flex
                flex-row
                items-center
                justify-start
              "
            >
              <motion.div
                className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  w-[240px]
                  h-[300px]
                  rounded-[10px]
                  relative
                  overflow-hidden
                  border
                  border-[--lightGrey]
                  shadow-lg
                  duration-500
                  cursor-pointer
                  hover:bg-[--lightGrey]
                "
                onClick={() => {
                  setIsCreate(false);
                  data.startToggle();
                }}
              >
                <PlusCircle size={30} />
                <p
                  className="
                    mt-[10px]
                    text-[--darkGrey]
                    font-[700]
                  "
                >
                  일정 추가
                </p>
              </motion.div>

              <Carousel
                opts={{
                  loop: true,
                  align: "start",
                  watchDrag: false,
                }}
                className="
                  min-w-0
                  w-[700px]
                  relative
                  px-[15px]
                "
              >
                <CarouselContent>
                  {Array.from({ length: 8 }).map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="
                        px-[20px]
                        basis-[calc(100%/2.5)]
                        cursor-pointer
                        group
                      "
                    >
                      <motion.div
                        className="
                          w-full
                          h-[300px]
                          rounded-[10px]
                          relative
                          overflow-hidden
                          border
                          border-[--lightGrey]
                          shadow-lg
                          bg-[url(/daejeon.png)]
                        "
                      >
                        <div
                          className="
                            flex
                            flex-col
                            items-start
                            justify-start
                            bg-[rgba(0,0,0,0.3)]
                            size-full
                            p-[20px]
                            duration-500
                            hover:bg-[rgba(0,0,0,0.6)]
                          "
                        >
                          <ul
                            className="
                              flex
                              flex-row
                              items-center
                              justify-start
                              mb-[10px]
                            "
                          >
                            <li
                              className="
                                mr-[5px]
                              "
                            >
                              <AirPlane size={24} color="#FFFFFF" />
                            </li>
                            <li>
                              <h1
                                className="
                                  text-[20px]
                                  text-[--lightGrey2]
                                  font-[700]
                                  duration-500
                                  hover:text-[--white]
                                "
                              >
                                대전광역시
                              </h1>
                            </li>
                          </ul>
                          <ul
                            className="
                              flex
                              flex-row
                              items-center
                              justify-start
                              mb-[5px]
                            "
                          >
                            <li
                              className="
                                mr-[5px]
                              "
                            >
                              <Briefcase size={16} color="#FFFFFF" />
                            </li>
                            <li>
                              <h1
                                className="
                                  text-[14px]
                                  text-[--lightGrey2]
                                  duration-500
                                  hover:text-[--white]
                                "
                              >
                                커플여행
                              </h1>
                            </li>
                          </ul>
                          <ul
                            className="
                              flex
                              flex-row
                              items-center
                              justify-start
                              mb-[5px]
                            "
                          >
                            <li
                              className="
                                mr-[5px]
                              "
                            >
                              <Truck size={16} color="#FFFFFF" />
                            </li>
                            <li>
                              <h1
                                className="
                                  text-[14px]
                                  text-[--lightGrey2]
                                  duration-500
                                  hover:text-[--white]
                                "
                              >
                                차량
                              </h1>
                            </li>
                          </ul>
                          <ul
                            className="
                              flex
                              flex-row
                              items-start
                              justify-start
                              mb-[5px]
                            "
                          >
                            <li
                              className="
                                mr-[5px]
                                mt-[3px]
                              "
                            >
                              <AlarmClock size={16} color="#FFFFFF" />
                            </li>
                            <li>
                              <h1
                                className="
                                  text-[14px]
                                  text-[--lightGrey2]
                                  duration-500
                                  hover:text-[--white]
                                "
                              >
                                2025년1월25일
                                <br />~ 2025년2월20일
                              </h1>
                            </li>
                          </ul>
                          <ul
                            className="
                              flex
                              flex-row
                              items-center
                              justify-start
                              mb-[5px]
                            "
                          >
                            <li
                              className="
                                mr-[5px]
                              "
                            >
                              <House size={16} color="#fff" />
                            </li>
                            <li>
                              <h1
                                className="
                                  text-[14px]
                                  text-[--lightGrey2]
                                  duration-500
                                  hover:text-[--white]
                                "
                              >
                                숙소 ~ 50,000원
                              </h1>
                            </li>
                          </ul>
                        </div>
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious
                  className="
                    ml-[-210px]
                  "
                />
                <CarouselNext
                  className="
                    mr-[45px]
                  "
                />
              </Carousel>
            </div>
          </DialogContent>
        ) : (
          <DialogContent
            className="
              w-[400px]
              py-[100px]
            "
          >
            <DialogHeader
              className="
                mb-[50px]
              "
            >
              <DialogTitle
                className="
                  text-center
                "
              >
                로그인 후 이용 가능합니다
              </DialogTitle>
            </DialogHeader>

            <Kakao onClick={kakaoLogin} />
            <Naver />
            <Google />
          </DialogContent>
        )}
      </Dialog>
    </motion.article>
  );
}
