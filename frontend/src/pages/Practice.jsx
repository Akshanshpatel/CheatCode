import React, { useState,useEffect } from 'react'
import Navbar from '@/components/Navbar';
import {ArrowRight,Search,CircleQuestionMark,Trash2, ChevronDown, Star,SquareCheckBig} from "lucide-react"
import Footer from '@/components/Footer';
import  {auth} from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

import { arrayData } from '@/data/Arrays';
import {createUserIfNotExists,getUserProgress,toggleSolved,toggleStarred} from "../lib/userProgress";

const Practice = () => {

  const [open,setOpen]=useState(false);
  const [problems, setProblems] = useState(arrayData);


useEffect(() => {
  const unsub = onAuthStateChanged(auth, async (user) => {
    // console.log("AUTH STATE:", user);

    if (!user) {
      // console.log("❌No user logged in");
      return;
    }

    const uid = user.uid;
    // console.log("✅ UID:", uid);

    await createUserIfNotExists(user);

    const progress = await getUserProgress(uid);
    // console.log("📦 FIRESTORE PROGRESS:", progress);

    if (progress?.solvedProblems) {
      setProblems(prev =>
        prev.map(p => ({...p,
          done: !!progress.solvedProblems[p.id],
          star: !!progress?.stars?.[p.id], 
        }))
      );
    }
  });

  return () => unsub();
}, []);


  const solvedCount = problems.filter(p => p.done).length;
  const totalCount = problems.length;

  const progressPercent = totalCount? Math.round((solvedCount / totalCount) * 100): 0;



  return (
    <div>  
    <Navbar/>
    <main className='bg-[#202225] min-h-screen'>
      <section className='min-w-screen min-h-50'>

        <div className="flex items-center gap-2">

            <h2 className="flex text-white text-xl font-bold pl-30 pt-15 ">
              Progress 
              <div className='pl-5'>
              <ArrowRight/>
              </div>
            </h2>
          


          
        </div>
      </section>

      <hr className='w-2/3 mx-auto'/>


     {/* box above questions */}
<section className="mt-10 mx-auto w-11/12 bg-[#2f3136] rounded-lg px-6 py-4 flex items-center justify-between shadow-md">
  
  {/* Left side */}
  <div className="flex items-center gap-4">
    
    {/* Search */}
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <Search/>
      </span>
      <input
        type="text"
        placeholder="Search"
        className="bg-[#202225] text-white placeholder-gray-400 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Icon buttons */}

    <button className="h-10 w-10 cursor-pointer text-white flex items-center justify-center rounded-full bg-[#202225] hover:bg-[#3a3d42] transition">
      <CircleQuestionMark />
    </button>
  </div>

  {/* Right side */}
  <div className="flex items-center gap-3">
    <button className="h-10 w-10 cursor-pointer flex items-center justify-center text-white rounded-md bg-[#202225] hover:bg-red-500 transition">
      <Trash2/>
    </button>

    
  </div>
</section>


    {/* topics */}

    <div className=' mt-10 mx-auto'>


    <button onClick={()=>{
      setOpen(prev=>!prev)
    }} className='mx-auto flex w-11/12 h-12  cursor-pointer text-white font-bold bg-[#2f3136] rounded-lg
     px-6 py-4 hover:outline hover:outline-blue-200 '>
       <ChevronDown
      className={`transition-transform ${open ? "rotate-180" : ""}`}
    />
    
      Arrays & Hashing 
      {/* progress count here */}
      <span className="ml-auto text-white pr-5">
        {solvedCount}/{totalCount}
      </span>

      <div className=" w-40 h-2 mt-1  overflow-hidden
      bg-gray-600  outline-1 outline-white/10">
        <div
          className="h-full bg-emerald-500 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

    </button>


    {/* Accordian here */}
    <div
    className={`
      overflow-hidden transition-all duration-300 
      ${open ? "max-h-[600px] mt-2 max-w-11/12 pl-30" : "max-h-0"}
    `}
  >
    {/* Scrollable content */}
    <div className="bg-[#1f2225] rounded-lg border border-gray-700 max-h-[600px] overflow-y-auto">

      {/* Table header */}
      <div className="grid grid-cols-6 px-4 py-2 text-gray-300 font-semibold border-b border-gray-600">
        <span>Status</span>
        <span>Star</span>
        <span className="col-span-2">Problem</span>
        <span>Difficulty</span>
        <span>Solution</span>
      </div>

      {/* Rows */}
      {problems.map((p) => (
        <div
          key={p.id}
          className={`grid grid-cols-6 px-4 py-2 border-b border-gray-700 items-center transition-colors
    ${p.done ? "bg-green-900 text-white" : "text-white"}
  `}>
          
          
      {/* Status */}
          <span>
           <button onClick={async () => {
                await toggleSolved(auth.currentUser.uid,p.id,p.done);
                  setProblems(prev =>prev.map(x =>x.id === p.id? { ...x, done: !x.done }: x));
                }}>
                <SquareCheckBig className={`w-5 h-5 cursor-pointer ${
                    p.done? "fill-amber-400 text-black": "fill-transparent text-white"
                  }`}
                />
            </button>
          </span>


      {/* Star  */}
          <span>
            <button onClick={async () => {
                const uid = auth.currentUser.uid;

                // 1️⃣ Update Firestore
                await toggleStarred(uid, p.id, p.star);

                // 2️⃣ Update UI (optimistic)
                setProblems(prev => prev.map(x => x.id === p.id ? { ...x, star: !x.star }: x)
                );
              } }
              className="p-1 cursor-pointer"
            >
              <Star
                className={`w-5 h-5 ${p.star
                    ? "fill-amber-400 text-black"
                    : "text-white"}`} />
            </button>
          </span>



          {/* Problem */}
          <span className='col-span-2'>
            <a href={p.url} target='_blank' className="hover:text-blue-400">{p.title}</a>
          </span>

          {/* Difficulty */}
          <span className=
          {`${p.difficulty == "Easy" ? "text-green-500" :
           p.difficulty == "Medium" ? "text-yellow-500" : "text-red-500"}`}>{p.difficulty}
          </span>

          {/* Solution */}
          <span>
            Just Do it
          </span>
        </div>
      ))}

      
    </div>
  </div>


    <button className='flex mt-5 mx-auto w-11/12 cursor-pointer h-12 bg-[#2f3136] text-white font-bold
    rounded-lg px-6 py-4 hover:outline hover:outline-blue-200 '>
      <ChevronDown/>
      Two Pointers
    </button>

    <button className='flex mt-5 mx-auto w-11/12 h-12 cursor-pointer bg-[#2f3136] text-white font-bold
    rounded-lg px-6 py-4 hover:outline hover:outline-blue-200 '>
      <ChevronDown/>
      Sliding Window
    </button>

    <button className='flex mt-5 mx-auto w-11/12 h-12 cursor-pointer bg-[#2f3136] text-white font-bold
    rounded-lg px-6 py-4 hover:outline hover:outline-blue-200 '>
      <ChevronDown/>
      Stack & Queue
    </button>

    <button className='flex mt-5 mx-auto w-11/12 h-12 cursor-pointer bg-[#2f3136] text-white font-bold
    rounded-lg px-6 py-4 hover:outline hover:outline-blue-200 '>
      <ChevronDown/>
      Binary Search
    </button>

    <button className='flex mt-5 mx-auto w-11/12 h-12 cursor-pointer bg-[#2f3136] text-white font-bold
    rounded-lg px-6 py-4 hover:outline hover:outline-blue-200 '>
      <ChevronDown/>
      Linked List
    </button>

    <button className='flex mt-5 mx-auto w-11/12 h-12 cursor-pointer bg-[#2f3136] text-white font-bold
    rounded-lg px-6 py-4 hover:outline hover:outline-blue-200 '>
      <ChevronDown/>
      Trees
    </button>

    <button className='flex mt-5 mx-auto w-11/12 h-12 cursor-pointer bg-[#2f3136] text-white font-bold
    rounded-lg px-6 py-4 hover:outline hover:outline-blue-200 '>
      <ChevronDown/>
      Heap & PriorityQueue
    </button>

    <button className='flex mt-5 mx-auto w-11/12 h-12 cursor-pointer bg-[#2f3136] text-white font-bold
    rounded-lg px-6 py-4 hover:outline hover:outline-blue-200 '>
      <ChevronDown/>
      BackTracking
    </button>

    <button className='flex mt-5 mx-auto w-11/12 h-12 cursor-pointer bg-[#2f3136] text-white font-bold
    rounded-lg px-6 py-4 hover:outline hover:outline-blue-200 '>
      <ChevronDown/>
      Graphs
    </button>

    <button className='flex mt-5 mx-auto w-11/12 h-12 cursor-pointer bg-[#2f3136] text-white font-bold
    rounded-lg px-6 py-4 hover:outline hover:outline-blue-200 '>
      <ChevronDown/>
      1-D Dynamic Programming
    </button>

    <button className='flex mt-5 mx-auto w-11/12 h-12 cursor-pointer bg-[#2f3136] text-white font-bold
    rounded-lg px-6 py-4 hover:outline hover:outline-blue-200 '>
      <ChevronDown/>
      2-D Dynamic Programming
    </button>

    <button className='flex mt-5 mx-auto w-11/12 h-12 cursor-pointer bg-[#2f3136] text-white font-bold
    rounded-lg px-6 py-4 hover:outline hover:outline-blue-200 '>
      <ChevronDown/>
      Math
    </button>

    <button className='flex mt-5 mx-auto w-11/12 h-12 cursor-pointer bg-[#2f3136] text-white font-bold
    rounded-lg px-6 py-4 hover:outline hover:outline-blue-200 '>
      <ChevronDown/>
      Bit Manipulation
    </button>

    <button className='flex mt-5 mx-auto w-11/12 h-12 cursor-pointer bg-[#2f3136] text-white font-bold
    rounded-lg px-6 py-4 hover:outline hover:outline-blue-200 '>
      <ChevronDown/>
      Miscallenous
    </button>
    


    </div>

    </main>
    <Footer/>
    </div>
  )
}

export default Practice;