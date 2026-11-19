import { Link } from '@tanstack/react-router';
import { Youtube, BookOpen, ExternalLink, Info, ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/Sections';
import { Seo } from '@/components/Seo';
import { publicContact, publicResources } from '@/config/contact';
import { useLanguage } from '@/i18n/LanguageContext';

export function AcademyPage() {
  const { t } = useLanguage();
  const a = t.academy;
  const cards = [
    { href: publicContact.youtubeHref, icon: Youtube, cta: a.youtubeCta, desc: a.youtubeDesc, accent: 'bg-brand-600' },
    { href: publicResources.ebookLibraryUrl, icon: BookOpen, cta: a.libraryCta, desc: a.libraryDesc, accent: 'bg-navy-900' },
  ];

  return (
    <>
      <Seo title={t.seo.academy.title} description={t.seo.academy.desc} path="/academy" />
      <PageHero eyebrow={a.eyebrow} title={a.title} desc={a.body} />

      <section className="py-16 sm:py-24">
        <div className="container-site max-w-5xl">
          <div className="grid gap-6 md:grid-cols-2">
            {cards.map(({ href, icon: Icon, cta, desc, accent }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="card group flex flex-col p-8 transition-all hover:-translate-y-0.5 hover:shadow-md sm:p-10"
              >
                <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg text-white ${accent}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-navy-950">{cta}</h2>
                <p className="mt-3 flex-1 text-base leading-relaxed text-navy-600">{desc}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                  {cta}
                  <ExternalLink className="h-4 w-4" />
                </span>
              </a>
            ))}
          </div>

          <p className="mt-8 flex items-start gap-2 rounded-lg bg-navy-50 p-4 text-sm text-navy-700">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            {a.notice}
          </p>

          <div className="mt-10 text-center">
            <Link to="/contact" className="btn-primary">
              {a.cta}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
