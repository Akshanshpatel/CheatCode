import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { app } from "@/lib/firebase";

const Navbar = () => {
  const [isDark, setDark] = useState(false);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  // Google Sign-In
  const signInGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Sign out
  const handleSignOut = async () => {
    await signOut(auth);
    setOpen(false);
  };

  // Listen to auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, [auth]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-[#202225]">
      <nav className="flex items-center p-5 font-bold h-20 text-white ">

          <Link to="/">
          <img src="/logo.png" alt="logo" className="h-15 w-20 ml-20"/>

          </Link>
                                                                                
        <ul className="flex gap-20 ml-50">
          <li><Link to="/practice">Practice</Link></li>
          <li><Link to="/academic">Academic</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>

        <div
          onClick={() => setDark(!isDark)}
          className="ml-auto mr-6 cursor-pointer"
        >
          {isDark ? <Moon /> : <Sun />}
        </div>

       {/* Auth Section */}
        <div className="relative z-10" ref={menuRef}>
        {!user ? (
          <button
            onClick={signInGoogle}
            className="rounded-md px-4 py-2 text-sm font-semibold hover:bg-zinc-800 cursor-pointer"
          >
            Sign in
          </button>
        ) : (
          <>
            <img
              src={user.photoURL}
              alt="profile"
              className="h-8 w-8 cursor-pointer rounded-full object-cover"
              referrerPolicy="no-referrer"  //this solves the CORB issue browser blocking the image

              onClick={() => setOpen((prev) => !prev)}
              />

            {open && (
              <div className="absolute right-0 mt-2 w-64 rounded-md border border-zinc-700 bg-[#1e1f22] shadow-lg">
                <div className="px-4 py-3 text-sm text-gray-300">
                  {user.email}
                </div>

                <div className="h-px bg-zinc-700" />


                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-2 text-left hover:bg-zinc-800 cursor-pointer"
                >
                  Sign out
                </button>
              </div>
            )}
          </>
        )}

        </div>

      </nav>

    </header>
  );
};

export default Navbar;
