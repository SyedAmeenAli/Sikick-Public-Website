import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ArrowRight, Shield, Zap, BarChart3, Truck, CreditCard, Lock, Eye, FileText } from 'lucide-react';
import { useReveal, useScrollSpySteps } from '../lib/motion';
import { useSeo } from '../lib/seo';
import { SIKICK_TRIAL_URL } from '../config/site';
import { DashboardPreview } from '../components/DashboardPreview';
import { InventoryStoryScene } from '../components/InventoryStoryScene';
import { INDUSTRIES } from '../data/industries';

const modules = [
  { icon: Truck, title: 'Inventory & catalog', body: 'Products, variants, SKUs, barcodes and stock visibility in one place.', to: '/product/inventory' },
  { icon: CreditCard, title: 'POS & selling', body: 'Till checkout, orders, quotations, customers and standard returns.', to: '/product/pos' },
  { icon: Zap, title: 'Purchasing', body: 'Purchase orders, receiving, supplier records and payments.', to: '/product/purchasing' },
  { icon: BarChart3, title: 'Reports & analytics', body: 'Sales, stock and purchasing visibility for decisions.', to: '/product/reports' },
];

const coreCapabilities = [
  { title: 'Catalog, variants and barcodes', body: 'Products, categories, variants, auto-generated SKUs and printable barcode labels.' },
  { title: 'Stock and adjustments', body: 'On-hand, reserved and damaged quantities; every change is reasoned, attributed and logged.' },
  { title: 'POS, orders and returns', body: 'Till checkout, sales orders, quotations, customers, standard returns, exchanges and refunds.' },
  { title: 'Purchasing and suppliers', body: 'Purchase orders, goods receiving, supplier records and supplier payments.' },
  { title: 'Reports and visibility', body: 'Sales, stock and purchase reporting — with dashboards, trends and forecasts in the AI plan.' },
  { title: 'GST and expenses (AI plan)', body: 'GST-ready invoices and summaries, plus expense tracking with receipts.' },
];

const faqs = [
  { q: 'How long is the free trial?', a: 'Core and AI offer a 14-day free trial with no payment method required. Email/password signups verify their email before entering the workspace.' },
  { q: 'Can I import my existing products?', a: 'Yes. The console imports spreadsheets with column mapping, validation, correction and an explicit confirmation step.' },
  { q: 'Does it handle product variants and barcodes?', a: 'Yes. Parent products with variants, individual SKUs, barcodes and per-variant stock quantities are supported across every plan.' },
  { q: 'What payment methods are supported?', a: 'UPI, cards, net banking and international cards are planned. Only methods actually configured in the payment gateway are exposed.' },
  { q: 'Are prices shown with GST?', a: 'No. Subscription prices are shown excluding applicable GST; tax is calculated at checkout and itemized on the invoice.' },
  { q: 'What is SiBorg?', a: 'SiBorg is the in-product intelligence assistant. It explains, recommends and prepares reviewable actions; consequential changes require human approval.' },
  { q: 'Can I export my data?', a: 'Yes. Products, stock, customers, transactions and reports can be exported. Scheduled exports are part of the AI plan.' },
  { q: 'How do integrations work?', a: 'The integrations directory labels each connector by readiness: available, setup required, in development or Enterprise custom.' },
];

const featuredIndustries = [
  'pharmacies-and-drugstores',
  'apparel-and-fashion-retail',
  'wholesale-trading',
  'consumer-electronics',
  'bakeries-and-confectioners',
  'automotive-parts-and-spares',
  'supermarkets-and-hypermarkets',
  'furniture-retail-and-wholesale',
];

