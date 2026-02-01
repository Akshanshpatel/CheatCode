import {
  Search,
  CircleQuestionMark,
  Trash2,
} from "lucide-react";
import { useState } from "react";

export default function ToolBar({
  value,
  onChange,
  activeTopic,
  setActiveTopic,
}) {
  const [superman, setsuperman] = useState(false);
  const [batman, setbatman] = useState(false);

  return (
    <section
      className="
        mt-10 mx-auto w-10/12
        bg-(--box-qt)
        rounded-lg px-6 py-4
        flex items-center justify-between
        transition-colors
      "
    >
      {/* Left part */}
      <div className="relative w-100 flex gap-5 sm:gap-10">

        {/* Search icon */}
        <Search
          className="
            absolute left-3 top-1/2 -translate-y-1/2
            w-4 h-4 sm:w-[18px] sm:h-[18px]
          "
        />

        {/* Input */}
        <input
          type="text"
          placeholder="Search (No./Name)"
          value={value}
          onChange={onChange}
          className="
            w-full pl-9 sm:pl-10 py-1.5 sm:py-2 rounded
            bg-(--bg-color)
            text-(--font-color)
            text-sm sm:text-base
            focus:outline-none
          "
        />

        {/* Superman */}
        <div className="relative flex justify-center">
          <div
            className={`
              absolute -top-11 z-20 rounded-md
              bg-(--bg-color)
              px-3 py-1.5 text-xs font-medium
              text-(--font-color)
              transition-all duration-200 ease-out
              ${
                superman
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2 pointer-events-none"
              }
            `}
          >
            DSA
            <div
              className="
                absolute left-1/2 top-full h-2 w-2
                -translate-x-1/2 rotate-45
                bg-(--bg-color)
              "
            />
          </div>

          <img
            src="/superman.svg"
            className={`
              relative h-fit w-36 sm:w-30 cursor-pointer
              transition-opacity duration-200
              ${
                activeTopic === "dsa"
                  ? "opacity-100"
                  : "opacity-40"
              }
            `}
            onClick={() => setActiveTopic("dsa")}
            onMouseEnter={() => setsuperman(true)}
            onMouseLeave={() => setsuperman(false)}
          />
        </div>

        {/* Batman */}
        <div className="relative flex justify-center">
          <div
            className={`
              absolute -top-14 z-20 rounded-md
              bg-(--bg-color)
              px-3 py-1.5 text-xs font-medium
              text-(--font-color)
              transition-all duration-200 ease-out
              ${
                batman
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2 pointer-events-none"
              }
            `}
          >
            System Design
            <div
              className="
                absolute left-1/2 top-full h-2 w-2
                -translate-x-1/2 rotate-45
                bg-(--bg-color)
              "
            />
          </div>

          <img
            src="/batman5.svg"
            className={`
              relative h-fit w-36 sm:w-30 cursor-pointer
              transition-opacity duration-200
              ${
                activeTopic === "system"
                  ? "opacity-100"
                  : "opacity-40"
              }
            `}
            onClick={() => setActiveTopic("system")}
            onMouseEnter={() => setbatman(true)}
            onMouseLeave={() => setbatman(false)}
          />
        </div>
      </div>

      {/* Right part */}
      <button
        className="
          h-8 w-8 sm:h-10 sm:w-10
          flex items-center justify-center rounded-md
          bg-(--bg-color)
          hover:bg-red-500
          transition-colors
        "
      >
        <Trash2
          className="
            text-(--font-color)
            cursor-pointer
            w-4 h-4 sm:w-5 sm:h-5
          "
        />
      </button>
    </section>
  );
}
