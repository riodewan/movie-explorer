export default function SectionHeader({title, subtitle}:{title:string; subtitle?:string}){
  return (
    <div className="mb-4 flex items-end justify-between">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle ? <p style={{color:"var(--muted)"}}>{subtitle}</p> : null}
      </div>
    </div>
  );
}