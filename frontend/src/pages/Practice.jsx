import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Systum from "@/components/Systum.jsx";

import { ArrowRight, } from "lucide-react";

import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  createUserIfNotExists,
  getUserProgress,
  toggleSolved,
  toggleStarred,
} from "@/lib/userProgress";

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

      <main className="bg-[#202225] min-h-screen overflow-x-hidden ">
        {/* HEADER */}
       <section className="min-w-screen min-h-45 flex flex-col sm:flex-row items-center justify-start gap-6 px-4">
          
        <div>

        {activeTopic==="dsa" ? (
            <div className="max-w-xl mx-auto sm:mx-30 mt-12 p-5 bg-[#202225] ">
           
          <h3 className="text-white text-lg font-bold mb-2">
          Before you start DSA 👇
          </h3>

          <p className="text-neutral-400 text-sm mb-4">
            Don’t jump blindly into problems.  
            Get comfortable with <span className="text-white font-medium">Java fundamentals</span> first.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <img
              src="https://i.ytimg.com/vi/rZ41y93P2Qo/hq720.jpg"
              alt="Java Playlist"
              className="w-full sm:w-32 h-20 rounded-lg object-cover border border-white/10"
            />

          <a
            href="https://www.youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-bold px-4 py-2 border border-white
                       text-white hover:bg-white hover:text-black transition"
          >
            Watch Java Playlist →
          </a>
          </div>
        </div>
        ):(
          <div className="max-w-xl mx-auto sm:mx-30 mt-12 p-5 bg-[#202225] ">
           
          <h3 className="text-white text-lg font-bold mb-2">
          Best System Design Playlist in my opinion👇
          </h3>

          <p className="text-neutral-400 text-sm mb-4">
            Before Deep Diving in Studying Famous System's.   <span className="text-white font-medium">Watch this!</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <img
              src="https://i.ytimg.com/vi/ftwfCDc3IpE/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCmVsh2slNGO_s_9h8GHWaeqRP0_w"
              alt="Java Playlist"
              className="w-full sm:w-32 h-20 rounded-lg object-cover border border-white/10"
            />

          <a
            href="https://www.youtube.com/playlist?list=PLpIkg8OmuX-KiAbBKuNidN-c66aHwBh3t"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-bold px-4 py-2 border border-white
                       text-white hover:bg-white hover:text-black transition"
          >
            Watch S.D PlayList →
          </a>
          </div>
        </div>
        )}
        
        </div>



          <h1 className="text-white font-bold underline underline-offset-4 text-center sm:text-left text-sm sm:text-base">
            Progress Bar Available Soon 😔
          </h1>

        {/* Do it gif */}
          <img
            src="/doit.gif"
            alt=""
            className="h-32 w-32 sm:h-50 sm:w-50 sm:ml-50 rounded-full object-cover"
          />
        </section>


        <hr className="w-10/11 mx-auto" />

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