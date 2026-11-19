import { Link } from '@tanstack/react-router';
import {
  Plane,
  Ship,
  ShieldCheck,
  ArrowRight,
  MessageCircle,
  Anchor,
  FileCheck,
  Globe2,
  Handshake,
  Clock,
  Tractor,
  Shirt,
  FlaskConical,
  Building2,
  Cpu,
  Stethoscope,
  Palette,
  Armchair,
} from 'lucide-react';
import { SectionHeading, CtaSection } from '@/components/Sections';
import { publicContact } from '@/config/contact';
import { useLanguage } from '@/i18n/LanguageContext';

const serviceCards = [
  { key: 'air', icon: Plane, path: '/services/air-freight' },
  { key: 'sea', icon: Ship, path: '/services/sea-freight' },
  { key: 'customs', icon: FileCheck, path: '/services/customs-clearance' },
  { key: 'land', icon: Anchor, path: '/services/land-freight' },
  { key: 'importExport', icon: Globe2, path: '/services/import-export' },
] as const;

const whyIcons = [MessageCircle, Anchor, Handshake, Globe2];

const industryIcons = [Tractor, Shirt, FlaskConical, Building2, Cpu, Stethoscope, Palette, Armchair];

export function HomePage() {
  const { t } = useLanguage();
  const services = serviceCards.map((c) => ({ ...c, data: t.services.list[c.key] }));

  return (
    <>
      <section className="relative overflow-hidden bg-navy-hero text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
          aria-hidden="true"
        />
        <div className="container-site relative flex min-h-[560px] flex-col justify-center py-20 lg:min-h-[640px]">
          <div className="max-w-2xl animate-fade-up">
            <p className="eyebrow !text-gold-400 mb-4">{t.brand.shortName}</p>
            <h1 className="text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
              {t.home.heroTitle}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-navy-100 sm:text-lg">{t.home.heroDesc}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/quote" className="btn-primary">
                {t.common.requestQuote}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
              <Link to="/services" className="btn-secondary">
                {t.common.exploreServices}
              </Link>
              <a
                href={publicContact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-light"
              >
                <MessageCircle className="h-4 w-4" />
                {t.common.contactUs}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-site">
          <SectionHeading title={t.common.ourServices} sub={t.common.ourServicesSub} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ key, icon: Icon, path, data }) => (
              <Link
                key={key}
                to={path}
                className="card group flex flex-col p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-navy-950">{data.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-600">{data.short}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                  {t.common.seeDetails}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-50 py-16 sm:py-24">
        <div className="container-site">
          <SectionHeading title={t.home.whyTitle} sub={t.home.whySub} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.home.why.map((w, i) => {
              const Icon = whyIcons[i] ?? whyIcons[0]!;
              return (
                <div key={w.title} className="card p-6 text-center">
                  <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-600 shadow-sm ring-1 ring-navy-100">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-navy-950">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600">{w.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-site grid gap-6 lg:grid-cols-2">
          <div className="card relative overflow-hidden bg-navy-950 p-8 text-white sm:p-10">
            <Plane className="absolute -bottom-6 -end-6 h-40 w-40 text-white/5" aria-hidden="true" />
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-gold-400">
              <Plane className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold">{t.home.airTitle}</h3>
            <p className="mt-3 text-sm leading-relaxed text-navy-100">{t.home.airDesc}</p>
            <Link
              to="/services/air-freight"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400 hover:text-gold-500"
            >
              {t.common.learnMore}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
          <div className="card relative overflow-hidden bg-navy-800 p-8 text-white sm:p-10">
            <Ship className="absolute -bottom-6 -end-6 h-40 w-40 text-white/5" aria-hidden="true" />
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-gold-400">
              <Ship className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold">{t.home.seaTitle}</h3>
            <p className="mt-3 text-sm leading-relaxed text-navy-100">{t.home.seaDesc}</p>
            <Link
              to="/services/sea-freight"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400 hover:text-gold-500"
            >
              {t.common.learnMore}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-navy-50 py-16 sm:py-24">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-2">{t.services.list.customs.name}</p>
            <h2 className="section-title">{t.home.customsTitle}</h2>
            <p className="mt-4 text-base leading-relaxed text-navy-600">{t.home.customsDesc}</p>
            <div className="mt-6 flex items-start gap-3 rounded-md border border-gold-400/50 bg-gold-400/10 p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
              <p className="text-sm leading-relaxed text-navy-800">{t.home.customsNote}</p>
            </div>
            <Link to="/services/customs-clearance" className="btn-primary mt-6">
              {t.common.learnMore}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Clock, label: t.home.why[1]?.title ?? "" },
              { icon: FileCheck, label: t.services.list.customs.benefits[2] },
              { icon: ShieldCheck, label: t.services.list.customs.benefits[3] },
              { icon: MessageCircle, label: t.services.list.customs.benefits[4] },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="card flex items-center gap-3 p-5">
                <Icon className="h-5 w-5 shrink-0 text-brand-600" />
                <span className="text-sm font-medium text-navy-900">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-site">
          <SectionHeading title={t.home.industriesTitle} sub={t.home.industriesSub} />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {t.industries.items.map((ind, i) => {
              const Icon = industryIcons[i] ?? industryIcons[0]!;
              return (
                <Link
                  to="/industries"
                  key={ind.name}
                  className="card group flex flex-col items-center p-6 text-center transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Icon className="mb-3 h-8 w-8 text-navy-400 transition-colors group-hover:text-brand-600" />
                  <span className="text-sm font-medium leading-snug text-navy-900">{ind.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
