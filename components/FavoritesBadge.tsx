"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function FavoritesBadge() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    function load() {
      try { setCount(JSON.parse(localStorage.getItem("fav-movies") || "[]").length || 0); } catch {}
    }
    load();
    const onStorage = (e: StorageEvent) => { if (e.key === "fav-movies") load(); };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  return (
    <Link href="/" className="btn" title="Favorit">
      Favorit <span className="chip" aria-hidden>{count}</span>
    </Link>
  );
}