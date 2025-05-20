"use client";
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  Heading,
  I18nProvider,
  RangeCalendar,
} from "react-aria-components";
import { parse } from "date-fns";
import { parseDate, today } from "@internationalized/date";

export default function Calender() {
  return (
    <I18nProvider locale="ko">
      <RangeCalendar
        aria-label="여행 날짜 선택"
        className="w-full "
        visibleDuration={{ months: 2 }}
        pageBehavior="single"
      >
        <header
          className="flex flex-row items-center justify-between mb-2 "
        >
          <Button
            slot="previous"
            className="px-2 py-1 "
          >
            ◀
          </Button>
          <Heading
            className="text-lg font-bold "
          />
          <Button
            slot="next"
            className="px-2 py-1 "
          >
            ▶
          </Button>
        </header>

        <div
          className="flex flex-row items-center justify-between w-full gap-4 "
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
