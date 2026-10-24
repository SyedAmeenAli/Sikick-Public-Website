import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSeo } from '../lib/seo';
import { IntegrationTopologyIllustration } from '../components/hairline/Illustrations';
import { PLATFORMS, platform, type MigrationStatus } from '../data/migration';
import { PlatformLogo } from '../components/migration/Logo';
import { StatusPill } from '../components/migration/PlatformSwitcher';

type Group = 'File import' | 'Direct connections' | 'Assisted' | 'Export' | 'Other capabilities';

type Entry = {
  name: string;
  group: Group;
  status?: MigrationStatus;
  badge?: string;
  body: string;
  platformId?: string;
};

const GROUP_INTRO: Record<Group, string> = {
  'File import': 'Move items and parties in from a file you export from your old software. A one-time move, checked before anything is written, not continuous sync.',
  'Direct connections': 'Connectors that pull items straight from another system. They are built and tested against simulated responses, but none is switched on in production and none has been proven against a real account.',
  Assisted: 'Sources that have no verified route yet. We check them with you before promising anything.',
  Export: 'What you can take out of the console today.',
  'Other capabilities': 'Other things the product does, with their readiness.',
};

const DIRECT = ['Zoho Inventory', 'QuickBooks Online', 'Shopify', 'Katana MRP', 'Cin7 Core', 'Cin7 Omni', 'NetSuite', 'Odoo', 'Unleashed', 'inFlow Inventory', 'Sortly', 'Dynamics 365 Business Central', 'SAP Business One'];

const ENTRIES: Entry[] = [
  { name: 'Excel or CSV file', group: 'File import', status: 'file', platformId: 'excel', body: 'Items and parties from .xlsx, CSV or Tally XML, up to 5,000 rows per file, with column mapping for anything unrecognised.' },
  { name: 'TallyPrime', group: 'File import', status: 'file', platformId: 'tally', body: 'Excel or XML export from TallyPrime. Checked against real Tally files. Tally runs on your own computer, so there is no direct link.' },
  { name: 'Vyapar', group: 'File import', status: 'file', platformId: 'vyapar', body: 'Excel or CSV export from Vyapar. Checked against real Vyapar files. Vyapar publishes no developer API.' },
  { name: 'Marg ERP', group: 'File import', status: 'guided', platformId: 'marg', body: 'Excel export with column mapping. The Marg preset has not met a real Marg file, so expect to map columns yourself. No connector for Marg’s paid API.' },
  ...DIRECT.map<Entry>((name) => ({
    name,
    group: 'Direct connections',
    status: 'development',
    platformId: name === 'Zoho Inventory' ? 'zoho' : undefined,
    body: 'One-time pull of items into the check-then-apply import. In development: not live, not proven against a real account.',
  })),
  { name: 'BUSY Accounting Software', group: 'Assisted', status: 'unverified', platformId: 'busy', body: 'No named preset and no first-party public API assessed. A CSV or Excel export may import; that has not been tested.' },
  { name: 'Another system', group: 'Assisted', status: 'assisted', platformId: 'other', body: 'If it exports to Excel or CSV the file route works. If not, ask first.' },
  { name: 'Financial reports', group: 'Export', badge: 'CSV', body: 'Trial balance, profit and loss, balance sheet and cash flow.' },
  { name: 'GST returns', group: 'Export', badge: 'CSV and JSON', body: 'A return for a month, as CSV or JSON.' },
  { name: 'Audit log and cashier activity', group: 'Export', badge: 'CSV', body: 'Who did what and when, with the filters you apply.' },
  { name: 'Products, stock, customers, transactions', group: 'Export', badge: 'Not yet available', body: 'Can be imported, but there is no one-click export yet. Ask for an assisted export.' },
  { name: 'Barcode labels', group: 'Other capabilities', badge: 'Available', body: 'Generate and bulk-print variant labels.' },
  { name: 'Document extraction', group: 'Other capabilities', badge: 'Available (AI plan)', body: 'Read supplier invoices and bills from a photo or PDF.' },
  { name: 'Standard API access', group: 'Other capabilities', badge: 'Setup required', body: 'Documented read and order APIs with scoped keys; limits defined per plan.' },
  { name: 'Webhooks', group: 'Other capabilities', badge: 'Setup required', body: 'Event delivery to your systems once configured.' },
  { name: 'Carrier booking', group: 'Other capabilities', badge: 'In development', body: 'Shipment tracking exists; booking shipments appears only once a carrier is set up for the business.' },
  { name: 'Custom integration', group: 'Other capabilities', badge: 'Enterprise custom', body: 'Bespoke integrations, scopes and synchronisation under Enterprise.' },
];

