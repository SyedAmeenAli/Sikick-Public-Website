import { Link } from 'react-router-dom';
import { useSeo } from '../lib/seo';
import { industryBySlug } from '../data/industries';

export default function IndustryDetailPage({ slug }: { slug: string }) {
  const industry = industryBySlug(slug);
  if (!industry) {
    return (
      <div className="section">
        <div className="container">
          <h1>Page not found</h1>
          <p className="text-muted">That sector does not exist.</p>
          <Link className="btn btn-secondary" to="/industries">Back to industries</Link>
        </div>
      </div>
    );
  }
  useSeo({ title: industry.seo.title, description: industry.seo.description, path: `/industries/${industry.slug}` });
  return (
    <div>
      <section className="section">
        <div className="container">
          <p className="eyebrow">{industry.category}</p>
          <h1>{industry.name}</h1>
          <p className="section-lede">{industry.summary}</p>
        </div>
      </section>
      <section className="section section-blush">
        <div className="container">
          <div className="two-col">
            <div>
              <h2>Inventory challenges</h2>
              <ul className="check-list">
                {industry.challenges.map((challenge) => (
                  <li key={challenge}>{challenge}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2>How Sikick helps</h2>
              <div style={{ display: 'grid', gap: 'var(--space-16)' }}>
                {industry.workflows.map((workflow) => (
                  <div key={workflow.label} className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-12)', alignItems: 'flex-start' }}>
                      <h3 style={{ margin: 0 }}>{workflow.label}</h3>
                      <span className={`pill ${workflow.plan === 'Core' ? 'pill-wine' : workflow.plan === 'AI' ? 'pill-info' : 'pill-warning'}`}>
                        {workflow.plan}{workflow.gated ? ' · rolling out' : ''}
                      </span>
                    </div>
                    <p style={{ marginTop: 'var(--space-8)' }}>{workflow.how}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {industry.note && (
            <div className="notice notice-warning" style={{ marginTop: 'var(--space-32)' }}>
              {industry.note}
            </div>
          )}
          <div style={{ marginTop: 'var(--space-32)' }}>
            <h2>Common questions</h2>
            <div className="accordion">
              {industry.faqSeeds.map((item, index) => (
                <details key={index} className="accordion-item">
                  <summary className="accordion-trigger">{item.q}</summary>
                  <div className="accordion-panel" style={{ maxHeight: 'none' }}>
                    <div className="accordion-panel-inner">{item.a}</div>
                  </div>
                </details>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 'var(--space-32)', display: 'flex', gap: 'var(--space-12)', flexWrap: 'wrap' }}>
            {industry.products.map((product) => (
              <Link key={product} className="btn btn-secondary btn-sm" to={`/product/${product === 'stock-control' ? 'stock-control' : product === 'siborg' ? 'siborg' : product}`}>
                {product}
              </Link>
            ))}
            <Link className="btn btn-primary btn-sm" to="/setup">Design my setup</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
