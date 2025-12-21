import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, User } from "lucide-react";

const Navbar = () => {
  const [isDark, setDark] = useState(false);

  return (
    <header className="bg-[#2f3136]">
      <nav className="flex items-center p-5 font-bold text-white">
        <Link to="/" className="text-xl px-10 mr-20">
          Logo
        </Link>

        <ul className="flex gap-20">
          <li><Link to="/practice">Practice</Link></li>
          <li><Link to="/roadmap">Roadmap</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>

        <div
          onClick={() => setDark(!isDark)}
          className="ml-auto mr-6 cursor-pointer"
        >
          {isDark ? <Moon /> : <Sun />}
        </div>

        {/* Google Sign-In */}
        <User className="cursor-pointer" />
      </nav>
    </header>
  );
};

export default Navbar;