const GROUPS: Group[] = ['File import', 'Direct connections', 'Assisted', 'Export', 'Other capabilities'];

export default function IntegrationsPage() {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState<'All' | Group>('All');
  useSeo({
    title: 'Integrations and data migration — Sikick',
    description: 'What connects to Sikick, what imports from a file, what is assisted and what is still in development, each labelled with what has been verified.',
    path: '/integrations',
  });

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ENTRIES.filter((e) => (group === 'All' || e.group === group) && (!q || e.name.toLowerCase().includes(q) || e.body.toLowerCase().includes(q)));
  }, [query, group]);

  return (
    <div>
      <section className="section">
        <div className="container">
          <p className="eyebrow">Integrations and migration</p>
          <h1>Connections, with exactly what works.</h1>
          <p className="section-lede">
            File import, direct connections, assisted migration and export are different things, and each entry says which it is. A name on this page is never a claim that it is connected.
          </p>
          <p style={{ marginTop: 'var(--space-16)' }}>
            <Link className="btn btn-primary" to="/switch-to-sikick">Switch to Sikick <ArrowRight size={16} aria-hidden="true" /></Link>
          </p>
          <div className="filter-bar" style={{ marginTop: 'var(--space-32)' }}>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or what it does"
              aria-label="Search connections"
              className="filter-input"
            />
            <div className="filter-chips" role="group" aria-label="Filter by type">
              {(['All', ...GROUPS] as const).map((g) => (
                <button key={g} type="button" className="chip" aria-pressed={group === g} onClick={() => setGroup(g)}>{g}</button>
              ))}
            </div>
          </div>
          <div className="idir-groups">
            {GROUPS.filter((g) => shown.some((e) => e.group === g)).map((g) => (
              <section key={g} className="idir-group" aria-label={g}>
                <h2>{g}</h2>
                <p>{GROUP_INTRO[g]}</p>
                <ul className="idir-list">
                  {shown.filter((e) => e.group === g).map((e) => {
                    const p = e.platformId ? platform(e.platformId) : null;
                    return (
                      <li key={e.name} className="idir-item">
                        {p?.logo && <PlatformLogo platform={p} area={3400} maxWidth={120} />}
                        <h3>{e.name}</h3>
                        {e.status ? <StatusPill status={e.status} /> : <span className="ill-tag" style={{ justifySelf: 'start', margin: 0 }}>{e.badge}</span>}
                        <p>{e.body}</p>
                        {e.platformId && PLATFORMS.some((x) => x.id === e.platformId) && (
                          <Link to={`/switch-to-sikick#from=${e.platformId}`}>How to move from {e.name === 'Another system' ? 'your system' : e.name} <ArrowRight size={13} aria-hidden="true" style={{ display: 'inline', verticalAlign: '-2px' }} /></Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
            {shown.length === 0 && <p className="idir-empty">Nothing matches “{query}”. Try a shorter name, or ask for an assisted migration.</p>}
          </div>
        </div>
      </section>

      <section className="section section-visual">
        <div className="container">
          <IntegrationTopologyIllustration />
        </div>
      </section>
    </div>
  );
}
