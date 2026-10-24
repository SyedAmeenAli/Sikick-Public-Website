import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useSeo } from '../lib/seo';
import { INDUSTRIES, INDUSTRY_CATEGORIES } from '../data/industries';

export default function IndustriesPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('All');
  useSeo({
    title: '78 sectors served by Sikick',
    description: 'Inventory software for 78 inventory-heavy sectors, from pharmacy to manufacturing.',
    path: '/industries',
  });

  const filtered = INDUSTRIES.filter((industry) => {
    const matchesQuery = industry.name.toLowerCase().includes(query.toLowerCase()) ||
      industry.summary.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === 'All' || industry.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <div>
      <section className="section">
        <div className="container">
          <p className="eyebrow">Industries</p>
          <h1>Inventory software for the way your industry works.</h1>
          <p className="section-lede">
            A shared operational foundation, configured to the business. {INDUSTRIES.length} sectors listed.
          </p>
          <div className="filter-bar" style={{ marginTop: 'var(--space-32)' }}>
            <input
              type="search"
              placeholder="Search sectors"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search sectors"
            />
            <div className="filter-chips" role="group" aria-label="Filter by category">
              <button
                type="button"
                className="chip"
                aria-pressed={category === 'All'}
                onClick={() => setCategory('All')}
              >
                All
              </button>
              {INDUSTRY_CATEGORIES.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="chip"
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <p className="result-count">{filtered.length} of {INDUSTRIES.length} sectors</p>
        </div>
      </section>
      <section className="section section-blush" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid grid-3">
            {filtered.map((industry) => (
              <Link key={industry.slug} to={`/industries/${industry.slug}`} className="card card-hover sector-card">
                <span className="sector-category">{industry.category}</span>
                <h3>{industry.name}</h3>
                <p>{industry.summary}</p>
                <span className="sector-arrow">
                  Explore <Search size={12} style={{ display: 'none' }} />
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-muted" style={{ textAlign: 'center', padding: 'var(--space-48) 0' }}>
              No sectors match. Try a different search or category.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
