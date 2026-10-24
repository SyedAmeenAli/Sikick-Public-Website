import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useSeo } from '../lib/seo';
import { SIKICK_TRIAL_URL } from '../config/site';

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

function RetailVisual() {
  return (
    <div className="ui-frame" aria-label="Retail dashboard preview showing live sales, stock and low-stock alerts">
      <div className="ui-chrome">
        <span className="ui-chrome-dot" />
        <span className="ui-chrome-dot" />
        <span className="ui-chrome-dot" />
        <span className="ui-chrome-url">app.sikick.com · retail</span>
        <span className="ui-demo-tag">Sample data</span>
      </div>
      <div className="ui-body">
        <div className="ui-topbar">
          <span className="ui-topbar-title">Live store overview</span>
          <span className="ui-demo-tag">Today</span>
        </div>
        <div className="ui-cards">
          <div className="ui-metric">
            <div className="ui-metric-label">Sales today</div>
            <div className="ui-metric-value">₹48.2K</div>
            <div className="ui-metric-sub good">+12% vs yesterday</div>
          </div>
          <div className="ui-metric">
            <div className="ui-metric-label">Items sold</div>
            <div className="ui-metric-value">312</div>
            <div className="ui-metric-sub">Across 2 tills</div>
          </div>
          <div className="ui-metric">
            <div className="ui-metric-label">Low-stock alerts</div>
            <div className="ui-metric-value">8</div>
            <div className="ui-metric-sub warn">Needs reorder</div>
          </div>
          <div className="ui-metric">
            <div className="ui-metric-label">Active tills</div>
            <div className="ui-metric-value">3</div>
            <div className="ui-metric-sub good">All online</div>
          </div>
        </div>
        <div className="ui-panel">
          <div className="ui-panel-title">Recent sales</div>
          {[
            { sku: 'SKU-1042', name: 'Cotton T-shirt (M, Navy)', qty: '2', badge: 'ok' },
            { sku: 'SKU-2081', name: 'Wireless earbuds (Black)', qty: '1', badge: 'low' },
            { sku: 'SKU-3310', name: 'Ceramic mug 350ml', qty: '4', badge: 'ok' },
            { sku: 'SKU-1187', name: 'A4 notebook 200pg', qty: '1', badge: 'out' },
          ].map((row) => (
            <div className="ui-row" key={row.sku}>
              <span className="ui-sku">{row.sku}</span>
              <span className="ui-name">{row.name}</span>
              <span className="ui-qty">{row.qty}</span>
              <span className={`ui-badge ui-badge-${row.badge}`}>
                {row.badge === 'ok' ? 'OK' : row.badge === 'low' ? 'Low' : 'Out'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WholesaleVisual() {
  return (
    <div className="ui-frame" aria-label="Wholesale dashboard preview showing orders, credit exposure and fulfilment status">
      <div className="ui-chrome">
        <span className="ui-chrome-dot" />
        <span className="ui-chrome-dot" />
        <span className="ui-chrome-dot" />
        <span className="ui-chrome-url">app.sikick.com · wholesale</span>
        <span className="ui-demo-tag">Sample data</span>
      </div>
      <div className="ui-body">
        <div className="ui-topbar">
          <span className="ui-topbar-title">Wholesale desk</span>
          <span className="ui-demo-tag">This week</span>
        </div>
        <div className="ui-cards">
          <div className="ui-metric">
            <div className="ui-metric-label">Open orders</div>
            <div className="ui-metric-value">24</div>
            <div className="ui-metric-sub warn">6 partial</div>
          </div>
          <div className="ui-metric">
            <div className="ui-metric-label">Credit exposure</div>
            <div className="ui-metric-value">₹12.4L</div>
            <div className="ui-metric-sub">Within limits</div>
          </div>
          <div className="ui-metric">
            <div className="ui-metric-label">Overdue invoices</div>
            <div className="ui-metric-value">5</div>
            <div className="ui-metric-sub warn">₹2.1L past due</div>
          </div>
          <div className="ui-metric">
            <div className="ui-metric-label">Ready to ship</div>
            <div className="ui-metric-value">18</div>
            <div className="ui-metric-sub good">Pick today</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-12)' }}>
          <div className="ui-panel">
            <div className="ui-panel-title">Customer tiers</div>
            {[
              { name: 'Metro Mart', tier: 'Platinum', limit: '₹5L' },
              { name: 'City Traders', tier: 'Gold', limit: '₹2L' },
              { name: 'Local Corner', tier: 'Silver', limit: '₹75K' },
            ].map((row) => (
              <div className="ui-row" key={row.name}>
                <span className="ui-name">{row.name}</span>
                <span className="ui-badge ui-badge-ok">{row.tier}</span>
                <span className="ui-qty">{row.limit}</span>
              </div>
            ))}
          </div>
          <div className="ui-panel">
            <div className="ui-panel-title">Fulfilment status</div>
            {[
              { name: 'SO-2201', status: 'Picked', tone: 'ok' },
              { name: 'SO-2202', status: 'Partial', tone: 'warn' },
              { name: 'SO-2203', status: 'Draft', tone: 'draft' },
            ].map((row) => (
              <div className="ui-row" key={row.name}>
                <span className="ui-name">{row.name}</span>
                <span className={`ui-badge ui-badge-${row.tone}`}>{row.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DistributionVisual() {
  return (
    <div className="ui-frame" aria-label="Distribution dashboard preview showing inbound, outbound, stock age and deliveries">
      <div className="ui-chrome">
        <span className="ui-chrome-dot" />
        <span className="ui-chrome-dot" />
        <span className="ui-chrome-dot" />
        <span className="ui-chrome-url">app.sikick.com · distribution</span>
        <span className="ui-demo-tag">Sample data</span>
      </div>
      <div className="ui-body">
        <div className="ui-topbar">
          <span className="ui-topbar-title">Distribution hub</span>
          <span className="ui-demo-tag">Today</span>
        </div>
        <div className="ui-cards">
          <div className="ui-metric">
            <div className="ui-metric-label">Inbound today</div>
            <div className="ui-metric-value">14</div>
            <div className="ui-metric-sub good">GRN done</div>
          </div>
          <div className="ui-metric">
            <div className="ui-metric-label">Outbound today</div>
            <div className="ui-metric-value">22</div>
            <div className="ui-metric-sub warn">3 pending</div>
          </div>
          <div className="ui-metric">
            <div className="ui-metric-label">Stock &gt; 90 days</div>
            <div className="ui-metric-value">6.2%</div>
            <div className="ui-metric-sub">Of total value</div>
          </div>
          <div className="ui-metric">
            <div className="ui-metric-label">Pending deliveries</div>
            <div className="ui-metric-value">9</div>
            <div className="ui-metric-sub warn">1 delayed</div>
          </div>
        </div>
        <div className="ui-panel">
          <div className="ui-panel-title">Stock age and movement</div>
          <div className="ui-bars" aria-hidden="true">
            {[28, 45, 62, 38, 55, 72, 48].map((height, index) => (
              <div key={index} className={`ui-bar ${index === 2 ? '' : 'dim'}`} style={{ height: `${height}%` }} />
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-12)', marginTop: 'var(--space-12)' }}>
            {[
              { label: 'Fast movers', value: '124 SKUs', tone: 'good' },
              { label: 'Slow movers', value: '31 SKUs', tone: 'warn' },
              { label: 'Inbound ETA', value: 'Tomorrow', tone: 'ok' },
              { label: 'Returns to inspect', value: '4', tone: 'warn' },
            ].map((row) => (
              <div className="ui-metric" key={row.label}>
                <div className="ui-metric-label">{row.label}</div>
                <div className={`ui-metric-sub ${row.tone}`}>{row.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ManufacturingVisual() {
  return (
    <div className="ui-frame" aria-label="Manufacturing dashboard preview showing raw materials, finished goods and production status">
      <div className="ui-chrome">
        <span className="ui-chrome-dot" />
        <span className="ui-chrome-dot" />
        <span className="ui-chrome-dot" />
        <span className="ui-chrome-url">app.sikick.com · manufacturing</span>
        <span className="ui-demo-tag">Sample data</span>
      </div>
      <div className="ui-body">
        <div className="ui-topbar">
          <span className="ui-topbar-title">Materials &amp; finished goods</span>
          <span className="ui-demo-tag">Live</span>
        </div>
        <div className="ui-cards">
          <div className="ui-metric">
            <div className="ui-metric-label">Raw materials low</div>
            <div className="ui-metric-value">5</div>
            <div className="ui-metric-sub warn">Raise PO</div>
          </div>
          <div className="ui-metric">
            <div className="ui-metric-label">Finished goods ready</div>
            <div className="ui-metric-value">840</div>
            <div className="ui-metric-sub good">Ready to dispatch</div>
          </div>
          <div className="ui-metric">
            <div className="ui-metric-label">Batches on hand</div>
            <div className="ui-metric-value">46</div>
            <div className="ui-metric-sub">AI plan</div>
          </div>
          <div className="ui-metric">
            <div className="ui-metric-label">Open dispatches</div>
            <div className="ui-metric-value">11</div>
            <div className="ui-metric-sub">This week</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-12)' }}>
          <div className="ui-panel">
            <div className="ui-panel-title">Raw-material status</div>
            {[
              { sku: 'RM-401', name: 'Cotton yarn 40s', qty: '120 kg', badge: 'ok' },
              { sku: 'RM-402', name: 'Polyester blend', qty: '45 kg', badge: 'low' },
              { sku: 'RM-403', name: 'Dyes — navy', qty: '0 kg', badge: 'out' },
            ].map((row) => (
              <div className="ui-row" key={row.sku}>
                <span className="ui-sku">{row.sku}</span>
                <span className="ui-name">{row.name}</span>
                <span className="ui-qty">{row.qty}</span>
                <span className={`ui-badge ui-badge-${row.badge}`}>
                  {row.badge === 'ok' ? 'OK' : row.badge === 'low' ? 'Low' : 'Out'}
                </span>
              </div>
            ))}
          </div>
          <div className="ui-panel ui-siborg">
            <div className="ui-panel-title">
              <span aria-hidden="true">●</span> Production status
            </div>
            <p style={{ fontSize: '0.78rem', color: '#e9dee2', margin: '0 0 10px' }}>
              Work-in-progress tracking, BOMs and production runs are scoped through Enterprise consultation.
            </p>
            <div style={{ fontSize: '0.72rem', color: 'rgb(233 222 226 / 0.65)', marginBottom: '10px' }}>
              Raw materials, purchasing and dispatch are available today.
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span className="ui-approve-btn">Request Enterprise quote</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type Solution = {
  title: string;
  headline: string;
  lede: string;
  description: string;
  pressures: string[];
  workflow: { step: string; body: string }[];
  modules: { title: string; body: string }[];
  examples: { label: string; body: string }[];
  cta: {
    primary: { label: string; href: string };
    secondary?: { label: string; to: string };
  };
  visual: ReactNode;
};

const solutions: Record<string, Solution> = {
  retail: {
    title: 'Retail',
    headline: 'Run your store with one live stock truth',
    lede: 'Shops and chains selling over the counter need catalog discipline, fast checkout and honest stock counts that update the moment a sale happens.',
    description: 'Sikick retail solutions unify POS, inventory and purchasing so shops never sell out of stock or waste shelf space.',
    pressures: [
      'Stockouts during rush hours when hot sellers run low unnoticed.',
      'Manual price updates across shelves, tills and online channels.',
      'Slow checkout queues that lose impulse sales.',
      'Returns and exchanges that do not reconcile back to inventory.',
      'Multi-location chains that cannot see group-wide stock instantly.',
    ],
    workflow: [
      { step: 'Catalog', body: 'Build products with variants, barcodes, taxes and shelf locations.' },
      { step: 'Sell', body: 'Ring up sales on the POS with cash, UPI, QR and split tenders.' },
      { step: 'Adjust', body: 'Inventory updates automatically with every sale, return or exchange.' },
      { step: 'Replenish', body: 'SiBorg flags low stock and drafts purchase orders for approval.' },
      { step: 'Reconcile', body: 'Close tills, compare actuals and settle cash before the next shift.' },
    ],
    modules: [
      { title: 'POS terminal', body: 'Fast till checkout with cashier attribution and multiple tenders.' },
      { title: 'Inventory', body: 'Live stock counts by store, rack and variant with adjustment history.' },
      { title: 'Product catalog', body: 'Variants, barcodes, taxes and images in one place.' },
      { title: 'Purchasing', body: 'Purchase orders, GRN and supplier records.' },
      { title: 'SiBorg AI', body: 'Reviewable reorder suggestions based on velocity and lead time.' },
      { title: 'Reports', body: 'Sales, margin, stock movement and cashier reconciliation.' },
    ],
    examples: [
      { label: 'Fashion boutique', body: 'Track every size and colour so staff never promise an item that is out of stock.' },
      { label: 'Pharmacy', body: 'Batch and expiry tracking keeps regulated products safe and auditable. (AI plan)' },
      { label: 'Grocery store', body: 'Perishable rotation and low-stock alerts cut waste and lost sales.' },
    ],
    cta: {
      primary: { label: 'Start a 14-day trial', href: SIKICK_TRIAL_URL },
      secondary: { label: 'Browse 78 sectors', to: '/industries' },
    },
    visual: <RetailVisual />,
  },
  wholesale: {
    title: 'Wholesale',
    headline: 'Sell in bulk without losing control of credit and fulfilment',
    lede: 'Wholesale businesses live on customer-specific price lists, credit tracking, partial shipments and volume-based margins.',
    description: 'Sikick wholesale solutions handle price lists, sales orders, credit limits, partial fulfilment and debtor follow-ups in one system.',
    pressures: [
      'Customer-specific price lists that live in spreadsheets and get out of sync.',
      'Credit exposure that grows because limits are checked too late.',
      'Partial fulfilment across multiple deliveries and invoices.',
      'Bulk orders that are hard to pick, pack and ship accurately.',
      'Overdue invoices that slip through follow-up cracks.',
    ],
    workflow: [
      { step: 'Price', body: 'Set tiered price lists, volume breaks and customer-specific contracts.' },
      { step: 'Order', body: 'Capture sales orders with credit checks before confirmation.' },
      { step: 'Fulfil', body: 'Pick, pack and dispatch in full or in partial shipments with delivery notes.' },
      { step: 'Invoice', body: 'Raise invoices tied to shipments and track accounts receivable.' },
      { step: 'Collect', body: 'Follow up overdue balances and enforce credit limits on new orders.' },
    ],
    modules: [
      { title: 'Sales orders', body: 'Order lifecycle from quotation to delivered with status tracking.' },
      { title: 'Customer records', body: 'Credit limits, payment history and tiered pricing.' },
      { title: 'Inventory', body: 'Reserve stock for orders and track fulfilment accurately.' },
      { title: 'Invoicing', body: 'Shipment-linked invoices and receivables ageing.' },
      { title: 'Dispatch', body: 'Delivery notes, partial shipments and returns.' },
      { title: 'Reports', body: 'Sales by customer, margin and overdue-debtor lists.' },
    ],
    examples: [
      { label: 'FMCG wholesaler', body: 'Tiered pricing for kirana stores, supermarkets and institutions.' },
      { label: 'Building materials', body: 'Partial dispatch of cement, tiles and fittings against large project orders.' },
      { label: 'Mobile accessories', body: 'Volume breaks and credit limits for distributors and retailers.' },
    ],
    cta: {
      primary: { label: 'Start a 14-day trial', href: SIKICK_TRIAL_URL },
      secondary: { label: 'Browse 78 sectors', to: '/industries' },
    },
    visual: <WholesaleVisual />,
  },
  distribution: {
    title: 'Distribution',
    headline: 'Move stock faster between suppliers, warehouses and retailers',
    lede: 'Distributors need dispatch records, stock-age visibility, supplier lead times and clear handoffs between receiving and delivery.',
    description: 'Sikick distribution solutions connect purchasing, warehousing, sales orders and dispatch so stock never sits idle or disappears in transit.',
    pressures: [
      'Stock aging into dead inventory because movement is not tracked by age.',
      'Dispatch delays when pick lists do not match warehouse layout.',
      'Supplier lead-time variance that breaks reorder plans.',
      'Returns from retailers that are not inspected or restocked quickly.',
      'Route and delivery proof that is hard to reconcile with invoices.',
    ],
    workflow: [
      { step: 'Receive', body: 'Record supplier GRNs, lot references and quality checks.' },
      { step: 'Warehouse', body: 'Bin stock by age and velocity so pickers find the right lots first.' },
      { step: 'Pick', body: 'Build pick lists against retailer orders and reserve stock.' },
      { step: 'Dispatch', body: 'Generate delivery notes, load vehicles and track handoffs.' },
      { step: 'Reorder', body: 'Use velocity and stock-age reports to buy what actually sells.' },
    ],
    modules: [
      { title: 'Inventory', body: 'Multi-warehouse stock with age, bin and batch visibility.' },
      { title: 'Purchasing', body: 'Purchase orders, supplier records and GRN matching.' },
      { title: 'Sales orders', body: 'Retailer orders with back-to-back allocation.' },
      { title: 'Dispatch', body: 'Delivery notes, vehicle loads and delivery tracking.' },
      { title: 'SiBorg AI', body: 'Reorder suggestions that account for lead time and seasonality.' },
      { title: 'Reports', body: 'Stock age, supplier performance and route profitability.' },
    ],
    examples: [
      { label: 'Packaged foods', body: 'FEFO picking and expiry monitoring keep shelves fresh.' },
      { label: 'Electronics', body: 'Serial-aware dispatch and retailer return inspection.' },
      { label: 'Pharma distribution', body: 'Batch traceability from inbound to retailer. (AI plan)' },
    ],
    cta: {
      primary: { label: 'Start a 14-day trial', href: SIKICK_TRIAL_URL },
      secondary: { label: 'Browse 78 sectors', to: '/industries' },
    },
    visual: <DistributionVisual />,
  },
  manufacturing: {
    title: 'Manufacturing',
    headline: 'Inventory, purchasing and dispatch — ready today. Production workflows scoped with Enterprise.',
    lede: 'Manufacturers can already manage raw materials, purchasing, receiving, finished-goods stock and dispatch on Sikick. Production runs, BOMs and work-in-progress require an Enterprise requirements-gathering phase.',
    description: 'Sikick manufacturing coverage today includes raw materials, purchasing, receiving, finished goods and dispatch. Production workflows are scoped through Enterprise consultation.',
    pressures: [
      'Raw-material shortages that stop lines because reorder points are guessed.',
      'No visibility into work-in-progress across shifts and machines.',
      'Batch recalls that cannot be traced from supplier to customer.',
      'Finished-goods stock that is not tied to open customer orders.',
      'Capacity planning that relies on spreadsheets instead of live data.',
    ],
    workflow: [
      { step: 'Receive', body: 'Record raw-material receipts, inspections and lot numbers.' },
      { step: 'Store', body: 'Track raw materials by batch and location, with expiry alerts where needed. (AI plan)' },
      { step: 'Produce', body: 'Production runs, BOMs and WIP tracking are scoped through Enterprise consultation.' },
      { step: 'Finish', body: 'Receive finished goods into stock with batch references.' },
      { step: 'Dispatch', body: 'Allocate finished goods to orders and ship with full traceability.' },
    ],
    modules: [
      { title: 'Inventory', body: 'Raw materials, finished goods and batch tracking. (AI plan)' },
      { title: 'Purchasing', body: 'Supplier records, purchase orders and receipt matching.' },
      { title: 'Dispatch', body: 'Order allocation, delivery notes and shipment tracking.' },
      { title: 'Reports', body: 'Material consumption, stock valuation and supplier performance.' },
      { title: 'Enterprise scoping', body: 'BOMs, routings, work orders and WIP dashboards tailored to your process.' },
    ],
    examples: [
      { label: 'Textile unit', body: 'Track yarn lots and dispatch finished garments with full lot traceability.' },
      { label: 'Food processing', body: 'Raw-material batches and expiry monitoring today; recipe-based production via Enterprise.' },
      { label: 'Pharma manufacturing', body: 'Batch traceability for materials and finished goods; validated production workflows through Enterprise.' },
    ],
    cta: {
      primary: { label: 'Request an Enterprise quote', href: '/request-quote' },
      secondary: { label: 'Browse 78 sectors', to: '/industries' },
    },
    visual: <ManufacturingVisual />,
  },
};

const slugs = Object.keys(solutions);

export function SolutionsPage({ slug }: { slug: string }) {
  const page = solutions[slug] ?? solutions.retail;
  useSeo({
    title: `${page.title} solutions — Sikick`,
    description: page.description,
    path: `/solutions/${slug in solutions ? slug : 'retail'}`,
  });

  const isManufacturing = slug === 'manufacturing';

  return (
    <div>
      <section className="section">
        <div className="container">
          <p className="eyebrow">Solutions</p>
          <h1>{page.headline}</h1>
          <p className="section-lede">{page.lede}</p>
          <div className="flex wrap gap-16" style={{ marginTop: 'var(--space-24)' }}>
            <a className="btn btn-primary" href={page.cta.primary.href}>
              {page.cta.primary.label}
              <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
            {page.cta.secondary && (
              <Link className="btn btn-secondary" to={page.cta.secondary.to}>
                {page.cta.secondary.label}
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="section section-blush">
        <div className="container">
          <div className="two-col">
            <div>
              <h2>The operational pressure</h2>
              <p className="section-lede">
                {isManufacturing
                  ? 'Manufacturers face pressures across purchasing, storage, production and dispatch. Sikick covers the inventory, purchasing and dispatch side today; production-specific workflows are gathered through Enterprise consultation.'
                  : `${page.title} teams operate on thin margins and tight deadlines. These are the day-to-day problems Sikick is built to remove.`}
              </p>
              <ul className="check-list" style={{ marginTop: 'var(--space-24)' }}>
                {page.pressures.map((pressure) => (
                  <li key={pressure}>
                    <CheckIcon />
                    {pressure}
                  </li>
                ))}
              </ul>
            </div>
            <div>{page.visual}</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">End-to-end workflow</p>
            <h2>From first touch to final record</h2>
            <p className="section-lede">
              A single flow that connects your front desk, warehouse and back office so data is entered once and reused everywhere.
            </p>
          </div>
          <div className="grid grid-4">
            {page.workflow.map((item, index) => (
              <div className="card" key={item.step}>
                <div className="card-icon">
                  <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3>{item.step}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-blush">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Modules and features</p>
            <h2>What you use on Sikick</h2>
            <p className="section-lede">
              {isManufacturing
                ? 'These modules are available today. Production planning extensions are scoped during Enterprise onboarding.'
                : `The Sikick modules most relevant to ${page.title.toLowerCase()} operations, connected out of the box.`}
            </p>
          </div>
          <div className="grid grid-3">
            {page.modules.map((module) => (
              <div className="card" key={module.title}>
                <h3>{module.title}</h3>
                <p>{module.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Practical examples</p>
            <h2>How real businesses use it</h2>
          </div>
          <div className="grid grid-3">
            {page.examples.map((example) => (
              <div className="card" key={example.label}>
                <h3>{example.label}</h3>
                <p>{example.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="two-col">
            <div>
              <h2>{isManufacturing ? 'Start with an Enterprise conversation' : `Get ${page.title.toLowerCase()} operations under control`}</h2>
              <p className="section-lede">
                {isManufacturing
                  ? 'Tell us about your production process, BOM complexity and quality-traceability needs. We will scope what is live, what is on the AI plan, and what requires Enterprise customisation.'
                  : `Start a 14-day trial, import your catalog, and see how ${page.title.toLowerCase()} workflows feel when stock, sales and purchasing are connected.`}
              </p>
            </div>
            <div className="flex wrap gap-16 items-center">
              <a className="btn btn-primary" href={page.cta.primary.href}>
                {page.cta.primary.label}
                <span className="btn-arrow" aria-hidden="true">→</span>
              </a>
              {page.cta.secondary && (
                <Link className="btn btn-secondary" to={page.cta.secondary.to}>
                  {page.cta.secondary.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SolutionsPage;

export { slugs };
