import { motion } from 'framer-motion';
import { CheckCircle2, LoaderCircle, TimerReset } from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router-dom';
import QueueList from '../components/QueueList';
import SectionHeading from '../components/SectionHeading';
import TokenDisplay from '../components/TokenDisplay';
import { useQueue } from '../hooks/useQueue';
import { useToken } from '../hooks/useToken';
import { estimateWaitMinutes } from '../lib/utils';
import { pageTransition, pageVariants } from '../animations/pageVariants';

function TokenPage() {
  const { tokenId } = useParams();
  const location = useLocation();
  const stateToken = location.state?.token;
  const { token, loading, error } = useToken(tokenId);
  const { queue, loading: queueLoading, error: queueError } = useQueue();
  const activeToken = token ?? stateToken;
  const waitMinutes = estimateWaitMinutes(queue, activeToken);

  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
      {!activeToken && loading ? (
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-sky-100 bg-white/80 px-6 py-3 text-slate-700">
            <LoaderCircle className="animate-spin text-gold-500" />
            Loading your token...
          </div>
        </div>
      ) : error ? (
        <div className="mx-auto flex max-w-xl flex-col items-center rounded-[32px] border border-rose-200 bg-rose-50 p-10 text-center shadow-glow">
          <h1 className="font-display text-4xl text-slate-900">Unable to load token</h1>
          <p className="mt-4 text-rose-700">{error}</p>
          <Link to="/book" className="mt-8 rounded-full bg-gold-500 px-6 py-3 font-semibold text-white">
            Try Booking Again
          </Link>
        </div>
      ) : activeToken ? (
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <SectionHeading
              eyebrow="Live Token"
              title="Your booking is confirmed"
              description="Keep this screen open. It updates in real time as the queue moves ahead."
            />
            <div className="mt-8">
              <TokenDisplay
                tokenNumber={activeToken.token_number}
                name={activeToken.name}
                service={activeToken.service}
                waitMinutes={waitMinutes}
              />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[26px] border border-sky-100 bg-white/80 p-5">
                <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-slate-500">
                  <TimerReset size={16} className="text-gold-500" />
                  Status
                </p>
                <p className="mt-3 text-lg font-semibold text-slate-900">
                  {activeToken.status === 'done'
                    ? 'Completed'
                    : activeToken.status === 'in_progress'
                      ? 'Your service is in progress'
                      : 'Waiting for your turn'}
                </p>
              </div>
              <div className="rounded-[26px] border border-sky-100 bg-white/80 p-5">
                <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-slate-500">
                  <CheckCircle2 size={16} className="text-gold-500" />
                  Tip
                </p>
                <p className="mt-3 text-lg font-semibold text-slate-900">Please arrive 5 minutes before your token is called.</p>
              </div>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Queue Ahead"
              title="Track the line in real time"
              description="You can safely wait nearby and walk in at the right moment."
            />
            <div className="mt-8">
              <QueueList queue={queue} loading={queueLoading} error={queueError} emptyMessage="The chair is open now. You can head to the salon." />
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto flex max-w-xl flex-col items-center rounded-[32px] border border-sky-100 bg-panel/90 p-10 text-center shadow-glow">
          <h1 className="font-display text-4xl text-slate-900">Token not found</h1>
          <p className="mt-4 text-slate-600">This booking may have expired or the token link is invalid.</p>
          <Link to="/book" className="mt-8 rounded-full bg-gold-500 px-6 py-3 font-semibold text-white">
            Book a New Turn
          </Link>
        </div>
      )}
    </motion.div>
  );
}

export default TokenPage;
