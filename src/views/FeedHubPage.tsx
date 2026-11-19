import { useMemo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { BadgeCheck, Globe, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/Sections';
import { Seo } from '@/components/Seo';
import { useLanguage } from '@/i18n/LanguageContext';
import {
  feedCountries,
  feedImporters,
  feedProducts,
  feedSuppliers,
  filterByCountry,
  filterByProduct,
  type FeedDirectoryRecord,
  type FeedProductId,
} from '@/lib/feed-hub';

function CompanyCard({ record, locale }: { record: FeedDirectoryRecord; locale: 'ar' | 'en' }) {
  const { t } = useLanguage();
  const f = t.feed;
  return (
    <article className="card flex flex-col p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold text-navy-950">{record.name[locale]}</h3>
        {record.verified && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
            <BadgeCheck className="h-3.5 w-3.5" />
            {f.verified}
          </span>
        )}
      </div>
      <p className="mt-2 flex items-center gap-1.5 text-sm text-navy-600">
        <MapPin className="h-4 w-4 shrink-0" />
        {record.country[locale]}
        {record.city ? ` — ${record.city}` : ''}
      </p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-700">{record.activity[locale]}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {record.products.map((pid) => {
          const product = feedProducts.find((p) => p.id === pid);
          return product ? (
            <span key={pid} className="rounded-full bg-navy-50 px-3 py-1 text-xs font-medium text-navy-800">
              {product.name[locale]}
            </span>
          ) : null;
        })}
      </div>
      {(record.phones?.length || record.email || record.website) && (
        <div className="mt-5 flex flex-wrap gap-2 border-t border-navy-100 pt-4">
          {record.phones?.map((phone) => (
            <a key={phone} href={`tel:${phone}`} className="inline-flex items-center gap-1.5 rounded-md border border-navy-200 px-3 py-1.5 text-xs font-semibold text-navy-800 transition-colors hover:border-navy-400 hover:text-brand-600">
              <Phone className="h-3.5 w-3.5" />
              <span dir="ltr">{phone}</span>
            </a>
          ))}
          {record.email && (
            <a href={`mailto:${record.email}`} className="inline-flex items-center gap-1.5 rounded-md border border-navy-200 px-3 py-1.5 text-xs font-semibold text-navy-800 transition-colors hover:border-navy-400 hover:text-brand-600">
              <Mail className="h-3.5 w-3.5" />
              {record.email}
            </a>
          )}
          {record.website && (
            <a href={record.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-md border border-navy-200 px-3 py-1.5 text-xs font-semibold text-navy-800 transition-colors hover:border-navy-400 hover:text-brand-600">
              <Globe className="h-3.5 w-3.5" />
              {f.website}
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export function FeedHubPage() {
  const { t, lang } = useLanguage();
  const locale = (lang === 'ar' ? 'ar' : 'en') as 'ar' | 'en';
  const f = t.feed;
  const [product, setProduct] = useState<FeedProductId | 'all'>('all');
  const [country, setCountry] = useState<string>('');

  const suppliers = useMemo(
    () => filterByCountry(filterByProduct(feedSuppliers, product), country || undefined),
    [product, country],
  );
  const importers = useMemo(
    () => filterByCountry(filterByProduct(feedImporters, product), country || undefined),
    [product, country],
  );

  return (
    <>
      <Seo title={t.seo.feed.title} description={t.seo.feed.desc} path="/feed" />
      <PageHero eyebrow={f.eyebrow} title={f.title} desc={f.body} />

      <section className="py-16 sm:py-24">
        <div className="container-site max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label={f.filterByProduct}>
              <button
                type="button"
                onClick={() => setProduct('all')}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  product === 'all' ? 'bg-brand-600 text-white' : 'bg-navy-50 text-navy-800 hover:bg-navy-100'
                }`}
              >
                {f.allProducts}
              </button>
              {feedProducts.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setProduct(p.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    product === p.id ? 'bg-brand-600 text-white' : 'bg-navy-50 text-navy-800 hover:bg-navy-100'
                  }`}
                >
                  {p.name[locale]}
                </button>
              ))}
            </div>

            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="rounded-md border border-navy-200 bg-white px-3 py-2 text-sm font-medium text-navy-800"
              aria-label={f.filterByCountry}
            >
              <option value="">{f.allCountries}</option>
              {feedCountries.map((c) => (
                <option key={c.en} value={c.en}>
                  {c[locale]}
                </option>
              ))}
            </select>
          </div>

          <h2 className="mt-12 text-2xl font-bold text-navy-950">{f.suppliersTitle}</h2>
          <p className="mt-2 text-sm text-navy-600">{f.suppliersSub}</p>
          {suppliers.length ? (
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {suppliers.map((record) => (
                <CompanyCard key={record.id} record={record} locale={locale} />
              ))}
            </div>
          ) : (
            <p className="mt-6 rounded-lg bg-navy-50 p-4 text-sm text-navy-700">{f.empty}</p>
          )}

          <h2 className="mt-14 text-2xl font-bold text-navy-950">{f.importersTitle}</h2>
          <p className="mt-2 text-sm text-navy-600">{f.importersSub}</p>
          {importers.length ? (
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {importers.map((record) => (
                <CompanyCard key={record.id} record={record} locale={locale} />
              ))}
            </div>
          ) : (
            <p className="mt-6 rounded-lg bg-navy-50 p-4 text-sm text-navy-700">{f.empty}</p>
          )}

          <div className="mt-14 rounded-xl bg-navy-900 p-8 text-center sm:p-12">
            <h2 className="text-xl font-bold text-white sm:text-2xl">{f.joinTitle}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-navy-100">{f.joinBody}</p>
            <Link to="/contact" className="btn-primary mt-6">
              {f.joinCta}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
