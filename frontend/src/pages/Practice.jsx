import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Systum from "@/components/Systum.jsx";


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
  const [user, setUser] = useState(null);

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
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (!currentUser) return;

      await createUserIfNotExists(currentUser);
      const progress = await getUserProgress(currentUser.uid);
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

      <main className="bg-(--bg-color) min-h-screen overflow-x-hidden transition-colors">
        {/* HEADER */}
        <section className="min-w-screen min-h-45 flex flex-col sm:flex-row items-center justify-start gap-6 px-4">

          <div>
            {activeTopic === "dsa" ? (
              <div className="max-w-xl mx-auto sm:mx-30 mt-12 p-5">
                
                {/* 🔧 heading */}
                <h3 className="text-(--heading-color) text-lg font-bold mb-2">
                  Before you start DSA 👇
                </h3>

                {/* 🔧 muted text */}
                <p className="text-(--secondary-color) text-sm mb-4">
                  Don’t jump blindly into problems.  
                  Get comfortable with{" "}
                  <span className="text-(--font-color) font-medium">
                    Java fundamentals
                  </span>{" "}
                  first.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <img
                    src="https://i.ytimg.com/vi/rZ41y93P2Qo/hq720.jpg"
                    alt="Java Playlist"
                    className="w-full sm:w-32 h-20 rounded-lg object-cover
                              border border-(--font-color)/20"
                  />

                  {/* 🔧 button */}
                  <a
                    href="https://www.youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-block text-sm font-bold px-4 py-2
                      border border-(--font-color)
                      text-(--font-color)
                      hover:bg-(--font-color)
                      hover:text-(--bg-color)
                      transition
                    "
                  >
                    Watch Java Playlist →
                  </a>
                </div>
              </div>
            ) : (
              <div className="max-w-xl mx-auto sm:mx-30 mt-12 p-5 bg-(--bg-color)">
                
                <h3 className="text-(--heading-color) text-lg font-bold mb-2">
                  Best System Design Playlist in my opinion 👇
                </h3>

                <p className="text-(--secondary-color) text-sm mb-4">
                  Before deep diving into famous systems,{" "}
                  <span className="text-(--font-color) font-medium">
                    watch this!
                  </span>
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <img
                    src="https://i.ytimg.com/vi/ftwfCDc3IpE/hqdefault.jpg"
                    alt="System Design Playlist"
                    className="w-full sm:w-32 h-20 rounded-lg object-cover
                              border border-(--font-color)/20"
                  />

                  <a
                    href="https://www.youtube.com/playlist?list=PLpIkg8OmuX-KiAbBKuNidN-c66aHwBh3t"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-block text-sm font-bold px-4 py-2
                      border border-(--font-color)
                      text-(--font-color)
                      hover:bg-(--font-color)
                      hover:text-(--bg-color)
                      transition
                    "
                  >
                    Watch S.D Playlist →
                  </a>
                </div>
              </div>
            )}
          </div>

          

          {/* GIF stays unchanged */}
          <img
            src="/doit.gif"
            alt=""
            className="h-32 w-32 sm:h-50 sm:w-50 sm:ml-50 rounded-full object-cover"
          />
        </section>

        {/* 🔧 divider */}
        <hr className="w-10/11 mx-auto border-(--font-color)/20" />

        {/* TOOLBAR */}
        <section>
          <ToolBar
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            activeTopic={activeTopic}
            setActiveTopic={setActiveTopic}
          />
        </section>

        {/* CONTENT */}
        <section className="w-11/12 mx-auto mt-6">
          {isSearching ? (
            <SearchResults results={results} />
          ) : activeTopic === "dsa" ? (
            <TopicView
              topics={topics}
              topicProblems={topicProblems}
              openMap={openMap}
              setTopicProblems={setTopicProblems}
              setOpenMap={setOpenMap}
              user={user}
              toggleSolved={toggleSolved}
              toggleStarred={toggleStarred}
            />
          ) : (
            <Systum />
          )}
        </section>
      </main>


      <Footer />
    </>
  );
};

export default Practice;