// ThemeToggleButton

import React from "react";

export default function ThemeToggleButton({ theme, toggleTheme, buttonBg }) {
  return (
    <button
      onClick={toggleTheme}
      className={`fixed top-4 right-4 px-3 py-1 rounded ${buttonBg} focus:outline-none shadow-lg z-50`}
    >
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
}
