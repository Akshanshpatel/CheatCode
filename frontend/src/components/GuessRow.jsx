import React from "react";
import { Game_Word_Len } from "@/utils/constants";

export default function GuessRow({ correct, current = "",isSubmitted }) {
  function getTileColor(letter, index) {
    if(!isSubmitted)return "bg-gray-700"
    if (!letter) return "bg-gray-700";
    if (correct[index] === letter) return "bg-green-600";
    if (correct.includes(letter)) return "bg-yellow-500";
    return "bg-gray-500";
  }

  return (
    <div className="text-white flex flex-row gap-2">
      {Array(Game_Word_Len)
        .fill("")
        .map((_, i) => {
          const letter = current[i] || "";
          const bg = getTileColor(letter, i);

          return (
            <div
              key={i}
              className={`w-16 h-14 flex items-center justify-center border-2 border-gray-600  text-xl font-bold uppercase ${bg}`}
            >
              {letter}
            </div>
          );
        })}
    </div>
  );
}
