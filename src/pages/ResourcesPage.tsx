import { Link } from 'react-router-dom';
import { useSeo } from '../lib/seo';
import { SIKICK_LOGIN_URL, SIKICK_TRIAL_URL } from '../config/site';

type Guide = {
  title: string;
  body: string;
  to: string;
};

const guides: Guide[] = [
  {
    title: 'Importing a product catalog',
    body: 'Column mapping, validation, correction and confirmation before anything is written.',
    to: '/product/inventory',
  },
  {
    title: 'Variants and barcodes',
    body: 'How parent products, variants, SKUs and barcode labels fit together.',
    to: '/product/inventory',
  },
  {
    title: 'Stock adjustments that stay honest',
    body: 'Reasoned, attributed changes to the append-only stock ledger.',
    to: '/product/stock-control',
  },
  {
    title: 'Receiving against purchase orders',
    body: 'Line-by-line receiving so short and over-shipments are visible.',
    to: '/product/purchasing',
  },
  {
    title: 'Reading stock-age reports',
    body: 'Finding what has stopped moving before it becomes dead capital.',
    to: '/product/reports',
  },
  {
    title: 'SiBorg reorder drafts',
    body: 'How reviewable reorder quantities are prepared and approved.',
    to: '/product/siborg',
  },
];

export default function ResourcesPage() {
  useSeo({
    title: 'Resources — Sikick',
    description: 'Practical inventory explainers for operators.',
    path: '/resources',
  });

  return (
    <div>
      <section className="section">
        <div className="container">
          <p className="eyebrow">Resources</p>
          <h1>Practical explainers for operators.</h1>
          <p className="section-lede">
            Short, useful guides that point to real product pages. No empty blog cards or dead article links.
          </p>
        </div>
      </section>

      <section className="section section-blush" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid grid-3">
            {guides.map((guide) => (
              <Link key={guide.title} className="card card-hover" to={guide.to}>
                <h3>{guide.title}</h3>
                <p>{guide.body}</p>
              </Link>
            ))}
          </div>

          <div className="notice" style={{ marginTop: 'var(--space-40)' }}>
            <strong>Prefer a guided setup?</strong>
            <p className="mt-0" style={{ marginBottom: 0 }}>
              Use the <Link to="/setup">setup configurator</Link> to design your plan, then start a
              trial or request an Enterprise quote.
            </p>
          </div>

          <div style={{ marginTop: 'var(--space-32)', display: 'flex', gap: 'var(--space-12)', flexWrap: 'wrap' }}>
            <Link className="btn btn-secondary" to="/about">About Sikick</Link>
            <Link className="btn btn-secondary" to="/contact">Contact</Link>
            <a className="btn btn-primary" href={SIKICK_TRIAL_URL}>Start a 14-day trial</a>
            <a className="btn btn-secondary" href={SIKICK_LOGIN_URL}>Log in</a>
          </div>
        </div>
      </section>
    </div>
  );
}
