import { ShieldCheck } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { cn } from '../lib/utils';

const links = [
  { to: '/', label: 'Home' },
  { to: '/book', label: 'Book Turn' },
  { to: '/admin', label: 'Admin' },
];

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-sky-100 bg-midnight/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gold-200 bg-gold-50 text-gold-600 shadow-glow">
            <img
              src="/jitendra-logo.png"
              alt="Jitendra Hair Salon logo"
              className="h-8 w-8 object-contain"
            />
          </div>
          <div>
            <p className="font-display text-2xl leading-none text-slate-900">Jitendra Hair Salon</p>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Sector 3, Udaipur</p>
          </div>
        </Link>

        <nav className="flex items-center gap-1 rounded-full border border-sky-100 bg-white/80 p-1 shadow-sm">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition',
                  isActive && 'bg-gold-500 text-white'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 rounded-full border border-gold-200 bg-gold-50 px-4 py-2 text-sm text-gold-700 md:flex">
          <ShieldCheck size={16} />
          Live queue
        </div>
      </div>
    </header>
  );
}

export default Header;
