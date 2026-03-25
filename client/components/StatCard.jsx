function StatCard({ label, value, helper }) {
  return (
    <div className="rounded-[28px] border border-sky-100 bg-white/85 p-5 shadow-glow backdrop-blur-sm">
      <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{label}</p>
      <p className="mt-4 font-display text-4xl text-slate-900">{value}</p>
      <p className="mt-3 text-sm text-slate-600">{helper}</p>
    </div>
  );
}

export default StatCard;
