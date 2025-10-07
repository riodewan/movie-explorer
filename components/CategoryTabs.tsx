"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const TABS = [
  { key: "popular", label: "Popular" },
  { key: "now_playing", label: "Now Playing" },
  { key: "top_rated", label: "Top Rated" },
  { key: "upcoming", label: "Upcoming" },
] as const;

export default function CategoryTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const current = sp.get("category") || "popular";

  const onClick = (key: string) => {
    const usp = new URLSearchParams(sp.toString());
    usp.set("category", key);
    usp.set("page", "1");
    router.push(`${pathname}?${usp.toString()}`);
  };

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      {TABS.map(t => {
        const active = current === t.key;
        return (
          <button
            key={t.key}
            onClick={() => onClick(t.key)}
            className="rounded-full px-3.5 py-1.5 text-sm border transition"
            style={{
              borderColor: "color-mix(in oklab, black 10%, transparent)",
              background: active
                ? "color-mix(in oklab, var(--foreground) 95%, transparent)"
                : "transparent",
              color: active ? "white" : "inherit",
            }}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}