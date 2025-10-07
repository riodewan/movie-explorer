"use client";
import { useEffect, useState } from "react";

function useFavorites() {
  const KEY = "fav-movies";
  const [ids, setIds] = useState<number[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      setIds(raw ? JSON.parse(raw) : []);
    } catch { setIds([]); }
  }, []);

  function save(next: number[]) {
    setIds(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  }

  function toggle(id: number) {
    const exists = ids.includes(id);
    const next = exists ? ids.filter(x => x !== id) : [...ids, id];
    save(next);
  }

  return { ids, toggle, has: (id: number) => ids.includes(id), count: ids.length };
}

export default function FavoriteButton({ id, size = 34 }: { id: number; size?: number }) {
  const { has, toggle } = useFavorites();
  const active = has(id);

  return (
    <button
      aria-label="Tambah ke Favorit"
      onClick={(e) => { e.preventDefault(); toggle(id); }}
      className="rounded-full"
      style={{
        width: size, height: size,
        display: "grid", placeItems: "center",
        background: active ? "color-mix(in oklab, #ff507a 25%, transparent)" : "color-mix(in oklab, var(--fg) 8%, transparent)",
        border: "1px solid var(--border)",
      }}
      title={active ? "Hapus dari Favorit" : "Tambah ke Favorit"}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill={active ? "#ff507a" : "none"} stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    </button>
  );
}