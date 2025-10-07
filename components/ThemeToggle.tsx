"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, []);

  if (!mounted) return null;

  const toggle = () => {
    const el = document.documentElement.classList;
    if (dark) el.remove("dark"); else el.add("dark");
    setDark(!dark);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="rounded-full border px-3 py-1.5 text-sm hover:bg-gray-50 dark:hover:bg-white/10"
    >
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}