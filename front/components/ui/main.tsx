"use client";

import { motion } from "framer-motion";
import Components from "@components/shadcn";
import { KakaoButton } from "./login/kakao";
import { Naver } from "./login/naver";
import { Google } from "./login/google";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMeState } from "@store/commonStore";
import axios from "axios";
import { useKakaoStore } from "@store/loginStore";
import {
  useAdminLoginUser,
  useAdminUser,
  useLoginUser,
} from "@hooks/reactQuery/useUser";
import {
  AlarmClock,
  Briefcase,
  CarFront,
  House,
  Plane,
  PlusCircle,
} from "lucide-react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "@node_modules/next/navigation";
import { usePlanStore } from "@store/planStore";

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
  // STORE
  //////////////////////////////////////////////////////////////
  const meStore = useMeState();
  const planStore = usePlanStore((state) => state);

  //////////////////////////////////////////////////////////////
  // HOOK
  //////////////////////////////////////////////////////////////

  const loginUser = useLoginUser(
    meStore.me && meStore.me.id ? meStore.me.id.toString() : null,
  );

  //////////////////////////////////////////////////////////////
  // FORM
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  // USEEFFECT
  //////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////
  // TOGGLE
  //////////////////////////////////////////////////////////////
  const createToggle = () => {
    if (loginUser.data && loginUser.data.Plan.length === 0) {
      data.startToggle();
      planStore.setPlan({ UserId: meStore.me.id });
    } else {
      setIsCreate(!isCreate);
    }
  };

  //////////////////////////////////////////////////////////////
  // HANDLER
  //////////////////////////////////////////////////////////////

  const { Kakao } = window;

  const kakaoLogin = async () => {
    const REST_API_KEY = "26df7dfd151672851ce1a3808d2441e6";
    const REDIRECT_URI = "http://localhost:3000/kakao";

    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

    window.location.href = kakaoAuthURL;
    // 1. 카카오 요청
    // Kakao.Auth.authorize({
    //   redirectUri: "http://localhost:3000/kakao",
    //   scope: "profile_nickname,account_email,name,phone_number",
    //   prompt: "login",
    // });
  };

  //////////////////////////////////////////////////////////////
  //  TABLE
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////

  if (meStore.me && !loginUser.data) {
    return;
  }

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
        bg-[hsl(var(--background))]
        z-[20]
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
                className="text-center "
              >
                일정을 선택해주세요.
              </DialogTitle>
            </DialogHeader>

            <div
              className="flex flex-row items-center justify-start "
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
                <PlusCircle />
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
                  {loginUser.data &&
                    loginUser.data.Plan.map((data, index) => (
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
                          className={`
                            w-full
                            h-[300px]
                            rounded-[10px]
                            relative
                            overflow-hidden
                            border
                            border-[--lightGrey]
                            shadow-lg
                        `}
                        >
                          <div
                            className="
                              flex
                              flex-col
                              items-start
                              justify-start
                              bg-[rgba(0,0,0,0.4)]
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
                                  text-[hsl(var(--background))]
                                "
                              >
                                <Plane />
                              </li>
                              <li>
                                <h1
                                  className="
                                    text-[20px]
                                    text-[--lightGrey2]
                                    font-[700]
                                    duration-500
                                    hover:text-[hsl(var(--background))]
                                  "
                                >
                                  {data.destination.name}
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
                                  text-[hsl(var(--background))]
                                "
                              >
                                <Briefcase />
                              </li>
                              <li>
                                <h1
                                  className="
                                    text-[14px]
                                    text-[--lightGrey2]
                                    duration-500
                                    hover:text-[hsl(var(--background))]
                                  "
                                >
                                  {data.category}
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
                                  text-[hsl(var(--background))]
                                "
                              >
                                <CarFront />
                              </li>
                              <li>
                                <h1
                                  className="
                                    text-[14px]
                                    text-[--lightGrey2]
                                    duration-500
                                    hover:text-[hsl(var(--background))]
                                  "
                                >
                                  {data.traffic}
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
                                  mt-[3px]
                                  text-[hsl(var(--background))]
                                "
                              >
                                <AlarmClock />
                              </li>
                              <li>
                                <h1
                                  className="
                                    text-[14px]
                                    text-[--lightGrey2]
                                    duration-500
                                    hover:text-[hsl(var(--background))]
                                  "
                                >
                                  {data.date[0].year}년{data.date[0].month}월
                                  {data.date[0].day}일
                                  <br />~ {data.date[data.date.length - 1].year}
                                  년{data.date[data.date.length - 1].month}월
                                  {data.date[data.date.length - 1].day}일
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
                className="text-center "
              >
                로그인 후 이용 가능합니다
              </DialogTitle>
            </DialogHeader>

            <KakaoButton onClick={kakaoLogin} />
            <Naver />

            <Google />
          </DialogContent>
        )}
      </Dialog>
    </motion.article>
  );
}
