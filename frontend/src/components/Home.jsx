import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate=useNavigate();
  return (
    <section className="relative min-h-screen bg-[#202225] overflow-hidden">
      
      <div className="max-w-2xl mx-10 mt-10 p-4 relative z-10">
        <h1 className="text-lg md:text-7xl bg-clip-text text-transparent bg-linear-to-b from-neutral-200 to-neutral-600 text-center font-bold">
          CheatCode
        </h1>

        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center">
          Description here
        </p>
      </div>
      
      
        <button className=" absolute z-10 top-35 right-60 text-white cursor-pointer border-2 px-2 py-2
         border-white transition-colours duration-200 hover:bg-white hover:text-black font-bold"
        onClick={()=>navigate("/wordle")} 
        >
        Wordle
        </button>
      
      
      
      <img src="/point.webp" alt="" className="absolute right-0 top-0 "/>

    </section>
  );
};

export default Home;
