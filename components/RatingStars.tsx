export default function RatingStars({ rating }: { rating: number }) {
  const score5 = Math.round((rating / 2) * 10) / 10; // 0..5
  const full = Math.floor(score5);
  const half = score5 - full >= 0.5;

  return (
    <div className="flex items-center gap-1" style={{ color: "color-mix(in oklab, #f59e0b 100%, transparent)" }}>
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full) return <span key={i}>★</span>;
        if (i === full && half) return <span key={i}>☆</span>;
        return <span key={i} style={{ opacity: .4 }}>☆</span>;
      })}
      <span className="ml-1 text-xs" style={{ color: "color-mix(in oklab, var(--foreground) 60%, transparent)" }}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
}