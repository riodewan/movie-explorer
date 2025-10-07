import Link from 'next/link';

type Props = {
  page: number;
  totalPages: number;
  basePath: string;
  params?: Record<string, string | number | undefined>;
};

export default function Pagination({ page, totalPages, basePath, params = {} }: Props) {
  const prev = Math.max(1, page - 1);
  const next = Math.min(totalPages, page + 1);

  function buildHref(p: number) {
    const usp = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined) usp.set(k, String(v));
    });
    usp.set('page', String(p));
    const qs = usp.toString();
    return qs ? `${basePath}?${qs}` : `${basePath}`;
  }

  return (
    <div className="mt-6 flex items-center justify-center gap-3">
      <Link
        href={buildHref(prev)}
        className={`rounded-md border px-3 py-1 ${page === 1 ? 'pointer-events-none opacity-40' : 'hover:bg-gray-50'}`}
      >
        ← Prev
      </Link>
      <span className="text-sm text-gray-600">Halaman {page} / {Math.min(totalPages, 500)}</span>
      <Link
        href={buildHref(next)}
        className={`rounded-md border px-3 py-1 ${page >= totalPages ? 'pointer-events-none opacity-40' : 'hover:bg-gray-50'}`}
      >
        Next →
      </Link>
    </div>
  );
}