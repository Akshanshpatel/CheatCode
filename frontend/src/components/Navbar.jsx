import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon ,Menu,X} from "lucide-react";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { app } from "@/lib/firebase";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
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
      <nav className="flex items-center p-5 font-bold h-20 text-white relative">

        {/* LOGO */}
        <Link to="/" className="ml-4 sm:ml-20">
          <img src="/logo.png" alt="logo" className="h-12 w-20" />
        </Link>

        {/* DESKTOP LINKS */}
        <ul className="hidden sm:flex gap-20 ml-50">
          <li><Link to="/practice">Practice</Link></li>
          <li><Link to="/academic">Academic</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>

        {/* RIGHT CONTROLS */}
        <div className="ml-auto flex items-center gap-4 mr-2 sm:mr-6">

          {/* THEME TOGGLE */}
          <div
            onClick={() => setDark(!isDark)}
            className="cursor-pointer"
          >
            {isDark ? <Moon /> : <Sun />}
          </div>

          {/* AUTH */}
          <div className="relative z-10" ref={menuRef}>
            {!user ? (
              <button
                onClick={signInGoogle}
                className="rounded-md px-4 py-2 text-sm font-semibold hover:bg-zinc-800"
              >
                Sign in
              </button>
            ) : (
              <>
                <img
                  src={user.photoURL}
                  alt="profile"
                  className="h-8 w-8 cursor-pointer rounded-full object-cover"
                  referrerPolicy="no-referrer"
                  onClick={() => setOpen((p) => !p)}
                />

                {open && (
                  <div className="absolute right-0 mt-2 w-64 rounded-md border border-zinc-700 bg-[#1e1f22] shadow-lg">
                    <div className="px-4 py-3 text-sm text-gray-300">
                      {user.email}
                    </div>
                    <div className="h-px bg-zinc-700" />
                    <button
                      onClick={handleSignOut}
                      className="w-full px-4 py-2 text-left hover:bg-zinc-800"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* HAMBURGER (MOBILE ONLY) */}
          <button
            className="sm:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* MOBILE MENU */}
{mobileOpen && (
  <div className="fixed inset-0 z-50 sm:hidden">
    {/* Backdrop */}
    <div
      className="absolute inset-0 bg-black/60"
      onClick={() => setMobileOpen(false)}
    />

    {/* Menu Panel */}
    <div className="absolute top-0 right-0 h-full w-64 bg-[#1e1f22] shadow-xl">
      <ul className="flex flex-col gap-6 p-6 text-white text-base font-medium">
        <li>
          <Link
            to="/practice"
            onClick={() => setMobileOpen(false)}
            className="block"
          >
            Practice
          </Link>
        </li>

        <li>
          <Link
            to="/academic"
            onClick={() => setMobileOpen(false)}
            className="block"
          >
            Academic
          </Link>
        </li>

        <li>
          <Link
            to="/about"
            onClick={() => setMobileOpen(false)}
            className="block"
          >
            About
          </Link>
        </li>
      </ul>
    </div>
  </div>
)}


      </nav>
    </header>
  );
};

export default Navbar;
