import { useMemo, useState } from 'react';
import { MessageCircle, Mail, Send, ShieldCheck, ExternalLink } from 'lucide-react';
import { PageHero } from '@/components/Sections';
import { Seo } from '@/components/Seo';
import { publicContact } from '@/config/contact';
import { useLanguage } from '@/i18n/LanguageContext';
import type { Dictionary } from '@/i18n';

type ServiceKey = keyof Dictionary['services']['list'];

interface FormValues {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  originCountry: string;
  originCity: string;
  destCountry: string;
  destCity: string;
  cargoDesc: string;
  packages: string;
  weight: string;
  dimensions: string;
  mode: string;
  shipmentType: string;
  details: string;
}

const initial: FormValues = {
  fullName: '',
  company: '',
  email: '',
  phone: '',
  service: '',
  originCountry: '',
  originCity: '',
  destCountry: '',
  destCity: '',
  cargoDesc: '',
  packages: '',
  weight: '',
  dimensions: '',
  mode: '',
  shipmentType: '',
  details: '',
};

const requiredKeys: (keyof FormValues)[] = [
  'fullName',
  'email',
  'phone',
  'service',
  'originCountry',
  'destCountry',
  'cargoDesc',
];

function validate(values: FormValues, errors: Dictionary['quote']['errors']) {
  const errs: Partial<Record<keyof FormValues, string>> = {};
  for (const key of requiredKeys) {
    if (!values[key].trim()) errs[key] = errors.required;
  }
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errs.email = errors.email;
  }
  if (values.phone.trim() && !/^[+\d][\d\s\-()]{5,}$/.test(values.phone.trim())) {
    errs.phone = errors.phone;
  }
  return errs;
}

