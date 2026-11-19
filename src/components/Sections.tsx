import { Link } from '@tanstack/react-router';
import { ArrowRight, MessageCircle } from 'lucide-react';
import type { ReactNode } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { publicContact } from '@/config/contact';

export function PageHero({
  eyebrow,
  title,
  desc,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
}) {
  return (
    <section className="bg-navy-hero py-16 text-white sm:py-20">
      <div className="container-site max-w-3xl animate-fade-up">
        {eyebrow && <p className="eyebrow !text-gold-400 mb-3">{eyebrow}</p>}
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl">{title}</h1>
        {desc && <p className="mt-4 max-w-2xl text-base leading-relaxed text-navy-100 sm:text-lg">{desc}</p>}
      </div>
    </section>
  );
}

export function CtaSection() {
  const { t } = useLanguage();
  return (
    <section className="bg-navy-hero">
      <div className="container-site flex flex-col items-center gap-6 py-16 text-center text-white sm:py-20">
        <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">{t.home.ctaTitle}</h2>
        <p className="max-w-xl text-navy-100">{t.home.ctaDesc}</p>
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
  );
}

export function SectionHeading({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
      {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
      <h2 className="section-title">{title}</h2>
      {sub && <p className="mt-3 text-base leading-relaxed text-navy-600">{sub}</p>}
    </div>
  );
}

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((f, i) => (
        <details key={i} className="card group p-5 open:ring-1 open:ring-navy-200">
          <summary className="cursor-pointer list-none text-sm font-semibold text-navy-900 marker:hidden">
            <span className="flex items-center justify-between gap-4">
              {f.q}
              <ArrowRight className="h-4 w-4 shrink-0 text-brand-600 transition-transform group-open:rotate-90 rtl:rotate-180 rtl:group-open:-rotate-90" />
            </span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-navy-600">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function ValueGrid({ items, icon }: { items: { title: string; desc: string }[]; icon?: ReactNode }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div key={item.title} className="card p-6 transition-shadow hover:shadow-md">
          {icon && <div className="mb-4 text-brand-600">{icon}</div>}
          <h3 className="text-base font-semibold text-navy-950">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-navy-600">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}
