"use client";

import { DayChart } from "@app/components/ui/admin/dayChart";
import Login from "@app/components/ui/admin/login";

export default function ClientPage() {
  return (
    <>
      <Login />
      <article
        className="flex flex-col items-center justify-center  size-full"
      >
        <ul
          className="
            flex
            flex-row
            items-center
            w-full
            justify-between
            h-[50%]
          "
        >
          <li
            className="
              flex
              flex-col
              items-center
              justify-center
              h-full
              w-[calc(100%/3-10px)]
            "
          >
            <DayChart />
          </li>
          <li></li>
          <li></li>
        </ul>
        <ul
          className="
            flex
            flex-row
            items-center
            w-full
            justify-between
            h-[50%]
          "
        ></ul>
      </article>
    </>
  );
}
