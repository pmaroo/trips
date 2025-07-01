"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

import HashTag from "@components/ui/hash";
import Car from "@components/svg/car";
import Components from "@components/shadcn";
import UpdateCalender from "@components/ui/updateCalender";
import { useUpdatePlaceForm } from "@hooks/form/usePlaceForm";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useDeviceSize from "@hooks/useDeviceSize";
import {
  Calendar,
  CheckCircle,
  Info,
  Menu,
  Plane,
  PlusCircle,
  Repeat,
  Settings,
  Star,
  XCircle,
} from "lucide-react";
import {
  useFindPlaceStore,
  usePlanStore,
  useResultPlan,
} from "@store/planStore";
import {
  useCreatePlan,
  useFindPlace,
  useUpdatePlan,
} from "@hooks/reactQuery/usePlan";
import Bus from "@components/svg/bus";
import Leins from "@lib/lenis";
import { CreatePlan, DayPlace, PlanListById } from "@/types/plan";
import useInput from "@hooks/useInput";
import { useKeywordForm } from "@hooks/form/usePlanForm";
import { useMeState } from "@store/commonStore";

const SortableItem = ({
  id,
  index,
  lastIndex,
  data,
  placeDeleteHandler,
}: {
  id: string;
  index: number;
  lastIndex: string;
  data: DayPlace;
  placeDeleteHandler: Function;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } =
    Components;

  return (
    <>
      <ul
        ref={setNodeRef}
        style={style}
        {...attributes}
        className="
          flex
          flex-col
          items-start
          justify-center
          w-full
        "
      >
        <li
          className="
            flex
            flex-row
            items-center
            w-full
            relative
            justify-end
            bg-[--lightGrey]
            p-[20px]
            rounded-[5px]
          "
        >
          <div
            className={`
              flex
              flex-col
              items-center
              justify-center
              h-full
              text-center
              rounded-[5px]
              w-[20px]
              ${parseInt(lastIndex) === index + 1 ? "bg-[--main3]" : "bg-[--main]"}
              text-[hsl(var(--background))]
              text-[12px]
              mr-[10px]
              absolute
              top-[0]
              left-[0]
          `}
          >
            {index + 1}
          </div>
          <div
            className="
              flex
              flex-row
              items-center
              justify-between
              w-[calc(100%-30px)]
            "
          >
            <div
              className="
                flex
                flex-col
                items-start
                justify-center
                w-[60%]
              "
            >
              <div
                className="
                  flex
                  flex-row
                  items-center
                  justify-start
                  mb-[5px]
                "
              >
                <p
                  className={`

                    ${data.category_group_code === "AD5" ? "text-[--main3]" : "text-[--main]"}
                    text-[14px]
                    font-[700]
                    mr-[5px]
                `}
                >
                  {data.name === "집" ? "" : data.category_group_name}{" "}
                  <span
                    className="
                      text-[14px]
                      font-[700]
                      text-[hsl(var(--foreground))]
                    "
                  >
                    {data.place_name}
                  </span>
                </p>
              </div>
            </div>
            <div
              className="
                flex
                flex-row
                w-auto
              "
            >
              <p
                {...listeners}
                className="
                  text-[--darkGrey2]
                  text-[12px]
                  cursor-grab
                  mr-[10px]
                "
              >
                <Menu size={16} />
              </p>
              <motion.p
                whileHover={{
                  rotate: `90deg`,
                  transition: { duration: 0.5 },
                }}
                className="
                  text-[--darkGrey2]
                  text-[12px]
                  cursor-pointer
                "
                onClick={() => placeDeleteHandler(data)}
              >
                <XCircle size={16} color="#ff0000" />
              </motion.p>
            </div>
          </div>
        </li>

        {parseInt(lastIndex) !== index + 1 && (
          <li
            className="
              flex
              flex-row
              items-center
              w-full
              justify-between
              border-l-2
              border-dashed
              border-l-[--grey2]
              pl-[20px]
              py-[30px]
              ml-[9px]
            "
          ></li>
        )}
      </ul>
    </>
  );
};

