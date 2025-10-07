"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBar({ placeholder = "Cari film..." }: { placeholder?: string }) {
  const [q, setQ] = useState("");
  const router = useRouter();

  useEffect(() => {
    const last = localStorage.getItem("q-last");
    if (last) setQ(last);
  }, []);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    const form = e.currentTarget;
    const input = form.querySelector<HTMLInputElement>('input[name="query"]');
    const val = (input?.value || "").trim();
    if (!val) {
      e.preventDefault();
      return;
    }
    localStorage.setItem("q-last", val);
    e.preventDefault();
    router.push(`/search?query=${encodeURIComponent(val)}`);
  }

  return (
    <form
      action="/search"
      method="GET"
      onSubmit={onSubmit}
      className="flex w-full max-w-md items-center gap-2"
    >
      <input
        name="query"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        className="flex-1 rounded-full px-4 py-2 text-sm outline-none"
        style={{
          background: "color-mix(in oklab, var(--fg) 6%, transparent)",
          border: "1px solid var(--border)",
          color: "var(--fg)",
          boxShadow: "0 0 0 0px var(--ring)",
        }}
        onFocus={(e) =>
          (e.currentTarget.style.boxShadow = `0 0 0 3px ${getComputedStyle(document.documentElement).getPropertyValue(
            "--ring"
          )}`)
        }
        onBlur={(e) => (e.currentTarget.style.boxShadow = "0 0 0 0px var(--ring)")}
      />
      <button type="submit" className="btn">Cari</button>
    </form>
  );
}