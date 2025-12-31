import {
  Search,
  ArrowRight,
  CircleQuestionMark,
  Trash2,
} from "lucide-react";

export default function ToolBar({ value, onChange }) {
  return (
    <>
    <section className="mt-10 mx-auto w-11/12 bg-[#2f3136] 
    rounded-lg px-6 py-4 flex items-center justify-between">
    <div className="relative w-80">
    <Search
      size={18}
      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
    />

    <input
      type="text"
      placeholder="Search problems..."
      value={value}
      onChange={onChange}
      className="w-full pl-10 pr-4 py-2 rounded bg-[#202225] text-white focus:outline-none"
    />
  </div>
      <div className="flex gap-3">
        <button className="h-10 w-10 flex items-center cursor-pointer  justify-center rounded-full bg-[#202225]">
          <CircleQuestionMark className="text-white" />
        </button>
    
        <button className="h-10 w-10 flex cursor-pointer items-center justify-center rounded-md bg-[#202225] hover:bg-red-500">
          <Trash2 className="text-white" />
        </button>
      </div>
      </section>
    </>
  );
}
