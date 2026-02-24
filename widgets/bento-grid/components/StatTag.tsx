interface StatTagProps {
  label: string;
  value: string;
}

export function StatTag({ label, value }: StatTagProps) {
  return (
    <div className="inline-flex flex-col px-2.5 py-1.5 bg-white/[0.12] border border-white/10 rounded-sm">
      <span className="text-2xl font-bold text-white tracking-tight leading-none">
        {value}
      </span>
      <span className="text-[0.65rem] text-white/45 mt-0.5">{label}</span>
    </div>
  );
}
