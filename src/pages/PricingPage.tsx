import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check, X } from 'lucide-react';
import { useSeo } from '../lib/seo';
import { trialUrlWithPlan } from '../config/site';

type PlanId = 'core' | 'ai' | 'enterprise';

type Plan = {
  id: PlanId;
  tier: string;
  role: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  cta: string;
  destination: string;
  tint: string;
};

const plans: Plan[] = [
  {
    id: 'core',
    tier: 'Core',
    role: 'Everyday operations',
    monthlyPrice: 650,
    annualPrice: 6500,
    description: 'A practical foundation for catalog, stock, purchasing, POS, customers and reports.',
    features: [
      'Product catalog, variants, SKUs and barcodes',
      'Standard inventory quantities and visibility',
      'Purchase orders and supplier records',
      'POS, quotations, customers and returns',
      'Manual stock counts and adjustments',
      'Export financial reports and GST returns',
    ],
    cta: 'Start a 14-day trial',
    destination: trialUrlWithPlan('Core'),
    tint: 'rose',
  },
  {
    id: 'ai',
    tier: 'AI',
    role: 'Operations + intelligence',
    monthlyPrice: 2550,
    annualPrice: 25500,
    description: 'Adds GST, batch tracking, analytics, transfers and SiBorg guidance to Core.',
    features: [
      'Everything in Core',
      'GST-ready invoices, calculations and reports',
      'Expense management with receipts',
      'Batch and lot tracking with expiry alerts',
      'Guided stocktakes, transfers and cycle counting',
      'Interactive dashboards and SiBorg recommendations',
    ],
    cta: 'Start a 14-day trial',
    destination: trialUrlWithPlan('AI'),
    tint: 'lilac',
  },
  {
    id: 'enterprise',
    tier: 'Enterprise',
    role: 'Governance & customization',
    monthlyPrice: 0,
    annualPrice: 0,
    description: 'For custom workflows, integrations, advanced accounting and tailored requirements.',
    features: [
      'Everything in AI',
      'Custom roles, permissions and approval chains',
      'Custom workflows, automation and rules',
      'Advanced APIs, integrations and higher limits',
      'Advanced accounting and multi-entity controls',
      'Dedicated support and onboarding',
    ],
    cta: 'Request a quote',
    destination: '/request-quote',
    tint: 'champagne',
  },
];

function formatPrice(value: number): string {
  return value.toLocaleString('en-IN');
}

function displayPrice(plan: Plan, annual: boolean): string {
  if (plan.id === 'enterprise') return 'Custom quote';
  if (annual) return `₹${formatPrice(plan.annualPrice)}/year`;
  return `₹${formatPrice(plan.monthlyPrice)}/month`;
}

function displayCadence(plan: Plan, annual: boolean): string {
  if (plan.id === 'enterprise') return 'Tailored to your requirements';
  if (annual) return 'Billed annually';
  return 'Billed monthly';
}

function savings(plan: Plan): string | null {
  if (plan.id === 'enterprise') return null;
  const saved = plan.monthlyPrice * 12 - plan.annualPrice;
  return `Save ₹${formatPrice(saved)} vs monthly`;
}

