import { useState, useMemo } from 'react';
import { useSeo } from '../lib/seo';

type Integration = {
  name: string;
  category: string;
  status: 'Available' | 'Setup required' | 'In development' | 'Enterprise custom';
  body: string;
};

const integrations: Integration[] = [
  { name: 'Spreadsheet import', category: 'Data import/export', status: 'Available', body: 'Excel/CSV import with column mapping, validation and confirmation.' },
  { name: 'Barcode labels', category: 'Operations', status: 'Available', body: 'Generate and bulk-print variant labels.' },
  { name: 'Document extraction', category: 'AI', status: 'Available', body: 'Read supplier invoices and bills from a photo or PDF (AI plan).' },
  { name: 'Product vision', category: 'AI', status: 'Available', body: 'Fill in a new product from a photo (AI plan).' },
  { name: 'Standard API access', category: 'API / developer', status: 'Setup required', body: 'Documented read and order APIs with scoped keys; limits defined per plan.' },
  { name: 'Webhooks', category: 'API / developer', status: 'Setup required', body: 'Event delivery to your systems once configured.' },
  { name: 'Carrier booking', category: 'Shipping / logistics', status: 'In development', body: 'Shipment tracking exists; booking shipments from the system appears only once a carrier is set up for the business.' },
  { name: 'Marketplace sync', category: 'Commerce', status: 'In development', body: 'Channel connectors are not advertised as live; confirm during setup.' },
  { name: 'Accounting export', category: 'Accounting', status: 'In development', body: 'Export and integration paths are validated per provider.' },
  { name: 'Custom integration', category: 'Enterprise', status: 'Enterprise custom', body: 'Bespoke integrations, scopes and synchronization under Enterprise.' },
];

const statusFilters: Array<'All' | Integration['status']> = [
  'All',
  'Available',
  'Setup required',
  'In development',
  'Enterprise custom',
];

function pillClass(status: Integration['status']): string {
  switch (status) {
    case 'Available': return 'pill-success';
    case 'Setup required': return 'pill-info';
    case 'In development': return 'pill-warning';
    case 'Enterprise custom': return 'pill-wine';
    default: return '';
  }
}

export default function IntegrationsPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<string>('All');
  useSeo({
    title: 'Integrations — Sikick',
    description: 'Connector directory with explicit readiness states.',
    path: '/integrations',
  });

  const filtered = useMemo(() => integrations.filter((item) => {
    const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase())
      || item.category.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = status === 'All' || item.status === status;
    return matchesQuery && matchesStatus;
  }), [query, status]);

  return (
    <div>
      <section className="section">
        <div className="container">
          <p className="eyebrow">Integrations</p>
          <h1>Connectors, with honest readiness.</h1>
          <p className="section-lede">
            Every connector is labelled by what is actually verified: available, setup required,
            in development, or Enterprise custom. We do not list partners we have not connected.
          </p>
          <div className="filter-bar" style={{ marginTop: 'var(--space-32)' }}>
            <input
              type="search"
              placeholder="Search connectors"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search connectors"
            />
            <div className="filter-chips">
              {statusFilters.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="chip"
                  aria-pressed={status === item}
                  onClick={() => setStatus(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <p className="result-count" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? 'connector' : 'connectors'}
          </p>
        </div>
      </section>

      <section className="section section-blush" style={{ paddingTop: 0 }}>
        <div className="container">
          {filtered.length > 0 ? (
            <div className="grid grid-3">
              {filtered.map((integration) => (
                <div key={integration.name} className="card integration-card">
                  <div className="integration-top">
                    <span className="integration-mono" aria-hidden="true">{integration.name.slice(0, 2).toUpperCase()}</span>
                    <span className={`pill ${pillClass(integration.status)}`}>
                      {integration.status}
                    </span>
                  </div>
                  <h3 style={{ margin: 0 }}>{integration.name}</h3>
                  <p className="text-small text-muted" style={{ margin: 0 }}>{integration.category}</p>
                  <p style={{ margin: 0 }}>{integration.body}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="notice">
              <p style={{ margin: 0 }}>
                No connectors match your search. Clear the filter or <a href="/contact">ask about a custom integration</a>.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
