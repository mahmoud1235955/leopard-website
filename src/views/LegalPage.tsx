import { PageHero } from '@/components/Sections';
import { Seo } from '@/components/Seo';
import { useLanguage } from '@/i18n/LanguageContext';

export function LegalPage({ kind }: { kind: 'privacy' | 'terms' }) {
  const { t } = useLanguage();
  const isPrivacy = kind === 'privacy';
  const title = isPrivacy ? t.legal.privacyTitle : t.legal.termsTitle;
  const body = isPrivacy ? t.legal.privacyBody : t.legal.termsBody;
  const path = isPrivacy ? '/privacy' : '/terms';

  return (
    <>
      <Seo
        title={isPrivacy ? t.seo.privacy.title : t.seo.terms.title}
        description={isPrivacy ? t.seo.privacy.desc : t.seo.terms.desc}
        path={path}
      />
      <PageHero title={title} />
      <section className="py-16 sm:py-20">
        <div className="container-site max-w-3xl space-y-5">
          {body.map((p, i) => (
            <p key={i} className="text-base leading-relaxed text-navy-600">{p}</p>
          ))}
        </div>
      </section>
    </>
  );
}
