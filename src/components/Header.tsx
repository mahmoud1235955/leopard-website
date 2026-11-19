import { useEffect, useState } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { Menu, X, Languages, FileText } from 'lucide-react';
import { Logo } from './Logo';
import { useLanguage } from '@/i18n/LanguageContext';

export function Header() {
  const { t, lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const links = [
    { to: '/', label: t.nav.home },
    { to: '/about', label: t.nav.about },
    { to: '/services', label: t.nav.services },
    { to: '/industries', label: t.nav.industries },
    { to: '/academy', label: t.nav.academy },
    { to: '/feed', label: t.nav.feed },
    { to: '/contact', label: t.nav.contact },
  ];

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? 'text-brand-600' : 'text-navy-800 hover:text-brand-600'
    }`;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-shadow ${
        scrolled ? 'bg-white/95 shadow-sm backdrop-blur' : 'bg-white'
      }`}
    >
      <div className="container-site flex h-16 items-center justify-between gap-4 lg:h-20">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {links.map((l) => (
            <Link key={l.to} to={l.to} activeOptions={{ exact: l.to === '/' }}>
              {({ isActive }) => <span className={navClass({ isActive })}>{l.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-1.5 rounded-md border border-navy-200 px-3 py-2 text-xs font-semibold text-navy-800 transition-colors hover:border-navy-400 hover:text-brand-600"
            aria-label={t.common.language}
          >
            <Languages className="h-4 w-4" />
            {lang === 'en' ? 'العربية' : 'English'}
          </button>

          <Link to="/quote" className="btn-primary hidden !py-2.5 md:inline-flex">
            <FileText className="h-4 w-4" />
            {t.nav.quote}
          </Link>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="rounded-md p-2 text-navy-900 lg:hidden"
            aria-label={open ? t.common.close : t.common.menu}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-navy-100 bg-white px-4 pb-6 pt-2 lg:hidden" aria-label="Mobile">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link key={l.to} to={l.to} activeOptions={{ exact: l.to === '/' }}>
                {({ isActive }) => <span className={`block rounded-md px-3 py-3 text-base font-medium ${
                    isActive ? 'bg-navy-50 text-brand-600' : 'text-navy-800'
                  }`}>{l.label}</span>}
              </Link>
            ))}
            <Link to="/quote" className="btn-primary mt-3">
              <FileText className="h-4 w-4" />
              {t.nav.quote}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
