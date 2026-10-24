import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ArrowRight, Shield, Lock, Eye, FileText } from 'lucide-react';
import { useReveal } from '../lib/motion';
import { useSeo } from '../lib/seo';
import { SIKICK_TRIAL_URL } from '../config/site';
import { ChapterRail, HeroScene, ModuleWalk, SwitchBand, WorkflowStory } from '../components/HomeSections';
import { PosDemo } from '../components/PosDemo';
import { SiBorgConstellation, SiBorgDemo, SiBorgStage } from '../components/SiBorgExperience';
import { AnalyticsLineIllustration, BarcodeScanIllustration, IntegrationTopologyIllustration, InventoryShelfIllustration, PosFlowIllustration, StockMovementIllustration, SupplierRouteIllustration } from '../components/hairline/Illustrations';
import { INDUSTRIES } from '../data/industries';

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
  { q: 'Can I export my data?', a: 'The console exports financial reports (trial balance, profit and loss, balance sheet, cash flow), GST returns, the audit log and cashier activity as CSV, and GST returns as JSON too. A one-click export of products, stock, customers and transactions is not available yet; ask for an assisted export on the data migration page.' },
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
    title: 'Sikick — Know what is on the shelf before anyone asks',
    description: 'Inventory, purchasing, POS and business insights connected in one clear system for retail, wholesale, distribution and manufacturing.',
    path: '/',
  });

  return (
    <div>
      <section className="section" style={{ paddingTop: 'clamp(3rem, 1rem + 4vw, 5rem)' }}>
        <div className="container">
          <div
            ref={heroRef}
            className="reveal hero-stagger hero-text"
            
          >
            <p className="eyebrow">{t('hero.eyebrow')}</p>
            <h1>{t('hero.title')}</h1>
            <p className="section-lede" style={{ margin: '0 0 var(--space-32)' }}>
              {t('hero.lede')}
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-12)', flexWrap: 'wrap' }}>
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

        </div>
        <HeroScene />
      </section>

      <ModuleWalk />

      <WorkflowStory />

      <ChapterRail>
      <section className="section" aria-labelledby="inv-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">01 / Stock</p>
            <h2 id="inv-title">Every product has a place, a code and a count.</h2>
            <p className="section-lede">Pick a product on the shelf and follow it to its record. Scan a barcode and watch it resolve to the catalog.</p>
          </div>
          <InventoryShelfIllustration />
          <div style={{ height: 'var(--space-48)' }} />
          <BarcodeScanIllustration />
        </div>
      </section>

      <section className="section section-blush" aria-labelledby="pos-title">
        <div className="container container-wide">
          <div className="section-head">
            <p className="eyebrow">02 / Sell</p>
            <h2 id="pos-title">A till that sells, and keeps the stock honest.</h2>
            <p className="section-lede">Try it. Search, add products, change quantities, apply a discount and complete a demo sale. The stock preview moves with it.</p>
          </div>
          <PosDemo />
          <div className="pos-flow-wrap"><PosFlowIllustration /></div>
          <p className="text-small text-muted" style={{ textAlign: 'center', marginTop: 'var(--space-16)' }}>
            <Link to="/product/pos">More about POS <ArrowRight size={13} style={{ display: 'inline', verticalAlign: '-2px' }} /></Link>
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="ops-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">03 / Receive</p>
            <h2 id="ops-title">Follow stock from the supplier to the shelf.</h2>
            <p className="section-lede">Step through receiving, then see how a transfer between locations is recorded.</p>
          </div>
          <SupplierRouteIllustration />
          <div style={{ height: 'var(--space-48)' }} />
          <StockMovementIllustration />
        </div>
      </section>

      <section className="section section-blush" aria-labelledby="an-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">04 / Understand</p>
            <h2 id="an-title">See the trend before it becomes a problem.</h2>
            <p className="section-lede">Weekly units sold for the Wireless earbuds at Main Store. Point at any week to read it.</p>
          </div>
          <AnalyticsLineIllustration />
        </div>
      </section>
      </ChapterRail>

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
            <SiBorgStage />
          </div>
          <div className="sbd-wrap"><SiBorgDemo /></div>
          <div style={{ height: 'var(--space-64)' }} />
          <SiBorgConstellation />
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
          <IntegrationTopologyIllustration />
          <div style={{ height: 'var(--space-48)' }} />
          <SwitchBand />
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
                Role-based access, signed audit events and CSV exports of financial reports, GST returns and logs. We do not claim perfect security; we describe the protections that are actually implemented.
              </p>
              <ul className="check-list" style={{ marginTop: 'var(--space-24)' }}>
                <li><Lock size={18} /> Role-based access inside each workspace.</li>
                <li><Eye size={18} /> Audit log of important business actions.</li>
                <li><FileText size={18} /> Export financial reports, GST returns and the audit log.</li>
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
                    <stop offset="0%" stopColor="#2a1c22" />
                    <stop offset="100%" stopColor="#1a1316" />
                  </linearGradient>
                </defs>
                <rect x="40" y="40" width="320" height="180" rx="16" fill="url(#trustGrad)" stroke="rgba(243,236,230,0.2)" />
                <rect x="70" y="80" width="180" height="20" rx="4" fill="rgba(243,236,230,0.1)" />
                <rect x="70" y="110" width="140" height="14" rx="3" fill="rgba(243,236,230,0.1)" />
                <rect x="70" y="132" width="160" height="14" rx="3" fill="rgba(243,236,230,0.1)" />
                <rect x="70" y="154" width="120" height="14" rx="3" fill="rgba(243,236,230,0.1)" />
                <circle cx="320" cy="100" r="24" fill="#d9708b" opacity="0.12" />
                <path d="M310 100 L318 108 L332 92" stroke="#d9708b" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <text x="320" y="140" textAnchor="middle" fill="#d9708b" fontSize="10" fontWeight="700">Verified</text>
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
