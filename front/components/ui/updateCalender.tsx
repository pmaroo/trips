"use client";
import { parseDate } from "@internationalized/date";
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  Heading,
  I18nProvider,
  RangeCalendar,
} from "react-aria-components";
import { toast } from "sonner";

export default function UpdateCalender({ data, setData }) {
  const selectHandler = (e: {
    start: { year: number; month: number; day: number };
    end: { year: number; month: number; day: number };
  }) => {
    const startMonth = e.start.month;
    const endMonth = e.end.month;
    const startDay = e.start.day;
    const endDay = e.end.day;

    const resultMonth = endMonth - startMonth;
    const resultDay = endDay - startDay;

    // 해당 month가 30일인지 31일인지 구하기
    const monthDay =
      startMonth < 8
        ? // 8보다작을때
          startMonth % 2 === 0
          ? //짝수
            30
          : //홀수
            31
        : // 8보다 같거나 클때
          startMonth % 2 === 0
          ? //짝수
            31
          : //홀수
            30;

    const originDate =
      resultMonth === 0 ? resultDay + 1 : monthDay - startDay + endDay + 1;
    const date: {
      year: string;
      month: string;
      day: string;
    }[] = [];

    // 0 == 마지막날

    // 30 - 28 = 2

    // 28,29,30,1,2,3
    // 0,1,2,3,4,5
    // 2 = monthDay - startDay
    //
    //  2- 1
    for (let i = 0; i < originDate; i++) {
      resultMonth === 0
        ? date.push(
            i === 0
              ? {
                  year: String(e.start.year),
                  month:
                    e.start.month < 10
                      ? "0" + String(e.start.month)
                      : String(e.start.month),
                  day:
                    e.start.day < 10
                      ? "0" + String(e.start.day)
                      : String(e.start.day),
                }
              : originDate - 1 === i
                ? {
                    year: String(e.end.year),
                    month:
                      e.end.month < 10
                        ? "0" + String(e.end.month)
                        : String(e.end.month),
                    day:
                      e.end.day < 10
                        ? "0" + String(e.end.day)
                        : String(e.end.day),
                  }
                : {
                    year: String(e.start.year),
                    month:
                      e.start.month < 10
                        ? "0" + String(e.start.month)
                        : String(e.start.month),
                    day:
                      startDay + i < 10
                        ? "0" + String(startDay + i)
                        : String(startDay + i),
                  },
          )
        : date.push(
            i === 0
              ? {
                  year: String(e.start.year),
                  month:
                    e.start.month < 10
                      ? "0" + String(e.start.month)
                      : String(e.start.month),
                  day:
                    e.start.day < 10
                      ? "0" + String(e.start.day)
                      : String(e.start.day),
                }
              : originDate - 1 === i
                ? {
                    year: String(e.end.year),
                    month:
                      e.end.month < 10
                        ? "0" + String(e.end.month)
                        : String(e.end.month),
                    day:
                      e.end.day < 10
                        ? "0" + String(e.end.day)
                        : String(e.end.day),
                  }
                : monthDay - startDay < i
                  ? // 다음달로 넘어감 [1]
                    {
                      year: String(e.end.year),
                      month:
                        e.end.month < 10
                          ? "0" + String(e.end.month)
                          : String(e.end.month),
                      day:
                        endDay - (originDate - i) < 10
                          ? "0" + String(endDay - (originDate - i))
                          : String(endDay - (originDate - i)),
                    }
                  : // 이전달 [0]
                    {
                      year: String(e.start.year),
                      month:
                        e.start.month < 10
                          ? "0" + String(e.start.month)
                          : String(e.start.month),
                      day:
                        startDay + i < 10
                          ? "0" + String(startDay + i)
                          : String(startDay + i),
                    },
          );
    }

    if (data.length !== date.length) {
      return toast(
        "여행 날짜를 맞춰주세요. 여행 일차를 바꾸시려면 AI마루에게 다시 일정을 짜달라고 부탁하세요!",
      );
    }

    setData(date);
    toast("여행 날짜가 변경되었습니다.");
  };

  return (
    <I18nProvider locale="ko">
      <RangeCalendar
        aria-label="여행 날짜 선택"
        className="
          w-full
        "
        visibleDuration={{ months: 2 }}
        pageBehavior="single"
        value={{
          start: parseDate(
            `${String(data[0].year)}-${String(data[0].month)}-${String(data[0].day)}`,
          ),
          end: parseDate(
            `${String(data[data.length - 1].year)}-${String(data[data.length - 1].month)}-${String(data[data.length - 1].day)}`,
          ),
        }}
        onChange={(e) => selectHandler(e)}
      >
        <header
          className="
            flex
            flex-row
            items-center
            justify-between
            mb-2
          "
        >
          <Button
            slot="previous"
            className="
              px-2
              py-1
            "
          >
            ◀
          </Button>
          <Heading
            className="
              text-lg
              font-bold
            "
          />
          <Button
            slot="next"
            className="
              px-2
              py-1
            "
          >
            ▶
          </Button>
        </header>

        <div
          className="
            flex
            flex-row
            items-center
            w-full
            justify-between
            gap-4
          "
        >
          <CalendarGrid
            className="
              w-[49%]
              h-[300px]
            "
          >
            {(date) => {
              return (
                <CalendarCell date={date}>
                  {({ isSelected, isOutsideMonth }) => (
                    <div
                      className={`
                        flex
                        items-center
                        justify-center
                        w-full
                        h-full
                        text-sm
                        rounded-md
                        cursor-pointer
                        ${isSelected ? "bg-blue-500 text-white" : ""}

                        ${isOutsideMonth ? "text-gray-300" : ""}
                        transition
                        hover:bg-blue-100
                    `}
                    >
                      {date.day}
                    </div>
                  )}
                </CalendarCell>
              );
            }}
          </CalendarGrid>

          <CalendarGrid
            className="
              w-[49%]
              h-[300px]
            "
            offset={{ months: 1 }}
          >
            {(date) => {
              return (
                <CalendarCell date={date}>
                  {({ isSelected, isOutsideMonth }) => (
                    <div
                      className={`
                        flex
                        items-center
                        justify-center
                        w-full
                        h-full
                        text-sm
                        rounded-md
                        cursor-pointer
                        ${isSelected ? "bg-[--main] text-white" : ""}

                        ${isOutsideMonth ? "text-gray-300" : ""}
                        transition
                        hover:bg-[--lightMain]
                    `}
                    >
                      {date.day}
                    </div>
                  )}
                </CalendarCell>
              );
            }}
          </CalendarGrid>
        </div>
      </RangeCalendar>
    </I18nProvider>
  );
}
