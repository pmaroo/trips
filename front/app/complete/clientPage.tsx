"use client";

import { useEffect, useRef, useState } from "react";
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
import { usePlanStore, useResultPlan } from "@store/planStore";
import { useCreatePlan } from "@hooks/reactQuery/usePlan";
import Bus from "@components/svg/bus";

const SortableItem = ({ id, index }: { id: string; index: number }) => {
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
    <ul
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex flex-col items-start justify-center w-full "
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
          className="
            flex
            flex-col
            items-center
            justify-center
            h-full
            text-center
            rounded-[5px]
            w-[20px]
            bg-[--main]
            text-[hsl(var(--background))]
            text-[12px]
            mr-[10px]
            absolute
            top-[0]
            left-[0]
          "
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
                className="
                  text-[--main]
                  text-[14px]
                  font-[700]
                  mr-[5px]
                "
              >
                명소{" "}
                <span
                  className="
                    text-[14px]
                    font-[700]
                    text-[hsl(var(--foreground))]
                  "
                >
                  대전 마루집
                </span>
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
              >
                <XCircle size={16} color="#ff0000" />
              </motion.p>
            </div>
            <div
              className="flex flex-row items-center justify-start "
            >
              <p
                className="
                  mr-[10px]
                "
              >
                <Repeat size={16} />
              </p>
              <Select>
                <SelectTrigger
                  className="
                    bg-[hsl(var(--background))]
                    h-[30px]
                  "
                >
                  <SelectValue placeholder="이용시간을 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1시간</SelectItem>
                  <SelectItem value="2">2시간</SelectItem>
                  <SelectItem value="3">3시간</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
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
        </div>
      </li>

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
          <Car width="15" height="15" />
          <p
            className="
              text-[14px]
              ml-[5px]
            "
          >
            13:50 ~ 15:50 (1시간)
          </p>
        </div>
      </li>
    </ul>
  );
};

