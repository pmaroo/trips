"use client";

const Test = () => {
  return (
    <ul
      className="flex flex-row w-screen h-screen "
    >
      <li
        className="
        w-[600px]
        h-screen
        overflow-y-scroll
        bg-black
        p-6
      "
      >
        <div
          className="
          bg-white
          h-[2000px]
        "
        />
      </li>
      <li
        className="flex-1 h-screen  bg-slate-500"
      />
    </ul>
  );
};

export default Test;
