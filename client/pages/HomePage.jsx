import { motion } from 'framer-motion';
import { ArrowRight, Clock3, MapPin, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import QueueList from '../components/QueueList';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import StatCard from '../components/StatCard';
import { SERVICES } from '../lib/constants';
import { getQueueStats } from '../lib/utils';
import { useQueue } from '../hooks/useQueue';
import { pageTransition, pageVariants } from '../animations/pageVariants';

function HomePage() {
  const { queue, loading } = useQueue();
  const stats = getQueueStats(queue);

  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
      <section className="grid gap-8 pt-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-200 bg-gold-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-gold-700">
            <Sparkles size={14} />
            Premium local grooming
          </div>

          <h1 className="mt-6 font-display text-6xl leading-[0.92] text-slate-900 sm:text-7xl lg:text-8xl">
            No Waiting
            <span className="block text-gold-600">Haircut</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Book your turn before you leave home. Jitendra Hair Salon now runs a live token system so you spend less time waiting and more time looking sharp.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/book"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-4 text-sm font-semibold text-white transition hover:bg-gold-400"
            >
              Book Your Turn
              <ArrowRight size={16} />
            </Link>
            <a
              href="#queue-preview"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-100 bg-white/80 px-6 py-4 text-sm font-semibold text-slate-800 transition hover:bg-sky-50"
            >
              Live Queue
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} className="text-gold-500" />
              Sector 3, Udaipur 313001
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock3 size={16} className="text-gold-500" />
              Real-time booking updates
            </span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="grid gap-4"
        >
          <StatCard label="Waiting now" value={stats.waiting} helper="Customers currently in queue" />
          <StatCard
            label="In service"
            value={stats.inProgress?.token_number ?? 'Open'}
            helper={stats.inProgress ? `${stats.inProgress.name} is in the chair` : 'Ready for the next token'}
          />
          <StatCard label="Active tokens" value={stats.totalActive} helper="Visible instantly across all screens" />
        </motion.div>
      </section>

      <section className="mt-20 grid gap-6 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <ServiceCard key={service.value} service={service} />
        ))}
      </section>

      <section id="queue-preview" className="mt-24 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          eyebrow="Live Queue"
          title="See the salon queue before you arrive"
          description="The queue updates in real time as soon as someone books, starts service, or finishes. Local users get a simple view, while the salon team gets control over the flow."
        />
        <QueueList queue={queue} loading={loading} emptyMessage="No active customers right now. Walk in or book the first token." />
      </section>
    </motion.div>
  );
}

export default HomePage;
