import Link from "next/link";

type Props = {
  page: number; totalPages: number; basePath: string;
  params?: Record<string, string | number | undefined>;
};
const MAX = 500;

export default function Pagination({ page, totalPages, basePath, params = {} }: Props) {
  const tp = Math.min(totalPages, MAX);
  const prev = Math.max(1, page - 1);
  const next = Math.min(tp, page + 1);

  const build = (p:number)=>{
    const usp = new URLSearchParams();
    Object.entries(params).forEach(([k,v])=> v!==undefined && usp.set(k,String(v)));
    usp.set("page", String(p));
    const qs = usp.toString(); return qs? `${basePath}?${qs}` : basePath;
  };

  const around = [page-1,page,page+1].filter(p=>p>=1 && p<=tp);

  return (
    <nav className="mt-8 flex items-center justify-center gap-2">
      <Link className="btn" href={build(1)} aria-label="First">«</Link>
      <Link className="btn" href={build(prev)} aria-label="Prev">←</Link>

      <div className="hidden sm:flex items-center gap-2">
        {around[0] > 1 && <span className="chip">…</span>}
        {around.map(p =>
          <Link key={p} href={build(p)} className={`btn ${p===page? 'btn-primary': ''}`}>{p}</Link>
        )}
        {around.at(-1)! < tp && <span className="chip">…</span>}
      </div>

      <Link className="btn" href={build(next)} aria-label="Next">→</Link>
      <Link className="btn" href={build(tp)} aria-label="Last">»</Link>
    </nav>
  );
}