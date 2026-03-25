import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/MainLayout';

const HomePage = lazy(() => import('./pages/HomePage'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
const TokenPage = lazy(() => import('./pages/TokenPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-midnight text-slate-900">
          <div className="rounded-full border border-gold-200 bg-gold-50 px-6 py-3 text-sm font-semibold text-gold-700">
            Loading experience...
          </div>
        </div>
      }
    >
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/token/:tokenId" element={<TokenPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