export default function ClientPage({ planData }) {
  const {
    Button,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Input,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    Form,
    FormControl,
    FormItem,
    FormLabel,
    CustomFormMessage,
    FormField,
  } = Components;

  //////////////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////////////
  const [isNum, setIsNum] = useState<number | null>(null); // 일정 null=전체일정
  const [isUpdate, setIsUpdate] = useState<boolean>(false); // 업데이트 모달
  const [isAddress, setIsAddress] = useState<boolean>(false); // 일차별 장소추가 모달
  const [rangeDate, setRangeDate] = useState<
    { year: string; month: string; day: string }[]
  >([]); // 여행 날짜
  const [items, setItems] = useState([]);
  const [updateDay, setUpdateDay] = useState<number | null>(null); // 수정할때 몇일차인지 선택

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor),
  );
  //////////////////////////////////////////////////////////////
  // HOOK
  //////////////////////////////////////////////////////////////
  const { isDesktop, isTablet, isMobile } = useDeviceSize();

  const findPlace = useFindPlace(() => {});
  const updatePlan = useUpdatePlan(() => {
    setIsUpdate(false);
    setIsAddress(false);
  });

  //////////////////////////////////////////////////////////////
  // STORE
  //////////////////////////////////////////////////////////////

  const meStore = useMeState((state) => state);
  const findPlaceStore = useFindPlaceStore((state) => state);
  const resultPlanStore = useResultPlan((state) => state);

  //////////////////////////////////////////////////////////////
  // FORM
  //////////////////////////////////////////////////////////////

  const keywordForm = useKeywordForm();

  //////////////////////////////////////////////////////////////
  // USEEFFECT
  //////////////////////////////////////////////////////////////

  useEffect(() => {
    if (isNum === null) {
      setItems(planData.days);
    } else if (planData.days[isNum]) {
      setItems([planData.days[isNum]]);
    } else {
      setItems([]);
    }
  }, [isNum]);

  useEffect(() => {
    // 초기값 세팅
    if (planData) {
      setItems(planData.days);
      setRangeDate(planData.date);
      resultPlanStore.setPlan(planData);
    }
  }, [planData]);

  useEffect(() => {
    if (resultPlanStore.plan) {
      setItems(resultPlanStore.plan.days);
      setRangeDate(resultPlanStore.plan.date);
    }
  }, [resultPlanStore.plan]);

  // const { kakao } = window;

  console.log(resultPlanStore);

  useEffect(() => {
    if (resultPlanStore.plan) {
      const script = document.createElement("script");
      script.src =
        "https://dapi.kakao.com/v2/maps/sdk.js?appkey=66560f77cf5a1dac46c7395a202f8825&autoload=false";
      script.async = true;
      script.onload = () => {
        // ✅ 이 시점에서만 window.kakao 접근 가능
        window.kakao.maps.load(() => {
          const container = document.getElementById("map");
          const options = {
            center: new window.kakao.maps.LatLng(
              resultPlanStore.plan.days[0][0].y,
              resultPlanStore.plan.days[0][0].x,
            ),
            level: 5,
          };
          const map = new window.kakao.maps.Map(container, options);

          // 일차별 라인

          for (let i = 0; i < resultPlanStore.plan.days.length; i++) {
            const path = [];
            const contents = [];
            const line = [`var(--main)`, `var(--main2)`, `var(--main3)`];

            if (i === 0) {
              path.push(
                new window.kakao.maps.LatLng(
                  resultPlanStore.plan.start.lat,
                  resultPlanStore.plan.start.lng,
                ),
              );

              contents.push("집");
            }

            resultPlanStore.plan.days[i].map((data) => {
              contents.push(data.place_name);
              path.push(
                new window.kakao.maps.LatLng(
                  data.y ? data.y : resultPlanStore.plan.start.lat,
                  data.x ? data.x : resultPlanStore.plan.start.lng,
                ),
              );
            });

            const polyline = new window.kakao.maps.Polyline({
              path: path,
              strokeWeight: 10,
              strokeColor: line[i],
              strokeOpacity: 1,
              strokeStyle: "solid",
            });

            polyline.setMap(map);

            path.forEach((pos) => {
              new window.kakao.maps.Marker({
                position: pos,
                map,
              });
            });
          }
        });
      };

      document.head.appendChild(script);
    }
  }, [resultPlanStore.plan]);

  //////////////////////////////////////////////////////////////
  // TOGGLE
  //////////////////////////////////////////////////////////////

  const addressToggle = (index) => {
    setUpdateDay(index);
    setIsAddress(!isAddress);
  };

  const updateToggle = () => {
    setIsUpdate(!isUpdate);
    setIsAddress(false);
  };

  const tabHandler = (data: number) => {
    setIsNum(data);
  };

  //////////////////////////////////////////////////////////////
  // HANDLER
  //////////////////////////////////////////////////////////////

  const updateHandler = useCallback(() => {
    for (let i = 0; i < items.length; i++) {
      items[i].map((value, index) => {
        if (
          value.status === 1 &&
          i !== items.length - 1 &&
          items[i].length - 1 === index
        ) {
          items[i + 1][0] = { ...items[i + 1][0], status: 1 };
        }
      });
    }

    const result = {
      ...planData,
      days: items,
    };

    updatePlan.mutate(result);
  }, [updatePlan, items]);

  const placeDeleteHandler = useCallback(
    (data: DayPlace) => {
      let parentIndex = null;

      for (let i = 0; i < items.length; i++) {
        for (let o = 0; o < items[i].length; o++) {
          if (data === items[i][o]) {
            parentIndex = i;
          }
        }
      }

      const deleteIndex = items[parentIndex].findIndex(
        (value) => value === data,
      );

      setItems((prev) =>
        // section : 일차별 장소
        // i : 일차 index
        prev.map((section, i) => {
          if (i !== parentIndex) return section;
          if (items[i][deleteIndex] === data) {
            section.splice(deleteIndex, 1);
          }
          if (deleteIndex > section.length - 1) return section;
          section[deleteIndex] = {
            ...section[deleteIndex],
            status: 1,
          };
          return section;
        }),
      );
    },
    [items],
  );

  const placePlusHandler = useCallback(
    (data: DayPlace) => {
      setItems((prev) =>
        // section : 일차별 장소
        // i : 일차 index
        prev.map((section, i) => {
          // 일차 Index와 같으면 장소 추가, 아니라면 장소 그대로
          if (i !== updateDay) return section;
          return [...section, { ...data, status: 1 }];
        }),
      );
    },
    [updateDay],
  );

  const findPlaceHandler = useCallback((data) => {
    findPlace.mutate({ keyword: data.keyword });
  }, []);

  //////////////////////////////////////////////////////////////
  //  TABLE
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////

  return (
    <>
      <article
        className="
          w-[100vw]
          h-[100vh]
        "
      >
        <ul
          className="
            flex
            flex-row
            items-center
            relative
            flex-wrap
            justify-end
            size-full
          "
        >
          <motion.li
            initial={{ left: `-300px` }}
            animate={{ left: isAddress ? `0` : `-300px` }}
            className="
              flex
              flex-col
              items-start
              justify-start
              h-full
              absolute
              top-0
              left-0
              w-[300px]
              py-[30px]
              bg-[hsl(var(--background))]
              px-[20px]
              z-[100]
              shadow-lg
              overflow-y-scroll
            "
            data-lenis-prevent
          >
            <div
              className="
                flex
                flex-row
                items-center
                justify-center
                text-[--darkGrey2]
              "
            >
              <p
                className="
                  text-[16px]
                  font-[700]
                  mr-[5px]
                "
              >
                1일차 일정 추가
              </p>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <p>
                      <Info />
                    </p>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    className="
                      z-[100]
                    "
                  >
                    1일차 일정을 추가합니다. <br />
                    다른 일차의 일정을 추가하시려면
                    <br />
                    일차옆 +버튼을 이용해주세요.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div
              className="
                flex
                w-full
                my-[10px]
              "
            >
              <Form {...keywordForm}>
                <form
                  onSubmit={keywordForm.handleSubmit((e) => {
                    findPlaceHandler(e);
                  })}
                  className="
                    flex
                    flex-row
                    w-full
                    space-x-2
                  "
                >
                  <FormField
                    control={keywordForm.control}
                    name="keyword"
                    render={({ field }) => {
                      return (
                        <FormItem
                          className="
                            w-full
                          "
                        >
                          <FormControl>
                            <Input
                              autoFocus
                              {...field}
                              placeholder="장소를 검색해주세요."
                            />
                          </FormControl>
                          <CustomFormMessage name="keyword" />
                        </FormItem>
                      );
                    }}
                  />
                  <Button type="submit">검색</Button>
                </form>
              </Form>
            </div>

            {findPlaceStore.place &&
              findPlaceStore.place.map((data) => {
                return (
                  <div
                    key={data.id}
                    className="
                      flex
                      flex-row
                      items-center
                      w-full
                      relative
                      justify-end
                      bg-[--lightGrey]
                      p-[10px]
                      rounded-[5px]
                      mb-[5px]
                    "
                  >
                    <div
                      className="
                        flex
                        flex-row
                        items-center
                        w-full
                        justify-between
                      "
                    >
                      <div
                        className="
                          flex
                          flex-row
                          items-center
                          justify-start
                          w-[calc(100%-20px)]
                        "
                      >
                        <div
                          className="
                            flex
                            flex-col
                            items-start
                            justify-center
                            w-[calc(100%-50px-10px]
                          "
                        >
                          <p
                            className="
                              text-[--main]
                              text-[14px]
                              font-[700]
                            "
                          >
                            {data.category_group_name}{" "}
                            <span
                              className="
                                text-[14px]
                                font-[700]
                                text-[hsl(var(--foreground))]
                              "
                            >
                              {data.place_name}
                            </span>
                          </p>
                          <p
                            className="
                              text-[--grey]
                              text-[12px]
                            "
                          >
                            {data.address_name}
                          </p>
                        </div>
                      </div>

                      <motion.p
                        whileHover={{
                          rotate: `90deg`,
                          transition: {
                            duration: 0.5,
                          },
                        }}
                        className="
                          text-[--darkGrey2]
                          text-[12px]
                          cursor-pointer
                        "
                        onClick={() => placePlusHandler(data)}
                      >
                        <PlusCircle />
                      </motion.p>
                    </div>
                  </div>
                );
              })}
          </motion.li>
          <motion.li
            initial={{ left: `-600px` }}
            animate={{ left: isAddress ? `300px` : `0` }}
            className="
              flex
              flex-col
              items-start
              justify-start
              w-full
              h-auto
              shadow-lg
              absolute
              top-[0]
              p-[30px]
              overflow-y-scroll
              sm:h-[100vh]
              sm:w-[600px]
            "
            data-lenis-prevent
            style={{ touchAction: "auto", pointerEvents: "auto" }}
          >
            <ul
              className="
                flex
                flex-row
                items-center
                w-full
                justify-between
                mb-[10px]
                flex-wrap
              "
            >
              <li
                className="
                  flex
                  flex-col
                  items-start
                  justify-start
                  sm:flex-row
                  sm:items-center
                "
              >
                <div
                  className="
                    flex
                    flex-row
                    items-center
                    justify-center
                  "
                >
                  <div
                    className="
                      mr-[5px]
                    "
                  >
                    <Plane />
                  </div>
                  <div>
                    <h1
                      className="
                        text-[20px]
                        font-[700]
                        mr-[5px]
                      "
                    >
                      {planData && planData.destination.name}
                    </h1>
                  </div>
                </div>
                <div
                  className="
                    text-[14px]
                    text-[--grey]
                    font-[700]
                  "
                >
                  {planData && planData.date[0].year}년{" "}
                  {planData && planData.date[0].month}월{" "}
                  {planData && planData.date[0].day}일 ~{" "}
                  {planData && planData.date[1].year}년{" "}
                  {planData && planData.date[1].month}월{" "}
                  {planData && planData.date[1].day}일
                </div>
              </li>
              {(resultPlanStore.plan && resultPlanStore.plan.UserId) ===
              (meStore.me && meStore.me.id) ? (
                isUpdate ? (
                  <motion.li
                    initial={{
                      y: 0,
                      rotate: `0deg`,
                    }}
                    whileHover={{
                      y: -5,
                      transition: {
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                      },
                    }}
                    className="
                      cursor-pointer
                    "
                    onClick={updateHandler}
                  >
                    <CheckCircle />
                  </motion.li>
                ) : (
                  <motion.li
                    initial={{
                      rotate: `0deg`,
                    }}
                    whileHover={{
                      rotate: `90deg`,
                      transition: {
                        duration: 0.5,
                      },
                    }}
                    className="
                      cursor-pointer
                    "
                    onClick={updateToggle}
                  >
                    <Settings />
                  </motion.li>
                )
              ) : (
                ""
              )}
            </ul>
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
                  flex
                  flex-col
                  items-center
                  justify-center
                  w-auto
                  mr-[10px]
                "
              >
                {planData && planData.traffic === "차량" ? (
                  <Car width={"30"} height="20" />
                ) : (
                  <Bus width={"30"} height="20" />
                )}
              </li>

              <HashTag title={planData && planData.category} type={1} />
            </ul>
            <ul
              className="
                flex
                flex-row
                items-center
                justify-start
                w-full
              "
            >
              <li>
                <Button
                  className="
                    mr-[5px]
                    mb-[5px]
                  "
                  variant={isNum === null ? "default" : "outline"}
                  onClick={() => tabHandler(null)}
                >
                  전체일정
                </Button>
              </li>
              {Array.from(
                { length: planData && planData.days.length },
                (_, index) => (
                  <li key={index}>
                    <Button
                      className="
                        mr-[5px]
                        mb-[5px]
                      "
                      variant={isNum === index ? "default" : "outline"}
                      onClick={() => tabHandler(index)}
                    >
                      {index + 1}일차
                    </Button>
                  </li>
                ),
              )}
            </ul>
            {items.map((data, index) => {
              return (
                <div
                  className="
                    w-full
                  "
                  key={index}
                >
                  <ul
                    className="
                      flex
                      flex-row
                      items-center
                      w-full
                      justify-between
                      mb-[10px]
                      mt-[40px]
                    "
                  >
                    <li
                      className="
                        flex
                        flex-row
                        items-center
                        justify-center
                      "
                    >
                      <p
                        className="
                          font-[700]
                          text-[14px]
                        "
                      >
                        {isNum !== null ? isNum + 1 : index + 1}일차
                      </p>

                      {isUpdate && (
                        <motion.p
                          initial={{
                            rotate: `0deg`,
                          }}
                          whileHover={{
                            rotate: `90deg`,
                            transition: {
                              duration: 0.5,
                            },
                          }}
                          className="
                            ml-[10px]
                            cursor-pointer
                          "
                          onClick={() => addressToggle(index)}
                        >
                          <PlusCircle size={24} />
                        </motion.p>
                      )}
                    </li>
                    {isUpdate ? (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className="
                              justify-start
                              text-left
                              w-[150px]
                              font-normal
                            "
                          >
                            <Calendar />
                            <span>
                              {rangeDate[index].year}-{rangeDate[index].month}-
                              {rangeDate[index].day}
                            </span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="
                            w-[550px]
                          "
                        >
                          <UpdateCalender
                            data={rangeDate}
                            setData={setRangeDate}
                          />
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <li
                        className="
                          font-[700]
                          text-[14px]
                        "
                      >
                        {planData.date[isNum !== null ? isNum : index].year}-
                        {planData.date[isNum !== null ? isNum : index].month}-
                        {planData.date[isNum !== null ? isNum : index].day}
                      </li>
                    )}
                  </ul>

                  <ul
                    className={`
                          flex
                          flex-col
                          items-start
                          justify-center
                          w-full
                      `}
                  >
                    <li
                      className="
                        flex
                        flex-row
                        items-center
                        justify-start
                        w-full
                      "
                    >
                      <div
                        className="
                          flex
                          flex-col
                          items-center
                          justify-center
                          text-center
                          rounded-[10px]
                          size-[20px]
                          bg-[--main3]
                          text-[hsl(var(--background))]
                          text-[12px]
                          mr-[10px]
                        "
                      >
                        1
                      </div>
                      <div
                        className="
                          flex
                          flex-row
                          items-center
                          justify-between
                          w-[calc(100%-30px)]
                        "
                      >
                        <p
                          className="
                            text-[grey]
                            text-[14px]
                          "
                        >
                          {index === 0
                            ? resultPlanStore.plan &&
                              resultPlanStore.plan.start.name
                            : resultPlanStore.plan &&
                              resultPlanStore.plan.days[index - 1][
                                resultPlanStore.plan.days[index - 1].length - 1
                              ].place_name}
                        </p>
                        <p
                          className="
                            text-[--darkGrey2]
                            text-[12px]
                          "
                        >
                          {isNum !== null ? isNum + 1 : index + 1}일차 시작
                        </p>
                      </div>
                    </li>

                    {isUpdate && (
                      <li
                        className="
                          flex
                          flex-row
                          items-center
                          w-full
                          justify-between
                          border-l-2
                          border-dashed
                          border-l-[--grey2]
                          pl-[20px]
                          py-[30px]
                          ml-[9px]
                        "
                      ></li>
                    )}
                  </ul>

                  {isUpdate ? (
                    // 모든 값은 변수로 관리되어야 dnd를 사용할 수 있음
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={({ active, over }) => {
                        if (!over || active.id === over.id) return;

                        const oldIndex = data.findIndex(
                          (item) => item.place_name === active.id,
                        );
                        const newIndex = data.findIndex(
                          (item) => item.place_name === over.id,
                        );

                        const newSection = arrayMove(data, oldIndex, newIndex);

                        setItems((prev) =>
                          // 해당 배열 안에서만 움직일것
                          prev.map((section, i) =>
                            i === index ? newSection : section,
                          ),
                        );
                      }}
                    >
                      <SortableContext
                        // sortableItem값과 일치해야함
                        items={data.map((d) => d.place_name)}
                        strategy={verticalListSortingStrategy}
                      >
                        {data.map((value, idx) => (
                          <SortableItem
                            key={`${index}-${idx}`}
                            // id값는 항상 string값일것
                            id={value.place_name}
                            index={idx}
                            lastIndex={data.length}
                            data={value}
                            placeDeleteHandler={placeDeleteHandler}
                          />
                        ))}
                      </SortableContext>
                    </DndContext>
                  ) : (
                    data.map((value, idx) => {
                      // 👇🏻 전체일정일때 마지막 날 마지막 일정 노란색원표시
                      // (idx === data.length - 1 && planData && planData.days.length - 1 === index)
                      // 👇🏻 특정 일차 선택시 마지막 날 마지막 일정 노란색원표시
                      // (isNum !== null && isNum === (planData && planData.days.length - 1) && idx === data.length - 1)
                      return (idx === data.length - 1 &&
                        planData &&
                        planData.days.length - 1 === index) ||
                        (isNum !== null &&
                          isNum === (planData && planData.days.length - 1) &&
                          idx === data.length - 1) ? (
                        <ul
                          className="
                            flex
                            flex-col
                            items-start
                            justify-center
                            w-full
                            mb-[50px]
                          "
                          key={`${index}-${idx}`}
                        >
                          <li
                            className="
                              flex
                              flex-row
                              items-center
                              w-full
                              justify-between
                              border-l-2
                              border-dashed
                              border-l-[--grey2]
                              pl-[20px]
                              py-[30px]
                              ml-[9px]
                            "
                          >
                            <div
                              className="
                                flex
                                flex-row
                                items-center
                                justify-start
                                text-[grey]
                              "
                            >
                              <Car width="15" height="15" />{" "}
                              <p
                                className="
                                  text-[14px]
                                  ml-[5px]
                                "
                              >
                                {Math.floor(value.duration / 3600)}시간{" "}
                                {Math.floor((value.duration % 3600) / 60)}분
                                소요
                              </p>
                            </div>
                          </li>
                          <li
                            className="
                              flex
                              flex-row
                              items-center
                              justify-start
                              w-full
                            "
                          >
                            <div
                              className="
                                flex
                                flex-col
                                items-center
                                justify-center
                                text-center
                                rounded-[10px]
                                size-[20px]
                                bg-[--main3]
                                text-[hsl(var(--background))]
                                text-[12px]
                                mr-[10px]
                              "
                            >
                              {data.length + 1}
                            </div>
                            <div
                              className="
                                flex
                                flex-row
                                items-center
                                justify-between
                                w-[calc(100%-30px)]
                              "
                            >
                              <p
                                className="
                                  text-[grey]
                                  text-[14px]
                                "
                              >
                                {index === planData.days.length - 1
                                  ? planData && planData.start.name
                                  : data[data.length - 1].place_name}
                              </p>
                              <p
                                className="
                                  text-[--darkGrey2]
                                  text-[12px]
                                "
                              >
                                여행 마무리
                              </p>
                            </div>
                          </li>
                        </ul>
                      ) : (
                        <ul
                          key={`${idx}-${index}`}
                          className="
                            flex
                            flex-col
                            items-start
                            justify-center
                            w-full
                          "
                        >
                          <li
                            className="
                              flex
                              flex-row
                              items-center
                              w-full
                              justify-between
                              border-l-2
                              border-dashed
                              border-l-[--grey2]
                              pl-[20px]
                              py-[30px]
                              ml-[9px]
                            "
                          >
                            <div
                              className="
                                flex
                                flex-col
                                items-start
                                justify-center
                                w-[60%]
                              "
                            >
                              <div
                                className="
                                  flex
                                  flex-row
                                  items-center
                                  justify-start
                                  text-[grey]
                                "
                              >
                                <Car width="15" height="15" />{" "}
                                <p
                                  className="
                                    text-[14px]
                                    ml-[5px]
                                  "
                                >
                                  {Math.floor(value.duration / 3600)}시간{" "}
                                  {Math.floor((value.duration % 3600) / 60)}분
                                  소요
                                </p>
                              </div>
                            </div>

                            <div
                              className="
                                flex
                                flex-col
                                items-center
                                justify-center
                                w-[40%]
                              "
                            ></div>
                          </li>
                          <li
                            className="
                              flex
                              flex-row
                              items-center
                              w-full
                              relative
                              justify-end
                            "
                          >
                            <div
                              className={`
                                    flex
                                    flex-col
                                    items-center
                                    justify-center
                                    h-full
                                    text-center
                                    rounded-[5px]
                                    w-[20px]
                                    ${idx === data.length - 1 && planData && planData.days.length - 1 !== index ? "bg-[--main3]" : "bg-[--main]"}
                                    text-[hsl(var(--background))]
                                    text-[12px]
                                    mr-[10px]
                                    absolute
                                    top-[0]
                                    left-[0]
                                `}
                            >
                              {idx + 2}
                            </div>
                            <div
                              className="
                                flex
                                flex-row
                                items-center
                                justify-between
                                w-[calc(100%-30px)]
                              "
                            >
                              <div
                                className="
                                  flex
                                  flex-col
                                  items-start
                                  justify-center
                                  w-[60%]
                                "
                              >
                                <p
                                  className={`

                                      ${value.category_group_code === "AD5" ? "text-[--main3]" : "text-[--main]"}
                                      text-[14px]
                                      font-[700]
                                  `}
                                >
                                  {value.category_group_name}
                                </p>

                                <p
                                  className="
                                    text-[14px]
                                    font-[700]
                                  "
                                >
                                  {value.place_name}
                                </p>
                                <p
                                  className="
                                    text-[grey]
                                    text-[14px]
                                  "
                                >
                                  {value.address_name}
                                </p>
                                <div
                                  className="
                                    flex
                                    flex-row
                                    items-center
                                    justify-start
                                  "
                                >
                                  <Star
                                    className="
                                      w-[15px]
                                      text-[grey]
                                    "
                                  />{" "}
                                  <p
                                    className="
                                      text-[14px]
                                      ml-[5px]
                                      text-[grey]
                                      cursor-pointer
                                      hover:text-[--main]
                                    "
                                    onClick={() => {
                                      window.open(value.place_url);
                                    }}
                                  >
                                    카카오맵으로 확인하기
                                  </p>
                                </div>
                              </div>

                              <div
                                className={`
        flex
        flex-col
        items-center
        justify-center
        w-[40%]
    `}
                              >
                                <img
                                  src={value.thumbnail_url}
                                  className="
                                    size-[80px]
                                    rounded-[10px]
                                  "
                                />
                              </div>

                              <p
                                className="
                                  text-[--darkGrey2]
                                  text-[12px]
                                "
                              ></p>
                            </div>
                          </li>
                        </ul>
                      );
                    })
                  )}
                </div>
              );
            })}
          </motion.li>
          <motion.li
            className={`
        h-screen
        ${isAddress ? "w-[calc(100%-600px-300px)]" : "w-[calc(100%-600px)]"}
        hidden
        duration-300
        bg-black
        sm:flex
    `}
            id="map"
          ></motion.li>
        </ul>
      </article>
    </>
  );
}
