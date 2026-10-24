import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Check } from 'lucide-react';
import { useSeo } from '../lib/seo';
import { SIKICK_TRIAL_URL } from '../config/site';

const sections = [
  { title: 'Inventory and catalog', body: 'Products, categories, variants, SKUs and barcodes with per-variant stock quantities. Import from spreadsheets with validation and confirmation.', to: '/product/inventory' },
  { title: 'POS and selling', body: 'Till checkout with cash, UPI and QR tenders, sales orders, quotations, customers and standard returns, exchanges and refunds.', to: '/product/pos' },
  { title: 'Purchasing and suppliers', body: 'Purchase orders, goods receiving, supplier records, supplier payments and purchase returns.', to: '/product/purchasing' },
  { title: 'Stock control', body: 'Manual adjustments and counts, guided stocktakes and cycle counting in the AI plan, transfers between supported locations, batch and expiry tracking.', to: '/product/stock-control' },
  { title: 'Reports and analytics', body: 'Sales, stock and purchase reports. Interactive dashboards, trends, comparisons and forecasts in the AI plan.', to: '/product/reports' },
  { title: 'SiBorg intelligence', body: 'Explain, recommend and prepare reviewable actions. Consequential business changes require human approval.', to: '/product/siborg' },
];

export default function ProductOverviewPage() {
  const { t } = useTranslation();
  useSeo({ title: 'Sikick platform — inventory, sales and operations', description: 'How catalog, stock, purchasing, sales and insights connect in one Sikick system.', path: '/product' });
  return (
    <div>
      <section className="section">
        <div className="container">
          <p className="eyebrow">Platform overview</p>
          <h1>One connected system for stock, sales and purchasing.</h1>
          <p className="section-lede">
            Sikick keeps product catalog, stock, purchasing, sales and reporting on the same truth, so a change in one place is visible everywhere.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-12)', flexWrap: 'wrap', marginTop: 'var(--space-24)' }}>
            <a className="btn btn-primary" href={SIKICK_TRIAL_URL}>
              {t('nav.trial')} <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
            <Link className="btn btn-secondary" to="/product/inventory">{t('common.explore')}</Link>
          </div>
        </div>
      </section>
      <section className="section section-blush">
        <div className="container">
          <div className="grid grid-3">
            {sections.map((section) => (
              <Link key={section.title} to={section.to} className="card card-hover">
                <h3>{section.title}</h3>
                <p>{section.body}</p>
                <span style={{ marginTop: 'var(--space-12)', color: 'var(--accent)', fontWeight: 600, fontSize: '0.9rem' }}>
                  {t('common.learnMore')} <ArrowRight size={14} style={{ verticalAlign: 'middle' }} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2>How the parts connect</h2>
          <ul className="check-list">
            <li><Check size={18} /> Catalog and barcodes feed stock, sales and purchasing.</li>
            <li><Check size={18} /> Receiving updates the stock ledger; sales reserve and reduce it.</li>
            <li><Check size={18} /> Purchasing suggests quantities from stock and supplier context.</li>
            <li><Check size={18} /> Reports and insights read the same underlying records.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
