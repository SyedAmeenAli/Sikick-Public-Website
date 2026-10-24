import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSeo } from '../lib/seo';
import { QUOTE_ENDPOINT, trialUrlWithPlan } from '../config/site';

type BusinessCategory = 'Retail' | 'Wholesale' | 'Distributors' | 'Manufacturers' | 'Other';

const CATEGORIES: { id: BusinessCategory; title: string; body: string }[] = [
  { id: 'Retail', title: 'Retail', body: 'Shops and chains selling over the counter.' },
  { id: 'Wholesale', title: 'Wholesale', body: 'Bulk selling, price lists and customer credit.' },
  { id: 'Distributors', title: 'Distributors', body: 'Stockists moving goods between suppliers and retailers.' },
  { id: 'Manufacturers', title: 'Manufacturers', body: 'Raw materials in, finished goods out.' },
  { id: 'Other', title: 'Other inventory-heavy', body: 'Service, repair, hospitality and everything else.' },
];

const CAPABILITIES = [
  { id: 'inventory', label: 'Inventory tracking', body: 'Stock quantities, adjustments and counts.' },
  { id: 'pos', label: 'POS and selling', body: 'Till checkout, orders and returns.' },
  { id: 'purchasing', label: 'Purchasing', body: 'Purchase orders and supplier records.' },
  { id: 'gst', label: 'GST toolkit', body: 'GST-ready invoices and tax summaries.' },
  { id: 'warehouses', label: 'Multiple locations', body: 'Transfers between supported locations.' },
  { id: 'analytics', label: 'Analytics and reports', body: 'Dashboards, trends and forecasts.' },
  { id: 'manufacturing', label: 'Manufacturing needs', body: 'BOM and production requirements.' },
  { id: 'ai', label: 'AI insights', body: 'SiBorg recommendations and insights.' },
  { id: 'fulfilment', label: 'Order fulfilment', body: 'Partial fulfilment and tracking.' },
];

type Answers = {
  category: BusinessCategory | null;
  capabilities: string[];
  shops: number;
  staff: number;
  batches: boolean;
  manufacturing: boolean;
};

const initialAnswers: Answers = {
  category: null,
  capabilities: [],
  shops: 1,
  staff: 5,
  batches: false,
  manufacturing: false,
};

function recommend(answers: Answers): { plan: 'Core' | 'AI' | 'Enterprise'; reason: string; alternatives: { name: string; note: string }[] } {
  const caps = answers.capabilities;
  const needsAi =
    caps.includes('gst') ||
    caps.includes('warehouses') ||
    caps.includes('analytics') ||
    caps.includes('ai') ||
    caps.includes('fulfilment') ||
    answers.batches;
  const needsEnterprise =
    caps.includes('manufacturing') ||
    answers.manufacturing ||
    answers.shops > 3 ||
    answers.staff > 25;

  if (needsEnterprise) {
    return {
      plan: 'Enterprise',
      reason:
        'Your selections include manufacturing or complex scale that is scoped through Enterprise consultation. A tailored quote is the right next step.',
      alternatives: [
        { name: 'AI', note: 'Lower cost — covers intelligence and standard multi-location workflows if manufacturing is deferred.' },
        { name: 'Core', note: 'Everyday operations only, without advanced modules or SiBorg.' },
      ],
    };
  }
  if (needsAi) {
    return {
      plan: 'AI',
      reason:
        'You need advanced standard workflows (GST, multi-location, analytics or SiBorg) on top of the Core foundation.',
      alternatives: [
        { name: 'Core', note: 'Lower cost — everyday operations without GST toolkit, batch tracking or SiBorg.' },
        { name: 'Enterprise', note: 'Higher capability — governance, custom workflows and integrations.' },
      ],
    };
  }
  return {
    plan: 'Core',
    reason: 'Your selections fit the everyday operational foundation: catalog, stock, purchasing and POS.',
    alternatives: [
      { name: 'AI', note: 'Higher capability — adds GST, batch tracking, analytics and SiBorg.' },
      { name: 'Enterprise', note: 'Higher capability — governance, custom workflows and integrations.' },
    ],
  };
}

