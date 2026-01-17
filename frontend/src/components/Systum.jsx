import React from "react";

const Systum = () => {
  return (
    <div>
      <h3 className="text-white font-bold text-center underline underline-offset-8">
        Interview Questions
      </h3>

      <div className="mx-auto mt-10 w-full sm:w-8/12 mb-20 rounded-xl bg-[#2b2f33] overflow-hidden text-white">
        
        {/* Header – desktop only */}
        <div className="hidden sm:grid grid-cols-2 px-10 py-4 font-semibold border-b border-neutral-600">
          <span className="pl-20">Problem</span>
          <span className="text-right pr-20">Difficulty</span>
        </div>

        {/* Rows */}
        {[
          ["Design LeetCode", "Easy", "https://systemdesignschool.io/problems/leetcode/solution"],
          ["Design URL Shortener", "Easy", "https://systemdesignschool.io/problems/url-shortener/solution"],
          ["Design Webhook", "Easy", "https://systemdesignschool.io/problems/webhook/solution"],
          ["Design Google Docs", "Medium", "https://systemdesignschool.io/problems/google-doc/solution"],
          ["Design Spotify Top K Songs", "Hard", "https://systemdesignschool.io/problems/topk/solution"],
          ["Design Yelp", "Easy", "https://systemdesignschool.io/problems/yelp/solution"],
          ["Design Rate Limiter", "Easy", "https://systemdesignschool.io/problems/rate-limiter/solution"],
          ["Design Pastebin", "Easy", "https://systemdesignschool.io/problems/pastebin/solution"],
          ["Design Realtime Monitoring System", "Easy", "https://systemdesignschool.io/problems/realtime-monitoring-system/solution"],
          ["Design Typeahead System", "Easy", "https://systemdesignschool.io/problems/typeahead/solution"],
          ["Design a Comment System", "Medium", "https://systemdesignschool.io/problems/comment-system/solution"],
          ["Design Twitter", "Medium", "https://systemdesignschool.io/problems/twitter/solution"],
          ["Design WhatsApp", "Hard", "https://systemdesignschool.io/problems/chatapp/solution"],
          ["Design Dropbox", "Hard", "https://systemdesignschool.io/problems/dropbox/solution"],
          ["Design YouTube", "Hard", "https://systemdesignschool.io/problems/youtube/solution"],
          ["Design Uber", "Hard", "https://systemdesignschool.io/problems/uber/solution"],
          ["Design Google Maps", "Hard", "https://systemdesignschool.io/problems/google-map/solution"],
          ["Design TicketMaster", "Hard", "https://systemdesignschool.io/problems/ticketmaster/solution"],
          ["Design Netflix", "Medium", "https://systemdesignschool.io/problems/netflix/solution"],
        ].map(([title, difficulty, url], idx) => (
          <div
            key={idx}
            className="
              border-b border-neutral-700 last:border-none
              px-4 py-3
              flex flex-col sm:grid sm:grid-cols-2
              gap-2
            "
          >
            {/* Problem */}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                hover:text-blue-400
                wrap-break-words whitespace-normal
                sm:pl-20
              "
            >
              {title}
            </a>

            {/* Difficulty */}
            <span
              className={`
                font-medium
                sm:text-right
                sm:pr-20
                ${
                  difficulty === "Easy"
                    ? "text-green-400"
                    : difficulty === "Medium"
                    ? "text-yellow-400"
                    : "text-red-500"
                }
              `}
            >
              {difficulty}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Systum;
