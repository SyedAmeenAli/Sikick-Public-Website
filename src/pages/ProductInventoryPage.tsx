import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check, ArrowRight, Package, Tag, Barcode, Upload, FileSpreadsheet, AlertCircle } from 'lucide-react';
import { useSeo } from '../lib/seo';
import { SIKICK_TRIAL_URL } from '../config/site';
import { FaqAccordion } from '../components/FaqAccordion';
import { BarcodeScanIllustration, InventoryShelfIllustration } from '../components/hairline/Illustrations';

const features = [
  {
    icon: Package,
    title: 'Products, categories and variants',
    body: 'Create parent products with size, colour or style variants. Each variant gets its own SKU, barcode and stock quantity so the ledger stays exact.',
  },
  {
    icon: Barcode,
    title: 'Auto-generated SKUs and barcodes',
    body: 'Sikick can generate SKU codes and EAN-13 barcodes as you save a variant, or you can bring your own. Labels are ready to print from the console.',
  },
  {
    icon: Tag,
    title: 'Per-variant stock quantities',
    body: 'On-hand, reserved and damaged quantities are tracked per variant, not just per product, so a sale of one size never distorts another.',
  },
  {
    icon: Upload,
    title: 'Import with validation',
    body: 'Upload a spreadsheet, map the columns, fix validation errors in place and confirm the import. Bad rows are surfaced before anything is committed.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Audit trail and export',
    body: 'Every quantity change is reasoned and logged with a user attribution, and the audit log exports as CSV. A one-click catalog or stock export is not available yet; ask for an assisted export.',
  },
  {
    icon: AlertCircle,
    title: 'Slow and stagnant stock',
    body: 'Built-in reports flag variants that have stopped moving. In the AI plan, SiBorg drafts clearance or return proposals for review.',
  },
];

const faqs = [
  {
    question: 'Can I use my existing SKU or barcode numbers?',
    answer: 'Yes. You can enter your own SKUs, EANs or UPCs when creating a variant, or let Sikick generate them for you. Barcode labels can be printed from the console in standard sizes.',
  },
  {
    question: 'How does the catalog connect to stock and sales?',
    answer: 'A product or variant created in the catalog is immediately available to purchasing, stock control and the POS. When a sale is recorded or goods are received, the stock ledger for that exact variant updates automatically.',
  },
  {
    question: 'What happens if my spreadsheet has errors?',
    answer: 'The importer validates every row before committing. Invalid rows are shown with a reason, you can correct them in the preview, and only valid rows are imported. Nothing is partially saved.',
  },
  {
    question: 'Is multi-location stock supported?',
    answer: 'Core tracks quantity per variant. Multi-warehouse and bin-level location tracking are gated features; availability is confirmed during your setup call.',
  },
];

