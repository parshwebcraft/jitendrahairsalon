import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail, MapPin, Phone } from 'lucide-react';
import { FOOTER_CREDIT, SALON_DETAILS, SITE_LINKS, SOCIAL_LINKS } from '../lib/constants';

function Footer() {
  const [email, setEmail] = useState('');

  function handleSubscribe(event) {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      toast.error('Enter a valid email address');
      return;
    }

    toast.success(`Thanks ${trimmedEmail}, we will share updates soon.`);
    setEmail('');
  }

  return (
    <footer className="mt-16 border-t border-sky-100 bg-white/65 backdrop-blur-sm">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold-200 bg-gold-50 shadow-glow">
              <img
                src="/jitendra-logo.png"
                alt="Jitendra Hair Salon logo"
                className="h-9 w-9 object-contain"
              />
            </div>
            <div>
              <p className="font-display text-2xl leading-none text-slate-900">Jitendra Hair Salon</p>
              <p className="mt-1 text-xs uppercase tracking-[0.28em] text-slate-500">Sector 3, Udaipur</p>
            </div>
          </Link>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.32em] text-gold-600">Salon Details</p>
          <h3 className="mt-3 font-display text-3xl text-slate-900">{SALON_DETAILS.ownerName}</h3>
          <div className="mt-5 space-y-3 text-sm text-slate-600">
            <p className="inline-flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 text-gold-500" />
              <span>{SALON_DETAILS.address}</span>
            </p>
            <p className="inline-flex items-center gap-2">
              <Phone size={16} className="text-gold-500" />
              <span>{SALON_DETAILS.phone}</span>
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-gold-600">ParshWebCraft</p>
          <p className="mt-3 font-display text-3xl text-slate-900">Premium local web experiences</p>
          <p className="mt-4 text-sm leading-7 text-slate-600">{FOOTER_CREDIT}</p>
          <p className="mt-5 text-sm text-slate-500">Copyright {new Date().getFullYear()} Jitendra Hair Salon. All rights reserved.</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-gold-600">Connect & Subscribe</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {SITE_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-sky-100"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href === '#' ? undefined : '_blank'}
                rel={link.href === '#' ? undefined : 'noreferrer'}
                className="rounded-full border border-gold-200 bg-gold-50 px-4 py-2 text-sm font-semibold text-gold-700 transition hover:bg-gold-100"
              >
                {link.label}
              </a>
            ))}
          </div>

          <form onSubmit={handleSubscribe} className="mt-5 rounded-[26px] border border-sky-100 bg-white/80 p-4 shadow-glow">
            <label className="text-sm font-medium text-slate-700">Newsletter email</label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <div className="flex flex-1 items-center gap-2 rounded-2xl border border-sky-100 bg-sky-50/80 px-4 py-3">
                <Mail size={16} className="text-gold-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
              <button
                type="submit"
                className="rounded-full bg-gold-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gold-400"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
