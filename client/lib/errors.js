export function getFriendlyErrorMessage(error, fallback = 'Something went wrong. Please try again.') {
  if (!error) {
    return fallback;
  }

  const message = typeof error === 'string' ? error : error.message || fallback;

  if (message.includes('Could not find the function public.create_token')) {
    return 'Supabase RPC create_token is missing. Run the latest setup.sql in your Supabase SQL editor.';
  }

  if (message.includes('relation "public.tokens" does not exist')) {
    return 'Supabase table tokens is missing. Run the latest setup.sql in your Supabase SQL editor.';
  }

  if (message.includes('permission denied')) {
    return 'Supabase permissions are blocking this action. Re-check your RLS policies and function grants.';
  }

  if (message.includes('JWT') || message.includes('Invalid API key')) {
    return 'Supabase credentials look invalid. Re-check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.';
  }

  return message;
}