export function QuotePage() {
  const { t } = useLanguage();
  const [values, setValues] = useState<FormValues>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const summary = useMemo(() => {
    const f = t.quote.form;
    return [
      [f.fullName, values.fullName],
      [f.company, values.company],
      [f.email, values.email],
      [f.phone, values.phone],
      [f.service, values.service],
      [f.originCountry, values.originCountry],
      [f.originCity, values.originCity],
      [f.destCountry, values.destCountry],
      [f.destCity, values.destCity],
      [f.cargoDesc, values.cargoDesc],
      [f.packages, values.packages],
      [f.weight, values.weight],
      [f.dimensions, values.dimensions],
      [f.mode, values.mode],
      [f.shipmentType, values.shipmentType],
      [f.details, values.details],
    ]
      .filter(([, v]) => v && v.trim())
      .map(([label, v]) => `${label}: ${v}`)
      .join('\n');
  }, [values, t]);

  const set = (key: keyof FormValues) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(values, t.quote.errors);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitted(true);
  };

  const whatsappUrl = `${publicContact.whatsappHref}?text=${encodeURIComponent(
    `${t.quote.whatsappBody}\n\n${summary}`
  )}`;
  const mailtoUrl = `mailto:${publicContact.email}?subject=${encodeURIComponent(
    t.quote.subject
  )}&body=${encodeURIComponent(`${summary}\n`)}`;

  const err = (key: keyof FormValues) =>
    errors[key] ? <p className="error-text" role="alert">{errors[key]}</p> : null;

  const inputClass = (key: keyof FormValues) =>
    `input-field ${errors[key] ? 'border-brand-500 focus:border-brand-500 focus:ring-brand-200' : ''}`;

  return (
    <>
      <Seo title={t.seo.quote.title} description={t.seo.quote.desc} path="/quote" />
      <PageHero title={t.quote.title} desc={t.quote.sub} />

      <section className="py-16 sm:py-20">
        <div className="container-site max-w-3xl">
          <div className="card mb-8 border-navy-200 bg-navy-50 p-5">
            <h2 className="mb-1.5 text-sm font-bold text-navy-950">{t.quote.handoffTitle}</h2>
            <p className="text-sm leading-relaxed text-navy-600">{t.quote.handoffDesc}</p>
          </div>

          {submitted ? (
            <div className="card p-8 text-center">
              <Send className="mx-auto mb-4 h-10 w-10 text-brand-600" />
              <h2 className="text-xl font-bold text-navy-950">{t.quote.success}</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-navy-600">
                {t.quote.chooseHandoff}
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <MessageCircle className="h-4 w-4" />
                  {t.quote.whatsappOption}
                </a>
                <a href={mailtoUrl} className="btn-outline">
                  <Mail className="h-4 w-4" />
                  {t.quote.emailOption}
                </a>
              </div>
              <button
                type="button"
                onClick={() => {
                  setValues(initial);
                  setSubmitted(false);
                }}
                className="mt-6 text-sm font-medium text-navy-500 underline hover:text-navy-800"
              >
                {t.quote.title}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="card space-y-6 p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="fullName" className="label-field">{t.quote.form.fullName} *</label>
                  <input id="fullName" className={inputClass('fullName')} value={values.fullName} onChange={set('fullName')} autoComplete="name" />
                  {err('fullName')}
                </div>
                <div>
                  <label htmlFor="company" className="label-field">{t.quote.form.company}</label>
                  <input id="company" className={inputClass('company')} value={values.company} onChange={set('company')} autoComplete="organization" />
                </div>
                <div>
                  <label htmlFor="email" className="label-field">{t.quote.form.email} *</label>
                  <input id="email" type="email" className={inputClass('email')} value={values.email} onChange={set('email')} autoComplete="email" />
                  {err('email')}
                </div>
                <div>
                  <label htmlFor="phone" className="label-field">{t.quote.form.phone} *</label>
                  <input id="phone" type="tel" className={inputClass('phone')} value={values.phone} onChange={set('phone')} autoComplete="tel" />
                  {err('phone')}
                </div>
                <div>
                  <label htmlFor="service" className="label-field">{t.quote.form.service} *</label>
                  <select id="service" className={inputClass('service')} value={values.service} onChange={set('service')}>
                    <option value="">—</option>
                    {(Object.keys(t.quote.serviceOptions) as (keyof Dictionary['quote']['serviceOptions'])[]).map((k) => (
                      <option key={k} value={t.quote.serviceOptions[k]}>{t.quote.serviceOptions[k]}</option>
                    ))}
                  </select>
                  {err('service')}
                </div>
                <div>
                  <label className="label-field">{t.quote.form.mode}</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(Object.keys(t.quote.modes) as (keyof Dictionary['quote']['modes'])[]).map((k) => (
                      <label
                        key={k}
                        className={`flex cursor-pointer items-center justify-center rounded-md border px-3 py-2.5 text-sm font-medium transition-colors ${
                          values.mode === t.quote.modes[k]
                            ? 'border-brand-600 bg-brand-50 text-brand-700'
                            : 'border-navy-200 text-navy-700 hover:border-navy-400'
                        }`}
                      >
                        <input
                          type="radio"
                          name="mode"
                          className="sr-only"
                          checked={values.mode === t.quote.modes[k]}
                          onChange={() => setValues((v) => ({ ...v, mode: t.quote.modes[k] }))}
                        />
                        {t.quote.modes[k]}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="label-field">{t.quote.form.shipmentType}</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.keys(t.quote.types) as (keyof Dictionary['quote']['types'])[]).map((k) => (
                      <label
                        key={k}
                        className={`flex cursor-pointer items-center justify-center rounded-md border px-3 py-2.5 text-sm font-medium transition-colors ${
                          values.shipmentType === t.quote.types[k]
                            ? 'border-brand-600 bg-brand-50 text-brand-700'
                            : 'border-navy-200 text-navy-700 hover:border-navy-400'
                        }`}
                      >
                        <input
                          type="radio"
                          name="shipmentType"
                          className="sr-only"
                          checked={values.shipmentType === t.quote.types[k]}
                          onChange={() => setValues((v) => ({ ...v, shipmentType: t.quote.types[k] }))}
                        />
                        {t.quote.types[k]}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <fieldset className="rounded-md border border-navy-100 p-4">
                <legend className="px-2 text-sm font-semibold text-navy-900">{t.quote.form.originCountry} / {t.quote.form.originCity}</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="originCountry" className="label-field">{t.quote.form.originCountry} *</label>
                    <input id="originCountry" className={inputClass('originCountry')} value={values.originCountry} onChange={set('originCountry')} />
                    {err('originCountry')}
                  </div>
                  <div>
                    <label htmlFor="originCity" className="label-field">{t.quote.form.originCity}</label>
                    <input id="originCity" className={inputClass('originCity')} value={values.originCity} onChange={set('originCity')} />
                  </div>
                </div>
              </fieldset>

              <fieldset className="rounded-md border border-navy-100 p-4">
                <legend className="px-2 text-sm font-semibold text-navy-900">{t.quote.form.destCountry} / {t.quote.form.destCity}</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="destCountry" className="label-field">{t.quote.form.destCountry} *</label>
                    <input id="destCountry" className={inputClass('destCountry')} value={values.destCountry} onChange={set('destCountry')} />
                    {err('destCountry')}
                  </div>
                  <div>
                    <label htmlFor="destCity" className="label-field">{t.quote.form.destCity}</label>
                    <input id="destCity" className={inputClass('destCity')} value={values.destCity} onChange={set('destCity')} />
                  </div>
                </div>
              </fieldset>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="cargoDesc" className="label-field">{t.quote.form.cargoDesc} *</label>
                  <textarea id="cargoDesc" rows={3} className={inputClass('cargoDesc')} value={values.cargoDesc} onChange={set('cargoDesc')} />
                  {err('cargoDesc')}
                </div>
                <div>
                  <label htmlFor="packages" className="label-field">{t.quote.form.packages}</label>
                  <input id="packages" type="number" min="1" className={inputClass('packages')} value={values.packages} onChange={set('packages')} />
                </div>
                <div>
                  <label htmlFor="weight" className="label-field">{t.quote.form.weight}</label>
                  <input id="weight" className={inputClass('weight')} value={values.weight} onChange={set('weight')} placeholder="kg" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="dimensions" className="label-field">{t.quote.form.dimensions}</label>
                  <input id="dimensions" className={inputClass('dimensions')} value={values.dimensions} onChange={set('dimensions')} placeholder="L × W × H (cm)" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="details" className="label-field">{t.quote.form.details}</label>
                  <textarea id="details" rows={3} className={inputClass('details')} value={values.details} onChange={set('details')} />
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-md border border-navy-100 bg-navy-50 p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-navy-500" />
                <p className="text-xs leading-relaxed text-navy-600">{t.quote.privacy}</p>
              </div>

              <button type="submit" className="btn-primary w-full sm:w-auto">
                <Send className="h-4 w-4" />
                {t.quote.submit}
              </button>
            </form>
          )}

          <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-xs text-navy-400">
            <ExternalLink className="h-3 w-3" />
            {t.contact.formHandoff}
          </p>
        </div>
      </section>
    </>
  );
}
