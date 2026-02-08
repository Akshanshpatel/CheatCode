import {
  ChevronDown,
  SquareCheckBig,
  Star,
} from "lucide-react";



export default function TopicView({
  topics,
  topicProblems,
  openMap,
  setOpenMap,
  setTopicProblems,
  auth={auth},
  toggleSolved={toggleSolved},
  toggleStarred={toggleStarred}
}) {
  const toggleTopic = (id) => {
    setOpenMap(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="mt-10 mx-auto">
      {topics.map(topic => {
        const open = !!openMap[topic.id];
        const problems = topicProblems[topic.id] || [];

        const solvedCount = problems.filter(p => p.done).length;
        const totalCount = problems.length;
        const progressPercent = totalCount
          ? Math.round((solvedCount / totalCount) * 100)
          : 0;

        return (
      <div key={topic.id} className="mb-5">
          {/* HEADER */}
          <button
            onClick={() => toggleTopic(topic.id)}
            className="
              mx-auto w-full sm:w-9/12
              cursor-pointer
              bg-(--box-qt)
              text-(--font-color)
              font-bold rounded-lg
              px-4 sm:px-6 py-3
              flex flex-col sm:flex-row
              sm:items-center gap-2
              border border-(--font-color)/20
              hover:border-(--font-color)/60
              transition-colors duration-200
            "
          >
            <div className="flex items-center w-full min-w-0">
              <ChevronDown
                className={`transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
              <span className="ml-3 truncate">{topic.title}</span>
              <span className="ml-auto text-sm">
                {solvedCount}/{totalCount}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full sm:w-40 h-2 bg-(--font-color)/20 overflow-hidden rounded">
              <div
                className="h-full bg-emerald-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </button>

          {/* ACCORDION */}
          {open && (
            <div
              className="
                mx-auto w-full sm:w-11/12 lg:w-7/12 mt-2
                bg-(--box-qt)
                rounded-lg
                border border-(--font-color)/20
              "
            >
              {/* Headings */}
              <div
                className="
                  hidden md:grid font-bold grid-cols-6
                  px-4 py-2
                  border-b border-(--font-color)/20
                  text-(--secondary-color)
                "
              >
                <span>Status</span>
                <span>Star</span>
                <span className="col-span-2">Problem</span>
                <span className="pl-10">Difficulty</span>
                <span>Solution</span>
              </div>

              {problems.map((p) => (
                <div
                  key={p.id}
                  className={`
                    grid grid-cols-1 md:grid-cols-6
                    gap-3 md:gap-0 px-4 py-3
                    border-b border-(--font-color)/10
                    ${
                      p.done
                        ? "bg-(--accordian) text-white"
                        : "text-(--font-color)"
                    }
                  `}
                >
                  {/* Solved */}
                  <div className="flex md:contents gap-4">
                    <button
                      onClick={async () => {
                        await toggleSolved(auth.currentUser.uid, p.id, p.done);
                        setTopicProblems((prev) => ({
                          ...prev,
                          [topic.id]: prev[topic.id].map((x) =>
                            x.id === p.id ? { ...x, done: !x.done } : x
                          ),
                        }));
                      }}
                    >
                      <SquareCheckBig
                        className={`w-6 h-6 cursor-pointer ${
                          p.done
                            ? "fill-amber-400 text-black"
                            : "fill-transparent text-(--font-color)"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Star */}
                  <div className="flex md:contents gap-4">
                    <button
                      onClick={async () => {
                        await toggleStarred(auth.currentUser.uid, p.id, p.star);
                        setTopicProblems((prev) => ({
                          ...prev,
                          [topic.id]: prev[topic.id].map((x) =>
                            x.id === p.id ? { ...x, star: !x.star } : x
                          ),
                        }));
                      }}
                    >
                      <Star
                        className={`w-6 h-6 cursor-pointer ${
                          p.star
                            ? "fill-amber-400 text-black"
                            : "text-(--font-color)"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Problem */}
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="md:col-span-2 min-w-0"
                  >
                    <span className="block whitespace-normal text-(--text) font-bold hover:text-(--primary-color)">
                      {p.title}
                    </span>
                  </a>

                  {/* Difficulty (semantic colors stay) */}
                  <span className="text-sm md:text-base">
                    <span
                      className={`md:pl-10 ${
                        p.difficulty === "Easy"
                          ? "text-green-700 font-semibold"
                          : p.difficulty === "Medium"
                          ? "text-yellow-500 font-semibold"
                          : "text-red-500 font-semibold"
                      }`}
                    >
                      {p.difficulty}
                    </span>
                  </span>

                  {/* Solution */}
                  <span className="text-(--secondary-color)">Soon</span>
                </div>
              ))}
            </div>
          )}
        </div>

        );
      })}
    </div>
  );
}
