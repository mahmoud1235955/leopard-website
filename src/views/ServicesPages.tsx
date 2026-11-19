import { Link } from '@tanstack/react-router';
import {
  Plane,
  Ship,
  FileCheck,
  Anchor,
  Globe2,
  ArrowRight,
  CheckCircle2,
  ListChecks,
  HelpCircle,
  MessageCircle,
} from 'lucide-react';
import { PageHero, FaqList, CtaSection } from '@/components/Sections';
import { Seo } from '@/components/Seo';
import { publicContact } from '@/config/contact';
import { useLanguage } from '@/i18n/LanguageContext';
import type { Dictionary } from '@/i18n';

type ServiceKey = keyof Dictionary['services']['list'];

const config: Record<ServiceKey, { icon: typeof Plane; path: string }> = {
  air: { icon: Plane, path: '/services/air-freight' },
  sea: { icon: Ship, path: '/services/sea-freight' },
  customs: { icon: FileCheck, path: '/services/customs-clearance' },
  land: { icon: Anchor, path: '/services/land-freight' },
  importExport: { icon: Globe2, path: '/services/import-export' },
};

export function ServicesPage() {
  const { t } = useLanguage();
  const keys = Object.keys(t.services.list) as ServiceKey[];

  return (
    <>
      <Seo title={t.seo.services.title} description={t.seo.services.desc} path="/services" />
      <PageHero title={t.services.title} desc={t.services.sub} />

      <section className="py-16 sm:py-24">
        <div className="container-site grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {keys.map((key) => {
            const { icon: Icon, path } = config[key];
            const data = t.services.list[key];
            return (
              <Link
                key={key}
                to={path}
                className="card group flex flex-col p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="text-lg font-semibold text-navy-950">{data.name}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-600">{data.short}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                  {t.common.seeDetails}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <CtaSection />
    </>
  );
}

export function ServiceDetailPage({ serviceKey }: { serviceKey: ServiceKey }) {
  const { t } = useLanguage();
  const { icon: Icon, path } = config[serviceKey];
  const data = t.services.list[serviceKey];

  return (
    <>
      <PageHero title={data.name} desc={data.short} />

      <section className="py-16 sm:py-20">
        <div className="container-site max-w-3xl">
          <div className="mb-10 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-navy-50 text-brand-600">
            <Icon className="h-7 w-7" />
          </div>
          <p className="text-base leading-relaxed text-navy-600 sm:text-lg">{data.intro}</p>
          {serviceKey === 'customs' && (
            <div className="mt-6 flex items-start gap-3 rounded-md border border-gold-400/50 bg-gold-400/10 p-4">
              <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
              <p className="text-sm leading-relaxed text-navy-800">{t.services.list.customs.note}</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-navy-50 py-16 sm:py-20">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 flex items-center gap-2.5 text-xl font-bold text-navy-950">
              <CheckCircle2 className="h-5 w-5 text-brand-600" />
              {t.common.benefits}
            </h2>
            <ul className="space-y-3">
              {data.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm leading-relaxed text-navy-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-6 flex items-center gap-2.5 text-xl font-bold text-navy-950">
              <ListChecks className="h-5 w-5 text-brand-600" />
              {t.common.requiredInfo}
            </h2>
            <ul className="space-y-3">
              {data.info.map((info) => (
                <li key={info} className="flex items-start gap-3 text-sm leading-relaxed text-navy-700">
                  <ListChecks className="mt-0.5 h-4 w-4 shrink-0 text-navy-400" />
                  {info}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-site max-w-3xl">
          <h2 className="section-title mb-8">{t.common.process}</h2>
          <ol className="space-y-0">
            {data.process.map((step, i) => (
              <li key={step} className="relative flex gap-4 pb-8 last:pb-0">
                {i < data.process.length - 1 && (
                  <span className="absolute left-[17px] top-10 h-full w-px bg-navy-100" aria-hidden="true" />
                )}
                <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <p className="pt-1.5 text-sm leading-relaxed text-navy-700">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-navy-50 py-16 sm:py-20">
        <div className="container-site max-w-3xl">
          <h2 className="section-title mb-8">{t.common.faq}</h2>
          <FaqList items={data.faq} />
        </div>
      </section>

      <section className="bg-navy-hero">
        <div className="container-site flex flex-col items-center gap-6 py-16 text-center text-white sm:py-20">
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">{t.common.readyToShip}</h2>
          <p className="max-w-xl text-navy-100">{t.common.readyToShipSub}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/quote" className="btn-primary">
              {t.common.requestQuote}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
            <a
              href={publicContact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-light"
            >
              <MessageCircle className="h-4 w-4" />
              {t.common.whatsapp}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
