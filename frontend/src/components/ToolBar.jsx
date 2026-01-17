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
        mt-10 mx-auto w-full sm:w-10/12
        bg-[#2f3136] rounded-lg
        px-4 sm:px-6 py-4
        flex flex-col sm:flex-row
        gap-4 sm:gap-0
        sm:items-center sm:justify-between
      "
    >
      {/* LEFT */}
      <div
        className="
          relative flex flex-col sm:flex-row
          gap-4 sm:gap-10
          w-full sm:w-auto
        "
      >
        {/* SEARCH */}
        <div className="relative w-full sm:w-80">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search"
            value={value}
            onChange={onChange}
            className="
              w-full pl-10 py-2 rounded
              bg-[#202225] text-white
              focus:outline-none
            "
          />
        </div>

        {/* DSA ICON */}
        <div className="relative flex justify-center sm:justify-start">
          {/* Tooltip – desktop only */}
          <div
            className={`
              hidden sm:block
              absolute -top-11 z-20
              rounded-md bg-neutral-900
              px-3 py-1.5 text-xs font-medium text-white
              transition-all duration-200
              ${superman ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}
            `}
          >
            DSA
            <div className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 rotate-45 bg-neutral-900" />
          </div>

          <img
            src="/superman.svg"
            className={`
              w-20 sm:w-30 cursor-pointer
              transition-opacity duration-200
              ${activeTopic === "dsa" ? "opacity-100" : "opacity-40"}
            `}
            onClick={() => setActiveTopic("dsa")}
            onMouseEnter={() => setsuperman(true)}
            onMouseLeave={() => setsuperman(false)}
          />
        </div>

        {/* SYSTEM DESIGN ICON */}
        <div className="relative flex justify-center sm:justify-start">
          {/* Tooltip – desktop only */}
          <div
            className={`
              hidden sm:block
              absolute -top-14 z-20
              rounded-md bg-neutral-900
              px-3 py-1.5 text-xs font-medium text-white
              transition-all duration-200
              ${batman ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}
            `}
          >
            System Design
            <div className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 rotate-45 bg-neutral-900" />
          </div>

          <img
            src="/batman5.svg"
            className={`
              w-20 sm:w-30 cursor-pointer
              transition-opacity duration-200
              ${activeTopic === "system" ? "opacity-100" : "opacity-40"}
            `}
            onClick={() => setActiveTopic("system")}
            onMouseEnter={() => setbatman(true)}
            onMouseLeave={() => setbatman(false)}
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex gap-3 justify-center sm:justify-end">
        <button className="h-10 w-10 flex items-center justify-center rounded-full bg-[#202225]">
          <CircleQuestionMark className="text-white" />
        </button>

        <button className="h-10 w-10 flex items-center justify-center rounded-md bg-[#202225] hover:bg-red-500">
          <Trash2 className="text-white" />
        </button>
      </div>
    </section>
  );
}
