"use client";
import { useState, useEffect } from "react";

export default function TrailerPlayer({ youtubeKey }: { youtubeKey: string | null }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onEsc(e: KeyboardEvent) { if (e.key === "Escape") setOpen(false); }
    if (open) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open]);

  if (!youtubeKey) {
    return (
      <button className="btn" title="Trailer tidak tersedia" disabled>
        Tonton Trailer
      </button>
    );
  }

  return (
    <>
      <button className="btn btn-primary" onClick={() => setOpen(true)}>
        Tonton Trailer
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,.55)" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="surface g-border w-full max-w-4xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${youtubeKey}?autoplay=1&rel=0`}
                title="Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="flex justify-end p-3">
              <button className="btn" onClick={() => setOpen(false)}>Tutup</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