export default function SetupPage() {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [assistantLog, setAssistantLog] = useState<{ role: 'bot' | 'user'; text: string }[]>([
    { role: 'bot', text: 'Tell me about your business in a sentence or two. I will refine the recommendation as we go.' },
  ]);
  const [assistantInput, setAssistantInput] = useState('');
  useSeo({ title: 'Design your setup — Sikick', description: 'Business setup configurator with a recommended plan and downloadable blueprint.', path: '/setup' });

  const rec = recommend(answers);
  const price = rec.plan === 'Core' ? '₹650 / month' : rec.plan === 'AI' ? '₹2,550 / month' : 'Custom quote';

  const toggleCapability = (id: string) => {
    setAnswers((prev) => ({
      ...prev,
      capabilities: prev.capabilities.includes(id)
        ? prev.capabilities.filter((item) => item !== id)
        : [...prev.capabilities, id],
      manufacturing: id === 'manufacturing' ? true : prev.manufacturing,
      batches: id === 'gst' ? prev.batches : prev.batches,
    }));
  };

  const askAssistant = () => {
    const text = assistantInput.trim();
    if (!text) return;
    setAssistantLog((log) => [...log, { role: 'user', text }]);
    const lower = text.toLowerCase();
    const updates: Partial<Answers> = {};
    if (lower.includes('gst')) updates.capabilities = Array.from(new Set([...answers.capabilities, 'gst']));
    if (lower.includes('batch') || lower.includes('expiry')) {
      updates.capabilities = Array.from(new Set([...(updates.capabilities ?? answers.capabilities), 'warehouses']));
      updates.batches = true;
    }
    if (lower.includes('multi') || lower.includes('location') || lower.includes('warehouse')) {
      updates.capabilities = Array.from(new Set([...(updates.capabilities ?? answers.capabilities), 'warehouses']));
    }
    if (lower.includes('manufactur')) {
      updates.capabilities = Array.from(new Set([...(updates.capabilities ?? answers.capabilities), 'manufacturing']));
      updates.manufacturing = true;
    }
    if (lower.includes('ai') || lower.includes('insight')) {
      updates.capabilities = Array.from(new Set([...(updates.capabilities ?? answers.capabilities), 'ai']));
    }
    setAnswers((prev) => ({ ...prev, ...updates }));
    setAssistantLog((log) => [
      ...log,
      {
        role: 'bot',
        text:
          Object.keys(updates).length > 0
            ? 'Updated your selections. The recommendation and blueprint have been refreshed.'
            : 'Noted. The recommendation stays the same for now — try mentioning GST, batches, multiple locations, manufacturing or AI insights.',
      },
    ]);
    setAssistantInput('');
  };

  const printBlueprint = () => {
    window.print();
  };

  const emailBlueprint = async () => {
    const email = window.prompt('Enter the email address to send the blueprint to:');
    if (!email) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      window.alert('Enter a valid email address.');
      return;
    }
    if (!QUOTE_ENDPOINT && !import.meta.env.VITE_SIKICK_EMAIL_ENDPOINT) {
      window.alert('Email delivery is not configured. Set VITE_SIKICK_EMAIL_ENDPOINT to enable it — nothing was sent.');
      return;
    }
    try {
      await fetch(import.meta.env.VITE_SIKICK_EMAIL_ENDPOINT as string, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consent: true, blueprint: answers }),
      });
      window.alert('Blueprint sent.');
    } catch {
      window.alert('Email delivery failed. Nothing was sent.');
    }
  };

  const steps = [t('config.step.business'), t('config.step.needs'), t('config.step.details'), t('config.step.blueprint')];

  return (
    <div>
      <section className="section">
        <div className="container">
          <p className="eyebrow">{t('config.title')}</p>
          <h1>{t('config.title')}</h1>
          <p className="section-lede">
            Pick a business type, choose what you need, answer a few details, and get a recommended plan with a downloadable blueprint.
          </p>
        </div>
      </section>
      <section className="section section-blush" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="config-progress" role="tablist" aria-label="Configurator steps">
            {steps.map((label, index) => (
              <button
                key={label}
                type="button"
                className="step-dot"
                data-state={index === step ? 'current' : index < step ? 'done' : 'upcoming'}
                aria-current={index === step}
                onClick={() => setStep(index)}
                title={label}
              />
            ))}
          </div>

          {step === 0 && (
            <div>
              <h2>{t('config.step.business')}</h2>
              <div className="choice-grid">
                {CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    className="choice-card"
                    aria-pressed={answers.category === category.id}
                    onClick={() => setAnswers((prev) => ({ ...prev, category: category.id }))}
                  >
                    <span className="choice-icon" aria-hidden="true">●</span>
                    <span>
                      <strong>{category.title}</strong>
                      <span>{category.body}</span>
                    </span>
                    <span className="choice-check" aria-hidden="true">✓</span>
                  </button>
                ))}
              </div>
              <div style={{ marginTop: 'var(--space-24)', display: 'flex', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-primary" onClick={() => setStep(1)} disabled={!answers.category}>
                  {t('config.next')}
                </button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2>{t('config.step.needs')}</h2>
              <div className="choice-grid cols-3">
                {CAPABILITIES.map((capability) => (
                  <button
                    key={capability.id}
                    type="button"
                    className="choice-card"
                    aria-pressed={answers.capabilities.includes(capability.id)}
                    onClick={() => toggleCapability(capability.id)}
                  >
                    <span className="choice-icon" aria-hidden="true">●</span>
                    <span>
                      <strong>{capability.label}</strong>
                      <span>{capability.body}</span>
                    </span>
                    <span className="choice-check" aria-hidden="true">✓</span>
                  </button>
                ))}
              </div>
              <div style={{ marginTop: 'var(--space-24)', display: 'flex', justifyContent: 'space-between' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setStep(0)}>
                  {t('config.back')}
                </button>
                <button type="button" className="btn btn-primary" onClick={() => setStep(2)}>
                  {t('config.next')}
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2>{t('config.step.details')}</h2>
              <div className="field">
                <label htmlFor="shops">{t('form.shops')}</label>
                <input
                  id="shops"
                  type="number"
                  min={1}
                  value={answers.shops}
                  onChange={(event) => setAnswers((prev) => ({ ...prev, shops: Math.max(1, Number(event.target.value) || 1) }))}
                />
              </div>
              <div className="field">
                <label htmlFor="staff">Staff who will use it</label>
                <input
                  id="staff"
                  type="number"
                  min={1}
                  value={answers.staff}
                  onChange={(event) => setAnswers((prev) => ({ ...prev, staff: Math.max(1, Number(event.target.value) || 1) }))}
                />
              </div>
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={answers.batches}
                  onChange={(event) => setAnswers((prev) => ({ ...prev, batches: event.target.checked }))}
                />
                <span>My products carry batch or expiry dates.</span>
              </label>
              <div style={{ marginTop: 'var(--space-24)', display: 'flex', justifyContent: 'space-between' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>
                  {t('config.back')}
                </button>
                <button type="button" className="btn btn-primary" onClick={() => setStep(3)}>
                  {t('config.next')}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="blueprint">
              <div className="blueprint-head">
                <div>
                  <img src="/brand/sikick-logo-light.svg" alt="Sikick" width="150" height="60" />
                  <div style={{ marginTop: 'var(--space-8)', opacity: 0.8, fontSize: '0.9rem' }}>Setup blueprint</div>
                </div>
                <span className="plan-badge">{rec.plan} · {price}</span>
              </div>
              <div className="blueprint-body">
                <div>
                  <h3>Why this fits</h3>
                  <p>{rec.reason}</p>
                </div>
                <div className="blueprint-kv">
                  <div className="kv">
                    <div className="k">Business type</div>
                    <div className="v">{answers.category}</div>
                  </div>
                  <div className="kv">
                    <div className="k">Recommended plan</div>
                    <div className="v">{rec.plan}</div>
                  </div>
                  <div className="kv">
                    <div className="k">Shops (each separately subscribed)</div>
                    <div className="v">{answers.shops}</div>
                  </div>
                  <div className="kv">
                    <div className="k">Staff</div>
                    <div className="v">{answers.staff}</div>
                  </div>
                  <div className="kv">
                    <div className="k">Batch / expiry</div>
                    <div className="v">{answers.batches ? 'Yes' : 'No'}</div>
                  </div>
                  <div className="kv">
                    <div className="k">Selected modules</div>
                    <div className="v">{answers.capabilities.length}</div>
                  </div>
                </div>
                <div>
                  <h3>Selected capabilities</h3>
                  <ul className="check-list">
                    {answers.capabilities.map((id) => {
                      const capability = CAPABILITIES.find((item) => item.id === id);
                      return <li key={id}>{capability?.label ?? id}</li>;
                    })}
                    {answers.capabilities.length === 0 && <li>Core operational foundation</li>}
                  </ul>
                </div>
                <div>
                  <h3>Closest alternatives</h3>
                  <div className="grid grid-2">
                    {rec.alternatives.map((alternative) => (
                      <div key={alternative.name} className="alt-plan">
                        <strong>{alternative.name}</strong>
                        <span className="text-small text-muted">{alternative.note}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {rec.plan === 'Enterprise' && (
                  <div className="notice">
                    Manufacturing and complex workflows are gathered through Enterprise consultation. The full manufacturing workflow is confirmed with Sikick before availability is promised.
                  </div>
                )}
                <div className="config-assistant">
                  <div className="config-assistant-log">
                    {assistantLog.map((message, index) => (
                      <div key={index} className={`assistant-msg ${message.role}`}>
                        {message.text}
                      </div>
                    ))}
                  </div>
                  <div className="assistant-options">
                    <input
                      type="text"
                      placeholder="Refine: e.g. I need GST and batch tracking"
                      value={assistantInput}
                      onChange={(event) => setAssistantInput(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') askAssistant();
                      }}
                      aria-label="Refine setup with the assistant"
                    />
                    <button type="button" className="btn btn-primary btn-sm" onClick={askAssistant}>
                      Send
                    </button>
                  </div>
                  <p className="assistant-note">{t('config.assistantNote')}</p>
                </div>
                <div className="no-print" style={{ display: 'flex', gap: 'var(--space-12)', flexWrap: 'wrap' }}>
                  <button type="button" className="btn btn-primary" onClick={printBlueprint}>
                    {t('config.download')}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={emailBlueprint}>
                    {t('config.email')}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => setStep(0)}>
                    {t('config.editAnswers')}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => { setAnswers(initialAnswers); setStep(0); }}>
                    {t('config.restart')}
                  </button>
                  {rec.plan !== 'Enterprise' ? (
                    <a className="btn btn-primary" href={trialUrlWithPlan(rec.plan)}>
                      Start a 14-day trial
                    </a>
                  ) : (
                    <Link className="btn btn-primary" to="/request-quote">
                      Request a tailored quote
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
