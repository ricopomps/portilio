"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  const darkTheme = theme === "dark";
  return (
    <button
      onClick={() => {
        if (theme === "dark") setTheme("light");
        else setTheme("dark");
      }}
      className="flex rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      {!darkTheme && <Sun className="h-6 w-6 transition-all" />}
      {darkTheme && <Moon className="h-6 w-6 rotate-0 scale-100" />}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
