interface StatsBarProps {
  stats: Array<{ value: string; label: string }>;
}

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="border-t border-border-2 bg-navy-bg/60 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-8 grid grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="py-7 text-center border-r border-border-2 last:border-r-0"
          >
            <div className="font-syne font-extrabold text-amber text-[clamp(24px,3vw,36px)] leading-none mb-1.5">
              {stat.value}
            </div>
            <div className="text-[8px] tracking-[0.25em] uppercase text-text-muted">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
