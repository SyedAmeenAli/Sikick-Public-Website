import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check, ArrowRight, ShoppingCart, Search, Banknote, RotateCcw, FileText } from 'lucide-react';
import { useSeo } from '../lib/seo';
import { SIKICK_TRIAL_URL } from '../config/site';
import { FaqAccordion } from '../components/FaqAccordion';
import { PosDemo } from '../components/PosDemo';
import { PosFlowIllustration } from '../components/hairline/Illustrations';

const features = [
  {
    icon: ShoppingCart,
    title: 'Till checkout',
    body: 'A focused checkout screen with a product grid, cart summary and tender handling. Cash, UPI and QR payments are recorded against the sale.',
  },
  {
    icon: Search,
    title: 'Product lookup',
    body: 'Find products by name, SKU or barcode. The lookup reads the live catalog and stock ledger, so you always know what is available to sell.',
  },
  {
    icon: Banknote,
    title: 'Payment record',
    body: 'Record cash, UPI and QR tenders, including split payments. Every transaction is attributed to the cashier and updates the ledger.',
  },
  {
    icon: RotateCcw,
    title: 'Returns and exchanges',
    body: 'Process standard returns, exchanges and refunds against previous sales. Return reasons are captured for reporting.',
  },
  {
    icon: FileText,
    title: 'Quotations and orders',
    body: 'Create quotations that convert to sales orders, then to fulfilled sales. Useful for B2B quotes and hold orders at the counter.',
  },
  {
    icon: Check,
    title: 'Stock update on sale',
    body: 'Each completed sale reserves and then reduces stock in real time, so the back office sees accurate levels immediately.',
  },
];

const faqs = [
  {
    question: 'What payment methods does the POS support?',
    answer: 'Core supports cash, UPI and QR payment recording. Split tenders across multiple methods are supported. Card payment integrations are evaluated case by case during setup.',
  },
  {
    question: 'Does the POS work offline?',
    answer: 'Offline till operation is investigated but not advertised as available until verified. The current POS terminal requires a network connection to the Sikick console.',
  },
  {
    question: 'How do returns affect stock?',
    answer: 'A return reverses the original sale quantity and updates the ledger. If the item is not resellable, you can mark it as damaged during the return flow.',
  },
  {
    question: 'Can I use a barcode scanner?',
    answer: 'Yes. The product lookup accepts barcode scanner input as keyboard wedges, so most standard USB scanners work without additional configuration.',
  },
];

export default function ProductPosPage() {
  const { t } = useTranslation();
  useSeo({
    title: 'POS and selling — Sikick',
    description: 'Till checkout with product lookup, cart, payment recording, stock updates, quotations and returns.',
    path: '/product/pos',
  });

  return (
    <div>
      <section className="section">
        <div className="container">
          <p className="eyebrow">POS and selling</p>
          <h1>Ring sales fast without losing the detail.</h1>
          <p className="section-lede">
            A focused till for checkout, product lookup, cart management and payment recording — with automatic stock updates, quotations and standard returns.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-12)', flexWrap: 'wrap', marginTop: 'var(--space-24)' }}>
            <a className="btn btn-primary" href={SIKICK_TRIAL_URL}>
              {t('nav.trial')} <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
            <Link className="btn btn-secondary" to="/product">Back to platform</Link>
          </div>
        </div>
      </section>
      <section className="section section-visual">
        <div className="container container-wide">
          <PosDemo /><div className="pos-flow-wrap"><PosFlowIllustration /></div>
        </div>
      </section>


      <section className="section section-blush">
        <div className="container">
          <div className="two-col">
            <div>
              <h2>From scan to receipt in seconds</h2>
              <p>
                The POS is designed for speed at the counter. A cashier scans or searches for a product, adds it to the cart, applies any discount and chooses the tender. As soon as the sale is completed, Sikick records the payment, attributes it to the cashier and updates the stock ledger.
              </p>
              <p>
                For customers who are not ready to buy, create a quotation and convert it later. For returns and exchanges, pull up the original sale, select the items and record the refund or replacement. The same catalog and stock records keep everything consistent.
              </p>
              <ul className="check-list" style={{ marginTop: 'var(--space-24)' }}>
                <li><Check size={18} /> Search by name, SKU or barcode scanner.</li>
                <li><Check size={18} /> Record cash, UPI and QR tenders, including splits.</li>
                <li><Check size={18} /> Convert quotations into sales orders and completed sales.</li>
                <li><Check size={18} /> Process returns against original transactions.</li>
              </ul>
              <p className="text-small text-muted" style={{ marginTop: 'var(--space-24)' }}>
                The POS terminal is a separate deployment. Offline till operation is investigated but not advertised as available until verified.
              </p>
            </div>
            <div className="ui-frame">
              <div className="ui-chrome">
                <span className="ui-chrome-dot" />
                <span className="ui-chrome-dot" />
                <span className="ui-chrome-dot" />
                <span className="ui-chrome-url">sikick · pos</span>
                <span className="ui-demo-tag">Morrow Goods</span>
              </div>
              <div className="ui-body">
                <div className="ui-topbar">
                  <span className="ui-topbar-title">Checkout</span>
                  <span className="ui-demo-tag">Terminal 1 · Cashier: Riya</span>
                </div>
                <div className="ui-panel">
                  <div className="ui-panel-title">Cart</div>
                  <div className="ui-row">
                    <span className="ui-name">Cotton T-shirt — Navy / M</span>
                    <span className="ui-qty">₹599 × 2</span>
                  </div>
                  <div className="ui-row">
                    <span className="ui-name">Wireless earbuds — Black</span>
                    <span className="ui-qty">₹1,299 × 1</span>
                  </div>
                  <div className="ui-row" style={{ borderTop: '1px solid rgb(245 232 234 / 0.08)', marginTop: '8px', paddingTop: '12px' }}>
                    <span className="ui-name">Total</span>
                    <span className="ui-qty">₹2,497</span>
                  </div>
                </div>
                <div className="ui-panel">
                  <div className="ui-panel-title">Tender</div>
                  <div className="ui-row">
                    <span className="ui-name">Cash</span>
                    <span className="ui-qty">₹1,500</span>
                  </div>
                  <div className="ui-row">
                    <span className="ui-name">UPI</span>
                    <span className="ui-qty">₹997</span>
                  </div>
                  <div className="ui-row">
                    <button className="ui-approve-btn">Complete sale</button>
                    <button className="ui-ghost-btn">Save quotation</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Capabilities</p>
            <h2>Everything the counter needs</h2>
          </div>
          <div className="grid grid-3">
            {features.map((item) => (
              <div key={item.title} className="card">
                <div className="card-icon">
                  <item.icon size={22} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-blush">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">FAQ</p>
            <h2>Questions about selling</h2>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ maxWidth: '40rem', margin: '0 auto var(--space-16)' }}>Try the till for yourself.</h2>
          <p className="section-lede" style={{ margin: '0 auto var(--space-32)' }}>
            The 14-day trial includes the POS terminal, catalog and stock control so you can run a full sale from start to finish.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-12)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a className="btn btn-primary" href={SIKICK_TRIAL_URL}>
              {t('nav.trial')} <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
            <Link className="btn btn-secondary" to="/product/inventory">
              {t('common.learnMore')} about inventory <ArrowRight size={14} style={{ verticalAlign: 'middle' }} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
