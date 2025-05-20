"use client";

import Components from "@components/shadcn";
import {
  AirPlane,
  AlarmClock,
  Briefcase,
  House,
  Truck,
} from "@node_modules/@deemlol/next-icons/build";
import { motion } from "framer-motion";

export default function CleintPage() {
  const {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } = Components;
  return (
    <>
      <article
        className="
          flex
          flex-col
          items-center
          justify-start
          min-h-screen
          min-w-screen
          py-[100px]
        "
      >
        <h1
          className="
            text-center
            text-[30px]
            font-[700]
            leading-[1.1]
            mb-[30px]
            sm:text-[50px]
          "
        >
          나만의{" "}
          <span
            className="
              text-[--main]
            "
          >
            여행
          </span>{" "}
          비서가
          <br />
          일정을 관리해드립니다
        </h1>
        <p
          className="
            text-[--grey]
            mb-[50px]
          "
        >
          환영합니다, 박은비님
        </p>
        <ul
          className="
            flex
            flex-row
            items-center
            justify-start
            w-full
            flex-wrap
            sm:w-[1000px]
          "
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <motion.li
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="
                w-[calc(100%/2-15px)]
                mx-[7.5px]
                mb-[15px]
                sm:w-[calc(100%/4-15px)]
              "
              key={index}
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
                  cursor-pointer
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
                  <div
                    className="
                      flex
                      flex-col
                      items-center
                      justify-center
                      px-[10px]
                      size-auto
                      text-[--white]
                      font-[700]
                      bg-[--main]
                      rounded-[5px]
                      mb-[10px]
                    "
                  >
                    D-5
                  </div>
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
            </motion.li>
          ))}
        </ul>
        <Pagination
          className="
            mt-[50px]
          "
        >
          <PaginationContent>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </article>
    </>
  );
}
