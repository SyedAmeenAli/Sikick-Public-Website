import { Mail, Phone, MessageSquare } from 'lucide-react';
import { useSeo } from '../lib/seo';
import { SUPPORT_EMAIL, SUPPORT_PHONE, SIKICK_TRIAL_URL } from '../config/site';

export default function ContactPage() {
  useSeo({ title: 'Contact — Sikick', description: 'Get in touch with Sikick.', path: '/contact' });

  return (
    <div>
      <section className="section">
        <div className="container" style={{ maxWidth: '44rem' }}>
          <p className="eyebrow">Contact</p>
          <h1>Get in touch.</h1>
          <p className="section-lede">
            Start a trial to explore the platform, or reach us through the options below.
          </p>

          <div className="grid grid-3" style={{ marginTop: 'var(--space-32)' }}>
            {SUPPORT_EMAIL && (
              <a className="card card-hover" href={`mailto:${SUPPORT_EMAIL}`}>
                <div className="card-icon"><Mail size={22} /></div>
                <h3>Email</h3>
                <p>{SUPPORT_EMAIL}</p>
              </a>
            )}
            {SUPPORT_PHONE && (
              <a className="card card-hover" href={`tel:${SUPPORT_PHONE.replace(/\s/g, '')}`}>
                <div className="card-icon"><Phone size={22} /></div>
                <h3>Phone</h3>
                <p>{SUPPORT_PHONE}</p>
              </a>
            )}
            <a className="card card-hover" href={SIKICK_TRIAL_URL}>
              <div className="card-icon"><MessageSquare size={22} /></div>
              <h3>Start a trial</h3>
              <p>Explore the platform and ask questions inside the app.</p>
            </a>
          </div>

          <div className="card" style={{ marginTop: 'var(--space-32)' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-12)' }}>Sales and support</h2>
            <p className="mt-0" style={{ color: 'var(--text-muted)' }}>
              The fastest way to reach us is to start a 14-day trial and send a message from inside the Sikick console.
              For enterprise enquiries, use the <a href="/request-quote">quote request</a> page.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
