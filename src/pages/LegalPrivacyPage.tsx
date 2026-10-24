import { Link } from 'react-router-dom';
import { useSeo } from '../lib/seo';
import { ReadingProgress } from '../components/HomeSections';

const sections = [
  { id: 'summary', label: 'Summary' },
  { id: 'scope', label: 'Scope' },
  { id: 'data-collected', label: 'Data we collect' },
  { id: 'purposes', label: 'Purposes and legal grounds' },
  { id: 'siborg', label: 'SiBorg and AI processing' },
  { id: 'providers', label: 'Service providers and integrations' },
  { id: 'storage', label: 'Storage, retention, deletion and export' },
  { id: 'security', label: 'Security measures' },
  { id: 'cookies', label: 'Cookies and analytics' },
  { id: 'choices', label: 'Your choices' },
  { id: 'transfers', label: 'International transfers' },
  { id: 'contact', label: 'Contact us' },
];

export default function LegalPrivacyPage() {
  useSeo({
    title: 'Privacy Policy — Sikick',
    description: 'Sikick privacy policy: how we collect, use, store and protect your business and personal data.',
    path: '/legal/privacy',
  });

  return (
    <div className="section">
      <ReadingProgress />
      <div className="container" style={{ maxWidth: '50rem' }}>
        <p className="eyebrow">Legal</p>
        <h1>Privacy Policy</h1>
        <p className="section-lede" style={{ marginTop: 'var(--space-24)' }}>
          This policy explains how Sikick collects, uses, stores and protects information when you use our website,
          trial sign-up flow and inventory-management services. Effective date: 24 October 2026.
        </p>

        <nav
          aria-label="Privacy policy contents"
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

        <section id="summary" style={{ marginBottom: 'var(--space-48)' }}>
          <h2>1. Summary</h2>
          <p>
            Sikick provides cloud-based inventory, point-of-sale and purchasing software for businesses. To operate the
            service we need certain account, business and transactional information. We keep business data separate from
            public-site analytics, use it only for the purposes described here, and give you ways to access, correct and
            delete it.
          </p>
        </section>

        <section id="scope" style={{ marginBottom: 'var(--space-48)' }}>
          <h2>2. Scope</h2>
          <p>
            This policy applies to information collected through the Sikick public website, the trial sign-up and
            onboarding flow, the Sikick IMS console, connected POS terminals, support enquiries and any other service
            that links to this policy. It does not apply to third-party websites or services that you may access through
            integrations.
          </p>
        </section>

        <section id="data-collected" style={{ marginBottom: 'var(--space-48)' }}>
          <h2>3. Data we collect</h2>
          <h3>3.1 Account and registration data</h3>
          <p>
            When you create an account or start a trial we collect your name, business email address, phone number,
            company or trading name, workspace name and any other details you provide during onboarding.
          </p>
          <h3>3.2 Business configuration data</h3>
          <p>
            We store settings you enter to configure the service, such as tax rates, currencies, locations, warehouses,
            units of measure, categories, price lists, user roles and permission settings.
          </p>
          <h3>3.3 Inventory, sales, purchasing and operational data</h3>
          <p>
            You may enter or import product SKUs, descriptions, stock levels, suppliers, purchase orders, sales orders,
            invoices, customer records, supplier records, serial or batch numbers, barcodes and related transaction
            history.
          </p>
          <h3>3.4 Customer and supplier data</h3>
          <p>
            If you choose to store contact information for your customers or suppliers in Sikick, we process that
            information on your behalf. You are responsible for ensuring you have the right to provide this data to us.
          </p>
          <h3>3.5 Uploaded data</h3>
          <p>
            Files, images, documents and spreadsheets you upload to the service, such as product images, import files or
            receipts, are stored so you can view, manage and retrieve them.
          </p>
          <h3>3.6 Device, usage, diagnostic and security data</h3>
          <p>
            We collect technical information such as IP address, browser type and version, device identifiers, operating
            system, referral URLs, pages viewed, feature usage, crash logs, performance metrics and authentication
            events. This helps us operate, secure and improve the service.
          </p>
          <h3>3.7 Payment information</h3>
          <p>
            Subscription payments are processed by a third-party payment provider. Sikick does not store full payment
            card numbers. We receive and retain transaction references, billing status, invoice history and partial card
            identifiers where needed for billing support.
          </p>
        </section>

        <section id="purposes" style={{ marginBottom: 'var(--space-48)' }}>
          <h2>4. Purposes and legal grounds</h2>
          <p>We use your information for the following purposes:</p>
          <ul>
            <li>to provide, operate and maintain the Sikick service and your workspace;</li>
            <li>to process transactions, generate reports and power features such as SiBorg;</li>
            <li>to authenticate users, enforce permissions and protect account security;</li>
            <li>to communicate with you about your account, updates, billing and support;</li>
            <li>to understand usage, diagnose issues and improve performance and reliability;</li>
            <li>to comply with legal obligations and enforce our terms; and</li>
            <li>where you have consented, to send marketing communications about Sikick products.</li>
          </ul>
          <p>
            The legal grounds for processing depend on your location and the type of data. They typically include
            performance of a contract, legitimate interests in operating a secure business service, compliance with legal
            obligations, and consent where required.
          </p>
        </section>

        <section id="siborg" style={{ marginBottom: 'var(--space-48)' }}>
          <h2>5. SiBorg and AI processing</h2>
          <p>
            SiBorg is Sikick’s AI assistant. When you interact with SiBorg, your prompts and relevant workspace context
            may be sent to underlying AI services to generate responses and suggested actions. We configure these
            services to process inputs only to deliver outputs to your workspace.
          </p>
          <p>
            We configure these services so that inputs are processed only to deliver outputs to your workspace. Any use
            of inputs for model improvement is subject to our agreements with the underlying AI providers and any
            settings you control. Inputs and outputs are retained in line with our normal storage and retention
            practices so you can review history and audit actions.
          </p>
        </section>

        <section id="providers" style={{ marginBottom: 'var(--space-48)' }}>
          <h2>6. Service providers and integrations</h2>
          <p>
            We use trusted service providers for hosting, authentication, payment processing, email delivery, analytics,
            error reporting and customer support. These providers access data only to perform services on our behalf and
            under appropriate confidentiality and security obligations.
          </p>
          <p>
            If you connect third-party integrations, such as accounting, e-commerce or shipping platforms, those
            services will process data according to their own privacy policies and terms. We encourage you to review
            those policies before enabling an integration.
          </p>
        </section>

        <section id="storage" style={{ marginBottom: 'var(--space-48)' }}>
          <h2>7. Storage, retention, deletion and export</h2>
          <p>
            Your data is stored in cloud infrastructure chosen for reliability and security. We retain account and
            business data for as long as your workspace is active, and for a reasonable period afterwards to resolve
            disputes, enforce agreements, comply with legal obligations and support recovery.
          </p>
          <p>
            You can export financial reports, GST returns, the audit log and cashier activity from within the Sikick console, and you can ask us for an assisted export of other records. After you close your account, data may
            enter a restricted retention period before permanent deletion, unless we are required to keep it longer by
            law. Backups are retained for disaster-recovery purposes and are removed according to our backup retention
            schedule.
          </p>
        </section>

        <section id="security" style={{ marginBottom: 'var(--space-48)' }}>
          <h2>8. Security measures</h2>
          <p>
            We implement administrative, technical and physical safeguards designed to protect your data, including
            encryption in transit, access controls, audit logging, regular security reviews and employee training. No
            system is completely secure, and we encourage you to use strong passwords, multi-factor authentication where
            available, and role-based permissions.
          </p>
        </section>

        <section id="cookies" style={{ marginBottom: 'var(--space-48)' }}>
          <h2>9. Cookies and analytics</h2>
          <p>
            The public website and service use cookies and similar technologies to maintain sessions, remember
            preferences, measure traffic and understand how visitors interact with pages. You can control cookies
            through your browser settings. Some features may not work correctly if you disable essential cookies.
          </p>
        </section>

        <section id="choices" style={{ marginBottom: 'var(--space-48)' }}>
          <h2>10. Your choices</h2>
          <p>
            Depending on your location, you may have rights to access, correct, delete, restrict or port your personal
            data, and to object to or withdraw consent for certain processing. You can update many details directly in
            your account settings. For other requests, contact us using the details below. We may need to verify your
            identity before acting on a request.
          </p>
        </section>

        <section id="transfers" style={{ marginBottom: 'var(--space-48)' }}>
          <h2>11. International transfers</h2>
          <p>
            Your data is primarily processed in the region where the Sikick service is hosted. If we transfer personal
            data internationally, we do so only where an appropriate transfer safeguard applies, such as standard
            contractual clauses or an adequacy decision recognized in the relevant jurisdiction.
          </p>
        </section>

        <section id="contact" style={{ marginBottom: 'var(--space-48)' }}>
          <h2>12. Contact us</h2>
          <p>
            If you have questions, concerns or requests about this privacy policy or our handling of your data, please
            contact us through the <Link to="/contact">contact form</Link> or through the support channel available in
            your Sikick console.
          </p>
        </section>
      </div>
    </div>
  );
}
