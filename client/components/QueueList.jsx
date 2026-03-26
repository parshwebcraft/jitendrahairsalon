import { motion } from 'framer-motion';
import { Clock3, Sparkles } from 'lucide-react';
import { STATUS_LABELS, AVERAGE_SERVICE_TIME } from '../lib/constants';
import { formatTime } from '../lib/utils';

function QueueSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="animate-pulse rounded-[24px] border border-sky-100 bg-white/80 p-4">
          <div className="h-4 w-24 rounded bg-sky-100" />
          <div className="mt-3 h-6 w-16 rounded bg-sky-100" />
        </div>
      ))}
    </div>
  );
}

function QueueList({ queue, loading, error = '', emptyMessage = 'Queue is clear right now.' }) {
  if (loading) {
    return <QueueSkeleton />;
  }

  if (error) {
    return (
      <div className="rounded-[28px] border border-rose-200 bg-rose-50 p-8 text-center text-rose-700">
        {error}
      </div>
    );
  }

  if (!queue.length) {
    return (
      <div className="rounded-[28px] border border-dashed border-gold-200 bg-white/80 p-8 text-center text-slate-600">
        {emptyMessage}
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
      className="space-y-3"
    >
      {queue.map((entry, index) => (
        <motion.div
          key={entry.id}
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0 },
          }}
          className="rounded-[26px] border border-sky-100 bg-panel/85 p-4 shadow-glow"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Token</p>
              <h3 className="mt-2 font-display text-3xl text-gold-700">{entry.token_number}</h3>
            </div>
            <div className="rounded-full border border-gold-200 bg-gold-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold-700">
              {STATUS_LABELS[entry.status]}
            </div>
          </div>

          <div className="mt-4 grid gap-4 text-sm text-slate-600 sm:grid-cols-3">
            <div>
              <p className="text-slate-500">Client</p>
              <p className="mt-1 font-medium text-slate-900">{entry.name}</p>
            </div>
            <div>
              <p className="text-slate-500">Service</p>
              <p className="mt-1 font-medium text-slate-900">{entry.service}</p>
            </div>
            <div>
              <p className="text-slate-500">Joined</p>
              <p className="mt-1 font-medium text-slate-900">{formatTime(entry.created_at)}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-2xl border border-sky-100 bg-sky-50/70 px-4 py-3 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2">
              <Sparkles size={16} className="text-gold-500" />
              Position {index + 1}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock3 size={16} className="text-gold-500" />
              Approx {Math.max(index, 1) * AVERAGE_SERVICE_TIME} min
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default QueueList;
