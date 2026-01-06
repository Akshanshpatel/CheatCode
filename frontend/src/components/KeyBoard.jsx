import React from "react";

const ROWS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "back"],
];

export default function Keyboard({ onKeyPress, letterStates = {} ,shake=false,}) {
  const getKeyClass = (key) => {
    if (key === "enter" || key === "back") {
      return "px-4 bg-gray-700";
    }

    const state = letterStates[key];

    if (state === "green") return "bg-green-600";
    if (state === "yellow") return "bg-yellow-500";
    if (state === "gray") return "bg-gray-500";

    return "bg-gray-700";
  };

  return (
    <div className={`flex flex-col gap-2 mt-6 ${shake ? "shake" : ""}`}>
      {ROWS.map((row, i) => (
        <div key={i} className="flex gap-2 justify-center">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className={`
                h-12 min-w-10
                flex items-center justify-center
                rounded
                text-white font-semibold uppercase
                ${getKeyClass(key)}
                hover:brightness-110
                transition
              `}
            >
              {key === "back" ? "⌫" : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
