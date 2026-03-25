import { motion } from 'framer-motion';
import { Clock3, ScissorsLineDashed, User } from 'lucide-react';

function TokenDisplay({ tokenNumber, name, service, waitMinutes }) {
  return (
    <div className="relative overflow-hidden rounded-[36px] border border-sky-100 bg-panel/90 px-6 py-10 text-center shadow-glow">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(104,180,255,0.18),transparent_44%)]" />
      <p className="relative text-xs uppercase tracking-[0.4em] text-gold-600">Your token</p>
      <motion.div
        animate={{
          boxShadow: [
            '0 0 0 0 rgba(104, 180, 255, 0.24)',
            '0 0 0 18px rgba(104, 180, 255, 0)',
          ],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          repeatType: 'loop',
        }}
        className="relative mx-auto mt-8 flex h-40 w-40 items-center justify-center rounded-full border border-gold-200 bg-gold-50"
      >
        <span className="font-display text-7xl text-gold-700">{tokenNumber}</span>
      </motion.div>

      <div className="relative mt-8 grid gap-3 text-left sm:grid-cols-3">
        <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-4">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-slate-500">
            <User size={15} />
            Client
          </p>
          <p className="mt-3 text-lg font-semibold text-slate-900">{name}</p>
        </div>
        <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-4">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-slate-500">
            <ScissorsLineDashed size={15} />
            Service
          </p>
          <p className="mt-3 text-lg font-semibold text-slate-900">{service}</p>
        </div>
        <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-4">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-slate-500">
            <Clock3 size={15} />
            Wait time
          </p>
          <p className="mt-3 text-lg font-semibold text-slate-900">~{waitMinutes} min</p>
        </div>
      </div>
    </div>
  );
}

export default TokenDisplay;
