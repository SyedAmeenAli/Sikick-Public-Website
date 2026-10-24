import { Link } from 'react-router-dom';
import { useSeo } from '../lib/seo';
import { ReadingProgress } from '../components/HomeSections';

const sections = [
  { id: 'service', label: 'Service description' },
  { id: 'account', label: 'Account responsibilities' },
  { id: 'eligibility', label: 'Eligibility and workspace' },
  { id: 'trial', label: 'Trial eligibility and expiry' },
  { id: 'billing', label: 'Subscription prices, billing and GST' },
  { id: 'payments', label: 'Payment authorization, retry and failed payments' },
  { id: 'cancellation', label: 'Cancellations and renewals' },
  { id: 'changes', label: 'Upgrades and downgrades' },
  { id: 'refunds', label: 'Refunds' },
  { id: 'data', label: 'Data access, export, read-only expiry and deletion' },
  { id: 'acceptable-use', label: 'Acceptable use and security' },
  { id: 'third-party', label: 'Third-party integrations' },
  { id: 'ip', label: 'Intellectual property and service changes' },
  { id: 'liability', label: 'Disclaimers, liability and dispute terms' },
  { id: 'contact', label: 'Contact us' },
];

export default function LegalTermsPage() {
  useSeo({
    title: 'Terms of Service — Sikick',
    description: 'Sikick terms of service covering subscriptions, billing, acceptable use, data and liability.',
    path: '/legal/terms',
  });

  return (
    <div className="section">
      <ReadingProgress />
      <div className="container" style={{ maxWidth: '50rem' }}>
        <p className="eyebrow">Legal</p>
        <h1>Terms of Service</h1>
        <p className="section-lede" style={{ marginTop: 'var(--space-24)' }}>
          These terms govern access to and use of the Sikick website, trial, subscription services and related
          applications. By creating an account or using the service, you agree to these terms. Effective date:
          24 October 2026.
        </p>

        <nav
          aria-label="Terms of service contents"
          className="card"
          style={{ marginTop: 'var(--space-32)', marginBottom: 'var(--space-32)' }}
        >
          <h2 style={{ marginTop: 0, fontSize: '1.05rem' }}>Contents</h2>
          <ol
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(14rem, 1fr))',
              gap: 'var(--space-8) var(--space-24)',
              paddingLeft: '1.1rem',
              margin: 0,
            }}
          >
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.label}</a>
              </li>
            ))}
          </ol>
        </nav>

        <section id="service" style={{ marginBottom: 'var(--space-48)' }}>
          <h2>1. Service description</h2>
          <p>
            Sikick provides cloud-based software for inventory management, purchasing, sales, point-of-sale, reporting
            and AI-assisted operations. Features and availability depend on your subscription plan. We may update the
            service from time to time, including adding, modifying or removing features.
          </p>
        </section>

        <section id="account" style={{ marginBottom: 'var(--space-48)' }}>
          <h2>2. Account responsibilities</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials, for all activity that
            occurs under your account, and for ensuring that users you invite comply with these terms. You must notify
            us promptly of any unauthorized access or security breach.
          </p>
        </section>

        <section id="eligibility" style={{ marginBottom: 'var(--space-48)' }}>
          <h2>3. Eligibility and workspace</h2>
          <p>
            You must have the legal capacity to enter into a binding contract to use the service. A workspace represents
            a single business entity or operating unit. You may not create multiple workspaces to avoid limits or fees.
          </p>
        </section>

        <section id="trial" style={{ marginBottom: 'var(--space-48)' }}>
          <h2>4. Trial eligibility and expiry</h2>
          <p>
            Trials are offered to new workspaces for the period shown at sign-up, typically 14 days. Trial eligibility
            is limited to one trial per business or individual unless we agree otherwise. When the trial ends, your
            workspace may be suspended or converted to a paid subscription unless you have selected a plan and provided
            valid payment details.
          </p>
        </section>

        <section id="billing" style={{ marginBottom: 'var(--space-48)' }}>
          <h2>5. Subscription prices, billing and GST</h2>
          <p>
            Subscription fees are based on the plan, billing interval and usage metrics shown on the pricing page or in
            your account at checkout. Prices are quoted in the applicable currency and exclude taxes unless stated
            otherwise. You are responsible for any goods and services tax, value-added tax or other applicable taxes.
            Billing occurs at the start of each subscription period.
          </p>
        </section>

        <section id="payments" style={{ marginBottom: 'var(--space-48)' }}>
          <h2>6. Payment authorization, retry and failed payments</h2>
          <p>
            By providing payment details, you authorize us and our payment providers to charge the applicable fees to
            your chosen payment method. If a payment fails, we may retry the charge and may suspend access to the
            service until payment is received. You remain responsible for all accrued charges.
          </p>
        </section>

        <section id="cancellation" style={{ marginBottom: 'var(--space-48)' }}>
          <h2>7. Cancellations and renewals</h2>
          <p>
            Subscriptions renew automatically for successive periods unless you cancel before the renewal date. You may
            cancel at any time through your account settings. Cancellation takes effect at the end of the current paid
            period, and you will not be charged again unless you reactivate.
          </p>
        </section>

        <section id="changes" style={{ marginBottom: 'var(--space-48)' }}>
          <h2>8. Upgrades and downgrades</h2>
          <p>
            Upgrades typically take effect immediately and may be prorated for the remainder of the billing period.
            Downgrades usually take effect at the next renewal date. Some features or data limits may become unavailable
            when you downgrade, so you should export any data you wish to keep before the downgrade takes effect.
          </p>
        </section>

        <section id="refunds" style={{ marginBottom: 'var(--space-48)' }}>
          <h2>9. Refunds</h2>
          <p>
            Fees are generally non-refundable except where required by law or where we determine, in our discretion, that
            a refund is appropriate. Any refunds will be processed using the original payment method where possible.
          </p>
        </section>

        <section id="data" style={{ marginBottom: 'var(--space-48)' }}>
          <h2>10. Data access, export, read-only expiry and deletion</h2>
          <p>
            You retain ownership of the business data you enter into the service. During an active subscription, you can
            access and export your data using the tools provided in the Sikick console. After cancellation or expiry, your
            workspace may enter a read-only period for a limited time, after which data may be deleted in accordance with
            our data retention practices. We strongly recommend exporting your data before cancellation.
          </p>
        </section>

        <section id="acceptable-use" style={{ marginBottom: 'var(--space-48)' }}>
          <h2>11. Acceptable use and security</h2>
          <p>You agree not to:</p>
          <ul>
            <li>use the service for unlawful, fraudulent or harmful purposes;</li>
            <li>interfere with the integrity, availability or performance of the service;</li>
            <li>attempt to gain unauthorized access to the service or another user’s data;</li>
            <li>upload malicious code, viruses or infringing material;</li>
            <li>send spam or unsolicited communications through the service; or</li>
            <li>resell, scrape or reverse engineer the service except as permitted by law.</li>
          </ul>
          <p>
            We may suspend or terminate access for violations of these rules.
          </p>
        </section>

        <section id="third-party" style={{ marginBottom: 'var(--space-48)' }}>
          <h2>12. Third-party integrations</h2>
          <p>
            The service may include integrations with third-party platforms. Your use of those integrations is subject
            to the third party’s terms and privacy policies. We do not warrant the availability, accuracy or continued
            operation of any third-party service.
          </p>
        </section>

        <section id="ip" style={{ marginBottom: 'var(--space-48)' }}>
          <h2>13. Intellectual property and service changes</h2>
          <p>
            Sikick and its licensors own all rights in the service, including software, designs, trademarks and
            documentation. We grant you a limited, non-exclusive, non-transferable right to use the service during your
            subscription. We may modify, suspend or discontinue features with reasonable notice where practicable.
          </p>
        </section>

        <section id="liability" style={{ marginBottom: 'var(--space-48)' }}>
          <h2>14. Disclaimers, liability and dispute terms</h2>
          <p>
            The service is provided on an “as is” and “as available” basis. To the extent permitted by law, we exclude
            warranties and limit our liability for indirect, consequential or incidental damages. Our total liability for
            any claim arising from the service is limited to the amount you paid us in the 12 months before the claim.
          </p>
          <p>
            These terms are governed by the laws of the jurisdiction in which Sikick’s operating entity is registered,
            without regard to conflict-of-law principles. Any dispute will be resolved in the courts having jurisdiction
            over that place.
          </p>
        </section>

        <section id="contact" style={{ marginBottom: 'var(--space-48)' }}>
          <h2>15. Contact us</h2>
          <p>
            If you have questions about these terms, please contact us through the <Link to="/contact">contact form</Link>{' '}
            or through the support channel available in your Sikick console.
          </p>
        </section>
      </div>
    </div>
  );
}
