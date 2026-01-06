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
              className="mx-auto flex w-9/12 h-12 cursor-pointer bg-[#2f3136] text-white
           font-bold rounded-lg px-6 py-4 items-center
           border border-white/10 hover:border-white/70
           transition-colors duration-200"
            >
              <ChevronDown
                className={`transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />

              <span className="ml-3">{topic.title}</span>

              <span className="ml-auto pr-5">
                {solvedCount}/{totalCount}
              </span>

              <div className="w-40 h-2 bg-gray-600 overflow-hidden rounded">
                <div
                  className="h-full bg-emerald-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </button>

            {/* ACCORDION */}
            {open && (
              <div className="mx-auto w-8/12 mt-2 bg-[#1f2225] rounded-lg border border-gray-700">
                {/* Headings */}
                <div className="grid font-bold grid-cols-6 px-4 py-2 border-b border-gray-600 text-gray-300">
                  <span>Status</span>
                  <span>Star</span>
                  <span className="col-span-2">Problem</span>
                  <span>Difficulty</span>
                  <span>Solution</span>
                </div>

                {problems.map(p => (
                  <div
                    key={p.id}
                    className={`grid grid-cols-6 px-4 py-2 border-b border-gray-700 items-center ${
                      p.done ? "bg-green-900 text-white" : "text-white"
                    }`}
                  >
                    {/* Solved */}
                    <button 
                      onClick={async () => {
                        await toggleSolved(auth.currentUser.uid, p.id, p.done);
                        setTopicProblems(prev => ({
                          ...prev,
                          [topic.id]: prev[topic.id].map(x =>
                            x.id === p.id ? { ...x, done: !x.done } : x
                          ),
                        }));
                      }}
                    >
                      <SquareCheckBig 
                        className={`w-6 h-6 cursor-pointer ${
                          p.done
                            ? "fill-amber-400 text-black"
                            : "fill-transparent text-white"
                        }`}
                      />
                    </button>

                    {/* Star */}
                    <button
                      onClick={async () => {
                        await toggleStarred(auth.currentUser.uid, p.id, p.star);
                        setTopicProblems(prev => ({
                          ...prev,
                          [topic.id]: prev[topic.id].map(x =>
                            x.id === p.id ? { ...x, star: !x.star } : x
                          ),
                        }));
                      }}
                    >
                      <Star
                        className={`w-6 h-6 cursor-pointer ${
                          p.star
                            ? "fill-amber-400 text-black"
                            : "text-white"
                        }`}
                      />
                    </button>

                    {/* Problem */}
                    <a href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="col-span-2 "
                    > 
                    <span className="hover:text-blue-400">
                      {p.title}
                    </span>
                    </a>

                    {/* Difficulty */}
                    <span
                      className={
                        p.difficulty === "Easy"
                          ? "text-green-500"
                          : p.difficulty === "Medium"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }
                    ><span className="pl-6">
                      {p.difficulty}
                    </span>
                    </span>

                    {/* Solution */}
                    <span>Later</span>
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
