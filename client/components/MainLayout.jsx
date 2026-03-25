import { Outlet } from 'react-router-dom';
import Header from './Header';

function MainLayout() {
  return (
    <div className="min-h-screen bg-midnight text-slate-900">
      <div className="fixed inset-0 -z-10 bg-hero-radial opacity-90" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(129,140,248,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(129,140,248,0.05)_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(circle_at_center,black,transparent_85%)]" />
      <Header />
      <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-10 pt-24 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
