'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchBar({ placeholder = 'Cari film...' }: { placeholder?: string }) {
  const [q, setQ] = useState('');
  const router = useRouter();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    router.push(`/search?query=${encodeURIComponent(query)}`);
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md gap-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="flex-1 rounded-md border px-3 py-2 outline-none"
        placeholder={placeholder}
      />
      <button className="rounded-md border px-4 py-2 hover:bg-gray-50">Cari</button>
    </form>
  );
}