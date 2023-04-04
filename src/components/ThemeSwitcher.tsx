import React, { useEffect, useState } from "react";
import { BsSun } from "react-icons/bs";
import { IoMoonOutline } from "react-icons/io5";

const ThemeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // localStorage'da tema anahtarını kontrol edin ve mevcutsa kullanıcının tercihine göre temayı ayarlayın
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Kullanıcının tercihini localStorage'a kaydedin
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");

    // Kullanıcının tercihine göre arka plan ve yazı renklerini ayarlayın
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  return (
    <div>
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="  flex items-center rounded-full bg-gray-800 p-2 font-semibold text-stone-100 focus:outline-none dark:bg-stone-100 dark:text-gray-800"
      >
        {isDarkMode ? (
          <BsSun className="h-5 w-5" />
        ) : (
          <IoMoonOutline className="h-5 w-5" />
        )}
      </button>
    </div>
  );
};

export default ThemeSwitcher;
