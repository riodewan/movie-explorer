import Link from 'next/link';
import SearchBar from './SearchBar';

export default function NavBar() {
  return (
    <header className="sticky top-0 z-20 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-lg font-bold">🎬 Movie Explorer</Link>
        <SearchBar />
      </div>
    </header>
  );
}