export default function ProductInventoryPage() {
  const { t } = useTranslation();
  useSeo({
    title: 'Inventory and catalog — Sikick',
    description: 'Build a product catalog with variants, SKUs, barcodes and per-variant stock quantities. Import from spreadsheets with validation.',
    path: '/product/inventory',
  });

  return (
    <div>
      <section className="section">
        <div className="container">
          <p className="eyebrow">Inventory and catalog</p>
          <h1>Build a product catalog your team can actually trust.</h1>
          <p className="section-lede">
            Products, categories, variants, SKUs and barcodes — all tied to per-variant stock quantities. A single source of truth that purchasing, stock control and the POS can rely on.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-12)', flexWrap: 'wrap', marginTop: 'var(--space-24)' }}>
            <a className="btn btn-primary" href={SIKICK_TRIAL_URL}>
              {t('nav.trial')} <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
            <Link className="btn btn-secondary" to="/product">Back to platform</Link>
          </div>
        </div>
      </section>
      <section className="section section-visual">
        <div className="container">
          <InventoryShelfIllustration /><div style={{ height: 'var(--space-48)' }} /><BarcodeScanIllustration />
        </div>
      </section>


      <section className="section section-blush">
        <div className="container">
          <div className="two-col">
            <div>
              <h2>From spreadsheet to sellable stock</h2>
              <p>
                Start by setting up your categories and products. For each product, define the variants you actually sell — size, colour, material or any combination. Sikick gives every variant its own SKU and barcode, then tracks stock quantities at that same level of detail.
              </p>
              <p>
                When goods arrive through purchasing, the stock ledger increases. When a sale is rung at the POS, the same ledger decreases. Because every module reads the same catalog, you never have to reconcile three different product lists at the end of the week.
              </p>
              <ul className="check-list" style={{ marginTop: 'var(--space-24)' }}>
                <li><Check size={18} /> Create products and variants with auto or custom SKUs.</li>
                <li><Check size={18} /> Print barcode labels directly from the console.</li>
                <li><Check size={18} /> Import large catalogs from spreadsheets with validation.</li>
                <li><Check size={18} /> Track on-hand, reserved and damaged quantities per variant.</li>
              </ul>
            </div>
            <div className="ui-frame">
              <div className="ui-chrome">
                <span className="ui-chrome-dot" />
                <span className="ui-chrome-dot" />
                <span className="ui-chrome-dot" />
                <span className="ui-chrome-url">sikick · catalog</span>
                <span className="ui-demo-tag">Morrow Goods</span>
              </div>
              <div className="ui-body">
                <div className="ui-topbar">
                  <span className="ui-topbar-title">Product catalog</span>
                </div>
                <div className="ui-panel">
                  <div className="ui-panel-title">Variants</div>
                  <div className="ui-row">
                    <span className="ui-sku">SKU-1042</span>
                    <span className="ui-name">Cotton T-shirt (M)</span>
                    <span className="ui-qty">128</span>
                    <span className="ui-badge ui-badge-ok">OK</span>
                  </div>
                  <div className="ui-row">
                    <span className="ui-sku">SKU-1043</span>
                    <span className="ui-name">Cotton T-shirt (L)</span>
                    <span className="ui-qty">96</span>
                    <span className="ui-badge ui-badge-ok">OK</span>
                  </div>
                  <div className="ui-row">
                    <span className="ui-sku">SKU-5002</span>
                    <span className="ui-name">LED desk lamp</span>
                    <span className="ui-qty">9</span>
                    <span className="ui-badge ui-badge-low">Low</span>
                  </div>
                  <div className="ui-row">
                    <span className="ui-sku">SKU-2081</span>
                    <span className="ui-name">Wireless earbuds</span>
                    <span className="ui-qty">14</span>
                    <span className="ui-badge ui-badge-low">Low</span>
                  </div>
                </div>
                <div className="ui-panel">
                  <div className="ui-panel-title">Import preview</div>
                  <div className="ui-row">
                    <span className="ui-name">120 rows ready</span>
                    <span className="ui-qty" style={{ color: '#7fc8a4' }}>Valid</span>
                  </div>
                  <div className="ui-row">
                    <span className="ui-name">3 rows need correction</span>
                    <span className="ui-qty" style={{ color: '#e0a55c' }}>Review</span>
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
            <p className="eyebrow">Capabilities</p>
            <h2>Everything a growing catalog needs</h2>
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

      <section className="section section-blush">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">FAQ</p>
            <h2>Questions about the catalog</h2>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ maxWidth: '40rem', margin: '0 auto var(--space-16)' }}>Start with a clean catalog.</h2>
          <p className="section-lede" style={{ margin: '0 auto var(--space-32)' }}>
            Import your products or build them from scratch. The 14-day trial includes full catalog, stock and POS features.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-12)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a className="btn btn-primary" href={SIKICK_TRIAL_URL}>
              {t('nav.trial')} <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
            <Link className="btn btn-secondary" to="/product/stock-control">
              {t('common.learnMore')} about stock control <ArrowRight size={14} style={{ verticalAlign: 'middle' }} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
