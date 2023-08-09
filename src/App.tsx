import React, { useEffect, useState } from "react";
import { MdModeNight } from "react-icons/md";
import { BiSolidSun } from "react-icons/bi";

const App = () => {
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  function getInitialTheme() {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "light";
  }

  const handleThemeToggle = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="container">
      <div className="{`calculator ${theme}`}">
        <div className="heading">
          <p>Calculator</p>
          <div className="thm-btn">
            <button className="theme-toggle" onClick={handleThemeToggle}>
              {theme === "light" ? (
                <MdModeNight className="night-btn" />
              ) : (
                <BiSolidSun className="light-btn" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
