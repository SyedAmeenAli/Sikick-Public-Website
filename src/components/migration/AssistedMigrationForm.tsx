import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PLATFORMS } from '../../data/migration';
import { CALENDAR_URL, MIGRATION_ENDPOINT } from '../../config/site';

const DATA_TYPES = ['Items and products', 'Customers', 'Suppliers', 'Stock quantities', 'Sales history', 'Purchase history'];
const SIZES = ['Under 500 records', '500 to 5,000 records', '5,000 to 50,000 records', 'More than 50,000 records', 'Not sure'];

type Errors = Partial<Record<'software' | 'dataTypes' | 'size' | 'name' | 'email' | 'consent', string>>;
type Status = 'idle' | 'sending' | 'sent' | 'error' | 'unconfigured';

/**
 * Asks for help with a migration. It posts to a configured endpoint and shows
 * success only if that request succeeded. With none configured it says so and
 * points to the contact page rather than pretending.
 */
export function AssistedMigrationForm({ initialSoftware }: { initialSoftware: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const next: Errors = {};
    if (!String(data.get('software') ?? '')) next.software = 'Choose your current software.';
    if (data.getAll('dataTypes').length === 0) next.dataTypes = 'Choose at least one kind of data.';
    if (!String(data.get('size') ?? '')) next.size = 'Choose an approximate size.';
    if (!String(data.get('name') ?? '').trim()) next.name = 'Enter your name.';
    const email = String(data.get('email') ?? '').trim();
    if (!email) next.email = 'Enter your email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'That email address does not look right.';
    if (data.get('consent') !== 'on') next.consent = 'Please agree so we can reply to you.';
    setErrors(next);
    if (Object.keys(next).length) return;
    if (!MIGRATION_ENDPOINT) {
      setStatus('unconfigured');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(MIGRATION_ENDPOINT, { method: 'POST', body: data });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="af-done glass-elevated" role="status">
        <h3>Request received</h3>
        <p>Thank you. We will reply to the email address you gave with what is possible for your software and your data.</p>
        {CALENDAR_URL && <a className="btn btn-secondary" href={CALENDAR_URL}>Book a call</a>}
      </div>
    );
  }

  const err = (k: keyof Errors) => (errors[k] ? <p className="af-err" role="alert">{errors[k]}</p> : null);
  return (
    <form className="af glass-elevated" onSubmit={submit} noValidate>
      <div className="af-grid">
        <div className="field">
          <label htmlFor="af-software">Current software</label>
          <select id="af-software" name="software" defaultValue={initialSoftware} aria-invalid={!!errors.software}>
            <option value="">Choose one</option>
            {PLATFORMS.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
          </select>
          {err('software')}
        </div>
        <div className="field">
          <label htmlFor="af-size">Approximate size</label>
          <select id="af-size" name="size" defaultValue="" aria-invalid={!!errors.size}>
            <option value="">Choose one</option>
            {SIZES.map((s) => <option key={s}>{s}</option>)}
          </select>
          {err('size')}
        </div>
      </div>
      <fieldset className="af-checks">
        <legend>What needs to move</legend>
        {DATA_TYPES.map((d) => <label key={d}><input type="checkbox" name="dataTypes" value={d} /> {d}</label>)}
        {err('dataTypes')}
      </fieldset>
      <fieldset className="af-checks">
        <legend>Help you would like</legend>
        <label><input type="checkbox" name="help" value="Field mapping" /> Field mapping</label>
        <label><input type="checkbox" name="help" value="Reconciliation" /> Checking the result against my source</label>
      </fieldset>
      <div className="af-grid">
        <div className="field">
          <label htmlFor="af-name">Your name</label>
          <input id="af-name" name="name" autoComplete="name" aria-invalid={!!errors.name} />
          {err('name')}
        </div>
        <div className="field">
          <label htmlFor="af-email">Email</label>
          <input id="af-email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} />
          {err('email')}
        </div>
        <div className="field">
          <label htmlFor="af-phone">Phone (optional)</label>
          <input id="af-phone" name="phone" type="tel" autoComplete="tel" />
        </div>
      </div>
      <p className="af-warn"><strong>Do not send passwords, API keys or business files through this form.</strong> We will tell you how to share a file safely once we have replied.</p>
      <label className="af-consent">
        <input type="checkbox" name="consent" /> I agree that Sikick may use these details to reply about my migration. See the <Link to="/legal/privacy">Privacy Policy</Link>.
      </label>
      {err('consent')}
      <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Request assisted migration'}</button>
      {status === 'unconfigured' && (
        <p className="af-status" role="status">This form is not connected to an inbox yet, so nothing was sent. Please use the <Link to="/contact">contact page</Link> and mention your software.</p>
      )}
      {status === 'error' && <p className="af-status" role="alert">That did not send. Please try again, or use the <Link to="/contact">contact page</Link>.</p>}
    </form>
  );
}
