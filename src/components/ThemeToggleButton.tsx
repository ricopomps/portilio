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
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:-rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
