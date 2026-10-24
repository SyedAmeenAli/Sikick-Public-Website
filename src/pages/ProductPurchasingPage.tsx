import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check, ArrowRight, ClipboardList, Truck, Building2, Wallet, Undo2, Sparkles } from 'lucide-react';
import { useSeo } from '../lib/seo';
import { SIKICK_TRIAL_URL } from '../config/site';
import { FaqAccordion } from '../components/FaqAccordion';

const features = [
  {
    icon: ClipboardList,
    title: 'Purchase orders',
    body: 'Raise purchase orders manually or from a reorder suggestion. Each PO carries line items, supplier, expected delivery and status.',
  },
  {
    icon: Truck,
    title: 'Goods receiving',
    body: 'Receive line by line so short shipments, over-shipments and damages are visible immediately. The stock ledger updates only when you confirm.',
  },
  {
    icon: Building2,
    title: 'Supplier records',
    body: 'Maintain supplier details, contacts, payment terms and a live outstanding balance. Every PO and payment is linked to the supplier ledger.',
  },
  {
    icon: Wallet,
    title: 'Supplier payments',
    body: 'Record payments against supplier balances. The ledger stays honest so you know exactly what is owed and what has been paid.',
  },
  {
    icon: Undo2,
    title: 'Purchase returns',
    body: 'Return damaged or excess stock to suppliers with a documented return note that updates stock and the supplier balance.',
  },
  {
    icon: Sparkles,
    title: 'Reorder suggestions (AI plan)',
    body: 'SiBorg drafts PO quantities from recent sales, lead times, MOQs and stock in transit. The draft waits for human review before it becomes an order.',
  },
];

const faqs = [
  {
    question: 'Can I receive a PO in multiple shipments?',
    answer: 'Yes. You can receive a PO partially and record what arrived each time. The PO status shows how much is still pending and the stock ledger updates per receipt.',
  },
  {
    question: 'How does the supplier balance work?',
    answer: 'Every purchase order, receipt, return and payment is recorded against the supplier. The balance is the running total of what you owe, updated automatically.',
  },
  {
    question: 'What is a reorder suggestion?',
    answer: 'In the AI plan, SiBorg analyses sales velocity, lead times, minimum order quantities and stock already in transit to suggest quantities to reorder. It creates a draft PO for a person to review and approve.',
  },
  {
    question: 'Can I track goods that have been ordered but not received?',
    answer: 'Yes. The stock ledger shows stock in transit from open POs, and receiving screens clearly separate pending, received and damaged quantities.',
  },
];

export default function ProductPurchasingPage() {
  const { t } = useTranslation();
  useSeo({
    title: 'Purchasing and suppliers — Sikick',
    description: 'Purchase orders, line-by-line goods receiving, supplier records, supplier payments and AI-assisted reorder suggestions.',
    path: '/product/purchasing',
  });

  return (
    <div>
      <section className="section">
        <div className="container">
          <p className="eyebrow">Purchasing and suppliers</p>
          <h1>Know what to reorder — and prove it when it arrives.</h1>
          <p className="section-lede">
            Purchase orders, goods receiving, supplier records and supplier payments — all reconciled against the same stock ledger the rest of the business relies on.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-12)', flexWrap: 'wrap', marginTop: 'var(--space-24)' }}>
            <a className="btn btn-primary" href={SIKICK_TRIAL_URL}>
              {t('nav.trial')} <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
            <Link className="btn btn-secondary" to="/product">Back to platform</Link>
          </div>
        </div>
      </section>

      <section className="section section-blush">
        <div className="container">
          <div className="two-col">
            <div>
              <h2>Order, receive and reconcile in one flow</h2>
              <p>
                Purchasing starts with a decision: reorder now or wait. You can raise a purchase order by hand, or review a draft that SiBorg prepared from sales trends and stock coverage. Either way, the PO is sent to the supplier with clear line items and expected quantities.
              </p>
              <p>
                When the shipment arrives, you receive it line by line. If a box is short, damaged or over-delivered, you record the discrepancy before the stock ledger is touched. Supplier payments are logged against the same supplier record, so the outstanding balance is always current.
              </p>
              <ul className="check-list" style={{ marginTop: 'var(--space-24)' }}>
                <li><Check size={18} /> Raise POs manually or from AI draft suggestions.</li>
                <li><Check size={18} /> Receive line by line with short/over/damage tracking.</li>
                <li><Check size={18} /> Maintain supplier ledgers and payment records.</li>
                <li><Check size={18} /> Return stock to suppliers with full documentation.</li>
              </ul>
            </div>
            <div className="ui-frame">
              <div className="ui-chrome">
                <span className="ui-chrome-dot" />
                <span className="ui-chrome-dot" />
                <span className="ui-chrome-dot" />
                <span className="ui-chrome-url">sikick · purchasing</span>
                <span className="ui-demo-tag">Sample data</span>
              </div>
              <div className="ui-body">
                <div className="ui-topbar">
                  <span className="ui-topbar-title">Purchase orders</span>
                </div>
                <div className="ui-panel">
                  <div className="ui-panel-title">Open</div>
                  <div className="ui-row">
                    <span className="ui-sku">PO-0182</span>
                    <span className="ui-name">Acme Suppliers Pvt Ltd</span>
                    <span className="ui-qty">₹48,500</span>
                    <span className="ui-badge ui-badge-draft">Pending</span>
                  </div>
                  <div className="ui-row">
                    <span className="ui-sku">PO-0183</span>
                    <span className="ui-name">Bharat Distributors</span>
                    <span className="ui-qty">₹22,100</span>
                    <span className="ui-badge ui-badge-low">Partial</span>
                  </div>
                </div>
                <div className="ui-panel">
                  <div className="ui-panel-title">Receiving PO-0183</div>
                  <div className="ui-row">
                    <span className="ui-name">Wireless earbuds — Black</span>
                    <span className="ui-qty">Ordered 60</span>
                  </div>
                  <div className="ui-row">
                    <span className="ui-name">Received</span>
                    <span className="ui-qty" style={{ color: '#7fc8a4' }}>58</span>
                  </div>
                  <div className="ui-row">
                    <span className="ui-name">Damaged</span>
                    <span className="ui-qty" style={{ color: '#dd6076' }}>2</span>
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
            <h2>Everything buying needs</h2>
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
            <h2>Questions about purchasing</h2>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ maxWidth: '40rem', margin: '0 auto var(--space-16)' }}>Buy smarter, receive cleaner.</h2>
          <p className="section-lede" style={{ margin: '0 auto var(--space-32)' }}>
            Start a trial and raise your first purchase order. Supplier records and receiving are included from day one.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-12)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a className="btn btn-primary" href={SIKICK_TRIAL_URL}>
              {t('nav.trial')} <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
            <Link className="btn btn-secondary" to="/product/reports">
              {t('common.learnMore')} about reports <ArrowRight size={14} style={{ verticalAlign: 'middle' }} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
