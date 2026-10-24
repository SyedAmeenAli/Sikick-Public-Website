import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check, ArrowRight, Layers, ClipboardCheck, ArrowLeftRight, FlaskConical, MapPin } from 'lucide-react';
import { useSeo } from '../lib/seo';
import { SIKICK_TRIAL_URL } from '../config/site';
import { FaqAccordion } from '../components/FaqAccordion';

const features = [
  {
    icon: Layers,
    title: 'Stock levels and adjustments',
    body: 'Track on-hand, reserved and damaged quantities. Manual adjustments require a reason and user attribution, so the ledger stays auditable.',
  },
  {
    icon: ClipboardCheck,
    title: 'Manual counts and stocktakes',
    body: 'Core supports manual counts and adjustments. Guided stocktakes, cycle counting and discrepancy reports are part of the AI plan.',
  },
  {
    icon: ArrowLeftRight,
    title: 'Transfers (AI plan)',
    body: 'Move stock between supported locations with dispatch and receipt confirmation. Transfers are tracked in the AI plan and update both location ledgers.',
  },
  {
    icon: FlaskConical,
    title: 'Batch tracking (AI plan)',
    body: 'Track batches and lots with expiry alerts. Batch-level visibility is included in the AI plan for businesses that need traceability.',
  },
  {
    icon: MapPin,
    title: 'Locations and bins',
    body: 'Multi-warehouse and bin-level locating are gated features; availability is confirmed during setup based on your operational needs.',
  },
  {
    icon: Check,
    title: 'Reasoned change log',
    body: 'Every adjustment, count and stock movement is logged with a reason, timestamp and user. Audits become straightforward.',
  },
];

const faqs = [
  {
    question: 'What is the difference between a count and an adjustment?',
    answer: 'A count records the physical quantity you found. If it differs from the system, you can create an adjustment with a reason. Both are logged with user attribution.',
  },
  {
    question: 'When will guided stocktakes be available?',
    answer: 'Guided stocktakes with cycle counting and discrepancy reporting are in the AI plan. They walk a user through locations or categories and compare counted quantities to expected quantities.',
  },
  {
    question: 'Can I transfer stock between warehouses?',
    answer: 'Stock transfers between supported locations are included in the AI plan. The sending location dispatches stock and the receiving location confirms it, updating both ledgers.',
  },
  {
    question: 'Is batch or expiry tracking available?',
    answer: 'Batch and lot tracking with expiry alerts are part of the AI plan. This is useful for pharmaceuticals, food, cosmetics and any business that needs traceability.',
  },
];

export default function ProductStockControlPage() {
  const { t } = useTranslation();
  useSeo({
    title: 'Stock control — Sikick',
    description: 'Track stock levels, run manual counts and adjustments, and use AI-plan features for guided stocktakes, transfers and batch tracking.',
    path: '/product/stock-control',
  });

  return (
    <div>
      <section className="section">
        <div className="container">
          <p className="eyebrow">Stock control</p>
          <h1>Keep the physical shelf and the system shelf in sync.</h1>
          <p className="section-lede">
            Real-time stock levels, manual counts and reasoned adjustments in Core. Guided stocktakes, transfers and batch tracking in the AI plan.
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
              <h2>Count, adjust and trace with confidence</h2>
              <p>
                Stock control is the discipline of making the system match the shelf. In Core, you can view current levels, run manual counts and post adjustments with a reason. Every change is attributed, so you can trace what happened and why.
              </p>
              <p>
                In the AI plan, Sikick adds guided stocktakes that lead a user through categories or locations, flag discrepancies and produce recount lists. Transfers between locations are dispatched and received, and batch tracking lets you follow lots from receipt through to sale with expiry alerts before stock goes bad.
              </p>
              <ul className="check-list" style={{ marginTop: 'var(--space-24)' }}>
                <li><Check size={18} /> View on-hand, reserved and damaged quantities.</li>
                <li><Check size={18} /> Post reasoned manual adjustments in Core.</li>
                <li><Check size={18} /> Run guided stocktakes and cycle counts in the AI plan.</li>
                <li><Check size={18} /> Transfer stock and track batches in the AI plan.</li>
              </ul>
            </div>
            <div className="ui-frame">
              <div className="ui-chrome">
                <span className="ui-chrome-dot" />
                <span className="ui-chrome-dot" />
                <span className="ui-chrome-dot" />
                <span className="ui-chrome-url">sikick · stock control</span>
                <span className="ui-demo-tag">Sample data</span>
              </div>
              <div className="ui-body">
                <div className="ui-topbar">
                  <span className="ui-topbar-title">Stock levels</span>
                </div>
                <div className="ui-panel">
                  <div className="ui-panel-title">Counts this week</div>
                  <div className="ui-row">
                    <span className="ui-sku">SKU-1042</span>
                    <span className="ui-name">Cotton T-shirt — Navy / M</span>
                    <span className="ui-qty">142</span>
                    <span className="ui-badge ui-badge-ok">Matched</span>
                  </div>
                  <div className="ui-row">
                    <span className="ui-sku">SKU-1043</span>
                    <span className="ui-name">Cotton T-shirt — Navy / L</span>
                    <span className="ui-qty">38</span>
                    <span className="ui-badge ui-badge-low">Recount</span>
                  </div>
                </div>
                <div className="ui-panel">
                  <div className="ui-panel-title">Adjustment</div>
                  <div className="ui-row">
                    <span className="ui-name">Reason</span>
                    <span className="ui-qty">Damaged in transit</span>
                  </div>
                  <div className="ui-row">
                    <span className="ui-name">Change</span>
                    <span className="ui-qty" style={{ color: '#dd6076' }}>-2 units</span>
                  </div>
                  <div className="ui-row">
                    <span className="ui-name">By</span>
                    <span className="ui-qty">Arjun · 10:42 AM</span>
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
            <h2>Everything stock control needs</h2>
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
            <h2>Questions about stock control</h2>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ maxWidth: '40rem', margin: '0 auto var(--space-16)' }}>Stop guessing what is on the shelf.</h2>
          <p className="section-lede" style={{ margin: '0 auto var(--space-32)' }}>
            Start tracking stock accurately in Core, then upgrade to AI for guided stocktakes, transfers and batch tracking.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-12)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a className="btn btn-primary" href={SIKICK_TRIAL_URL}>
              {t('nav.trial')} <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
            <Link className="btn btn-secondary" to="/product/purchasing">
              {t('common.learnMore')} about purchasing <ArrowRight size={14} style={{ verticalAlign: 'middle' }} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
