import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Systum from "@/components/Systum.jsx";

import { ArrowRight, } from "lucide-react";

import { auth } from "../firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import {
  createUserIfNotExists,
  getUserProgress,
  toggleSolved,
  toggleStarred,
} from "../lib/userProgress";

import { topics } from "@/data";
import { searchQuestions } from "@/utils/searchBox";
import ToolBar from "@/components/ToolBar";
import TopicView from "@/components/TopicView"
import SearchResults from "@/components/SearchResult";

const Practice = () => {
  /* =======================
     SEARCH STATE
  ======================= */
  const [query, setQuery] = useState("");
  const isSearching = query.trim().length > 0;
  const results = isSearching ? searchQuestions(query) : [];

  const [activeTopic, setActiveTopic] = useState("dsa");

  /* =======================
     TOPIC STATE
  ======================= */
  const [openMap, setOpenMap] = useState({});
  const [topicProblems, setTopicProblems] = useState(() =>
    Object.fromEntries(topics.map(t => [t.id, t.problems]))
  );

  /* =======================
     AUTH + PROGRESS LOAD
  ======================= */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      await createUserIfNotExists(user);
      const progress = await getUserProgress(user.uid);
      if (!progress?.solvedProblems) return;

      setTopicProblems(prev => {
        const updated = { ...prev };

        for (const topicId in updated) {
          updated[topicId] = updated[topicId].map(p => ({
            ...p,
            done: !!progress.solvedProblems[p.id],
            star: !!progress?.stars?.[p.id],
          }));
        }

        return updated;
      });
    });

    return unsub;
  }, []);

  /* =======================
     RENDER
  ======================= */
  return (
    <>
      <Navbar />

      <main className="bg-[#202225] min-h-screen overflow-x-hidden">
        {/* HEADER */}
        <section className="min-w-screen min-h-45 flex items-center justify-center">
          {/* <h2 className="flex text-white text-xl font-bold pl-30 ">
            Progress
            <span className="pl-5">
              <ArrowRight />
            </span>
          </h2> */}
          <h1 className="text-white font-bold underline underline-offset-4">Progress Bar Available Soon 😔</h1>

          <img src="/doit.gif" alt="" className="h-50 w-50 ml-50 rounded-full object-cover"/>

        </section>

        <hr className="w-2/3 mx-auto" />

        {/* TOOLBAR */}
        <section> 
        <ToolBar value={query} onChange={(e) => setQuery(e.target.value)} 
          activeTopic={activeTopic}
          setActiveTopic={setActiveTopic}/>
        </section>

        {/* CONTENT */}
        <section className="w-11/12 mx-auto mt-6">

          {isSearching ? (
            <SearchResults results={results} />
          ) :activeTopic==="dsa" ? (
            <TopicView
              topics={topics}
              topicProblems={topicProblems}
              openMap={openMap}
              setTopicProblems={setTopicProblems}
              setOpenMap={setOpenMap}
              auth={auth}
              toggleSolved={toggleSolved}
              toggleStarred={toggleStarred}
            />
          ):<Systum/>}

        </section>

      </main>

      <Footer />
    </>
  );
};

export default Practice;