export default function StatCard({ icon, iconBg, value, label, sub }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-ink-900 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="mt-1 text-sm text-gray-300">{label}</p>
          {sub && <p className="text-xs text-gray-500">{sub}</p>}
        </div>
        {icon && (
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{ background: iconBg || "rgba(198,255,51,0.12)" }}
          >
            {icon}
          </span>
        )}
      </div>
    </div>
  );
}