export default function ClientPage() {
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
  } = Components;
  //////////////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////////////
  const [isNum, setIsNum] = useState<number>(0);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [isAddress, setIsAddress] = useState<boolean>(false);
  const [items, setItems] = useState(
    Array.from({ length: 8 }, (_, i) => `item-${i}`),
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor),
  );
  //////////////////////////////////////////////////////////////
  // HOOK
  //////////////////////////////////////////////////////////////
  const { isDesktop, isTablet, isMobile } = useDeviceSize();

  //////////////////////////////////////////////////////////////
  // STORE
  //////////////////////////////////////////////////////////////

  const resultPlan = useResultPlan((state) => state);
  // const resultPlan = usePlanStore((state) => state);
  console.log(resultPlan.plan);
  console.log("??");
  //////////////////////////////////////////////////////////////
  // FORM
  //////////////////////////////////////////////////////////////

  const placeDTOForm = useUpdatePlaceForm();
  //////////////////////////////////////////////////////////////
  // USEEFFECT
  //////////////////////////////////////////////////////////////

  // useEffect(() => {
  //   const container = document.getElementById("map");
  //   const options = {
  //     center: new kakao.maps.LatLng(37.5665, 126.978),
  //     level: 5,
  //   };
  //   const map = new kakao.maps.Map(container, options);

  //   // 첫 번째 선 (빨간색)
  //   const path1 = [
  //     new kakao.maps.LatLng(37.5665, 126.978), // 서울시청
  //     new kakao.maps.LatLng(37.57, 126.983), // 광화문
  //   ];

  //   const polyline1 = new kakao.maps.Polyline({
  //     path: path1,
  //     strokeWeight: 5,
  //     strokeColor: "#FF0000", // 빨간색
  //     strokeOpacity: 0.8,
  //     strokeStyle: "solid",
  //   });

  //   polyline1.setMap(map);

  //   // 두 번째 선 (파란색)
  //   const path2 = [
  //     new kakao.maps.LatLng(37.57, 126.983), // 광화문
  //     new kakao.maps.LatLng(37.5744, 126.9575), // 독립문
  //   ];

  //   const polyline2 = new kakao.maps.Polyline({
  //     path: path2,
  //     strokeWeight: 5,
  //     strokeColor: "#0000FF", // 파란색
  //     strokeOpacity: 0.8,
  //     strokeStyle: "solid",
  //   });

  //   polyline2.setMap(map);

  //   // 마커들 (선택)
  //   [...path1, path2[1]].forEach((pos) => {
  //     new kakao.maps.Marker({
  //       position: pos,
  //       map,
  //     });
  //   });
  // }, []);
  //////////////////////////////////////////////////////////////
  // TOGGLE
  //////////////////////////////////////////////////////////////

  const addressToggle = () => {
    setIsAddress(!isAddress);
  };

  const updateToggle = () => {
    setIsUpdate(!isUpdate);
  };

  const tabHandler = (data: number) => {
    setIsNum(data);
  };

  //////////////////////////////////////////////////////////////
  // HANDLER
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  //  TABLE
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////

  return (
    <>
      <article
        className="w-screen min-h-screen "
      >
        <ul
          className="flex flex-row items-center justify-end  size-full"
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
            "
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
                  <TooltipContent side="bottom">
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
                space-x-2
                my-[10px]
              "
            >
              <Input placeholder="장소를 검색해주세요." />
              <Button>검색</Button>
            </div>

            <div
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
              "
            >
              <div
                className="flex flex-row items-center justify-between w-full "
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
                      size-[50px]
                      rounded-[5px]
                      bg-[--grey]
                      mr-[10px]
                      overflow-hidden
                    "
                  >
                    <img
                      src="/daejeon.png"
                      className=" size-full"
                    />
                  </div>
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
                      명소{" "}
                      <span
                        className="
                          text-[14px]
                          font-[700]
                          text-[hsl(var(--foreground))]
                        "
                      >
                        대전 마루집
                      </span>
                    </p>
                    <p
                      className="
                        text-[--grey]
                        text-[12px]
                      "
                    >
                      대전 삼성동 346-3
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
                  onClick={addressToggle}
                >
                  <PlusCircle />
                </motion.p>
              </div>
            </div>
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
              static
              top-[0]
              p-[30px]
              overflow-auto
              sm:h-screen
              sm:w-[600px]
            "
          >
            <ul
              className="
                flex
                flex-row
                items-center
                w-full
                justify-between
                mb-[10px]
              "
            >
              <li
                className="flex flex-col items-start justify-start  sm:flex-row sm:items-center"
              >
                <div
                  className="flex flex-row items-center justify-center "
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
                      {resultPlan.plan && resultPlan.plan.destination.name}
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
                  {resultPlan.plan && resultPlan.plan.date[0].year}년{" "}
                  {resultPlan.plan && resultPlan.plan.date[0].month}월{" "}
                  {resultPlan.plan && resultPlan.plan.date[0].day}일 ~{" "}
                  {resultPlan.plan && resultPlan.plan.date[1].year}년{" "}
                  {resultPlan.plan && resultPlan.plan.date[1].month}월{" "}
                  {resultPlan.plan && resultPlan.plan.date[1].day}일
                </div>
              </li>
              {isUpdate ? (
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
                  className="cursor-pointer "
                  onClick={updateToggle}
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
                  className="cursor-pointer "
                  onClick={updateToggle}
                >
                  <Settings />
                </motion.li>
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
                {resultPlan.plan && resultPlan.plan.traffic === "차량" ? (
                  <Car width={"30"} height="20" />
                ) : (
                  <Bus width={"30"} height="20" />
                )}
              </li>

              <HashTag
                title={resultPlan.plan && resultPlan.plan.category}
                type={1}
              />
            </ul>
            <ul
              className="
                flex
                flex-row
                items-center
                justify-start
                w-full
                mb-[20px]
              "
            >
              <li>
                <Button
                  className="
                    mr-[5px]
                    mb-[5px]
                  "
                  variant={isNum === 0 ? "default" : "outline"}
                  onClick={() => tabHandler(0)}
                >
                  전체일정
                </Button>
              </li>
              {Array.from(
                { length: resultPlan.plan && resultPlan.plan.days.length },
                (_, index) => (
                  <li key={index}>
                    <Button
                      className="
                        mr-[5px]
                        mb-[5px]
                      "
                      variant={isNum === 1 ? "default" : "outline"}
                      onClick={() => tabHandler(1)}
                    >
                      {index + 1}일차
                    </Button>
                  </li>
                ),
              )}
            </ul>
            {resultPlan.plan &&
              resultPlan.plan.days.map((data, index) => {
                return (
                  <div
                    className="w-full "
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
                      "
                    >
                      <li
                        className="flex flex-row items-center justify-center "
                      >
                        <p
                          className="
                            font-[700]
                            text-[14px]
                          "
                        >
                          {index + 1}일차
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
                            onClick={addressToggle}
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
                              <span>2025-05-30</span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="
                              w-[550px]
                            "
                          >
                            <UpdateCalender />
                          </PopoverContent>
                        </Popover>
                      ) : (
                        <li
                          className="
                            font-[700]
                            text-[14px]
                          "
                        >
                          2025-08-01(수)
                        </li>
                      )}
                    </ul>

                    <ul
                      className="flex flex-col items-start justify-center w-full "
                    >
                      <li
                        className="flex flex-row items-center justify-start w-full "
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
                              ? resultPlan.plan && resultPlan.plan.start.name
                              : resultPlan.plan &&
                                resultPlan.plan.days[index - 1][
                                  resultPlan.plan.days[index - 1].length - 1
                                ].name}
                          </p>
                          <p
                            className="
                              text-[--darkGrey2]
                              text-[12px]
                            "
                          >
                            {index + 1}일차 시작
                          </p>
                        </div>
                      </li>
                    </ul>

                    {isUpdate ? (
                      <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={({ active, over }) => {
                          if (active.id !== over?.id) {
                            const oldIndex = items.indexOf(active.id as string);
                            const newIndex = items.indexOf(over?.id as string);
                            setItems((items) =>
                              arrayMove(items, oldIndex, newIndex),
                            );
                          }
                        }}
                      >
                        <SortableContext
                          items={items}
                          strategy={verticalListSortingStrategy}
                        >
                          {items.map((id, index) => (
                            <SortableItem key={id} id={id} index={index} />
                          ))}
                        </SortableContext>
                      </DndContext>
                    ) : (
                      data.map((value, idx) => {
                        return data.length - 1 === idx &&
                          resultPlan.plan &&
                          resultPlan.plan.days.length - 1 !== index ? (
                          <ul
                            key={`${idx}-${index}`}
                            className="
                              flex
                              flex-col
                              items-start
                              justify-center
                              w-full
                              mb-[50px]
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
                                  1시간소요
                                </p>
                              </div>
                            </li>
                            <li
                              className="flex flex-row items-center justify-start w-full "
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
                                  {index === resultPlan.plan.days.length - 1
                                    ? resultPlan.plan &&
                                      resultPlan.plan.start.name
                                    : data[data.length - 1].name}
                                </p>
                                <p
                                  className="
                                    text-[--darkGrey2]
                                    text-[12px]
                                  "
                                >
                                  {index + 1}일차 마무리
                                </p>
                              </div>
                            </li>
                          </ul>
                        ) : (
                          <ul
                            key={`${idx}-${index}`}
                            className="flex flex-col items-start justify-center w-full "
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
                                    {value.duration}시간 소요
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
                              className="relative flex flex-row items-center justify-end w-full "
                            >
                              <div
                                className="
                                  flex
                                  flex-col
                                  items-center
                                  justify-center
                                  h-full
                                  text-center
                                  rounded-[5px]
                                  w-[20px]
                                  bg-[--main]
                                  text-[hsl(var(--background))]
                                  text-[12px]
                                  mr-[10px]
                                  absolute
                                  top-[0]
                                  left-[0]
                                "
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
                                    className="
                                      text-[--main]
                                      text-[14px]
                                      font-[700]
                                    "
                                  >
                                    명소
                                  </p>
                                  <p
                                    className="
                                      text-[14px]
                                      font-[700]
                                    "
                                  >
                                    {value.name}
                                  </p>
                                  <p
                                    className="
                                      text-[grey]
                                      text-[14px]
                                    "
                                  >
                                    {value.address}
                                  </p>
                                  <div
                                    className="flex flex-row items-center justify-start "
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
                                      "
                                    >
                                      {value.rating}
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
                                >
                                  <img
                                    src="/daejeon.png"
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
                    {resultPlan.plan &&
                      resultPlan.plan.days.length - 1 === index && (
                        <ul
                          className="
                            flex
                            flex-col
                            items-start
                            justify-center
                            w-full
                            mb-[50px]
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
                                1시간소요
                              </p>
                            </div>
                          </li>
                          <li
                            className="flex flex-row items-center justify-start w-full "
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
                              {data.length + 2}
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
                                {index === resultPlan.plan.days.length - 1
                                  ? resultPlan.plan &&
                                    resultPlan.plan.start.name
                                  : data[data.length - 1].name}
                              </p>
                              <p
                                className="
                                  text-[--darkGrey2]
                                  text-[12px]
                                "
                              >
                                {index + 1}일차 마무리
                              </p>
                            </div>
                          </li>
                        </ul>
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
        sm:flex
    `}
            id="map"
          ></motion.li>
        </ul>
      </article>
    </>
  );
}
