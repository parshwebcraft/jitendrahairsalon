import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const BASE_QUERY = `
  id,
  name,
  phone,
  service,
  status,
  token_number,
  created_at
`;

export function useQueue() {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    async function fetchQueue() {
      const { data, error: queryError } = await supabase
        .from('tokens')
        .select(BASE_QUERY)
        .neq('status', 'done')
        .order('created_at', { ascending: true });

      if (!mounted) {
        return;
      }

      if (queryError) {
        setError(queryError.message);
      } else {
        setQueue(data ?? []);
      }

      setLoading(false);
    }

    fetchQueue();

    const channel = supabase
      .channel('tokens-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tokens',
        },
        () => fetchQueue()
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return { queue, loading, error };
}
