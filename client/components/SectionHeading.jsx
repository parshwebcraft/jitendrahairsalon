function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={align === 'center' ? 'text-center' : ''}>
      <p className="text-sm font-semibold uppercase tracking-[0.32em] text-gold-600">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl text-slate-900 sm:text-5xl">{title}</h2>
      {description ? <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">{description}</p> : null}
    </div>
  );
}

export default SectionHeading;
