import { createContext, useEffect, useState } from "react";

/* ✅ CREATE CONTEXT */
export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

const THEME_KEY = "light";


const ThemeProvider = ({ children }) => {
const [theme, setTheme] = useState(() => {
  return localStorage.getItem(THEME_KEY) || "light";
});

  /* ✅ APPLY CLASS TO BODY */
  useEffect(() => {
    document.body.classList.remove("for_light_theme", "for_dark_theme");
    document.body.classList.add(
      theme === "dark" ? "for_dark_theme" : "for_light_theme"
    );
        localStorage.setItem(THEME_KEY, theme);

  }, [theme]);

  /* ✅ TOGGLE FUNCTION */
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
