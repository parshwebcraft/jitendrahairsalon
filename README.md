# Jitendra Hair Salon Queue App

Premium queue and token booking app for **Jitendra Hair Salon, Sector 3, Udaipur**.

## Stack

- React + Vite
- Tailwind CSS
- Framer Motion
- Supabase Postgres + Realtime
- Vercel-ready frontend

## Project Structure

```text
/client
  /animations
  /components
  /hooks
  /lib
  /pages
  /styles
  App.jsx
  main.jsx
```

## Environment Variables

Create a `.env` file in the project root:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Supabase Setup

1. Create a new Supabase project.
2. Open the SQL Editor.
3. Run the SQL from [supabase/setup.sql](/Users/gaura1/Projects/jitendra-salon-suite/supabase/setup.sql).
4. In Supabase, confirm Realtime is enabled for the `tokens` table.
5. Copy your project URL and anon key into `.env`.

## Local Run

```bash
npm install
npm run dev
```

Open the local Vite URL in your browser.

## Build For Production

```bash
npm run build
npm run preview
```

## Deploy To Vercel

1. Push this project to Git.
2. Import the repo into Vercel.
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the Vercel project settings.
4. Deploy.

## Notes

- Token creation uses a Postgres function for atomic `A1`, `A2`, `A3` generation.
- The admin page uses client-side status updates through Supabase.
- For stricter production security, the next step is to protect admin updates with Supabase Auth and role-based RLS policies.
# jitendrahairsalon
# jitendrahairsalon
