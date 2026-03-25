import toast from 'react-hot-toast';
import ActionButton from './ActionButton';
import { formatTime } from '../lib/utils';
import { supabase } from '../lib/supabase';

async function updateTokenStatus(id, status) {
  const { error } = await supabase.from('tokens').update({ status }).eq('id', id);

  if (error) {
    toast.error(error.message);
    return false;
  }

  toast.success(`Token moved to ${status.replace('_', ' ')}`);
  return true;
}

function AdminQueueTable({ queue, loading }) {
  const current = queue.find((item) => item.status === 'in_progress');
  const nextWaiting = queue.find((item) => item.status === 'waiting');

  async function handleNext() {
    if (current) {
      toast.error('Finish the current token first.');
      return;
    }

    if (!nextWaiting) {
      toast.error('No waiting token found.');
      return;
    }

    await updateTokenStatus(nextWaiting.id, 'in_progress');
  }

  async function handleDone() {
    if (!current) {
      toast.error('No active token in service.');
      return;
    }

    await updateTokenStatus(current.id, 'done');
  }

  if (loading) {
    return (
      <div className="rounded-[30px] border border-sky-100 bg-panel/90 p-6 shadow-glow">
        <div className="animate-pulse space-y-4">
          <div className="h-10 rounded-2xl bg-sky-100" />
          <div className="h-24 rounded-2xl bg-sky-100" />
          <div className="h-24 rounded-2xl bg-sky-100" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[30px] border border-sky-100 bg-panel/90 p-5 shadow-glow sm:p-6">
      <div className="flex flex-col gap-3 border-b border-sky-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-gold-600">Queue controls</p>
          <h3 className="mt-2 font-display text-3xl text-slate-900">Manage today&apos;s tokens</h3>
        </div>
        <div className="flex gap-3">
          <ActionButton onClick={handleNext} className="bg-gold-500 text-white hover:bg-gold-400">
            Next
          </ActionButton>
          <ActionButton onClick={handleDone} className="border border-sky-100 bg-sky-50 text-slate-700 hover:bg-sky-100">
            Done
          </ActionButton>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-[24px] border border-sky-100">
        <div className="hidden grid-cols-[1.1fr_1fr_1fr_1fr_0.9fr] gap-4 bg-sky-50 px-5 py-4 text-xs uppercase tracking-[0.24em] text-slate-500 md:grid">
          <span>Token</span>
          <span>Client</span>
          <span>Service</span>
          <span>Time</span>
          <span>Status</span>
        </div>

        <div className="divide-y divide-sky-100">
          {queue.length ? (
            queue.map((entry) => (
              <div
                key={entry.id}
                className="grid gap-2 px-5 py-4 text-sm text-slate-600 md:grid-cols-[1.1fr_1fr_1fr_1fr_0.9fr] md:items-center"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500 md:hidden">Token</p>
                  <p className="font-display text-3xl text-gold-700">{entry.token_number}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500 md:hidden">Client</p>
                  <p className="font-semibold text-slate-900">{entry.name}</p>
                  <p>{entry.phone}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500 md:hidden">Service</p>
                  <p>{entry.service}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500 md:hidden">Time</p>
                  <p>{formatTime(entry.created_at)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500 md:hidden">Status</p>
                  <span className="inline-flex rounded-full border border-gold-200 bg-gold-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">
                    {entry.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="px-5 py-10 text-center text-slate-600">No active tokens. New bookings will appear here instantly.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminQueueTable;
