import Link from "next/link";
import SearchBar from "./SearchBar";
import FavoritesBadge from "./FavoritesBadge";

export default function NavBar(){
  return (
    <header className="sticky top-3 z-50">
      <div className="container-max">
        <div className="glass g-border flex items-center justify-between gap-3 px-4 py-3">
          <Link href="/" className="font-bold tracking-tight text-[17px]">🎬 Movie Explorer</Link>
          <div className="flex items-center gap-2">
            <SearchBar />
            <FavoritesBadge />
            <Link href="https://www.themoviedb.org/" target="_blank" className="btn">
              TMDB
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}