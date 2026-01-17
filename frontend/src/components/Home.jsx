import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen bg-[#202225] overflow-hidden px-4 sm:px-0">
      
      {/* HERO */}
      <div className="max-w-2xl mx-auto sm:mx-10 mt-10 p-4 relative z-10">
        <h1 className="text-4xl sm:text-lg md:text-7xl bg-clip-text text-transparent bg-linear-to-b from-neutral-200 to-neutral-600 text-center font-bold">
          CheatCode
        </h1>

        <p className="text-neutral-400 max-w-xl mx-auto my-4 text-sm text-center">
          A focused practice hub to master DSA — without distractions.
        </p>

        <ul className="mt-6 space-y-3 text-neutral-400 text-center sm:text-left sm:pl-25">
          <li className="text-sm md:text-base font-medium">✨ Sign-in first to track progress</li>
          <li className="text-sm md:text-base font-medium">✨ Bookmark this site</li>
          <li className="text-sm md:text-base font-medium">
            ✨ Practice consistently — progress compounds
          </li>
          <li className="text-sm md:text-base font-medium">
            ✨ Burned out? Reset with a Wordle break
          </li>
        </ul>
      </div>

      {/* JAVA PLAYLIST CARD */}
      <div className="max-w-xl mx-auto sm:mx-30 mt-12 p-5 bg-[#2f3136] border border-white/10 rounded-xl relative z-10">
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

      {/* WORDLE BUTTON */}
      <div className="mt-10 flex justify-center sm:block">
        <button
          className="sm:absolute sm:z-10 sm:top-35 sm:right-60
                     text-white cursor-pointer border-2 px-4 py-2
                     border-white transition duration-200
                     hover:bg-white hover:text-black font-bold"
          onClick={() => navigate("/wordle")}
        >
          Wordle
        </button>
      </div>

      {/* DECORATIVE IMAGE – DESKTOP ONLY */}
      <img
        src="/point.webp"
        alt=""
        className="hidden sm:block absolute right-0 top-0"
      />
    </section>
  );
};

export default Home;
