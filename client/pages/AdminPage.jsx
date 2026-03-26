import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import AdminQueueTable from '../components/AdminQueueTable';
import ActionButton from '../components/ActionButton';
import SectionHeading from '../components/SectionHeading';
import StatCard from '../components/StatCard';
import { useQueue } from '../hooks/useQueue';
import { getQueueStats } from '../lib/utils';
import { pageTransition, pageVariants } from '../animations/pageVariants';

const ADMIN_PASSWORD = 'admin123';
const ADMIN_SESSION_KEY = 'jitendra_admin_unlocked';

function AdminPage() {
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const { queue, loading, error } = useQueue();
  const stats = getQueueStats(queue);

  useEffect(() => {
    if (window.sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true') {
      setUnlocked(true);
    }
  }, []);

  function handleUnlock(event) {
    event.preventDefault();

    if (password === ADMIN_PASSWORD) {
      window.sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      setUnlocked(true);
      setPassword('');
      toast.success('Admin panel unlocked');
      return;
    }

    toast.error('Incorrect password');
  }

  function handleLogout() {
    window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setUnlocked(false);
    toast.success('Admin panel locked');
  }

  if (!unlocked) {
    return (
      <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
        <div className="mx-auto flex min-h-[70vh] max-w-lg items-center">
          <div className="w-full rounded-[32px] border border-sky-100 bg-panel/90 p-8 shadow-glow">
            <SectionHeading
              eyebrow="Protected Access"
              title="Admin panel lock"
              description="Enter the salon admin password to manage the live queue."
              align="center"
            />

            <form onSubmit={handleUnlock} className="mt-8 grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-700">Admin password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="rounded-2xl border border-sky-100 bg-sky-50/80 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-gold-300"
                  placeholder="Enter password"
                />
              </label>

              <ActionButton type="submit" className="bg-gold-500 text-white hover:bg-gold-400">
                Unlock Admin
              </ActionButton>
            </form>

            <p className="mt-5 text-center text-xs leading-6 text-slate-500">
              This is a frontend-only password lock for convenience. For real security, admin access should be protected with Supabase Auth and strict RLS.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Salon Desk"
          title="Admin queue panel"
          description="Designed for the receptionist or barber chair. The queue updates instantly on every screen connected to Supabase realtime."
        />
        <ActionButton onClick={handleLogout} className="border border-sky-100 bg-white/80 text-slate-700 hover:bg-sky-50">
          Lock Admin
        </ActionButton>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <StatCard label="Waiting" value={stats.waiting} helper="Customers still in line" />
        <StatCard
          label="In progress"
          value={stats.inProgress?.token_number ?? 'None'}
          helper={stats.inProgress ? `${stats.inProgress.name} is being served` : 'No active service at the moment'}
        />
        <StatCard label="Total active" value={stats.totalActive} helper="Waiting plus in-progress tokens" />
      </div>

      <div className="mt-10">
        {error ? (
          <div className="rounded-[30px] border border-rose-200 bg-rose-50 p-6 text-rose-700 shadow-glow">
            {error}
          </div>
        ) : (
          <AdminQueueTable queue={queue} loading={loading} />
        )}
      </div>
    </motion.div>
  );
}

export default AdminPage;
