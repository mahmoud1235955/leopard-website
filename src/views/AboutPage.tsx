import { Target, Eye, HeartHandshake, MessagesSquare } from 'lucide-react';
import { PageHero, SectionHeading, ValueGrid, CtaSection } from '@/components/Sections';
import { Seo } from '@/components/Seo';
import { useLanguage } from '@/i18n/LanguageContext';

export function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      <Seo title={t.seo.about.title} description={t.seo.about.desc} path="/about" />

      <PageHero eyebrow={t.about.intro} title={t.about.title} />

      <section className="py-16 sm:py-24">
        <div className="container-site max-w-3xl">
          <h2 className="section-title">{t.about.introTitle}</h2>
          <p className="mt-5 text-base leading-relaxed text-navy-600 sm:text-lg">{t.about.introDesc}</p>
        </div>
      </section>

      <section className="bg-navy-50 py-16 sm:py-24">
        <div className="container-site grid gap-6 lg:grid-cols-2">
          <div className="card p-8 sm:p-10">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-600 text-white">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-navy-950">{t.about.missionTitle}</h3>
            <p className="mt-3 text-base leading-relaxed text-navy-600">{t.about.missionDesc}</p>
          </div>
          <div className="card p-8 sm:p-10">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy-900 text-white">
              <Eye className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-navy-950">{t.about.visionTitle}</h3>
            <p className="mt-3 text-base leading-relaxed text-navy-600">{t.about.visionDesc}</p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-site">
          <SectionHeading title={t.about.valuesTitle} />
          <ValueGrid
            items={t.about.values}
            icon={<HeartHandshake className="h-6 w-6" />}
          />
        </div>
      </section>

      <section className="bg-navy-50 py-16 sm:py-24">
        <div className="container-site grid gap-6 lg:grid-cols-2">
          <div className="card p-8 sm:p-10">
            <MessagesSquare className="mb-5 h-8 w-8 text-brand-600" />
            <h3 className="text-xl font-bold text-navy-950">{t.about.approachTitle}</h3>
            <p className="mt-3 text-base leading-relaxed text-navy-600">{t.about.approachDesc}</p>
          </div>
          <div className="card p-8 sm:p-10">
            <HeartHandshake className="mb-5 h-8 w-8 text-brand-600" />
            <h3 className="text-xl font-bold text-navy-950">{t.about.commitmentTitle}</h3>
            <p className="mt-3 text-base leading-relaxed text-navy-600">{t.about.commitmentDesc}</p>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