export default function PricingPage() {
  useTranslation();
  const [selected, setSelected] = useState<PlanId>('ai');
  const [annual, setAnnual] = useState(false);
  useSeo({
    title: 'Pricing — Sikick',
    description: 'Core, AI and Enterprise plans. Base subscription prices exclude applicable GST.',
    path: '/pricing',
  });

  const selectPlan = (id: PlanId) => setSelected(id);

  return (
    <div className="pricing-page-v2">
      <section className="section pricing-hero">
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="eyebrow" style={{ justifyContent: 'center' }}>Plans</p>
          <h1 className="pricing-title">
            A plan that fits the way you work.
          </h1>
          <p className="section-lede" style={{ margin: '0 auto var(--space-32)' }}>
            Core is the everyday operational foundation. AI adds SiBorg intelligence and advanced workflows. Enterprise is tailored.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="pricing-canvas">
            <div className="pricing-canvas-head">
              <div className="billing-toggle" role="group" aria-label="Billing period">
                <button type="button" aria-pressed={!annual} onClick={() => setAnnual(false)}>
                  Monthly
                </button>
                <button type="button" aria-pressed={annual} onClick={() => setAnnual(true)}>
                  Annual
                </button>
              </div>
              <p className="price-note" style={{ margin: 'var(--space-16) 0 0' }}>
                Base subscription prices exclude applicable GST; tax is calculated and itemized at checkout.
              </p>
            </div>

            {/* Desktop selector */}
            <div className="pricing-selector-desktop">
              {plans.map((plan) => {
                const isSelected = selected === plan.id;
                return (
                  <div
                    key={plan.id}
                    className={`pricing-plan-v2 ${isSelected ? 'is-selected' : 'is-compact'} tint-${plan.tint}`}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected}
                    onClick={() => selectPlan(plan.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        selectPlan(plan.id);
                      }
                    }}
                  >
                    <div className="pricing-plan-header">
                      <span className="pricing-tier">{plan.tier}</span>
                      <div className="pricing-price-v2">{displayPrice(plan, annual)}</div>
                      <div className="pricing-cadence-v2">{displayCadence(plan, annual)}</div>
                      {annual && savings(plan) && (
                        <div className="price-savings-v2">{savings(plan)}</div>
                      )}
                    </div>

                    <div className="pricing-plan-body">
                      <p className="pricing-plan-desc">{plan.description}</p>
                      <ul className="pricing-features-v2">
                        {plan.features.map((feature) => (
                          <li key={feature}>
                            <Check size={16} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      {plan.id === 'enterprise' ? (
                        <Link className="btn btn-primary" to={plan.destination}>
                          {plan.cta}
                        </Link>
                      ) : (
                        <a className="btn btn-primary" href={plan.destination}>
                          {plan.cta}
                        </a>
                      )}
                      <p className="price-note" style={{ marginTop: 'var(--space-12)' }}>
                        {plan.id === 'enterprise' ? 'Enterprise quote journey · no standard trial' : '14-day trial · no payment method required'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile accordion */}
            <div className="pricing-mobile">
              {plans.map((plan) => (
                <details key={plan.id} className={`pricing-mobile-plan tint-${plan.tint}`} open={selected === plan.id}>
                  <summary onClick={() => selectPlan(plan.id)}>
                    <span>
                      <strong>{plan.tier}</strong>
                      <span className="pricing-mobile-price">{displayPrice(plan, annual)}</span>
                    </span>
                    <span className="pricing-mobile-chevron" aria-hidden="true">▾</span>
                  </summary>
                  <div className="pricing-mobile-body">
                    <p>{plan.description}</p>
                    <ul className="pricing-features-v2">
                      {plan.features.map((feature) => (
                        <li key={feature}>
                          <Check size={16} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {plan.id === 'enterprise' ? (
                      <Link className="btn btn-primary" to={plan.destination}>
                        {plan.cta}
                      </Link>
                    ) : (
                      <a className="btn btn-primary" href={plan.destination}>
                        {plan.cta}
                      </a>
                    )}
                    <p className="price-note" style={{ marginTop: 'var(--space-12)' }}>
                      {plan.id === 'enterprise' ? 'Enterprise quote journey · no standard trial' : '14-day trial · no payment method required'}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-blush">
        <div className="container">
          <h2>Plan comparison</h2>
          <div className="table-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Capability</th>
                  <th>Core</th>
                  <th>AI</th>
                  <th>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="group-row"><td colSpan={4}>Inventory</td></tr>
                <CompareRow feature="Product variants, SKUs, barcodes" core ai enterprise />
                <CompareRow feature="Standard stock quantities" core ai enterprise />
                <CompareRow feature="Batch and expiry tracking" ai enterprise />
                <CompareRow feature="Guided stocktakes" ai enterprise />
                <CompareRow feature="Transfers between locations" ai enterprise />

                <tr className="group-row"><td colSpan={4}>Sales and POS</td></tr>
                <CompareRow feature="POS, orders, quotations, customers" core ai enterprise />
                <CompareRow feature="Standard returns and refunds" core ai enterprise />

                <tr className="group-row"><td colSpan={4}>Purchasing</td></tr>
                <CompareRow feature="Purchase orders and suppliers" core ai enterprise />
                <CompareRow feature="Supplier payments and returns" core ai enterprise />

                <tr className="group-row"><td colSpan={4}>GST and expenses</td></tr>
                <CompareRow feature="GST toolkit" ai enterprise />
                <CompareRow feature="Expense management" ai enterprise />

                <tr className="group-row"><td colSpan={4}>Analytics and SiBorg</td></tr>
                <CompareRow feature="Standard reports" core ai enterprise />
                <CompareRow feature="Interactive dashboards" ai enterprise />
                <CompareRow feature="SiBorg intelligence" ai enterprise />

                <tr className="group-row"><td colSpan={4}>Team, permissions and support</td></tr>
                <CompareRow feature="Predefined staff roles" core ai enterprise />
                <CompareRow feature="Custom roles and permissions" enterprise />
                <CompareRow feature="Custom workflows and rules" enterprise />
                <CompareRow feature="Advanced APIs and integrations" enterprise />
                <CompareRow feature="Dedicated support and onboarding" enterprise />
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '44rem' }}>
          <h2>Billing and plan questions</h2>
          <div className="accordion">
            <details className="accordion-item">
              <summary className="accordion-trigger">Are prices shown with GST?</summary>
              <div className="accordion-panel" style={{ maxHeight: 'none' }}>
                <div className="accordion-panel-inner">No. Base subscription prices exclude applicable GST; tax is calculated at checkout and itemized on the invoice.</div>
              </div>
            </details>
            <details className="accordion-item">
              <summary className="accordion-trigger">Is there a free trial?</summary>
              <div className="accordion-panel" style={{ maxHeight: 'none' }}>
                <div className="accordion-panel-inner">Core and AI offer a 14-day free trial with no payment method required.</div>
              </div>
            </details>
            <details className="accordion-item">
              <summary className="accordion-trigger">Can annual billing be selected?</summary>
              <div className="accordion-panel" style={{ maxHeight: 'none' }}>
                <div className="accordion-panel-inner">Yes. Annual billing is available; annual prices are confirmed before checkout. Enterprise can discuss annual billing during the quote process.</div>
              </div>
            </details>
            <details className="accordion-item">
              <summary className="accordion-trigger">What happens when I upgrade or downgrade?</summary>
              <div className="accordion-panel" style={{ maxHeight: 'none' }}>
                <div className="accordion-panel-inner">Plan changes take effect at the next billing cycle. Your data and settings remain available in read-only form if a feature is no longer included.</div>
              </div>
            </details>
            <details className="accordion-item">
              <summary className="accordion-trigger">Can I move my existing data into Sikick?</summary>
              <div className="accordion-panel" style={{ maxHeight: 'none' }}>
                <div className="accordion-panel-inner">Yes, from Excel, CSV or Tally XML, up to 5,000 rows per file, checked before anything is written. Your plan’s product limit is checked before you apply an import. <Link to="/switch-to-sikick">Check your import options</Link>.</div>
              </div>
            </details>
            <details className="accordion-item">
              <summary className="accordion-trigger">Can I export my data?</summary>
              <div className="accordion-panel" style={{ maxHeight: 'none' }}>
                <div className="accordion-panel-inner">The console exports financial reports (trial balance, profit and loss, balance sheet, cash flow), GST returns, the audit log and cashier activity as CSV, and GST returns as JSON too. A one-click export of products, stock, customers and transactions is not available yet; ask for an assisted export on the data migration page.</div>
              </div>
            </details>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ maxWidth: '40rem', margin: '0 auto var(--space-16)' }}>See your stock clearly.</h2>
          <p className="section-lede" style={{ margin: '0 auto var(--space-32)', color: 'var(--on-dark-muted)' }}>
            Start a 14-day trial of Core or AI, or configure an Enterprise quote.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-12)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a className="btn btn-light" href={trialUrlWithPlan('AI')}>Start a 14-day trial</a>
            <Link className="btn btn-ghost" to="/setup" style={{ color: 'var(--on-dark-text)' }}>Design my setup</Link>
          </div>
        </div>
      </section>

      <style>{`
        .pricing-page-v2 { background: var(--paper); }
        .pricing-hero { padding-bottom: 0; }
        .pricing-title { font-size: clamp(2.2rem, 1.6rem + 3vw, 3.4rem); max-width: 44rem; margin: 0 auto var(--space-16); }
        .pricing-canvas {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: var(--space-32);
          box-shadow: var(--shadow-md);
        }
        .pricing-canvas-head { text-align: center; margin-bottom: var(--space-32); }
        .price-savings-v2 { color: var(--sikick-success); font-size: 0.82rem; font-weight: 600; margin-top: 6px; }
        .pricing-features-v2 { list-style: none; padding: 0; margin: var(--space-20) 0; display: grid; gap: 10px; font-size: 0.9rem; }
        .pricing-features-v2 li { display: flex; gap: 10px; align-items: flex-start; color: var(--text); }
        .pricing-features-v2 li svg { flex-shrink: 0; margin-top: 3px; color: var(--accent); }

        /* Desktop selector */
        .pricing-selector-desktop { display: none; gap: var(--space-16); align-items: stretch; }
        .pricing-plan-v2 {
          border: 1.5px solid var(--border);
          border-radius: var(--radius-lg);
          background: var(--surface);
          cursor: pointer;
          overflow: hidden;
          transition: flex var(--dur-panel) var(--ease-out), border-color var(--dur-panel) var(--ease-out), box-shadow var(--dur-panel) var(--ease-out);
          display: flex;
          flex-direction: column;
        }
        .pricing-plan-v2:hover { border-color: var(--mauve, #b45c7a); }
        .pricing-plan-v2.is-selected { flex: 2; border-color: var(--accent); box-shadow: 0 18px 48px -20px rgb(139 21 56 / 0.28); }
        .pricing-plan-v2.is-compact { flex: 1; }
        .pricing-plan-v2.is-compact .pricing-plan-body { display: none; }
        .pricing-plan-v2.is-compact .pricing-plan-header { padding: var(--space-24) var(--space-16); text-align: center; height: 100%; display: grid; align-content: center; gap: var(--space-8); }
        .pricing-plan-v2.is-compact .pricing-tier { margin: 0 auto; }
        .pricing-plan-v2.is-compact .pricing-cadence-v2 { display: none; }
        .pricing-plan-v2.is-compact .pricing-price-v2 { font-size: 1.55rem; }
        .pricing-plan-header { padding: var(--space-24) var(--space-24) 0; }
        .pricing-tier { font-size: 0.75rem; font-weight: 700; color: var(--accent); letter-spacing: 0.08em; text-transform: uppercase; display: inline-block; margin-bottom: var(--space-12); }
        .pricing-price-v2 { font-size: 2.2rem; font-weight: 700; line-height: 1.1; letter-spacing: -0.02em; }
        .pricing-cadence-v2 { font-size: 0.85rem; color: var(--text-muted); margin-top: 4px; }
        .pricing-plan-body { padding: var(--space-20) var(--space-24) var(--space-24); border-top: 1px solid var(--border); margin-top: var(--space-20); flex: 1; display: flex; flex-direction: column; }
        .pricing-plan-desc { color: var(--text-muted); font-size: 0.92rem; margin: 0 0 var(--space-12); }
        .pricing-plan-body .btn { margin-top: auto; align-self: flex-start; }
        .tint-rose .pricing-plan-header { background: linear-gradient(180deg, rgb(201 80 111 / 0.16) 0%, transparent 100%); }
        .tint-lilac .pricing-plan-header { background: linear-gradient(180deg, rgb(160 130 200 / 0.13) 0%, transparent 100%); }
        .tint-champagne .pricing-plan-header { background: linear-gradient(180deg, rgb(220 190 130 / 0.12) 0%, transparent 100%); }
        .tint-rose.is-compact .pricing-plan-header { background: rgb(201 80 111 / 0.16); }
        .tint-lilac.is-compact .pricing-plan-header { background: rgb(160 130 200 / 0.13); }
        .tint-champagne.is-compact .pricing-plan-header { background: rgb(220 190 130 / 0.12); }

        /* Mobile accordion */
        .pricing-mobile { display: grid; gap: var(--space-16); }
        .pricing-mobile-plan { border: 1.5px solid var(--border); border-radius: var(--radius-lg); background: var(--surface); overflow: hidden; }
        .pricing-mobile-plan summary { list-style: none; cursor: pointer; padding: var(--space-20); display: flex; justify-content: space-between; align-items: center; gap: var(--space-12); }
        .pricing-mobile-plan summary::-webkit-details-marker { display: none; }
        .pricing-mobile-plan summary strong { display: block; font-size: 1.1rem; }
        .pricing-mobile-plan summary span { display: block; }
        .pricing-mobile-price { color: var(--accent); font-weight: 700; font-size: 1.1rem; margin-top: 4px; }
        .pricing-mobile-chevron { color: var(--accent); transition: transform var(--dur-common) var(--ease-out); }
        .pricing-mobile-plan[open] .pricing-mobile-chevron { transform: rotate(180deg); }
        .pricing-mobile-body { padding: 0 var(--space-20) var(--space-20); border-top: 1px solid var(--border); }
        .pricing-mobile-body p { color: var(--text-muted); font-size: 0.92rem; margin: var(--space-16) 0; }
        .pricing-mobile-body .btn { margin-top: var(--space-16); width: 100%; }

        .tint-rose > summary { background: linear-gradient(90deg, rgb(201 80 111 / 0.16), transparent 70%); }
        .tint-lilac > summary { background: linear-gradient(90deg, rgb(160 130 200 / 0.13), transparent 70%); }
        .tint-champagne > summary { background: linear-gradient(90deg, rgb(220 190 130 / 0.12), transparent 70%); }

        @media (min-width: 900px) {
          .pricing-selector-desktop { display: flex; }
          .pricing-mobile { display: none; }
          .pricing-canvas { padding: var(--space-48); }
        }
        @media (max-width: 899px) {
          .pricing-canvas { padding: var(--space-24); }
        }
      `}</style>
    </div>
  );
}

function CompareRow({
  feature,
  core,
  ai,
  enterprise,
}: {
  feature: string;
  core?: boolean;
  ai?: boolean;
  enterprise?: boolean;
}) {
  const value = (included?: boolean) =>
    included ? (
      <Check size={16} style={{ color: 'var(--accent)', margin: '0 auto' }} />
    ) : (
      <X size={16} style={{ color: 'var(--border-strong)', margin: '0 auto' }} />
    );
  return (
    <tr>
      <td>{feature}</td>
      <td>{value(core)}</td>
      <td>{value(ai)}</td>
      <td>{value(enterprise)}</td>
    </tr>
  );
}
