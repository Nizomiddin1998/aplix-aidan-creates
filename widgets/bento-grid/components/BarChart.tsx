export function BarChart() {
  const bars = [
    { h: 30, active: false },
    { h: 45, active: false },
    { h: 60, active: false },
    { h: 40, active: false },
    { h: 75, active: false },
    { h: 55, active: false },
    { h: 90, active: true },
    { h: 70, active: true },
    { h: 80, active: true },
    { h: 65, active: false },
    { h: 50, active: false },
    { h: 35, active: false },
  ];

  return (
    <div className="flex items-end gap-1 h-20 px-1">
      {bars.map((bar, i) => (
        <div
          key={i}
          className={`flex-1 rounded-t-[2px] ${bar.active ? "bg-brand" : "bg-brand/25"}`}
          style={{ height: `${bar.h}%` }}
        />
      ))}
    </div>
  );
}
