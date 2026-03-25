import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useToken(tokenId) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!tokenId) {
      return undefined;
    }

    let mounted = true;

    async function fetchToken() {
      const { data, error: queryError } = await supabase
        .from('tokens')
        .select('id, name, phone, service, status, token_number, created_at')
        .eq('id', tokenId)
        .maybeSingle();

      if (!mounted) {
        return;
      }

      if (queryError) {
        setError(queryError.message);
      } else {
        setToken(data);
      }

      setLoading(false);
    }

    fetchToken();

    const channel = supabase
      .channel(`token-${tokenId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tokens',
          filter: `id=eq.${tokenId}`,
        },
        () => fetchToken()
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, [tokenId]);

  return { token, loading, error };
}
