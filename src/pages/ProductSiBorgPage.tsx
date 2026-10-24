import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check, ArrowRight, MessageSquareText, Lightbulb, FileCheck, ShieldCheck, Eye, Sparkles } from 'lucide-react';
import { useSeo } from '../lib/seo';
import { SIKICK_TRIAL_URL } from '../config/site';
import { FaqAccordion } from '../components/FaqAccordion';

const lifecycle = [
  { step: 'Detect', desc: 'Spot patterns in sales, stock and purchasing data.' },
  { step: 'Explain', desc: 'Describe what was found and the evidence behind it.' },
  { step: 'Recommend', desc: 'Suggest one or more sensible responses.' },
  { step: 'Propose', desc: 'Prepare a reviewable action or draft document.' },
  { step: 'Approve', desc: 'A person reviews and decides.' },
  { step: 'Execute', desc: 'Apply the approved change to the system.' },
  { step: 'Verify', desc: 'Confirm the outcome and surface any issues.' },
];

const features = [
  {
    icon: MessageSquareText,
    title: 'Explain',
    body: 'Ask SiBorg why stock is moving a certain way or what a report means. It answers in plain language and points to the underlying records.',
  },
  {
    icon: Lightbulb,
    title: 'Recommend',
    body: 'SiBorg recommends responses such as reordering, returning slow stock or running a promotion, based on your own data.',
  },
  {
    icon: FileCheck,
    title: 'Prepare reviewable actions',
    body: 'Instead of making changes directly, SiBorg drafts purchase orders, adjustment notes or proposals for a human to review and approve.',
  },
  {
    icon: Eye,
    title: 'Show evidence and coverage',
    body: 'Every suggestion includes the calculation, data coverage and confidence. When data is thin, SiBorg falls back to configured rules and explains the gap.',
  },
  {
    icon: ShieldCheck,
    title: 'Human approval required',
    body: 'Consequential business changes — purchase orders, stock adjustments, price changes — require a person to approve before execution.',
  },
  {
    icon: Sparkles,
    title: 'Built into daily workflows',
    body: 'SiBorg appears where decisions happen: low-stock alerts, slow-stock reports, reorder screens and dashboards. It reduces busywork without removing oversight.',
  },
];

const faqs = [
  {
    question: 'Can SiBorg make changes without my approval?',
    answer: 'No. Automatic execution mode is not built. SiBorg prepares drafts and reviewable actions; a person must approve them before anything is executed.',
  },
  {
    question: 'What kinds of actions can SiBorg prepare?',
    answer: 'Examples include purchase-order drafts based on reorder suggestions, return proposals for slow stock, adjustment notes after a stocktake and commentary on report trends.',
  },
  {
    question: 'How does SiBorg handle missing or thin data?',
    answer: 'It shows data coverage and confidence for each recommendation. When inputs are missing, it falls back to rules you configure and explains what would strengthen the suggestion.',
  },
  {
    question: 'Which plans include SiBorg?',
    answer: 'SiBorg is part of the AI plan. The Core plan includes standard reports and manual workflows without AI-generated suggestions.',
  },
];

export default function ProductSiBorgPage() {
  const { t } = useTranslation();
  useSeo({
    title: 'SiBorg intelligence — Sikick',
    description: 'Explain performance, get recommendations and prepare reviewable actions — with human approval required for consequential changes.',
    path: '/product/siborg',
  });

  return (
    <div>
      <section className="section">
        <div className="container">
          <p className="eyebrow">SiBorg</p>
          <h1>Intelligence that prepares work — and waits for you.</h1>
          <p className="section-lede">
            SiBorg explains what is happening in your business, recommends responses and prepares reviewable actions. Consequential changes always need a person to say yes.
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
              <h2>Governed by design, not by accident</h2>
              <p>
                SiBorg is not an autopilot. It is a co-pilot that does the reading, arithmetic and drafting so your team can focus on decisions. When it spots a low-stock trend, it drafts a purchase order with quantities that account for sales velocity, lead time and stock already in transit. When it sees slow movers, it prepares return or discount proposals.
              </p>
              <p>
                Every prepared action shows its reasoning and data coverage. If the recommendation is weak because data is thin, SiBorg says so. Before anything consequential is applied, a person reviews and approves it. This keeps the speed of automation without the risk of silent changes.
              </p>
              <ul className="check-list" style={{ marginTop: 'var(--space-24)' }}>
                <li><Check size={18} /> Explains reports and trends in plain language.</li>
                <li><Check size={18} /> Recommends actions based on your own data.</li>
                <li><Check size={18} /> Prepares drafts for human review and approval.</li>
                <li><Check size={18} /> Surfaces evidence, coverage and confidence.</li>
              </ul>
            </div>
            <div className="ui-frame ui-siborg">
              <div className="ui-chrome">
                <span className="ui-chrome-dot" />
                <span className="ui-chrome-dot" />
                <span className="ui-chrome-dot" />
                <span className="ui-chrome-url">sikick · siborg</span>
                <span className="ui-demo-tag">Sample data</span>
              </div>
              <div className="ui-body">
                <div className="ui-panel ui-siborg">
                  <div className="ui-panel-title">
                    <Sparkles size={14} /> Recommended action
                  </div>
                  <div className="ui-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '6px' }}>
                    <span className="ui-name">Reorder wireless earbuds — Black</span>
                    <span style={{ color: 'rgb(233 222 226 / 0.55)', fontSize: '0.7rem' }}>Suggested quantity: 60 units · Coverage: 87% · Confidence: medium</span>
                  </div>
                  <div className="ui-row" style={{ marginTop: '8px' }}>
                    <button className="ui-approve-btn">Review draft PO</button>
                    <button className="ui-ghost-btn">Explain</button>
                  </div>
                </div>
                <div className="ui-panel">
                  <div className="ui-panel-title">Reasoning</div>
                  <div className="ui-row">
                    <span className="ui-name">Current stock</span>
                    <span className="ui-qty">89 units</span>
                  </div>
                  <div className="ui-row">
                    <span className="ui-name">Avg. weekly sales</span>
                    <span className="ui-qty">21 units</span>
                  </div>
                  <div className="ui-row">
                    <span className="ui-name">Supplier lead time</span>
                    <span className="ui-qty">14 days</span>
                  </div>
                  <div className="ui-row">
                    <span className="ui-name">MOQ</span>
                    <span className="ui-qty">60 units</span>
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
            <p className="eyebrow">Governed lifecycle</p>
            <h2>Detect → Explain → Recommend → Propose → Approve → Execute → Verify</h2>
          </div>
          <div className="grid grid-3">
            {lifecycle.map((item) => (
              <div key={item.step} className="card">
                <h3>{item.step}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-blush">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Capabilities</p>
            <h2>What SiBorg does</h2>
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

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">FAQ</p>
            <h2>Questions about SiBorg</h2>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <section className="section section-dark">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ maxWidth: '42rem', margin: '0 auto var(--space-16)' }}>Let SiBorg do the drafting. You keep the decision.</h2>
          <p className="section-lede" style={{ margin: '0 auto var(--space-32)', color: 'var(--on-dark-muted)' }}>
            Try the AI plan and see how reviewable actions work for reordering, slow-stock clearance and report explanations.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-12)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a className="btn btn-light" href={SIKICK_TRIAL_URL}>
              {t('nav.trial')} <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
            <Link className="btn btn-ghost" to="/setup" style={{ color: 'var(--on-dark-text)' }}>
              {t('cta.final.configurator')} <ArrowRight size={14} style={{ verticalAlign: 'middle' }} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
