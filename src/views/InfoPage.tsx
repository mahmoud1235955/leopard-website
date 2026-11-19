import {
  Mail,
  MessageCircle,
  Phone,
  Globe,
  MapPin,
  Download,
  CheckCircle2,
  Youtube,
  Navigation,
  Facebook,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Seo } from '@/components/Seo';
import { publicContact, officeAddress, socialLinks } from '@/config/contact';
import { useLanguage } from '@/i18n/LanguageContext';
import logoMarkAsset from '@/assets/leopard-logo-mark.png.asset.json';

function buildVCard(): string {
  const now = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'FN:Leopard International Shipping & Logistics',
    'ORG:Leopard International Shipping & Logistics',
    'TEL;TYPE=WORK,VOICE:+201271596996',
    'TEL;TYPE=WORK,VOICE:+201001753684',
    'EMAIL;TYPE=WORK:info@leopard.my.id',
    'URL:https://leopardlogistics.com',
    'ADR;TYPE=WORK:;;Sheraton Fifth District Building 19 Apt 2;Cairo;;;Egypt',
    `REV:${now}`,
    'END:VCARD',
  ].join('\r\n');
}

export function InfoPage() {
  const { t, lang } = useLanguage();
  const [saved, setSaved] = useState(false);

  const saveContact = () => {
    const blob = new Blob([buildVCard()], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leopard-logistics.vcf';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setSaved(true);
  };

  const bigBtn =
    'flex w-full items-center gap-3 rounded-lg px-5 py-4 text-sm font-semibold transition-colors';

  return (
    <>
      <Seo title={t.seo.info.title} description={t.seo.info.desc} path="/info" />

      <section className="bg-navy-hero py-12 text-white sm:py-16">
        <div className="container-site max-w-lg text-center animate-fade-up">
          <img
            src={logoMarkAsset.url}
            alt={t.brand.name}
            className="mx-auto h-24 w-auto rounded-xl bg-white p-3 shadow-sm"
          />
          <h1 className="mt-5 text-2xl font-bold sm:text-3xl">{t.brand.name}</h1>
          <p className="mt-3 text-sm leading-relaxed text-navy-100">{t.info.intro}</p>
        </div>
      </section>

      <section className="bg-navy-50 py-10 sm:py-14">
        <div className="container-site max-w-lg space-y-3">
          <a href={`mailto:${publicContact.email}`} className={`${bigBtn} bg-white text-navy-900 shadow-sm hover:bg-navy-100`}>
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-navy-50 text-brand-600">
              <Mail className="h-4 w-4" />
            </span>
            <span className="flex-1 text-start">{publicContact.email}</span>
          </a>

          <a
            href={publicContact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`${bigBtn} bg-[#25D366] text-white hover:brightness-95`}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white/20">
              <MessageCircle className="h-4 w-4" />
            </span>
            <span className="flex-1 text-start">{t.common.whatsapp} — {publicContact.whatsappDisplay}</span>
          </a>

          <a href={publicContact.phoneHref} className={`${bigBtn} bg-white text-navy-900 shadow-sm hover:bg-navy-100`}>
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-navy-50 text-brand-600">
              <Phone className="h-4 w-4" />
            </span>
            <span className="flex-1 text-start">{publicContact.phoneDisplay}</span>
          </a>

          <a
            href={publicContact.websiteHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`${bigBtn} bg-white text-navy-900 shadow-sm hover:bg-navy-100`}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-navy-50 text-brand-600">
              <Globe className="h-4 w-4" />
            </span>
            <span className="flex-1 text-start">{t.info.visitWebsite}</span>
          </a>

          <button type="button" onClick={saveContact} className={`${bigBtn} bg-navy-900 text-white hover:bg-navy-800`}>
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10">
              <Download className="h-4 w-4" />
            </span>
            <span className="flex-1 text-start">{t.info.saveContact}</span>
          </button>

          {saved && (
            <p className="flex items-center justify-center gap-1.5 text-xs font-medium text-emerald-700" role="status">
              <CheckCircle2 className="h-4 w-4" />
              {t.info.saved}
            </p>
          )}
        </div>
      </section>

      <section className="pb-14 pt-6 sm:pb-20">
        <div className="container-site max-w-lg space-y-6">
          <div className="card p-5">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-navy-500">
              <MapPin className="h-4 w-4 text-brand-600" />
              {t.info.address}
            </h2>
            <p className="text-sm leading-relaxed text-navy-700">
              {lang === 'ar' ? officeAddress.ar : officeAddress.en}
            </p>
          </div>

          <div className="card p-5">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-navy-500">{t.info.connect}</h2>
            <div className="flex flex-wrap gap-3">
              <a
                href={publicContact.youtubeHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-navy-50 text-navy-700 transition-colors hover:bg-brand-600 hover:text-white"
              >
                <Youtube className="h-5 w-5" />
              </a>
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-navy-50 text-navy-700 transition-colors hover:bg-brand-600 hover:text-white"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          <div className="card flex items-center justify-between gap-4 p-5">
            <div className="flex items-center gap-2 text-sm text-navy-600">
              <Navigation className="h-4 w-4 text-brand-600" />
              {t.info.getDirections}
            </div>
            <a
              href={publicContact.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline !px-4 !py-2 text-xs"
            >
              <MapPin className="h-4 w-4" />
              {t.common.contactUs}
            </a>
          </div>

          <p className="text-center text-xs text-navy-400">
            <Link to="/" className="underline hover:text-navy-700">{t.nav.home}</Link>
            {' · '}
            <Link to="/quote" className="underline hover:text-navy-700">{t.nav.quote}</Link>
          </p>
        </div>
      </section>
    </>
  );
}
