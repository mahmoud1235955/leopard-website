import { useState } from 'react';
import { Mail, Phone, MessageCircle, MapPin, Send, Clock, Youtube, Facebook, Globe } from 'lucide-react';
import { PageHero } from '@/components/Sections';
import { Seo } from '@/components/Seo';
import { publicContact, officeAddress, socialLinks } from '@/config/contact';
import { useLanguage } from '@/i18n/LanguageContext';

export function ContactPage() {
  const { t, lang } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const waMessage = `${t.contact.formTitle}\n\n${t.contact.formName}: ${name}\n${t.contact.formEmail}: ${email}\n\n${message}`;
  const whatsappUrl = `${publicContact.whatsappHref}?text=${encodeURIComponent(waMessage)}`;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Seo title={t.seo.contact.title} description={t.seo.contact.desc} path="/contact" />
      <PageHero title={t.contact.title} desc={t.contact.sub} />

      <section className="py-16 sm:py-20">
        <div className="container-site">
          <div className="mb-10 flex flex-wrap justify-center gap-4 sm:gap-6">
            {[
              { href: `mailto:${publicContact.email}`, label: t.contact.email, Icon: Mail },
              { href: publicContact.whatsappHref, label: t.common.whatsapp, Icon: MessageCircle },
              { href: publicContact.phoneHref, label: t.contact.callsOnly, Icon: Phone },
              ...(socialLinks.facebook ? [{ href: socialLinks.facebook, label: 'Facebook', Icon: Facebook }] : []),
              { href: publicContact.youtubeHref, label: 'YouTube', Icon: Youtube },
              { href: publicContact.mapsHref, label: t.contact.mapCta, Icon: MapPin },
              { href: publicContact.websiteHref, label: publicContact.websiteDisplay, Icon: Globe },
            ].map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="group flex w-20 flex-col items-center gap-2 text-center"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-white shadow-md transition-transform group-hover:scale-105">
                  <Icon className="h-7 w-7" />
                </span>
                <span className="text-xs font-medium leading-tight text-navy-700">{label}</span>
              </a>
            ))}
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href={`mailto:${publicContact.email}`}
              className="card group p-6 transition-shadow hover:shadow-md"
            >
              <Mail className="mb-4 h-6 w-6 text-brand-600" />
              <h2 className="text-sm font-semibold text-navy-500">{t.contact.email}</h2>
              <p className="mt-1 break-all text-base font-medium text-navy-950 group-hover:text-brand-600">
                {publicContact.email}
              </p>
            </a>
            <a
              href={publicContact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="card group p-6 transition-shadow hover:shadow-md"
            >
              <MessageCircle className="mb-4 h-6 w-6 text-brand-600" />
              <h2 className="text-sm font-semibold text-navy-500">{t.contact.whatsappCalls}</h2>
              <p className="mt-1 text-base font-medium text-navy-950 group-hover:text-brand-600">
                {publicContact.whatsappDisplay}
              </p>
            </a>
            <a href={publicContact.phoneHref} className="card group p-6 transition-shadow hover:shadow-md">
              <Phone className="mb-4 h-6 w-6 text-brand-600" />
              <h2 className="text-sm font-semibold text-navy-500">{t.contact.callsOnly}</h2>
              <p className="mt-1 text-base font-medium text-navy-950 group-hover:text-brand-600">
                {publicContact.phoneDisplay}
              </p>
            </a>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="space-y-5">
              <div className="card p-6 sm:p-8">
                <MapPin className="mb-4 h-6 w-6 text-brand-600" />
                <h2 className="text-lg font-bold text-navy-950">{t.contact.office}</h2>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">
                  {lang === 'ar' ? officeAddress.ar : officeAddress.en}
                </p>
                <a
              href={publicContact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline mt-5 !px-4 !py-2 text-xs"
            >
              <MessageCircle className="h-4 w-4" />
              {t.common.whatsapp}
            </a>
          </div>

              <div className="card p-6 sm:p-8">
                <Clock className="mb-4 h-6 w-6 text-brand-600" />
                <h2 className="text-lg font-bold text-navy-950">{t.contact.formTitle}</h2>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">{t.contact.formHandoff}</p>
                <form onSubmit={handleSend} className="mt-5 space-y-4">
                  <div>
                    <label htmlFor="c-name" className="label-field">{t.contact.formName}</label>
                    <input id="c-name" required className="input-field" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
                  </div>
                  <div>
                    <label htmlFor="c-email" className="label-field">{t.contact.formEmail}</label>
                    <input id="c-email" type="email" required className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
                  </div>
                  <div>
                    <label htmlFor="c-msg" className="label-field">{t.contact.formMessage}</label>
                    <textarea id="c-msg" required rows={4} className="input-field" value={message} onChange={(e) => setMessage(e.target.value)} />
                  </div>
                  <button type="submit" className="btn-primary w-full sm:w-auto">
                    <Send className="h-4 w-4" />
                    {t.contact.formSubmit}
                  </button>
                </form>
              </div>
            </div>

            <div className="card flex min-h-[320px] flex-col items-center justify-center bg-navy-50 p-8 text-center">
              <MapPin className="mb-4 h-10 w-10 text-navy-300" />
              <h2 className="text-lg font-bold text-navy-950">{t.contact.mapTitle}</h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-navy-500">
                {t.contact.mapDesc}
              </p>
              <a
                href={publicContact.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-6"
              >
                <MapPin className="h-4 w-4" />
                {t.contact.mapCta}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
