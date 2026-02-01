import { ThemeContext } from "@/utils/ThemeContext";
import { useState,useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import Snowfall from "react-snowfall";

const Home = () => {
  const navigate = useNavigate();
  const {theme}=useContext(ThemeContext)


  const snowColor = theme === "dark" ? "#ffffff" : "#0a0a0a";



  return (
    /* 🔧 FIX: background uses CSS variable */
    <section className="relative min-h-screen bg-(--bg-color) overflow-hidden px-4 sm:px-0 transition-colors">
      
      {/* 🔧 FIX: snowfall color respects theme */}
      <Snowfall color={snowColor} />

      {/* HERO */}
      <div className="max-w-2xl mx-auto sm:mx-10 mt-10 p-4 relative z-10">
        
        {/* 🔧 FIX: heading uses variable */}
        <h1 className="text-4xl sm:text-lg md:text-7xl bg-clip-text text-transparent bg-linear-to-b from-neutral-200 to-neutral-600 text-center font-bold">
          CheatCode
        </h1>


        {/* 🔧 FIX: paragraph color */}
        <p className="max-w-xl mx-auto my-4 text-sm text-center
                      text-(--secondary-color)">
          A focused practice hub to master DSA — without distractions.
        </p>

        <br />

        {/* FEATURES */}
        <ul className="mt-6 space-y-3 text-center sm:text-left sm:pl-25
                       text-(--secondary-color)">
          <li className="text-sm md:text-base font-medium">
            ✨ Bookmark this site & Sign-in to track progress
          </li>
          <br />
          <li className="text-sm md:text-base font-medium">
            ✨ Burned out? Reset with a Wordle break
          </li>
          <br />
          <li className="text-sm md:text-base font-medium">
            ✨ Search LeetCode question by Number or Name
          </li>
          <br />
          <li className="text-sm md:text-base font-medium">
            ✨ If some Network Issue Try —{" "}
            <a
              href="https://one.one.one.one/"
              className="text-(--primary-color) underline"
            >
              WARP
            </a>
          </li>
        </ul>
      </div>

      {/* WORDLE BUTTON */}
      <div className="mt-10 flex justify-center sm:block">
        <button
          /* 🔧 FIX: button uses variables */
          className="
            sm:absolute sm:z-10 sm:top-35 sm:right-60
            cursor-pointer border-2 px-4 py-2 font-bold
            text-(--font-color)
            border-(--font-color)
            transition-colors duration-200
            hover:bg-(--font-color)
            hover:text-(--bg-color)
          "
          onClick={() => navigate("/wordle")}
        >
          Wordle
        </button>
      </div>

      {/* DECORATIVE IMAGE */}
      <img
        src="/point.webp"
        alt=""
        className="hidden sm:block absolute right-0 top-0"
      />
    </section>
  );
};

export default Home;
