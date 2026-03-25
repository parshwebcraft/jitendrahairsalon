function ServiceCard({ service }) {
  return (
    <div className="rounded-[26px] border border-sky-100 bg-white/80 p-5 transition hover:border-gold-300 hover:bg-sky-50">
      <p className="text-xs uppercase tracking-[0.28em] text-gold-600">Service</p>
      <h3 className="mt-3 font-display text-3xl text-slate-900">{service.value}</h3>
      <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
        <span>{service.duration} min</span>
        <span>{service.price}</span>
      </div>
    </div>
  );
}

export default ServiceCard;
