"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Genre = { id: number; name: string };

export default function GenreFilter({ genres }: { genres: Genre[] }) {
  const router = useRouter();
  const sp = useSearchParams();
  const pathname = usePathname();

  const selected = new Set((sp.get("genres") || "").split(",").filter(Boolean));
  function toggle(id: number) {
    const s = new Set(selected);
    const key = String(id);
    s.has(key) ? s.delete(key) : s.add(key);
    const usp = new URLSearchParams(sp.toString());
    const str = Array.from(s).join(",");
    if (str) usp.set("genres", str); else usp.delete("genres");
    usp.set("page", "1");
    router.push(`${pathname}?${usp.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((g) => {
        const active = selected.has(String(g.id));
        return (
          <button
            key={g.id}
            onClick={() => toggle(g.id)}
            className="chip"
            style={{
              background: active
                ? "linear-gradient(135deg, color-mix(in oklab, var(--brand) 70%, transparent), color-mix(in oklab, var(--brand-2) 70%, transparent))"
                : "",
              color: active ? "white" : "",
            }}
          >
            {g.name}
          </button>
        );
      })}
    </div>
  );
}