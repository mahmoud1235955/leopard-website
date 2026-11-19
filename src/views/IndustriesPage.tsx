import {
  Tractor,
  Shirt,
  FlaskConical,
  Building2,
  Cpu,
  Stethoscope,
  Palette,
  Armchair,
  ShieldCheck,
} from 'lucide-react';
import { PageHero, CtaSection } from '@/components/Sections';
import { Seo } from '@/components/Seo';
import { useLanguage } from '@/i18n/LanguageContext';

const icons = [Tractor, Shirt, FlaskConical, Building2, Cpu, Stethoscope, Palette, Armchair];

const accents = [
  'bg-emerald-50 text-emerald-700',
  'bg-sky-50 text-sky-700',
  'bg-amber-50 text-amber-700',
  'bg-stone-100 text-stone-700',
  'bg-cyan-50 text-cyan-700',
  'bg-rose-50 text-rose-700',
  'bg-orange-50 text-orange-700',
  'bg-lime-50 text-lime-700',
];

export function IndustriesPage() {
  const { t } = useLanguage();

  return (
    <>
      <Seo title={t.seo.industries.title} description={t.seo.industries.desc} path="/industries" />
      <PageHero title={t.industries.title} desc={t.industries.sub} />

      <section className="py-16 sm:py-24">
        <div className="container-site grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.industries.items.map((ind, i) => {
            const Icon = icons[i] ?? icons[0]!;
            return (
              <div key={ind.name} className="card p-6 transition-shadow hover:shadow-md">
                <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg ${accents[i]}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="text-base font-semibold leading-snug text-navy-950">{ind.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">{ind.desc}</p>
              </div>
            );
          })}
        </div>
        <div className="container-site mt-10">
          <div className="mx-auto flex max-w-3xl items-start gap-3 rounded-md border border-gold-400/50 bg-gold-400/10 p-4">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
            <p className="text-sm leading-relaxed text-navy-800">
              {t.services.list.customs.note}
            </p>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
