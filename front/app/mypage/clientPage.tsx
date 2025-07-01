"use client";

import Components from "@components/shadcn";
import {
  AlarmClock,
  Briefcase,
  Car,
  House,
  Plane,
  PlusCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "@node_modules/next/navigation";
import { useMeState } from "@store/commonStore";
import { usePlanUserList } from "@hooks/reactQuery/usePlan";
import { useEffect } from "react";
import { usePlanUserStore } from "@store/planStore";
import { Logo } from "@components/svg/logo";

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
  const router = useRouter();

  const meStore = useMeState((state) => state);
  const planUserStore = usePlanUserStore((state) => state);

  const planUserList = usePlanUserList(() => {});

  useEffect(() => {
    if (meStore.me) {
      planUserList.mutate({ id: meStore.me.id });
    }
  }, [meStore.me]);

  useEffect(() => {
    if (planUserStore.userPlan) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // deep clone
      const datum = JSON.parse(JSON.stringify(planUserStore.userPlan));

      datum.forEach((data, index) => {
        data.date = data.date.map(({ year, month, day }) => {
          const targetDate = new Date(`${year}-${month}-${day}`);
          targetDate.setHours(0, 0, 0, 0);

          const diff = targetDate.getTime() - today.getTime();
          const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

          let label = "";
          if (diffDays > 0) label = `D-${diffDays}`;
          else if (diffDays === 0) label = "D-Day";
          else label = `D+${Math.abs(diffDays)}`;

          return { year, month, day, dDay: label };
        });
      });

      planUserStore.userPlan = datum;
    }
  }, [planUserStore.userPlan]);

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
          환영합니다, {meStore && meStore.me.userName}님
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
          <motion.li
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0,
            }}
            className="
              w-[calc(100%/2-15px)]
              mx-[7.5px]
              mb-[15px]
              sm:w-[calc(100%/4-15px)]
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
              onClick={() => router.push(`/`)}
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
          </motion.li>
          {planUserStore.userPlan &&
            planUserStore.userPlan.map((data, index) => (
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: (index + 1) * 0.1,
                }}
                className="
                  w-[calc(100%/2-15px)]
                  mx-[7.5px]
                  mb-[15px]
                  sm:w-[calc(100%/4-15px)]
                "
                onClick={() => router.push(`/complete/${data.id}`)}
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
                    cursor-pointer
                  "
                >
                  <div
                    className="
                      flex
                      justify-center
                      w-full
                      h-full
                      items-end
                      absolute
                      top-0
                      left-0
                      z-[-1]
                      pb-[30px]
                    "
                  >
                    <Logo width={`100px`} height={`60px`} />
                  </div>
                  <div
                    className="
                      flex
                      flex-col
                      items-start
                      justify-start
                      bg-[rgba(0,0,0,0.5)]
                      size-full
                      p-[20px]
                      duration-500
                      hover:bg-[rgba(0,0,0,0.8)]
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
                        text-[hsl(var(--background))]
                        font-[700]
                        bg-[--main]
                        rounded-[5px]
                        mb-[10px]
                      "
                    >
                      {data.date[0].dDay}
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
                          {data.Category.name}
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
                        <Car />
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
                        items-start
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
                          <br />~ {data.date[data.date.length - 1].year}년
                          {data.date[data.date.length - 1].month}월
                          {data.date[data.date.length - 1].day}일
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
