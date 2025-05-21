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

export default function Calender({
  setSelectData,
}: {
  setSelectData: Function;
}) {
  const changeHandler = (e) => {
    const startMonth =
      String(e.start.month).length === 1
        ? "0" + String(e.start.month)
        : String(e.start.month);
    const endMonth =
      String(e.end.month).length === 1
        ? "0" + String(e.end.month)
        : String(e.end.month);
    const startDay =
      String(e.start.day).length === 1
        ? "0" + String(e.start.day)
        : String(e.start.day);
    const endDay =
      String(e.end.day).length === 1
        ? "0" + String(e.end.day)
        : String(e.end.day);

    setSelectData([
      { year: String(e.start.year), month: startMonth, day: startDay },
      { year: String(e.end.year), month: endMonth, day: endDay },
    ]);
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
        onChange={(e) => changeHandler(e)}
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
