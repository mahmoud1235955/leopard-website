import { Link } from '@tanstack/react-router';
import { Mail, Phone, MessageCircle, Youtube, MapPin, Facebook } from 'lucide-react';
import { Logo } from './Logo';
import { publicContact, officeAddress, socialLinks } from '@/config/contact';
import { useLanguage } from '@/i18n/LanguageContext';

const serviceLinks = [
  { key: 'air', path: '/services/air-freight' },
  { key: 'sea', path: '/services/sea-freight' },
  { key: 'customs', path: '/services/customs-clearance' },
  { key: 'land', path: '/services/land-freight' },
  { key: 'importExport', path: '/services/import-export' },
] as const;

export function Footer() {
  const { t, lang } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-navy-100">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo chip className="h-20" />
          <p className="text-sm leading-relaxed text-navy-200">{t.footer.intro}</p>
          <div className="flex items-center gap-3 pt-1">
            <a
              href={publicContact.youtubeHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="rounded-md bg-white/10 p-2 transition-colors hover:bg-brand-600"
            >
              <Youtube className="h-4 w-4" />
            </a>
            {socialLinks.facebook && (
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rounded-md bg-white/10 p-2 transition-colors hover:bg-brand-600"
              >
                <Facebook className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
            {t.footer.quickLinks}
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link className="hover:text-white" to="/">{t.nav.home}</Link></li>
            <li><Link className="hover:text-white" to="/about">{t.nav.about}</Link></li>
            <li><Link className="hover:text-white" to="/industries">{t.nav.industries}</Link></li>
            <li><Link className="hover:text-white" to="/quote">{t.nav.quote}</Link></li>
            <li><Link className="hover:text-white" to="/academy">{t.nav.academy}</Link></li>
            <li><Link className="hover:text-white" to="/contact">{t.nav.contact}</Link></li>
            <li><Link className="hover:text-white" to="/info">INFO</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
            {t.footer.servicesTitle}
          </h3>
          <ul className="space-y-2.5 text-sm">
            {serviceLinks.map((s) => (
              <li key={s.key}>
                <Link className="hover:text-white" to={s.path}>
                  {t.services.list[s.key].name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
            {t.footer.contactTitle}
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={`mailto:${publicContact.email}`} className="flex items-center gap-2 hover:text-white">
                <Mail className="h-4 w-4 shrink-0 text-gold-400" />
                {publicContact.email}
              </a>
            </li>
            <li>
              <a href={publicContact.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
                <MessageCircle className="h-4 w-4 shrink-0 text-gold-400" />
                {publicContact.whatsappDisplay} <span className="text-navy-300">({t.common.whatsapp})</span>
              </a>
            </li>
            <li>
              <a href={publicContact.phoneHref} className="flex items-center gap-2 hover:text-white">
                <Phone className="h-4 w-4 shrink-0 text-gold-400" />
                {publicContact.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2 text-navy-200">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <span>{lang === 'ar' ? officeAddress.ar : officeAddress.en}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-5 text-xs text-navy-300 sm:flex-row">
          <p>© {year} {t.brand.name}. {t.footer.rights}</p>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="hover:text-white">{t.footer.privacy}</Link>
            <Link to="/terms" className="hover:text-white">{t.footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
