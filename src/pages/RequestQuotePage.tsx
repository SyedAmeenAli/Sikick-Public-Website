import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSeo } from '../lib/seo';
import { QUOTE_ENDPOINT, CALENDAR_URL } from '../config/site';

type Errors = {
  name?: string;
  email?: string;
  company?: string;
  businessType?: string;
  shops?: string;
  requirements?: string;
  consent?: string;
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function RequestQuotePage() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error' | 'unconfigured'>('idle');
  const [errors, setErrors] = useState<Errors>({});
  useSeo({
    title: 'Request an Enterprise quote — Sikick',
    description: 'Enterprise quote request.',
    path: '/request-quote',
  });

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('idle');
    setErrors({});

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const company = String(data.get('company') ?? '').trim();
    const businessType = String(data.get('businessType') ?? '').trim();
    const shops = String(data.get('shops') ?? '').trim();
    const requirements = String(data.get('requirements') ?? '').trim();
    const consent = data.get('consent') === 'on';

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = t('form.required');
    if (!email) {
      nextErrors.email = t('form.required');
    } else if (!isValidEmail(email)) {
      nextErrors.email = t('form.emailInvalid');
    }
    if (!company) nextErrors.company = t('form.required');
    if (!businessType) nextErrors.businessType = t('form.required');
    if (!shops || Number(shops) < 1) nextErrors.shops = t('form.shopsMin');
    if (!requirements) nextErrors.requirements = t('form.required');
    if (!consent) nextErrors.consent = t('form.consentRequired');

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    if (!QUOTE_ENDPOINT) {
      setStatus('unconfigured');
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(QUOTE_ENDPOINT, { method: 'POST', body: data });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div>
        <section className="section">
          <div className="container" style={{ maxWidth: '44rem' }}>
            <p className="eyebrow">Quote requested</p>
            <h1>Thanks — we have your request.</h1>
            <p className="section-lede">
              A summary has been submitted. We aim to respond as soon as possible.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-12)', flexWrap: 'wrap', marginTop: 'var(--space-24)' }}>
              {CALENDAR_URL && (
                <a className="btn btn-primary" href={CALENDAR_URL}>Book a consultation</a>
              )}
              <Link className="btn btn-secondary" to="/setup">Back to configurator</Link>
            </div>
            {!CALENDAR_URL && (
              <p className="text-small text-muted" style={{ marginTop: 'var(--space-16)' }}>
                Calendar booking is not configured. Set VITE_SIKICK_CALENDAR_URL to enable it.
              </p>
            )}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className="section">
        <div className="container" style={{ maxWidth: '44rem' }}>
          <p className="eyebrow">Enterprise</p>
          <h1>Request a tailored quote.</h1>
          <p className="section-lede">
            Collects the essentials. Prefill from your blueprint where possible.
          </p>
          <form onSubmit={submit} style={{ marginTop: 'var(--space-32)' }} noValidate>
            <div className="field">
              <label htmlFor="rq-name">{t('form.name')}</label>
              <input id="rq-name" name="name" required aria-invalid={errors.name ? 'true' : 'false'} aria-describedby={errors.name ? 'rq-name-error' : undefined} />
              {errors.name && <span id="rq-name-error" className="field-error">{errors.name}</span>}
            </div>
            <div className="field">
              <label htmlFor="rq-email">{t('form.email')}</label>
              <input id="rq-email" name="email" type="email" required aria-invalid={errors.email ? 'true' : 'false'} aria-describedby={errors.email ? 'rq-email-error' : undefined} />
              {errors.email && <span id="rq-email-error" className="field-error">{errors.email}</span>}
            </div>
            <div className="field">
              <label htmlFor="rq-company">{t('form.company')}</label>
              <input id="rq-company" name="company" required aria-invalid={errors.company ? 'true' : 'false'} aria-describedby={errors.company ? 'rq-company-error' : undefined} />
              {errors.company && <span id="rq-company-error" className="field-error">{errors.company}</span>}
            </div>
            <div className="field">
              <label htmlFor="rq-type">{t('form.businessType')}</label>
              <input id="rq-type" name="businessType" required aria-invalid={errors.businessType ? 'true' : 'false'} aria-describedby={errors.businessType ? 'rq-type-error' : undefined} />
              {errors.businessType && <span id="rq-type-error" className="field-error">{errors.businessType}</span>}
            </div>
            <div className="field">
              <label htmlFor="rq-shops">{t('form.shops')}</label>
              <input id="rq-shops" name="shops" type="number" min={1} defaultValue={1} required aria-invalid={errors.shops ? 'true' : 'false'} aria-describedby={errors.shops ? 'rq-shops-error' : undefined} />
              {errors.shops && <span id="rq-shops-error" className="field-error">{errors.shops}</span>}
            </div>
            <div className="field">
              <label htmlFor="rq-req">{t('form.requirements')}</label>
              <textarea id="rq-req" name="requirements" rows={5} required aria-invalid={errors.requirements ? 'true' : 'false'} aria-describedby={errors.requirements ? 'rq-req-error' : undefined} />
              {errors.requirements && <span id="rq-req-error" className="field-error">{errors.requirements}</span>}
            </div>
            <label className="checkbox-row">
              <input type="checkbox" name="consent" required aria-invalid={errors.consent ? 'true' : 'false'} aria-describedby={errors.consent ? 'rq-consent-error' : undefined} />
              <span>{t('form.consent')}</span>
            </label>
            {errors.consent && <span id="rq-consent-error" className="field-error" style={{ display: 'block', marginTop: 4 }}>{errors.consent}</span>}
            <label className="checkbox-row" style={{ marginTop: 'var(--space-12)' }}>
              <input type="checkbox" name="marketing" />
              <span>{t('form.marketing')}</span>
            </label>
            <div style={{ marginTop: 'var(--space-24)' }}>
              <button type="submit" className="btn btn-primary" disabled={status === 'sending'} aria-disabled={status === 'sending'}>
                {status === 'sending' ? t('form.sending') : t('form.submit')}
              </button>
            </div>
            {status === 'error' && <p className="field-error" style={{ marginTop: 'var(--space-12)' }}>{t('form.sendError')}</p>}
            {status === 'unconfigured' && <p className="field-error" style={{ marginTop: 'var(--space-12)' }}>{t('form.notConfigured')}</p>}
          </form>
        </div>
      </section>
    </div>
  );
}
