import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { ThemeContext } from "../utils/ThemeContext";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithCredential,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { app } from "@/lib/firebase";
import { GoogleLogin } from "@react-oauth/google";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const menuRef = useRef(null);

  const auth = getAuth(app);

  // Google Sign-In via GIS

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const firebaseCredential = GoogleAuthProvider.credential(credential);
      await signInWithCredential(auth, firebaseCredential);
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleError = () => {
    console.error("Google Sign-In failed");
  };

  // Listen to auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAvatarError(false);
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
    /* 🔧 FIX: use CSS variables */
    <header className="bg-(--bg-color) text-(--font-color) transition-colors">
      <nav className="flex items-center p-5 font-bold h-20 relative">

        {/* LOGO */}
        <Link to="/" className="ml-4 sm:ml-20">
          <img src="/logo.png" alt="logo" className="h-12 w-20" />
        </Link>

        {/* DESKTOP LINKS */}
        <ul className="hidden sm:flex gap-20 ml-50">
          {["practice", "academic"].map((path) => (
            <li
              key={path}
              className="px-3 py-1 rounded-md hover:bg-(--secondary-color) hover:text-white transition"
            >
              <Link to={`/${path}`}>{path}</Link>
            </li>
          ))}
        </ul>

        {/* RIGHT CONTROLS */}
        <div className="ml-auto flex items-center gap-4 mr-6">

          {/* 🔧 FIX: theme toggle respects theme */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded text-(--font-color) cursor-pointer"
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </button>



          {/* AUTH */}
          <div className="relative z-10" ref={menuRef}>
            {!user ? (
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="outline"
                size="medium"
                text="continue_with"
                shape="rectangular"
              />
            ) : (
              <>
                {user.photoURL && !avatarError ? (
                  <img
                    src={user.photoURL}
                    alt="profile"
                    className="h-8 w-8 rounded-full object-cover cursor-pointer"
                    onError={() => setAvatarError(true)}
                    onClick={() => setOpen(!open)}
                  />
                ) : (
                  <div
                    className="h-8 w-8 rounded-full bg-(--secondary-color) flex items-center justify-center text-white text-sm font-bold cursor-pointer"
                    onClick={() => setOpen(!open)}
                  >
                    {(user.displayName || user.email || "U")[0].toUpperCase()}
                  </div>
                )}

                {open && (
                  /* 🔧 FIX: remove hardcoded dark bg */
                  <div className="absolute right-0 mt-2 w-64 rounded-md border bg-(--bg-color) shadow-lg">
                    <div className="px-4 py-3 text-sm">
                      {user.email}
                    </div>
                    <div className="h-px bg-(--secondary-color)" />
                    <button
                      onClick={() => signOut(auth)}
                      className="w-full px-4 py-2 text-left hover:bg-(--secondary-color) cursor-pointer"
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