export default function HomePage() {
  const { t } = useTranslation();
  const heroRef = useReveal<HTMLDivElement>();
  useSeo({
    title: 'Sikick — Know your stock. Move with confidence.',
    description: 'Inventory, purchasing, POS and business insights connected in one clear system for retail, wholesale, distribution and manufacturing.',
    path: '/',
  });

  return (
    <div>
      <section className="section" style={{ paddingTop: 'clamp(3rem, 1rem + 4vw, 5rem)' }}>
        <div className="container">
          <div
            ref={heroRef}
            className="reveal hero-stagger"
            style={{ textAlign: 'center', maxWidth: '52rem', margin: '0 auto var(--space-48)' }}
          >
            <p className="eyebrow">{t('hero.eyebrow')}</p>
            <h1>{t('hero.title')}</h1>
            <p className="section-lede" style={{ margin: '0 auto var(--space-32)' }}>
              {t('hero.lede')}
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-12)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a className="btn btn-primary" href={SIKICK_TRIAL_URL}>
                {t('hero.primary')} <span className="btn-arrow" aria-hidden="true">→</span>
              </a>
              <Link className="btn btn-secondary" to="/product">
                {t('hero.secondary')}
              </Link>
            </div>
            <p className="text-small text-muted" style={{ marginTop: 'var(--space-16)' }}>
              {t('hero.note')}
            </p>
          </div>

          <DashboardPreview />
        </div>
      </section>

      <section className="section section-blush">
        <div className="container">
          <div className="section-head section-head-center">
            <p className="eyebrow">Modules</p>
            <h2>One system for the work that moves stock.</h2>
            <p className="section-lede" style={{ margin: '0 auto' }}>
              Catalog, stock, purchasing, sales and reporting share the same truth, so a change in one place is visible everywhere.
            </p>
          </div>
          <div className="grid grid-4">
            {modules.map((module) => (
              <Link key={module.title} to={module.to} className="card card-hover module-card">
                <div className="card-icon">
                  <module.icon size={20} />
                </div>
                <h3>{module.title}</h3>
                <p>{module.body}</p>
                <span className="module-link">
                  {t('common.learnMore')} <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InventoryStoryScene />

      <section className="section">
        <div className="container">
          <div className="section-head section-head-center">
            <p className="eyebrow">From stock to sale</p>
            <h2>Follow one item through the whole system.</h2>
            <p className="section-lede" style={{ margin: '0 auto' }}>
              Scroll or pick a step. The companion panel shows the screen that belongs to it.
            </p>
          </div>
          <StockToSaleStory />
        </div>
      </section>

      <section className="section section-blush">
        <div className="container">
          <div className="two-col" style={{ marginBottom: 'var(--space-48)' }}>
            <div>
              <p className="eyebrow">Core capabilities</p>
              <h2>Built for operators, not for slide decks.</h2>
              <p className="section-lede">
                Plain-language outcomes first, with the workflow behind each one. Nothing here is advertised as live until it is verified.
              </p>
            </div>
            <div />
          </div>
          <div className="grid grid-3">
            {coreCapabilities.map((capability) => (
              <div key={capability.title} className="card card-hover">
                <h3>{capability.title}</h3>
                <p>{capability.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="two-col" style={{ marginBottom: 'var(--space-48)' }}>
            <div>
              <p className="eyebrow">SiBorg</p>
              <h2>Useful intelligence, with a person in control.</h2>
              <p className="section-lede">
                SiBorg is an intelligence workspace — not a generic chatbot. It follows a governed lifecycle:
              </p>
              <p style={{ fontWeight: 600, color: 'var(--accent)', margin: 'var(--space-16) 0 var(--space-24)' }}>
                Detect → Explain → Recommend → Propose → Approve → Execute → Verify
              </p>
              <p className="section-lede">
                Important business actions require approval. Purchase orders are prepared as reviewable drafts — they are not sent automatically.
              </p>
              <Link className="btn btn-secondary" to="/product/siborg">
                {t('common.learnMore')} <span className="btn-arrow" aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="ui-frame">
              <div className="ui-chrome">
                <span className="ui-chrome-dot" />
                <span className="ui-chrome-dot" />
                <span className="ui-chrome-dot" />
                <span className="ui-chrome-url">SiBorg · reorder review</span>
                <span className="ui-demo-tag">{t('hero.demo')}</span>
              </div>
              <div className="ui-body">
                <div className="ui-panel ui-siborg">
                  <div className="ui-panel-title">
                    <span aria-hidden="true">●</span> Reorder proposal · Wireless earbuds
                  </div>
                  <div style={{ display: 'grid', gap: '6px', fontSize: '0.78rem', marginBottom: '10px' }}>
                    <div><strong style={{ color: '#f7efe9' }}>Suggested:</strong> 60 units</div>
                    <div><strong style={{ color: '#f7efe9' }}>Because:</strong> 14 days of stock left · lead time 7 days · MOQ 30</div>
                    <div><strong style={{ color: '#f7efe9' }}>Coverage:</strong> 87% of the last 90 days have sales data</div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span className="ui-approve-btn">Approve draft</span>
                    <span className="ui-ghost-btn">Edit &amp; recalculate</span>
                  </div>
                </div>
                <p className="text-small text-muted" style={{ margin: 0 }}>
                  {t('hero.demo')} — illustrative. Low-data cases show coverage and fall back to configured rules, with the missing inputs explained.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-blush">
        <div className="container">
          <div className="two-col" style={{ marginBottom: 'var(--space-48)' }}>
            <div>
              <p className="eyebrow">Integrations</p>
              <h2>Connect the tools you already use.</h2>
              <p className="section-lede">
                The integrations directory labels each connector by readiness: available, setup required, in development or Enterprise custom.
              </p>
              <Link className="btn btn-secondary" to="/integrations">
                Browse integrations <span className="btn-arrow" aria-hidden="true">→</span>
              </Link>
            </div>
            <div>
              <div className="grid grid-2">
                <div className="card">
                  <div className="pill pill-info" style={{ marginBottom: 'var(--space-12)' }}>Available</div>
                  <h3>Data import</h3>
                  <p>Import products, stock and customers from spreadsheets with validation and confirmation.</p>
                </div>
                <div className="card">
                  <div className="pill pill-warning" style={{ marginBottom: 'var(--space-12)' }}>Setup required</div>
                  <h3>Payment gateway</h3>
                  <p>Connect your payment provider to accept UPI, cards and net banking in the POS.</p>
                </div>
                <div className="card">
                  <div className="pill pill-info" style={{ marginBottom: 'var(--space-12)' }}>Available</div>
                  <h3>Barcode printing</h3>
                  <p>Generate and print barcode labels for products and variants.</p>
                </div>
                <div className="card">
                  <div className="pill pill-wine" style={{ marginBottom: 'var(--space-12)' }}>Enterprise custom</div>
                  <h3>Accounting systems</h3>
                  <p>Tailored integrations for advanced accounting and multi-entity workflows.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Industries</p>
            <h2>Inventory software for the way your industry works.</h2>
            <p className="section-lede">
              A shared operational foundation, configured to the business. {featuredIndustries.length} of 78 sectors shown here.
            </p>
          </div>
          <div className="grid grid-4">
            {featuredIndustries.map((slug) => {
              const industry = INDUSTRIES.find((item) => item.slug === slug);
              if (!industry) return null;
              return (
                <Link key={slug} to={`/industries/${slug}`} className="card card-hover sector-card">
                  <span className="sector-category">{industry.category}</span>
                  <h3>{industry.name}</h3>
                  <p>{industry.summary}</p>
                  <span className="sector-arrow">
                    {t('common.explore')} <ArrowRight size={14} />
                  </span>
                </Link>
              );
            })}
          </div>
          <div style={{ marginTop: 'var(--space-32)', textAlign: 'center' }}>
            <Link className="btn btn-secondary" to="/industries">
              Explore all 78 sectors <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-blush">
        <div className="container">
          <div className="two-col">
            <div>
              <p className="eyebrow">Security & trust</p>
              <h2>Your operational data stays under your control.</h2>
              <p className="section-lede">
                Role-based access, signed audit events, configurable data retention and export. We do not claim perfect security; we describe the protections that are actually implemented.
              </p>
              <ul className="check-list" style={{ marginTop: 'var(--space-24)' }}>
                <li><Lock size={18} /> Role-based access inside each workspace.</li>
                <li><Eye size={18} /> Audit log of important business actions.</li>
                <li><FileText size={18} /> Export products, stock, customers and transactions.</li>
                <li><Shield size={18} /> Workspace data retention settings you control.</li>
              </ul>
              <Link className="btn btn-secondary" to="/security" style={{ marginTop: 'var(--space-24)' }}>
                {t('common.learnMore')} <span className="btn-arrow" aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="trust-visual" aria-hidden="true">
              <svg viewBox="0 0 400 260" style={{ width: '100%', maxWidth: 420, height: 'auto' }}>
                <defs>
                  <linearGradient id="trustGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#fff" />
                    <stop offset="100%" stopColor="#f5e8ea" />
                  </linearGradient>
                </defs>
                <rect x="40" y="40" width="320" height="180" rx="16" fill="url(#trustGrad)" stroke="#e8dde0" />
                <rect x="70" y="80" width="180" height="20" rx="4" fill="#f5e8ea" />
                <rect x="70" y="110" width="140" height="14" rx="3" fill="#f5e8ea" />
                <rect x="70" y="132" width="160" height="14" rx="3" fill="#f5e8ea" />
                <rect x="70" y="154" width="120" height="14" rx="3" fill="#f5e8ea" />
                <circle cx="320" cy="100" r="24" fill="#8b1538" opacity="0.12" />
                <path d="M310 100 L318 108 L332 92" stroke="#8b1538" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <text x="320" y="140" textAnchor="middle" fill="#8b1538" fontSize="10" fontWeight="700">Verified</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head section-head-center">
            <p className="eyebrow">FAQ</p>
            <h2>Questions operators actually ask.</h2>
          </div>
          <div className="accordion">
            {faqs.map((item, index) => (
              <FaqItem key={index} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ maxWidth: '40rem', margin: '0 auto var(--space-16)' }}>{t('cta.final.title')}</h2>
          <p className="section-lede" style={{ margin: '0 auto var(--space-32)', color: 'var(--on-dark-muted)' }}>
            {t('cta.final.lede')}
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-12)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a className="btn btn-light" href={SIKICK_TRIAL_URL}>
              {t('nav.trial')}
            </a>
            <Link className="btn btn-ghost" to="/setup" style={{ color: 'var(--on-dark-text)' }}>
              {t('cta.final.configurator')}
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .module-card { display: flex; flex-direction: column; gap: 8px; min-height: 100%; }
        .module-card .module-link {
          margin-top: auto;
          color: var(--accent);
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.9rem;
          font-weight: 600;
          opacity: 0;
          transform: translateX(-4px);
          transition: opacity var(--dur-common) var(--ease-out), transform var(--dur-common) var(--ease-out);
        }
        .module-card:hover .module-link, .module-card:focus-visible .module-link { opacity: 1; transform: none; }
        .trust-visual { display: grid; place-items: center; }
      `}</style>
    </div>
  );
}

function StockToSaleStory() {
  const { t } = useTranslation();
  const { active, setActive, stepsRef } = useScrollSpySteps(5);
  const steps = [
    { title: 'Add or import a catalog', body: 'Products, categories, variants, SKUs and barcodes — imported from a spreadsheet or entered by hand.' },
    { title: 'Receive goods and record stock', body: 'Purchase orders are received line by line; the stock ledger updates with on-hand, reserved and damaged quantities.' },
    { title: 'Sell, reserve or fulfil an order', body: 'POS checkout, quotations and sales orders all draw from the same stock truth.' },
    { title: 'Reorder with stock and supplier context', body: 'SiBorg drafts reviewable reorder quantities from your own sales, lead times and stock in transit.' },
    { title: 'Review outcomes in reports', body: 'Sales, stock and purchase reports — plus interactive dashboards and insights in the AI plan.' },
  ];
  const screens = [
    { title: 'Catalog', rows: ['SKU-1042 · Cotton T-shirt', 'SKU-2081 · Wireless earbuds', 'SKU-3310 · Ceramic mug'] },
    { title: 'Receiving', rows: ['PO-0182 · 240 units received', 'PO-0183 · pending 60 units', 'Damaged: 2 units'] },
    { title: 'Sale', rows: ['Order #4821 · 3 items', 'Tender: UPI ₹1,240', 'Reserved: 1 unit'] },
    { title: 'Reorder', rows: ['Earbuds · suggest 60', 'Coverage 87% · medium', 'Approve draft'] },
    { title: 'Reports', rows: ['Sales (sample): ₹4.8L', 'Low stock: 17 items', 'Slow movers: 6 SKUs'] },
  ];
  const screen = screens[active] ?? screens[0];
  return (
    <div className="story">
      <div ref={stepsRef} className="story-steps">
        {steps.map((step, index) => (
          <button
            key={step.title}
            type="button"
            className="story-step"
            data-step-index={index}
            data-active={active === index}
            onClick={() => setActive(index)}
          >
            <span className="story-step-num">Step {index + 1}</span>
            <h3>{step.title}</h3>
            {active === index && <p>{step.body}</p>}
          </button>
        ))}
      </div>
      <div className="story-visual">
        <div className="story-visual-sticky">
          <div className="ui-frame">
            <div className="ui-chrome">
              <span className="ui-chrome-dot" />
              <span className="ui-chrome-dot" />
              <span className="ui-chrome-dot" />
              <span className="ui-chrome-url">sikick · {screen.title.toLowerCase()}</span>
              <span className="ui-demo-tag">{t('hero.demo')}</span>
            </div>
            <div className="ui-body">
              <div className="ui-topbar">
                <span className="ui-topbar-title">{screen.title}</span>
              </div>
              {screen.rows.map((row) => (
                <div className="ui-row" key={row}>
                  <span className="ui-name">{row}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="accordion-item">
      <button
        type="button"
        className="accordion-trigger"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {question}
        <span className="chev" aria-hidden="true">▾</span>
      </button>
      <div className="accordion-panel" style={{ maxHeight: open ? '400px' : 0 }}>
        <div className="accordion-panel-inner">{answer}</div>
      </div>
    </div>
  );
}
