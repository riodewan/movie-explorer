import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Movie Explorer",
  description: "Cari dan jelajahi film dari TMDB",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <NavBar />
        {/* background radial halus */}
        <div className="relative">
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(1200px 500px at 50% -20%, color-mix(in oklab, #818cf8 25%, transparent), transparent)",
            }}
          />
          <main className="mx-auto max-w-[1200px] px-4 py-6">{children}</main>
        </div>
      </body>
    </html>
  );
}