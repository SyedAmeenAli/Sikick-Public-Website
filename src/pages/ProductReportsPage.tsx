import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check, ArrowRight, TrendingUp, PackageSearch, Truck, LayoutDashboard, Brain } from 'lucide-react';
import { useSeo } from '../lib/seo';
import { SIKICK_TRIAL_URL } from '../config/site';
import { FaqAccordion } from '../components/FaqAccordion';
import { AnalyticsLineIllustration } from '../components/hairline/Illustrations';

const features = [
  {
    icon: TrendingUp,
    title: 'Sales reports',
    body: 'Summaries by period, product, variant and customer. See what is selling, what is slowing and how revenue is trending.',
  },
  {
    icon: PackageSearch,
    title: 'Stock reports',
    body: 'On-hand, reserved, damaged and low-stock visibility. Identify stagnant stock before it ties up capital.',
  },
  {
    icon: Truck,
    title: 'Purchase reports',
    body: 'Supplier performance, purchase volumes and receipt accuracy. Use them to negotiate better terms and spot delivery issues.',
  },
  {
    icon: LayoutDashboard,
    title: 'Dashboards (AI plan)',
    body: 'Interactive dashboards bring sales, stock and purchasing metrics together in one view, updated from the same underlying records.',
  },
  {
    icon: Brain,
    title: 'Trends and forecasts (AI plan)',
    body: 'SiBorg surfaces trends, comparisons and forward-looking forecasts to help you decide what to stock and when to reorder.',
  },
  {
    icon: Check,
    title: 'Exportable financial reports',
    body: 'Trial balance, profit and loss, balance sheet and cash flow export as CSV for your accountant. GST returns export as CSV or JSON.',
  },
];

const faqs = [
  {
    question: 'What reports are included in Core?',
    answer: 'Core includes standard sales, stock and purchase reports. These cover sales by period, product and customer; stock on hand, reserved and damaged quantities; and supplier purchase performance.',
  },
  {
    question: 'What is in the AI plan?',
    answer: 'The AI plan adds interactive dashboards, trend analysis, comparisons, forecasts and SiBorg-generated insights.',
  },
  {
    question: 'How current is the data in reports?',
    answer: 'Reports read the same underlying transaction records as the POS, purchasing and stock control modules. As soon as a sale, receipt or adjustment is recorded, it is reflected in reports.',
  },
  {
    question: 'Can I build custom reports?',
    answer: 'Custom reports and cross-entity analytics are available under Enterprise governance. Standard and AI-plan reports cover the needs of most growing businesses.',
  },
];

export default function ProductReportsPage() {
  const { t } = useTranslation();
  useSeo({
    title: 'Reports and analytics — Sikick',
    description: 'Sales, stock and purchase reports in Core. Interactive dashboards, trends, comparisons and AI-generated insights in the AI plan.',
    path: '/product/reports',
  });

  return (
    <div>
      <section className="section">
        <div className="container">
          <p className="eyebrow">Reports and analytics</p>
          <h1>Turn every sale, receipt and count into a clear answer.</h1>
          <p className="section-lede">
            Standard sales, stock and purchase reports in Core. Interactive dashboards, trends, comparisons and SiBorg-generated insights in the AI plan.
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
        <div className="container">
          <AnalyticsLineIllustration />
        </div>
      </section>


      <section className="section section-blush">
        <div className="container">
          <div className="two-col">
            <div>
              <h2>One truth, many ways to read it</h2>
              <p>
                Reports are only as good as the data underneath. Because Sikick records sales, purchases and stock movements in one system, every report reads from the same ledger. There is no manual consolidation and no wondering which spreadsheet is correct.
              </p>
              <p>
                Core gives you the operational reports a team uses every day: sales summaries, stock positions and purchase performance. The AI plan layers on dashboards that combine these views, highlights trends and outliers, and lets SiBorg explain what is changing and why.
              </p>
              <ul className="check-list" style={{ marginTop: 'var(--space-24)' }}>
                <li><Check size={18} /> Sales, stock and purchase reports in Core.</li>
                <li><Check size={18} /> Interactive dashboards in the AI plan.</li>
                <li><Check size={18} /> Trends, comparisons and AI-generated insights.</li>
                <li><Check size={18} /> Export financial reports for your accountant.</li>
              </ul>
            </div>
            <div className="ui-frame">
              <div className="ui-chrome">
                <span className="ui-chrome-dot" />
                <span className="ui-chrome-dot" />
                <span className="ui-chrome-dot" />
                <span className="ui-chrome-url">sikick · reports</span>
                <span className="ui-demo-tag">Morrow Goods</span>
              </div>
              <div className="ui-body">
                <div className="ui-topbar">
                  <span className="ui-topbar-title">Business overview</span>
                </div>
                <div className="ui-cards">
                  <div className="ui-metric">
                    <div className="ui-metric-label">Sales this month</div>
                    <div className="ui-metric-value">₹4.8L</div>
                    <div className="ui-metric-sub good">+12% vs last month</div>
                  </div>
                  <div className="ui-metric">
                    <div className="ui-metric-label">Low stock items</div>
                    <div className="ui-metric-value">17</div>
                    <div className="ui-metric-sub warn">Needs attention</div>
                  </div>
                  <div className="ui-metric">
                    <div className="ui-metric-label">Pending POs</div>
                    <div className="ui-metric-value">6</div>
                    <div className="ui-metric-sub">₹1.1L in transit</div>
                  </div>
                  <div className="ui-metric">
                    <div className="ui-metric-label">Slow movers</div>
                    <div className="ui-metric-value">6</div>
                    <div className="ui-metric-sub warn">Review</div>
                  </div>
                </div>
                <div className="ui-panel">
                  <div className="ui-panel-title">Sales trend</div>
                  <div className="ui-bars">
                    <div className="ui-bar" style={{ height: '35%' }} />
                    <div className="ui-bar" style={{ height: '52%' }} />
                    <div className="ui-bar" style={{ height: '48%' }} />
                    <div className="ui-bar" style={{ height: '70%' }} />
                    <div className="ui-bar" style={{ height: '62%' }} />
                    <div className="ui-bar" style={{ height: '88%' }} />
                    <div className="ui-bar dim" style={{ height: '42%' }} />
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
            <h2>Everything reporting needs</h2>
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
            <h2>Questions about reports</h2>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ maxWidth: '40rem', margin: '0 auto var(--space-16)' }}>See your business clearly.</h2>
          <p className="section-lede" style={{ margin: '0 auto var(--space-32)' }}>
            Core reports are ready from day one. Upgrade to AI for dashboards, trends and SiBorg insights that explain what the numbers mean.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-12)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a className="btn btn-primary" href={SIKICK_TRIAL_URL}>
              {t('nav.trial')} <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
            <Link className="btn btn-secondary" to="/product/siborg">
              {t('common.learnMore')} about SiBorg <ArrowRight size={14} style={{ verticalAlign: 'middle' }} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
