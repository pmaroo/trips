"use client";

import { AirPlain } from "@components/svg/airplain";
import {
  Busan,
  Chungbukdo,
  Chungnamdo,
  Daegu,
  Daejeon,
  Gangwondo,
  Geyonggido,
  Gwangju,
  Gyeongbukdo,
  Gyeongnamdo,
  Jeju,
  Jeollanamdo,
  MapLine,
  MapLine2,
  Seoul,
  Ulsan,
} from "@components/svg/map";
import {
  BusanTitle,
  ChungBukdoTitle,
  ChungnamdoTitle,
  DaeguTitle,
  DaejeonTitle,
  GangwondoTitle,
  GwangjuTitle,
  GyeongbukdoTitle,
  GyeonggidoTitle,
  GyeongnamdoTitle,
  JejuTitle,
  JeollanamdoTitle,
  SeoulTitle,
  UlsanTitle,
} from "@components/svg/mapTitle";
import WaveMorph from "@components/ui/waveLine";
import { Suspense, useContext, useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Sun from "@components/svg/sun";
import Camera from "@components/svg/camera";
import Bag from "@components/svg/bag";
import Camp from "@components/svg/camp";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Components from "@components/shadcn";
import { CarouselApi } from "@components/shadcn/components/ui/carousel";
import Triangle from "@components/svg/triangle";
import HashTag from "@components/ui/hash";

export default function ClientPage({ user }) {
  const {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } = Components;

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <>
      <article
        className="
          flex
          flex-col
          items-center
          justify-center
          w-full
          relative
          z-[2]
        "
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="
            absolute
            top-[30%]
            left-[-200px]
            z-[10]
          "
        >
          <AirPlain />
        </motion.div>
        <div
          className="
            absolute
            top-[10%]
            left-[48%]
            z-[1]
          "
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 1,
            }}
          >
            <Sun />
          </motion.div>
          <motion.p
            initial={{ y: 39, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="
              text-[25px]
              text-[--darkGrey2]
            "
          >
            여행을 떠나자,
          </motion.p>
          <div
            className="
              flex
              flex-row
              items-center
              justify-center
            "
          >
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="
                text-[25px]
                text-[--darkGrey2]
                font-[700]
              "
            >
              일정은 나한테 맡겨
            </motion.p>

            <motion.svg
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="
                w-[100px]
                h-[1px]
                ml-[10px]
              "
            >
              <motion.line
                x1="0"
                y1="0"
                x2="100"
                y2="0"
                stroke="#000"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                style={{
                  strokeWidth: 2,
                  strokeLinecap: "round",
                }}
              />
            </motion.svg>
          </div>
        </div>
        <div
          className="
            flex
            flex-col
            justify-center
            absolute
            top-[30%]
            right-[3%]
            z-[1]
            items-end
          "
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Camera />
          </motion.div>
          <motion.p
            initial={{ y: 39, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="
              text-[25px]
              text-[--darkGrey2]
            "
          >
            어디로 갈지 모르겠어 ?
          </motion.p>
          <div
            className="
              flex
              flex-row
              items-center
              justify-center
            "
          >
            <motion.svg
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="
                w-[100px]
                h-[1px]
                mr-[10px]
              "
            >
              <motion.line
                x1="100"
                y1="0"
                x2="0"
                y2="0"
                stroke="#000"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.8,
                }}
                style={{
                  strokeWidth: 2,
                  strokeLinecap: "round",
                }}
              />
            </motion.svg>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="
                text-[25px]
                text-[--darkGrey2]
                font-[700]
              "
            >
              내가 알려줄게
            </motion.p>
          </div>
        </div>

        <div
          className="
            absolute
            bottom-[30%]
            left-[48%]
            z-[1]
          "
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Bag />
          </motion.div>
          <motion.p
            initial={{ y: 39, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="
              text-[25px]
              text-[--darkGrey2]
            "
          >
            일정 짤 시간이 부족해 ?
          </motion.p>
          <div
            className="
              flex
              flex-row
              items-center
              justify-center
            "
          >
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="
                text-[25px]
                text-[--darkGrey2]
                font-[700]
              "
            >
              너의 10분만 빌려줘
            </motion.p>

            <motion.svg
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="
                w-[100px]
                h-[1px]
                ml-[10px]
              "
            >
              <motion.line
                x1="0"
                y1="0"
                x2="100"
                y2="0"
                stroke="#000"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                style={{
                  strokeWidth: 2,
                  strokeLinecap: "round",
                }}
              />
            </motion.svg>
          </div>
        </div>
        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            relative
          "
        >
          <img src="/main.png" />
          <ul
            className="
              flex
              flex-row
              items-start
              absolute
              inset-auto
              top-0
              w-[--layout]
              justify-between
              p-[100px]
              z-[5]
            "
          >
            <li
              className="
                flex
                flex-col
                items-center
                justify-center
                relative
              "
            >
              <div>
                <MapLine2 />
              </div>
              <div
                className="
                  absolute
                  inset-auto
                "
              >
                <ul
                  className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    relative
                  "
                >
                  <li
                    className="
                      z-[2]
                    "
                  >
                    <MapLine />
                  </li>

                  <li
                    className="
                      absolute
                      top-[76px]
                      left-[83px]
                    "
                  >
                    <div
                      className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        relative
                        group
                      "
                    >
                      <div
                        className="
                          duration-500
                          group-hover:scale-[1.2]
                          group-hover:z-[3]
                        "
                      >
                        <Geyonggido />
                      </div>

                      <div
                        className="
                          absolute
                          top-[0]
                          right-[0]
                          z-[3]
                          opacity-0
                          duration-500
                          group-hover:opacity-100
                          group-hover:scale-[1.2]
                        "
                      >
                        <GyeonggidoTitle />
                      </div>
                    </div>
                  </li>
                  <li
                    className="
                      absolute
                      top-[210px]
                      left-[130px]
                    "
                  >
                    <div
                      className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        relative
                        group
                        z-[4]
                      "
                    >
                      <div
                        className="
                          duration-500
                          group-hover:scale-[1.2]
                          group-hover:z-[3]
                        "
                      >
                        <Seoul />
                      </div>

                      <div
                        className="
                          absolute
                          top-[0]
                          right-[0]
                          z-[3]
                          opacity-0
                          duration-500
                          group-hover:opacity-100
                          group-hover:scale-[1.2]
                        "
                      >
                        <SeoulTitle />
                      </div>
                    </div>
                  </li>

                  <li
                    className="
                      absolute
                      top-[0]
                      right-[42px]
                    "
                  >
                    <div
                      className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        relative
                        group
                        hover:z-[5]
                      "
                    >
                      <div
                        className="
                          duration-500
                          group-hover:scale-[1.2]
                          group-hover:z-[4]
                        "
                      >
                        <Gangwondo />
                      </div>

                      <div
                        className="
                          absolute
                          top-[0]
                          right-[0]
                          z-[4]
                          opacity-0
                          duration-500
                          group-hover:opacity-100
                          group-hover:scale-[1.2]
                        "
                      >
                        <GangwondoTitle />
                      </div>
                    </div>
                  </li>
                  <li
                    className="
                      absolute
                      top-[298px]
                      right-[157px]
                    "
                  >
                    <div
                      className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        relative
                        group
                        z-[4]
                        hover:z-[6]
                      "
                    >
                      <div
                        className="
                          duration-500
                          group-hover:scale-[1.2]
                          group-hover:z-[6]
                        "
                      >
                        <Chungbukdo />
                      </div>

                      <div
                        className="
                          absolute
                          top-[0]
                          right-[0]
                          z-[6]
                          opacity-0
                          duration-500
                          group-hover:opacity-100
                          group-hover:scale-[1.2]
                        "
                      >
                        <ChungBukdoTitle />
                      </div>
                    </div>
                  </li>
                  <li
                    className="
                      absolute
                      bottom-[415px]
                      left-[204px]
                      z-[5]
                    "
                  >
                    <div
                      className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        relative
                        group
                      "
                    >
                      <div
                        className="
                          duration-500
                          group-hover:scale-[1.2]
                          group-hover:z-[3]
                        "
                      >
                        <Daejeon />
                      </div>

                      <div
                        className="
                          absolute
                          top-[0]
                          right-[0]
                          z-[3]
                          opacity-0
                          duration-500
                          group-hover:opacity-100
                          group-hover:scale-[1.2]
                        "
                      >
                        <DaejeonTitle />
                      </div>
                    </div>
                  </li>
                  <li
                    className="
                      absolute
                      bottom-[222px]
                      left-[0]
                    "
                  >
                    <div
                      className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        relative
                        group
                      "
                    >
                      <div
                        className="
                          duration-500
                          group-hover:scale-[1.2]
                          group-hover:z-[3]
                        "
                      >
                        <Chungnamdo />
                      </div>

                      <div
                        className="
                          absolute
                          top-[0]
                          right-[0]
                          z-[3]
                          opacity-0
                          duration-500
                          group-hover:opacity-100
                          group-hover:scale-[1.2]
                        "
                      >
                        <ChungnamdoTitle />
                      </div>
                    </div>
                  </li>
                  <li
                    className="
                      absolute
                      bottom-[280px]
                      right-[0]
                    "
                  >
                    <div
                      className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        relative
                        group
                        hover:z-[5]
                      "
                    >
                      <div
                        className="
                          duration-500
                          group-hover:scale-[1.2]
                          group-hover:z-[5]
                        "
                      >
                        <Gyeongbukdo />
                      </div>

                      <div
                        className="
                          absolute
                          top-[0]
                          right-[0]
                          z-[3]
                          opacity-0
                          duration-500
                          group-hover:opacity-100
                          group-hover:scale-[1.2]
                          group-hover:z-[5]
                        "
                      >
                        <GyeongbukdoTitle />
                      </div>
                    </div>
                  </li>
                  <li
                    className="
                      absolute
                      bottom-[289px]
                      right-[139px]
                    "
                  >
                    <div
                      className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        relative
                        group
                        z-[4]
                      "
                    >
                      <div
                        className="
                          duration-500
                          group-hover:scale-[1.2]
                          group-hover:z-[4]
                        "
                      >
                        <Daegu />
                      </div>

                      <div
                        className="
                          absolute
                          top-[0]
                          right-[0]
                          z-[4]
                          opacity-0
                          duration-500
                          group-hover:opacity-100
                          group-hover:scale-[1.2]
                        "
                      >
                        <DaeguTitle />
                      </div>
                    </div>
                  </li>
                  <li
                    className="
                      absolute
                      bottom-[114px]
                      right-[18px]
                    "
                  >
                    <div
                      className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        relative
                        group
                      "
                    >
                      <div
                        className="
                          duration-500
                          group-hover:scale-[1.2]
                          group-hover:z-[3]
                        "
                      >
                        <Gyeongnamdo />
                      </div>

                      <div
                        className="
                          absolute
                          top-[0]
                          right-[0]
                          z-[3]
                          opacity-0
                          duration-500
                          group-hover:opacity-100
                          group-hover:scale-[1.2]
                        "
                      >
                        <GyeongnamdoTitle />
                      </div>
                    </div>
                  </li>
                  <li
                    className="
                      absolute
                      bottom-[226px]
                      right-[19px]
                    "
                  >
                    <div
                      className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        relative
                        group
                      "
                    >
                      <div
                        className="
                          duration-500
                          group-hover:scale-[1.2]
                          group-hover:z-[3]
                        "
                      >
                        <Ulsan />
                      </div>

                      <div
                        className="
                          absolute
                          top-[0]
                          right-[0]
                          z-[3]
                          opacity-0
                          duration-500
                          group-hover:opacity-100
                          group-hover:scale-[1.2]
                        "
                      >
                        <UlsanTitle />
                      </div>
                    </div>
                  </li>
                  <li
                    className="
                      absolute
                      bottom-[166px]
                      right-[39px]
                    "
                  >
                    <div
                      className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        relative
                        group
                      "
                    >
                      <div
                        className="
                          duration-500
                          group-hover:scale-[1.2]
                          group-hover:z-[3]
                        "
                      >
                        <Busan />
                      </div>

                      <div
                        className="
                          absolute
                          top-[0]
                          right-[0]
                          z-[3]
                          opacity-0
                          duration-500
                          group-hover:opacity-100
                          group-hover:scale-[1.2]
                        "
                      >
                        <BusanTitle />
                      </div>
                    </div>
                  </li>
                  <li
                    className="
                      absolute
                      bottom-[0]
                      left-[33px]
                      group
                    "
                  >
                    <div
                      className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        relative
                        group
                      "
                    >
                      <div
                        className="
                          duration-500
                          group-hover:scale-[1.2]
                          group-hover:z-[3]
                        "
                      >
                        <Jeollanamdo />
                      </div>

                      <div
                        className="
                          absolute
                          top-[0]
                          right-[0]
                          z-[3]
                          opacity-0
                          duration-500
                          group-hover:opacity-100
                          group-hover:scale-[1.2]
                        "
                      >
                        <JeollanamdoTitle />
                      </div>
                    </div>
                  </li>
                  <li
                    className="
                      absolute
                      bottom-[157px]
                      left-[94px]
                    "
                  >
                    <div
                      className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        relative
                        group
                      "
                    >
                      <div
                        className="
                          duration-500
                          group-hover:scale-[1.2]
                          group-hover:z-[3]
                        "
                      >
                        <Gwangju />
                      </div>

                      <div
                        className="
                          absolute
                          top-[0]
                          right-[0]
                          z-[3]
                          opacity-0
                          duration-500
                          group-hover:opacity-100
                          group-hover:scale-[1.2]
                        "
                      >
                        <GwangjuTitle />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div
                className="
                  flex
                  flex-col
                  absolute
                  bottom-[-150px]
                  left-[80px]
                "
              >
                <div
                  className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    relative
                    group
                  "
                >
                  <div
                    className="
                      duration-500
                      group-hover:scale-[1.2]
                      group-hover:z-[3]
                    "
                  >
                    <Jeju />
                  </div>

                  <div
                    className="
                      absolute
                      top-[0]
                      right-[0]
                      z-[3]
                      opacity-0
                      duration-500
                      group-hover:opacity-100
                      group-hover:scale-[1.2]
                    "
                  >
                    <JejuTitle />
                  </div>
                </div>
              </div>
            </li>

            <li>
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                }}
                className="
                  w-[400px]
                  h-[600px]
                  bg-[hsl(var(--background))]
                  rounded-[10px]
                  mb-[20px]
                  z-[3]
                "
              ></motion.div>
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.5,
                }}
                className="
                  w-[400px]
                  h-[600px]
                  bg-[hsl(var(--background))]
                  rounded-[10px]
                "
              ></motion.div>
            </li>
          </ul>

          <div
            className="
              mt-[-300px]
              relative
            "
          >
            <img
              className="
                absolute
                top-[-200px]
                left-[10%]
                w-[100px]
                z-[10]
              "
              src="/person.png"
            />
            <img
              className="
                absolute
                top-[-200px]
                right-[20%]
                w-[200px]
                z-[10]
              "
              src="/person2.png"
            />
            <WaveMorph />
          </div>
        </div>
      </article>
      <article
        className="
          flex
          flex-col
          items-center
          justify-center
          py-[100px]
        "
      >
        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            w-[--layout]
          "
        >
          <ul
            className="
              flex
              flex-row
              items-start
              justify-start
              w-full
              mb-[112px]
            "
          >
            <li>
              <Camp />
            </li>
            <li
              className="
                flex
                flex-col
                items-start
                justify-center
                ml-[40px]
              "
            >
              <p
                className="
                  text-[50px]
                  font-[300]
                "
              >
                여행 일정{" "}
                <span
                  className="
                    font-[700]
                    text-[--main]
                  "
                >
                  추천 코스
                </span>
              </p>
              <motion.p
                initial={{ x: 300, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true, amount: 1 }}
                className="
                  text-[25px]
                  font-[600]
                "
              >
                아무데나 갈 수 없으니까 ―
              </motion.p>
            </li>
          </ul>
        </div>

        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            w-full
            relative
          "
        >
          <div
            className="
              absolute
              w-[40%]
              h-[30px]
              bg-[--main]
              z-[-1]
              top-[35px]
            "
          ></div>

          <Carousel
            opts={{ loop: true, align: "center" }}
            className="
              w-full
              mb-[70px]
            "
            setApi={setApi}
          >
            <CarouselContent>
              {Array.from({ length: 8 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="
                    px-[20px]
                    basis-[calc(100%/3.5)]
                  "
                >
                  <ul
                    className={`
                      flex
                      flex-col
                      items-start
                      justify-center
                      w-full
                      h-[100px]
                      rounded-[50px]
                      border-[10px]
                      ${current === index ? "border-[--main]" : "border-[--grey2]"}
                      relative
                      px-[10px]
                      bg-[hsl(var(--background))]
                  `}
                  >
                    <li
                      className={`
                        size-[50px]
                        rounded-[100%]
                        ${current === index ? "bg-[--main]" : "bg-[--grey2]"}

                    `}
                    ></li>

                    <li
                      className={`
                        flex
                        flex-col
                        items-center
                        justify-center
                        absolute
                        w-[calc(100%-16px)]
                        text-[36px]
                        font-[700]
                        ${current === index ? "text-[--main]" : "text-[--grey2]"}

                    `}
                    >
                      서울역
                    </li>
                  </ul>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <ul
            className="
              flex
              flex-row
              items-center
              justify-center
              w-full
            "
          >
            <img
              className="
                w-[100px]
              "
              src="/person3.png"
            />
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: -40 }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
              className="
                mx-[70px]
              "
            >
              <Triangle />
            </motion.div>

            <img
              className="
                w-[80px]
              "
              src="/person4.png"
            />
          </ul>
          <div
            className="
              w-full
              h-[1px]
              bg-[--main]
              mt-[-20px]
              z-[-1]
            "
          />

          <div
            className="
              w-full
              py-[50px]
            "
          >
            <Carousel
              opts={{ loop: true, align: "center" }}
              className="
                w-full
                mb-[70px]
              "
            >
              <CarouselContent>
                {Array.from({ length: 8 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="
                      px-[20px]
                      basis-[calc(100%/3.5)]
                      cursor-pointer
                      group
                    "
                  >
                    <motion.div
                      className="
                        w-full
                        h-[400px]
                        bg-[--grey]
                        rounded-[10px]
                        relative
                        overflow-hidden
                      "
                    >
                      <div
                        className="
                          flex
                          flex-col
                          items-start
                          justify-start
                          w-full
                          absolute
                          bottom-[-100%]
                          left-[0]
                          bg-[rgba(0,0,0,0.3)]
                          p-[30px]
                          duration-500
                          group-hover:bottom-0
                        "
                      >
                        <p
                          className="
                            text-[hsl(var(--background))]
                            font-[700]
                            text-[30px]
                            mb-[10px]
                          "
                        >
                          삼성동 마루집
                        </p>

                        <div
                          className="
                            flex
                            flex-row
                            items-center
                            justify-center
                            mb-[5px]
                          "
                        >
                          <HashTag title="가족여행" type={1} />
                          <HashTag title="#분위기좋은" type={2} />
                          <HashTag title="#분위기좋은" type={2} />
                        </div>

                        <p
                          className="
                            text-[18px]
                            text-[hsl(var(--background))]
                          "
                        >
                          대전광역시 삼성동 346-3 삼성메종 302호
                        </p>
                        <p
                          className="
                            text-[18px]
                            text-[hsl(var(--background))]
                          "
                        >
                          오전 10:00 ~ 오후 06:00
                        </p>
                        <p
                          className="
                            text-[18px]
                            text-[hsl(var(--background))]
                          "
                        >
                          연중무휴
                        </p>
                        <p
                          className="
                            text-[18px]
                            text-[hsl(var(--background))]
                          "
                        >
                          여기는 귀여운 마루를 볼 수 있습니다 ~
                        </p>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </article>
    </>
  );
}
