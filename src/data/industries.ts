/**
 * The 78-sector directory content model.
 *
 * Truthfulness rules baked into the data:
 * - `note` flags anything that must not be over-claimed (pharma compliance,
 *   manufacturing UI, cold-chain telemetry, carrier booking, offline POS).
 * - Workflow `plan` tags reflect the Core / AI / Enterprise matrix in the
 *   master product specification. "gated" marks capabilities whose rollout
 *   is feature-flagged in the IMS console (locations, bins).
 */

export type IndustryCategory =
  | 'Retail & specialty'
  | 'Grocery & food'
  | 'Pharma & health'
  | 'Beauty & care'
  | 'Fashion & lifestyle'
  | 'Electronics & tech'
  | 'Home & living'
  | 'Books, stationery & education'
  | 'Industrial & hardware'
  | 'Automotive'
  | 'Agriculture'
  | 'Manufacturing & processing'
  | 'Trade & distribution'
  | 'Hospitality & services';

export type WorkflowPlan = 'Core' | 'AI' | 'Enterprise';

export type IndustryWorkflow = {
  /** Short capability label, e.g. "Batch and expiry tracking". */
  label: string;
  /** How the verified Sikick console helps this sector, in one sentence. */
  how: string;
  /** Which plan level the capability belongs to per the specification. */
  plan: WorkflowPlan;
  /** Marks capabilities whose rollout is gated/unverified — shown honestly. */
  gated?: boolean;
};

export type Industry = {
  id: number;
  name: string;
  slug: string;
  category: IndustryCategory;
  summary: string;
  challenges: string[];
  workflows: IndustryWorkflow[];
  /** Related /product/* paths for internal linking. */
  products: string[];
  faqSeeds: { q: string; a: string }[];
  /** Set when a commonly requested capability is NOT verified for public claim. */
  note?: string;
  seo: { title: string; description: string };
};

const seo = (name: string, description: string) => ({
  title: `${name} inventory software — Sikick`,
  description,
});

export const INDUSTRIES: Industry[] = [
  {
    id: 1,
    name: 'General retail and specialty stores',
    slug: 'general-retail-specialty-stores',
    category: 'Retail & specialty',
    summary:
      'Independent shops selling mixed ranges over the counter need one place that keeps the catalog, the till and the stockroom agreeing with each other.',
    challenges: [
      'Mixed catalog with frequent one-off and seasonal items',
      'Stock counts drift from reality when sales and receiving happen on paper',
      'Returns and exchanges handled informally, with no record of why',
      'Owner cannot see what is actually selling without exporting to a spreadsheet',
    ],
    workflows: [
      { label: 'Catalog with variants and barcodes', how: 'Keep every product, size and colour under one SKU system with printed labels.', plan: 'Core' },
      { label: 'POS checkout and returns', how: 'Sell at the till with cash, UPI or QR tenders and record standard returns against the original sale.', plan: 'Core' },
      { label: 'Stock adjustments with reasons', how: 'Every correction is reasoned, attributed and logged, so counts stay honest.', plan: 'Core' },
      { label: 'Daily sales and stock reports', how: 'See what sold, what is left and what has stopped moving, without building your own spreadsheet.', plan: 'Core' },
    ],
    products: ['inventory', 'pos', 'reports'],
    faqSeeds: [
      { q: 'Can I import my existing product list?', a: 'Yes — the console imports spreadsheets with column mapping, validation and a confirmation step before anything is written.' },
      { q: 'Does it work for a single small shop?', a: 'The Core plan is built for exactly that: one shop, its catalog, till and purchasing in one place.' },
    ],
    seo: seo('General retail', 'Inventory software for independent and specialty retail: catalog, barcodes, POS, purchasing and reports in one system.'),
  },
  {
    id: 2,
    name: 'Supermarkets and hypermarkets',
    slug: 'supermarkets-and-hypermarkets',
    category: 'Grocery & food',
    summary:
      'High-throughput grocery floors live on shelf availability: thousands of fast-moving SKUs, daily receiving and constant price changes.',
    challenges: [
      'Very large catalogs with weekly additions and delists',
      'Perishable stock needing date discipline across aisles',
      'Receiving volume that overwhelms paper purchase registers',
      'Promotion and clearance decisions made without sell-through evidence',
    ],
    workflows: [
      { label: 'Bulk catalog import', how: 'Load and update thousands of SKUs from spreadsheets with validation before anything is committed.', plan: 'Core' },
      { label: 'Batch and expiry tracking', how: 'Track lots with expiry alerts so dated stock sells or clears before it becomes waste.', plan: 'AI' },
      { label: 'Purchase orders and receiving', how: 'Raise POs to each supplier and receive against them, keeping the stock ledger accurate.', plan: 'Core' },
      { label: 'Slow-mover detection', how: 'SiBorg flags stock that has stopped moving and drafts reviewable clearance proposals.', plan: 'AI' },
    ],
    products: ['inventory', 'purchasing', 'siborg'],
    faqSeeds: [
      { q: 'How does expiry tracking work?', a: 'Batches carry expiry dates; the console alerts as dates approach so staff can re-price, move or return stock.' },
      { q: 'Can it handle daily receiving from many suppliers?', a: 'Yes — receiving is recorded against each purchase order, so on-hand quantities and supplier ledgers stay aligned.' },
    ],
    seo: seo('Supermarket', 'Supermarket inventory software: bulk catalogs, batch and expiry tracking, receiving, and slow-mover detection.'),
  },
  {
    id: 3,
    name: 'Grocery and convenience stores',
    slug: 'grocery-and-convenience-stores',
    category: 'Grocery & food',
    summary:
      'Neighbourhood grocery runs on thin margins and fast turns — the owner needs reorder signals and simple receiving more than enterprise process.',
    challenges: [
      'Staples run out before anyone notices the shelf gap',
      'Loose and packed variants of the same product confused at billing',
      'Distributor deliveries booked in a notebook, not against orders',
      'Credit sales to regulars tracked informally',
    ],
    workflows: [
      { label: 'Low-stock alerts', how: 'Hourly sweeps flag items approaching stockout so the shelf gets refilled in time.', plan: 'Core' },
      { label: 'Variants and barcodes', how: 'Keep 500 g, 1 kg and 5 kg packs as tracked variants of one product, each with its own barcode.', plan: 'Core' },
      { label: 'Supplier records and payments', how: 'Track every distributor, their deliveries and what you still owe them.', plan: 'Core' },
      { label: 'Reorder suggestions', how: 'SiBorg drafts purchase-order quantities from your own sales and stock numbers for you to review.', plan: 'AI' },
    ],
    products: ['pos', 'purchasing', 'siborg'],
    faqSeeds: [
      { q: 'Will it remind me what to reorder?', a: 'Yes — low-stock alerts come standard, and the AI plan drafts reorder quantities you review before anything is sent.' },
      { q: 'Can I manage udhaar for regular customers?', a: 'Customer records keep sales and payment history; receivables tracking with reminders is part of the AI plan.' },
    ],
    seo: seo('Grocery and convenience', 'Grocery store inventory software: low-stock alerts, pack variants, supplier deliveries and reorder suggestions.'),
  },
  {
    id: 4,
    name: 'Wholesale trading',
    slug: 'wholesale-trading',
    category: 'Trade & distribution',
    summary:
      'Wholesalers win on price tiers, credit discipline and fulfilment reliability — all three need the same stock and customer truth.',
    challenges: [
      'Different prices for different customer groups, applied inconsistently',
      'Receivables spread across dozens of retailers with no ageing view',
      'Part-shipped orders lost track of between godown and delivery',
      'Quotes converted informally, leaving no audit trail',
    ],
    workflows: [
      { label: 'Customer groups and price lists', how: 'Maintain volume-based discounts and customer-specific price lists that apply consistently.', plan: 'AI' },
      { label: 'Receivables and reminders', how: 'See outstanding balances per customer, age them, and send payment reminders.', plan: 'AI' },
      { label: 'Order tracking and partial fulfilment', how: 'Track each order from draft to delivered, including partial shipments.', plan: 'AI' },
      { label: 'Quotations to orders', how: 'Issue quotations, then convert accepted ones into sales orders without re-entry.', plan: 'Core' },
    ],
    products: ['pos', 'purchasing', 'reports'],
    faqSeeds: [
      { q: 'Can different customers see different prices?', a: 'Yes — the AI plan supports customer groups, volume discounts and per-customer price lists.' },
      { q: 'How do I track who owes me what?', a: 'Customer statements show balances and ageing; reminders can be sent from the same screen.' },
    ],
    seo: seo('Wholesale trading', 'Wholesale inventory software: price lists, customer credit tracking, partial fulfilment and quotations.'),
  },
  {
    id: 5,
    name: 'Distribution and stockists',
    slug: 'distribution-and-stockists',
    category: 'Trade & distribution',
    summary:
      'Stockists sit between brand and retailer: margins depend on claims, returns and knowing exactly what is where in the godown.',
    challenges: [
      'Company schemes and claims tracked outside the system',
      'Damaged and expired returns to the company handled ad hoc',
      'No clear view of stock ageing across the warehouse',
      'Van/route sales reconciliation done on paper',
    ],
    workflows: [
      { label: 'Stock ledger with damaged quantities', how: 'On-hand, reserved and damaged quantities are tracked separately per variant.', plan: 'Core' },
      { label: 'Supplier returns', how: 'Send damaged or expired stock back against the original supplier with a proper record.', plan: 'Core' },
      { label: 'Stock-age reporting', how: 'See what has been sitting longest so capital does not quietly rot on racks.', plan: 'Core' },
      { label: 'Dispatch records', how: 'Record dispatches against orders so godown and delivery agree.', plan: 'Core' },
    ],
    products: ['stock-control', 'purchasing', 'reports'],
    faqSeeds: [
      { q: 'How are damaged goods handled?', a: 'Damaged quantities live in the stock ledger and can go back to the supplier through a recorded purchase return.' },
      { q: 'Can I see old stock?', a: 'Yes — stock-age and stagnant-stock reports surface what has not moved, so you can act before expiry.' },
    ],
    seo: seo('Distribution and stockists', 'Inventory software for stockists and distributors: damaged-stock ledger, supplier returns, stock-age reports and dispatch records.'),
  },
  {
    id: 6,
    name: 'Importers and exporters',
    slug: 'importers-and-exporters',
    category: 'Trade & distribution',
    summary:
      'Importers juggle long lead times, landed costs and consignment visibility from purchase order to warehouse receipt.',
    challenges: [
      'Weeks-long supplier lead times make reorder timing critical',
      'Goods in transit invisible until they arrive',
      'Landed cost components tracked in separate spreadsheets',
      'Consignment quantities differ from invoices and need reconciliation',
    ],
    workflows: [
      { label: 'Purchase orders with lead-time context', how: 'Track what is on order and when it should land, so receiving is expected, not surprising.', plan: 'Core' },
      { label: 'Overdue-PO monitoring', how: 'Nightly checks flag purchase orders that should have arrived by now.', plan: 'Core' },
      { label: 'Receiving reconciliation', how: 'Receive against the PO line by line, so short shipments and over-shipments are visible immediately.', plan: 'Core' },
      { label: 'Reorder suggestions with lead times', how: 'SiBorg factors supplier lead times and stock in transit into suggested quantities.', plan: 'AI' },
    ],
    products: ['purchasing', 'inventory', 'siborg'],
    faqSeeds: [
      { q: 'Does it track shipments in transit?', a: 'Purchase orders stay visible with expected dates, and overdue ones are flagged automatically.' },
      { q: 'Can it handle partial consignment receipts?', a: 'Yes — receiving is recorded per PO line, and remaining quantities stay open until received or cancelled.' },
    ],
    seo: seo('Importers and exporters', 'Inventory software for importers: long lead-time purchase orders, in-transit visibility and receiving reconciliation.'),
  },
  {
    id: 7,
    name: 'E-commerce and multichannel sellers',
    slug: 'ecommerce-and-multichannel-sellers',
    category: 'Trade & distribution',
    summary:
      'Online sellers need one stock truth across channels, disciplined order processing and a clear handle on returns that eat margin.',
    challenges: [
      'Same SKU sold on multiple channels with counts drifting apart',
      'Order picking errors from poor bin discipline',
      'Returns arriving back with no reason capture',
      'Promotions decided without margin or stock-cover evidence',
    ],
    workflows: [
      { label: 'Single stock ledger', how: 'One append-only ledger of on-hand, reserved and damaged quantities keeps every channel honest.', plan: 'Core' },
      { label: 'Order lifecycle', how: 'Track orders from draft through paid, packed, shipped and delivered states.', plan: 'Core' },
      { label: 'Return-reason analytics', how: 'Record why items come back and spot unusual return patterns early.', plan: 'AI' },
      { label: 'What-if pricing estimates', how: 'Model a price or discount change against units, revenue and margin before committing — clearly labelled estimates.', plan: 'AI' },
    ],
    products: ['inventory', 'pos', 'siborg'],
    note: 'Channel connectors (marketplace/web-store sync) are not advertised as live integrations; orders are managed in the Sikick console and connected channels should be discussed during setup.',
    faqSeeds: [
      { q: 'Does it sync with my marketplace accounts?', a: 'The console is the stock source of truth; specific channel connectors should be confirmed with Sikick during setup rather than assumed.' },
      { q: 'How do returns get analysed?', a: 'The AI plan captures return reasons and flags unusual patterns so you can fix listing or quality issues at the source.' },
    ],
    seo: seo('E-commerce and multichannel', 'Inventory software for online sellers: one stock ledger, order lifecycle, return-reason analytics and pricing what-ifs.'),
  },
  {
    id: 8,
    name: 'Pharmacies and drugstores',
    slug: 'pharmacies-and-drugstores',
    category: 'Pharma & health',
    summary:
      'Retail pharmacies manage expiry risk, Schedule-disciplined records and substitution pressure — starting from accurate batch-level stock.',
    challenges: [
      'Expiry write-offs from batches buried behind newer stock',
      'Salt/substitute lookups slowed by poor product naming',
      'Supplier claims for expired returns tracked in registers',
      'Purchase timing guesses cause both stockouts and overstock',
    ],
    workflows: [
      { label: 'Batch and expiry alerts', how: 'Track every batch with its expiry date and get alerts before stock becomes unsellable.', plan: 'AI' },
      { label: 'Barcode billing', how: 'Scan strips at the till so the right batch leaves the shelf and the ledger stays exact.', plan: 'Core' },
      { label: 'Supplier returns', how: 'Return expired or damaged stock to distributors with a documented purchase return.', plan: 'Core' },
      { label: 'Reorder suggestions', how: 'SiBorg drafts order quantities from your own sales velocity and current stock, for review.', plan: 'AI' },
    ],
    products: ['inventory', 'pos', 'siborg'],
    note: 'Sikick provides inventory, billing and purchasing workflows for pharmacies. It is not presented as a certified pharmacy-compliance system; verify your specific regulatory record-keeping requirements during consultation.',
    faqSeeds: [
      { q: 'Does it track medicine expiry?', a: 'Yes — batch-level expiry tracking with alerts is part of the AI plan.' },
      { q: 'Is it a pharmacy compliance system?', a: 'No. It manages stock, sales and purchasing; statutory pharmacy records remain your regulatory responsibility.' },
    ],
    seo: seo('Pharmacy', 'Pharmacy inventory software: batch and expiry tracking, barcode billing, supplier returns and reorder suggestions.'),
  },
  {
    id: 9,
    name: 'Pharmaceutical distributors',
    slug: 'pharmaceutical-distributors',
    category: 'Pharma & health',
    summary:
      'Pharma distribution is claims, batches and credit: hundreds of pharmacy accounts buying thousands of dated SKUs on terms.',
    challenges: [
      'Expiry claims and credit notes from both directions',
      'Batch-wise stock needed for every outward supply',
      'Retailer outstanding balances difficult to age and chase',
      'Scheme and free-quantity quantities confusing physical counts',
    ],
    workflows: [
      { label: 'Batch-wise stock ledger', how: 'Every receipt and issue is recorded against its batch, so outward supplies stay traceable.', plan: 'AI' },
      { label: 'Customer credit and reminders', how: 'Track outstanding balances per pharmacy, age them and send payment reminders.', plan: 'AI' },
      { label: 'Supplier and customer returns', how: 'Process returns in both directions with reasons and proper documentation.', plan: 'Core' },
      { label: 'Price lists per customer group', how: 'Maintain trade, scheme and special rates without manual lookup errors.', plan: 'AI' },
    ],
    products: ['stock-control', 'purchasing', 'reports'],
    note: 'Sikick supports batch-level inventory and credit workflows for pharma distribution. It does not claim regulatory distribution licensing or compliance certification.',
    faqSeeds: [
      { q: 'Can I see which batch went to which retailer?', a: 'Batch-level stock records track issues per batch; detailed dispatch documentation is maintained per order.' },
      { q: 'How are credit limits handled?', a: 'The AI plan shows outstanding balances and credit exposure per customer, with reminders.' },
    ],
    seo: seo('Pharmaceutical distribution', 'Pharma distribution inventory software: batch-wise stock, credit tracking, returns and customer price lists.'),
  },
  {
    id: 10,
    name: 'Pharmaceutical manufacturing',
    slug: 'pharmaceutical-manufacturing',
    category: 'Pharma & health',
    summary:
      'Pharma manufacturing needs validated batch production, strict traceability and documentation that goes well beyond stock-keeping.',
    challenges: [
      'Batch production records and yield reconciliation',
      'Raw-material traceability into finished batches',
      'Stability, retention and controlled-substance storage discipline',
      'Regulatory documentation across every production step',
    ],
    workflows: [
      { label: 'Raw-material inventory', how: 'Track APIs, excipients and packaging with the same stock ledger discipline as finished goods.', plan: 'Core' },
      { label: 'Batch and expiry tracking', how: 'Carry batch identity and expiry through raw materials and finished stock.', plan: 'AI' },
      { label: 'Purchasing and supplier records', how: 'Manage vendor POs, receipts and payments for materials and packaging.', plan: 'Core' },
    ],
    products: ['stock-control', 'purchasing'],
    note: 'Manufacturing workflows (BOMs, production runs, batch records) are captured through Enterprise consultation. The full manufacturing workflow is not advertised as available until its UI and behavior are verified — share your requirements through the quote path.',
    faqSeeds: [
      { q: 'Can it run batch production?', a: 'Manufacturing capability is scoped through Enterprise consultation — tell us your BOM and batch-record requirements in a quote request.' },
      { q: 'What works today?', a: 'Raw-material and finished-goods inventory, batch/expiry tracking, purchasing and supplier records.' },
    ],
    seo: seo('Pharmaceutical manufacturing', 'Inventory foundations for pharma manufacturing: batch tracking and purchasing today; production workflows scoped via Enterprise consultation.'),
  },
  {
    id: 11,
    name: 'Medical supplies and consumables',
    slug: 'medical-supplies-and-consumables',
    category: 'Pharma & health',
    summary:
      'Consumable suppliers move gloves, syringes, dressings and diagnostics at volume — expiry, lots and institutional credit dominate.',
    challenges: [
      'Sterile and dated lots that must not expire on the shelf',
      'Bulk institutional orders shipped in parts',
      'Hospital payment cycles stretching receivables',
      'Fast-moving commodity pricing squeezing margins',
    ],
    workflows: [
      { label: 'Batch and expiry tracking', how: 'Lot-level tracking with expiry alerts keeps dated consumables rotating correctly.', plan: 'AI' },
      { label: 'Partial fulfilment', how: 'Ship what you have and track the balance against the same order.', plan: 'AI' },
      { label: 'Receivables and ageing', how: 'See which institution owes what, for how long, and send reminders.', plan: 'AI' },
      { label: 'Stock-age reporting', how: 'Catch slow lots before they become write-offs.', plan: 'Core' },
    ],
    products: ['stock-control', 'reports', 'pos'],
    faqSeeds: [
      { q: 'How do partial shipments work?', a: 'Orders track shipped versus pending quantities so institutional orders can be completed in stages.' },
      { q: 'Can it warn me about expiring lots?', a: 'Yes — expiry alerts are part of the AI plan’s batch tracking.' },
    ],
    seo: seo('Medical supplies', 'Inventory software for medical consumables: lot and expiry tracking, partial fulfilment and institutional receivables.'),
  },
  {
    id: 12,
    name: 'Medical devices and equipment',
    slug: 'medical-devices-and-equipment',
    category: 'Pharma & health',
    summary:
      'Device sellers handle high-value serialized units, warranties and installation records alongside regular consumable stock.',
    challenges: [
      'Serial-level accountability for high-value units',
      'Warranty claims needing purchase and sale history',
      'Demo and loaner units disappearing from visibility',
      'Accessories and consumables sold alongside devices',
    ],
    workflows: [
      { label: 'Serial tracking and history', how: 'Record serials per unit and look up each unit’s movement history.', plan: 'Core' },
      { label: 'Warranty lookup', how: 'Find warranty status from the serial and its sale record.', plan: 'Core' },
      { label: 'Quotation-to-order flow', how: 'Quote hospitals and convert accepted quotes into orders without retyping.', plan: 'Core' },
      { label: 'Customer records', how: 'Keep every institution’s purchases, payments and balance in one place.', plan: 'Core' },
    ],
    products: ['inventory', 'pos', 'reports'],
    faqSeeds: [
      { q: 'Can I track each unit by serial number?', a: 'Yes — serial search and per-serial history are built into the console.' },
      { q: 'How are warranties handled?', a: 'Warranty lookup ties the serial to its sale, so claim checks take seconds.' },
    ],
    seo: seo('Medical devices', 'Inventory software for medical devices: serial tracking, warranty lookup, quotations and institutional customer records.'),
  },
  {
    id: 13,
    name: 'Hospital and clinic suppliers',
    slug: 'hospital-and-clinic-suppliers',
    category: 'Pharma & health',
    summary:
      'Suppliers serving hospitals deal in contract pricing, scheduled deliveries and long payment cycles across many departments.',
    challenges: [
      'Contract rates per hospital that must apply exactly',
      'Orders split across departments and delivery schedules',
      'Payment cycles of 60–120 days needing tight receivables',
      'Product substitutions requiring careful documentation',
    ],
    workflows: [
      { label: 'Customer-specific price lists', how: 'Apply contract rates per account automatically at order time.', plan: 'AI' },
      { label: 'Order tracking', how: 'Follow each order through fulfilment, including partial deliveries.', plan: 'AI' },
      { label: 'Receivables and ageing', how: 'Keep long-cycle hospital balances visible and chased on time.', plan: 'AI' },
      { label: 'Dispatch records', how: 'Record every delivery against its order for clean reconciliation.', plan: 'Core' },
    ],
    products: ['pos', 'reports', 'purchasing'],
    faqSeeds: [
      { q: 'Can contract prices be stored per hospital?', a: 'Yes — the AI plan supports customer-specific price lists.' },
      { q: 'How do I keep track of long payment cycles?', a: 'Receivables ageing shows balances by age per account, with reminders.' },
    ],
    seo: seo('Hospital and clinic suppliers', 'Inventory software for hospital suppliers: contract pricing, scheduled fulfilment and receivables ageing.'),
  },
  {
    id: 14,
    name: 'Laboratory and diagnostics supplies',
    slug: 'laboratory-and-diagnostics-supplies',
    category: 'Pharma & health',
    summary:
      'Lab supply means reagents with strict lot and expiry discipline, cold-sensitive handling notes and institutional accounts.',
    challenges: [
      'Reagent lots with tight expiry windows',
      'Kit components tracked both as sets and individual items',
      'Institutional credit and rate contracts',
      'Short-dated stock needing fast clearance decisions',
    ],
    workflows: [
      { label: 'Batch and expiry alerts', how: 'Lot-level expiry tracking surfaces short-dated reagents in time to act.', plan: 'AI' },
      { label: 'Variants for kits and components', how: 'Sell kits and their components as linked, separately tracked SKUs.', plan: 'Core' },
      { label: 'Customer price lists', how: 'Maintain lab-specific contract rates per account.', plan: 'AI' },
      { label: 'Slow-mover detection', how: 'SiBorg flags dated, slow stock and drafts reviewable clearance proposals.', plan: 'AI' },
    ],
    products: ['inventory', 'siborg', 'reports'],
    note: 'Sikick tracks inventory, lots and expiry. It does not provide cold-chain temperature telemetry or regulated lab-quality documentation.',
    faqSeeds: [
      { q: 'Does it handle reagent expiry?', a: 'Yes — batch and expiry tracking with alerts is part of the AI plan.' },
      { q: 'Does it monitor cold storage?', a: 'No — temperature telemetry is outside the product; inventory and expiry workflows are covered.' },
    ],
    seo: seo('Laboratory supplies', 'Inventory software for lab and diagnostics supplies: lot and expiry tracking, kit variants and contract pricing.'),
  },
  {
    id: 15,
    name: 'Dental products and equipment',
    slug: 'dental-products-and-equipment',
    category: 'Pharma & health',
    summary:
      'Dental suppliers mix dated consumables (impression materials, composites) with serialized equipment, handpieces and warranty service.',
    challenges: [
      'Short-shelf-life materials expiring in storage',
      'Equipment serials and warranty histories scattered',
      'Clinic accounts on monthly billing cycles',
      'Small parts and burs with hundreds of near-identical SKUs',
    ],
    workflows: [
      { label: 'Batch and expiry tracking', how: 'Keep composites and materials rotating before they expire.', plan: 'AI' },
      { label: 'Serial and warranty records', how: 'Track equipment by serial with warranty lookup at claim time.', plan: 'Core' },
      { label: 'Precise SKU and barcode system', how: 'Separate near-identical parts with clear SKUs and printed labels.', plan: 'Core' },
      { label: 'Customer statements', how: 'Give every clinic a clean statement of purchases and balances.', plan: 'Core' },
    ],
    products: ['inventory', 'purchasing', 'reports'],
    faqSeeds: [
      { q: 'Can I manage both consumables and equipment?', a: 'Yes — batches and expiry for materials, serials and warranty for equipment, in one catalog.' },
      { q: 'How are clinic accounts handled?', a: 'Customer records hold orders, payments and balances with statements.' },
    ],
    seo: seo('Dental products', 'Inventory software for dental suppliers: expiry tracking for materials, serials and warranty for equipment.'),
  },
  {
    id: 16,
    name: 'Veterinary medicines and supplies',
    slug: 'veterinary-medicines-and-supplies',
    category: 'Pharma & health',
    summary:
      'Vet suppliers serve clinics, farms and pet owners with dated medicines, feed additives and equipment across a wide area.',
    challenges: [
      'Expiry risk on slow veterinary formulations',
      'Rural delivery routes with informal order capture',
      'Mixed customer base: clinics, farmers, retail counters',
      'Seasonal demand swings tied to livestock cycles',
    ],
    workflows: [
      { label: 'Batch and expiry alerts', how: 'Track dated formulations and act before they expire.', plan: 'AI' },
      { label: 'Quotations and orders', how: 'Convert phone and WhatsApp enquiries into proper quotes and orders.', plan: 'Core' },
      { label: 'Customer groups and price lists', how: 'Different rates for clinics, farmers and retail buyers, applied consistently.', plan: 'AI' },
      { label: 'Dispatch records', how: 'Record what left on which route against which order.', plan: 'Core' },
    ],
    products: ['pos', 'purchasing', 'reports'],
    faqSeeds: [
      { q: 'Can it handle seasonal demand?', a: 'Sales history feeds reports and AI reorder suggestions, so seasonal patterns show up in your own numbers.' },
      { q: 'Does it support different customer rates?', a: 'Yes — customer groups and price lists are part of the AI plan.' },
    ],
    seo: seo('Veterinary supplies', 'Inventory software for veterinary suppliers: expiry tracking, customer price lists, quotations and dispatch records.'),
  },
  {
    id: 17,
    name: 'Nutraceuticals and supplements',
    slug: 'nutraceuticals-and-supplements',
    category: 'Pharma & health',
    summary:
      'Supplement brands and sellers manage flavour/size variants, dated lots and promotional cycles across retail and online channels.',
    challenges: [
      'Flavour and size variant explosion per product line',
      'Batch dating critical for quality perception',
      'Heavy discounting cycles needing margin visibility',
      'Bundles and combos sold alongside single units',
    ],
    workflows: [
      { label: 'Variant catalog', how: 'Keep flavours, sizes and bundles structured with individual SKUs and barcodes.', plan: 'Core' },
      { label: 'Batch and expiry tracking', how: 'Date every lot and get alerts as best-before windows close.', plan: 'AI' },
      { label: 'Discounts and price lists', how: 'Run promotions with recorded, consistent pricing rather than ad-hoc till discounts.', plan: 'Core' },
      { label: 'Sales insights', how: 'See which variants actually move and which flavours are quietly tying up capital.', plan: 'AI' },
    ],
    products: ['inventory', 'pos', 'siborg'],
    faqSeeds: [
      { q: 'Can bundles be tracked properly?', a: 'Bundles are their own SKUs with stock tracked per unit; component-level kitting is on the Enterprise roadmap conversation.' },
      { q: 'How do I see which flavours sell?', a: 'Sales reports and AI insights rank movement by variant.' },
    ],
    seo: seo('Nutraceuticals', 'Inventory software for supplements: flavour and size variants, batch dating, promotions and sales insights.'),
  },
  {
    id: 18,
    name: 'Optical and eyewear retail',
    slug: 'optical-and-eyewear-retail',
    category: 'Retail & specialty',
    summary:
      'Optical stores combine frame retail with lens orders and prescription-linked customer records.',
    challenges: [
      'Frames tracked by brand, model, colour and size',
      'Lens orders with long supplier lead times',
      'Customer prescription history tied to purchases',
      'Slow frame styles tying up display capital',
    ],
    workflows: [
      { label: 'Variant catalog with barcodes', how: 'Track every frame variant precisely with its own SKU and label.', plan: 'Core' },
      { label: 'Purchase orders with lead times', how: 'Manage lens and frame orders with expected dates and overdue flags.', plan: 'Core' },
      { label: 'Customer records', how: 'Keep each customer’s purchase and payment history in one place.', plan: 'Core' },
      { label: 'Stagnant-stock report', how: 'Identify frames that have stopped selling so you can rotate the display.', plan: 'Core' },
    ],
    products: ['inventory', 'pos', 'purchasing'],
    faqSeeds: [
      { q: 'Can it handle lens orders?', a: 'Lens purchasing runs through purchase orders with lead-time tracking; prescription data itself stays in your clinical records.' },
      { q: 'How do I find slow frames?', a: 'The stagnant-stock report lists variants that have not moved recently.' },
    ],
    seo: seo('Optical retail', 'Inventory software for optical stores: frame variants, lens purchase orders, customer records and slow-stock reports.'),
  },
  {
    id: 19,
    name: 'Beauty and cosmetics',
    slug: 'beauty-and-cosmetics',
    category: 'Beauty & care',
    summary:
      'Beauty retail moves shades, batches and promotions fast — stock accuracy directly shapes the counter experience.',
    challenges: [
      'Shade-level variants across every product line',
      'Tester and demo stock leaking from counts',
      'Frequent promotional bundles and gift sets',
      'Expiry on skincare and cosmetics lines',
    ],
    workflows: [
      { label: 'Variant catalog', how: 'Every shade and size gets its own SKU, barcode and stock count.', plan: 'Core' },
      { label: 'Stock adjustments with reasons', how: 'Record testers and damages explicitly so counts stay trustworthy.', plan: 'Core' },
      { label: 'Batch and expiry alerts', how: 'Date-sensitive lines get expiry warnings before they become waste.', plan: 'AI' },
      { label: 'Sales insights', how: 'See which shades and lines drive revenue and which quietly sit.', plan: 'AI' },
    ],
    products: ['inventory', 'pos', 'siborg'],
    faqSeeds: [
      { q: 'How do I track testers?', a: 'Adjust them out of saleable stock with a reason, keeping sellable counts accurate.' },
      { q: 'Can it alert on expiring skincare?', a: 'Yes — batch and expiry tracking with alerts is in the AI plan.' },
    ],
    seo: seo('Beauty and cosmetics', 'Inventory software for beauty retail: shade variants, tester adjustments, expiry alerts and sales insights.'),
  },
  {
    id: 20,
    name: 'Personal care and hygiene',
    slug: 'personal-care-and-hygiene',
    category: 'Beauty & care',
    summary:
      'Personal care distribution is high-volume, promotion-driven FMCG movement where fill rates and dated stock decide profitability.',
    challenges: [
      'High SKU velocity with constant promotions',
      'Dated stock rotation across the warehouse',
      'Retailer schemes creating billing complexity',
      'Returns from expiry and damage claims',
    ],
    workflows: [
      { label: 'Batch and expiry tracking', how: 'Rotate dated lots correctly and catch short-dated stock early.', plan: 'AI' },
      { label: 'Customer price lists', how: 'Apply scheme and contract pricing consistently per retailer.', plan: 'AI' },
      { label: 'Supplier and customer returns', how: 'Process expiry and damage returns with proper records both ways.', plan: 'Core' },
      { label: 'Stock-age reporting', how: 'Spot ageing stock before it becomes a claim.', plan: 'Core' },
    ],
    products: ['stock-control', 'reports', 'purchasing'],
    faqSeeds: [
      { q: 'How are schemes handled?', a: 'Customer groups and price lists apply scheme rates at order time in the AI plan.' },
      { q: 'Can I track expiry claims?', a: 'Yes — returns are recorded with reasons and linked to the original party.' },
    ],
    seo: seo('Personal care distribution', 'Inventory software for personal care and hygiene: dated stock rotation, scheme pricing and returns management.'),
  },
  {
    id: 21,
    name: 'Food and beverage retail',
    slug: 'food-and-beverage-retail',
    category: 'Grocery & food',
    summary:
      'Specialty food shops — gourmet, imported, health — juggle small-batch suppliers, expiry discipline and curious customers asking for provenance.',
    challenges: [
      'Small suppliers with irregular delivery schedules',
      'Imported items with long, uncertain lead times',
      'Expiry management across artisanal short-shelf-life stock',
      'Tasting and sampling stock leaking from inventory',
    ],
    workflows: [
      { label: 'Supplier records and POs', how: 'Track many small suppliers, their orders and their payment terms in one place.', plan: 'Core' },
      { label: 'Batch and expiry tracking', how: 'Date every artisanal lot and sell it in the right order.', plan: 'AI' },
      { label: 'Stock adjustments with reasons', how: 'Record sampling and tasting transparently instead of losing count.', plan: 'Core' },
      { label: 'Reorder suggestions', how: 'SiBorg factors lead times when drafting your next order quantities.', plan: 'AI' },
    ],
    products: ['purchasing', 'inventory', 'siborg'],
    faqSeeds: [
      { q: 'Can it manage many small suppliers?', a: 'Yes — supplier records, POs and payment tracking are core console features.' },
      { q: 'How is sampling stock handled?', a: 'Reasoned stock adjustments keep the ledger honest about what left and why.' },
    ],
    seo: seo('Food and beverage retail', 'Inventory software for specialty food retail: small-supplier purchasing, expiry tracking and reorder suggestions.'),
  },
  {
    id: 22,
    name: 'Food processing and packaging',
    slug: 'food-processing-and-packaging',
    category: 'Manufacturing & processing',
    summary:
      'Processors convert raw ingredients into packaged goods — needing raw-material stock discipline today and production workflows scoped carefully.',
    challenges: [
      'Raw ingredients with their own expiry and lot requirements',
      'Packaging materials inventory diverging from production plans',
      'Finished-goods dating tied to production batches',
      'Yield and wastage visibility between intake and output',
    ],
    workflows: [
      { label: 'Raw-material inventory', how: 'Track ingredients and packaging with the same ledger discipline as finished goods.', plan: 'Core' },
      { label: 'Batch and expiry tracking', how: 'Carry lot and date information through both ingredients and finished stock.', plan: 'AI' },
      { label: 'Purchasing and receiving', how: 'Manage supplier orders for materials with proper receiving reconciliation.', plan: 'Core' },
    ],
    products: ['stock-control', 'purchasing'],
    note: 'Production-run and BOM workflows are gathered through Enterprise consultation; the complete manufacturing workflow is not advertised as available until verified.',
    faqSeeds: [
      { q: 'Does it run production batches?', a: 'Manufacturing workflows are scoped via Enterprise consultation — share your BOM and yield requirements in a quote request.' },
      { q: 'What works today?', a: 'Ingredient and packaging inventory, batch/expiry tracking and supplier purchasing.' },
    ],
    seo: seo('Food processing', 'Inventory foundations for food processing: ingredient and packaging stock with batch tracking; production workflows via Enterprise.'),
  },
  {
    id: 23,
    name: 'Fresh produce and produce markets',
    slug: 'fresh-produce-and-produce-markets',
    category: 'Grocery & food',
    summary:
      'Produce trading is daily-price, daily-stock business: what arrives in the morning must be visible, priced and moving by afternoon.',
    challenges: [
      'Stock arriving and selling within the same day',
      'Quality grading creating multiple sellable classes per item',
      'Spoilage needing immediate, reasoned write-offs',
      'Daily price changes across the whole board',
    ],
    workflows: [
      { label: 'Fast receiving and adjustments', how: 'Record arrivals quickly and write off spoilage with a reason the same day.', plan: 'Core' },
      { label: 'Variants for grades', how: 'Track grade A, B and loose stock as separate sellable variants.', plan: 'Core' },
      { label: 'Standard discounts', how: 'Re-price ageing stock cleanly at the counter with recorded discounts.', plan: 'Core' },
      { label: 'Daily sales reports', how: 'Close every day knowing exactly what sold, what was wasted and what is left.', plan: 'Core' },
    ],
    products: ['pos', 'inventory', 'reports'],
    faqSeeds: [
      { q: 'Is it fast enough for morning markets?', a: 'Receiving and adjustments are quick ledger operations — designed for daily-stock businesses.' },
      { q: 'How is spoilage tracked?', a: 'Reasoned adjustments record spoilage quantities daily, so reports show true wastage.' },
    ],
    seo: seo('Fresh produce', 'Inventory software for produce markets: fast receiving, grade variants, spoilage adjustments and daily reports.'),
  },
  {
    id: 24,
    name: 'Dairy products and cold-chain stock',
    slug: 'dairy-and-cold-chain-stock',
    category: 'Grocery & food',
    summary:
      'Dairy distribution is the tightest expiry game in food: days, not months, between receipt and write-off.',
    challenges: [
      'Very short shelf life demanding strict first-expiry-first-out',
      'Daily route deliveries with morning returns',
      'Crate and packaging tracking alongside the product',
      'Demand varying sharply by weekday and season',
    ],
    workflows: [
      { label: 'Batch and expiry alerts', how: 'Short-dated batches surface immediately so they move first.', plan: 'AI' },
      { label: 'Order and dispatch records', how: 'Track daily route orders and what actually left the cold room.', plan: 'Core' },
      { label: 'Returns processing', how: 'Record morning returns with reasons and process supplier claims.', plan: 'Core' },
      { label: 'Sales insights', how: 'See weekday and seasonal patterns in your own sales history.', plan: 'AI' },
    ],
    products: ['stock-control', 'reports', 'siborg'],
    note: 'Sikick tracks stock, batches and expiry. Cold-chain temperature telemetry (sensors, logger integration) is outside the product.',
    faqSeeds: [
      { q: 'Does it monitor fridge temperature?', a: 'No — temperature telemetry is outside the product; batch, expiry and route workflows are covered.' },
      { q: 'How are daily returns handled?', a: 'Returns with reasons are recorded against customers, keeping stock and claims clean.' },
    ],
    seo: seo('Dairy distribution', 'Inventory software for dairy: short-dated batch tracking, route dispatch, returns and demand insights.'),
  },
  {
    id: 25,
    name: 'Meat and seafood suppliers',
    slug: 'meat-and-seafood-suppliers',
    category: 'Grocery & food',
    summary:
      'Meat and seafood trading combines weight-based selling, same-day freshness pressure and hotel/restaurant accounts on credit.',
    challenges: [
      'Weight-based pricing with catch-weight quantities',
      'Same-day and next-day freshness windows',
      'HoReCa accounts with weekly billing cycles',
      'Yield differences between whole and cut product',
    ],
    workflows: [
      { label: 'Variants and precise quantities', how: 'Sell by weight with quantity-accurate variants per cut and pack.', plan: 'Core' },
      { label: 'Batch and expiry tracking', how: 'Date every lot so the freshest-window stock sells first.', plan: 'AI' },
      { label: 'Customer accounts and statements', how: 'Run weekly hotel and restaurant billing with clean statements.', plan: 'Core' },
      { label: 'Daily dispatch records', how: 'Record what went out to which account each morning.', plan: 'Core' },
    ],
    products: ['pos', 'stock-control', 'reports'],
    faqSeeds: [
      { q: 'Can it sell by weight?', a: 'Yes — quantities are precise per variant, and billing reflects the actual weight sold.' },
      { q: 'How do weekly hotel accounts work?', a: 'Customer records accumulate orders and payments with statements for each account.' },
    ],
    seo: seo('Meat and seafood', 'Inventory software for meat and seafood suppliers: weight-based selling, freshness dating and HoReCa accounts.'),
  },
  {
    id: 26,
    name: 'Bakeries and confectioners',
    slug: 'bakeries-and-confectioners',
    category: 'Grocery & food',
    summary:
      'Bakeries balance daily fresh production with packaged lines and ingredient purchasing — morning demand decides the day.',
    challenges: [
      'Fresh lines with same-day sell-by reality',
      'Ingredient stock (flour, butter, chocolate) running production',
      'Custom and advance orders alongside counter sales',
      'Packaged biscuits and confectionery with longer dates',
    ],
    workflows: [
      { label: 'Counter POS', how: 'Fast morning billing with cash, UPI and QR tenders.', plan: 'Core' },
      { label: 'Ingredient inventory', how: 'Track raw ingredients with the same ledger as finished goods.', plan: 'Core' },
      { label: 'Advance orders', how: 'Record custom cake and bulk orders with customer details and delivery dates.', plan: 'Core' },
      { label: 'Batch and expiry alerts', how: 'Keep packaged and ingredient lots rotating by date.', plan: 'AI' },
    ],
    products: ['pos', 'inventory', 'purchasing'],
    note: 'Recipe/production-run management is gathered through Enterprise consultation; today’s console covers ingredients, finished stock, orders and sales.',
    faqSeeds: [
      { q: 'Can it manage custom cake orders?', a: 'Yes — orders carry customer details and dates; production planning itself is an Enterprise consultation topic.' },
      { q: 'Does it track ingredient stock?', a: 'Yes — ingredients live in the same stock ledger as sellable products.' },
    ],
    seo: seo('Bakeries', 'Inventory software for bakeries: counter POS, ingredient stock, advance orders and expiry tracking.'),
  },
  {
    id: 27,
    name: 'Packaged food brands',
    slug: 'packaged-food-brands',
    category: 'Manufacturing & processing',
    summary:
      'Emerging food brands sell through distributors and their own channels while watching batches, schemes and slow SKUs.',
    challenges: [
      'Distributor and direct stock in one view',
      'Batch coding required across every production lot',
      'Scheme discounting eroding margin invisibly',
      'Long-tail SKUs tying up working capital',
    ],
    workflows: [
      { label: 'Batch and expiry tracking', how: 'Code and track every production lot through to dispatch.', plan: 'AI' },
      { label: 'Customer groups and price lists', how: 'Run distributor, modern trade and direct pricing without confusion.', plan: 'AI' },
      { label: 'Dispatch records', how: 'Document every outward movement against its order.', plan: 'Core' },
      { label: 'Slow-mover detection', how: 'SiBorg flags weak SKUs and drafts reviewable clearance proposals.', plan: 'AI' },
    ],
    products: ['stock-control', 'reports', 'siborg'],
    note: 'Production planning is scoped via Enterprise consultation; inventory, batches, pricing and dispatch are covered today.',
    faqSeeds: [
      { q: 'Can I see which SKUs are not working?', a: 'Yes — slow-mover analysis and sales insights show capital tied up in weak lines.' },
      { q: 'Does it handle distributor pricing?', a: 'Customer groups and price lists handle channel-specific rates in the AI plan.' },
    ],
    seo: seo('Packaged food brands', 'Inventory software for food brands: batch coding, channel pricing, dispatch and slow-mover detection.'),
  },
  {
    id: 28,
    name: 'Beverage distributors',
    slug: 'beverage-distributors',
    category: 'Trade & distribution',
    summary:
      'Beverage distribution runs on cases, empties and route discipline — high volume, thin margin, constant rotation.',
    challenges: [
      'Case and unit conversions across pack formats',
      'Empty crate and bottle tracking',
      'Route-wise delivery and collection discipline',
      'Seasonal demand spikes straining stock planning',
    ],
    workflows: [
      { label: 'Pack-size variants', how: 'Track cases, crates and singles as linked variants of each beverage.', plan: 'Core' },
      { label: 'Dispatch and delivery records', how: 'Record route dispatches against orders so the truck and the books agree.', plan: 'Core' },
      { label: 'Customer credit tracking', how: 'Keep retailer balances visible with ageing and reminders.', plan: 'AI' },
      { label: 'Reorder suggestions', how: 'SiBorg drafts order quantities from your sales patterns for review.', plan: 'AI' },
    ],
    products: ['stock-control', 'reports', 'siborg'],
    faqSeeds: [
      { q: 'How are case conversions handled?', a: 'Variants keep pack sizes structured so stock stays accurate at each level.' },
      { q: 'Can I plan for festival demand?', a: 'Sales history and AI insights surface your own seasonal patterns for planning.' },
    ],
    seo: seo('Beverage distribution', 'Inventory software for beverage distributors: pack variants, route dispatch, credit tracking and reorder suggestions.'),
  },
  {
    id: 29,
    name: 'Restaurant and hospitality suppliers',
    slug: 'restaurant-and-hospitality-suppliers',
    category: 'Trade & distribution',
    summary:
      'HoReCa suppliers deliver everything from oil to packaging on tight morning schedules with weekly account cycles.',
    challenges: [
      'Wide SKU range across food, packaging and disposables',
      'Standing weekly orders with frequent modifications',
      'Chef-driven brand preferences changing mid-order',
      'Credit cycles stretching 30–45 days',
    ],
    workflows: [
      { label: 'Broad catalog with variants', how: 'Manage thousands of food and non-food SKUs with clean variants and barcodes.', plan: 'Core' },
      { label: 'Quotations and orders', how: 'Convert standing arrangements into trackable orders with modifications.', plan: 'Core' },
      { label: 'Receivables and reminders', how: 'Age restaurant balances and chase them on schedule.', plan: 'AI' },
      { label: 'Dispatch records', how: 'Prove what was delivered on which morning run.', plan: 'Core' },
    ],
    products: ['purchasing', 'reports', 'pos'],
    faqSeeds: [
      { q: 'Can it handle weekly standing orders?', a: 'Yes — repeat orders are quick to raise from customer and order history.' },
      { q: 'How are 45-day credit cycles managed?', a: 'Receivables ageing shows each account’s balance by age, with reminders.' },
    ],
    seo: seo('HoReCa suppliers', 'Inventory software for restaurant suppliers: broad catalogs, standing orders, receivables and dispatch records.'),
  },
  {
    id: 30,
    name: 'Apparel and fashion retail',
    slug: 'apparel-and-fashion-retail',
    category: 'Fashion & lifestyle',
    summary:
      'Fashion retail lives on size-colour matrices, season drops and end-of-season clearance executed at the right moment.',
    challenges: [
      'Size × colour variant matrices across every style',
      'Broken size runs killing full-price sell-through',
      'Seasonal stock needing timed markdowns',
      'Online and store stock arguing with each other',
    ],
    workflows: [
      { label: 'Variant matrices with barcodes', how: 'Every size and colour of every style gets its own tracked SKU and label.', plan: 'Core' },
      { label: 'Broken-assortment alerts', how: 'Get flagged when a style is missing expected sizes or colours.', plan: 'Core' },
      { label: 'Clearance campaign drafts', how: 'SiBorg drafts markdown proposals from your slow and seasonal stock, for review.', plan: 'AI' },
      { label: 'Sales by variant reports', how: 'See which sizes and colours actually sell so next season’s buy improves.', plan: 'Core' },
    ],
    products: ['inventory', 'pos', 'siborg'],
    faqSeeds: [
      { q: 'How are broken size runs detected?', a: 'The console flags styles missing expected sizes so you can merge, transfer or markdown.' },
      { q: 'Can it help time end-of-season sales?', a: 'AI clearance drafts propose which stock to mark down and by how much, based on movement.' },
    ],
    seo: seo('Apparel retail', 'Fashion inventory software: size-colour matrices, broken-assortment alerts, clearance drafts and variant reports.'),
  },
  {
    id: 31,
    name: 'Footwear retail and wholesale',
    slug: 'footwear-retail-and-wholesale',
    category: 'Fashion & lifestyle',
    summary:
      'Footwear adds width and half-sizes to the matrix problem, plus strong brand-driven seasonality.',
    challenges: [
      'Deep size runs per style with slow tail sizes',
      'Pairs versus cartons confusion in stock counts',
      'Season-end dead stock in odd sizes',
      'Wholesale and retail pricing on the same catalog',
    ],
    workflows: [
      { label: 'Variant matrices', how: 'Track every size precisely, including half sizes, with individual SKUs.', plan: 'Core' },
      { label: 'Pack and unit variants', how: 'Keep cartons and pairs structured so counts are never ambiguous.', plan: 'Core' },
      { label: 'Customer price lists', how: 'Wholesale and retail rates applied cleanly from one catalog.', plan: 'AI' },
      { label: 'Slow-mover detection', how: 'Spot the odd sizes tying up capital and act on them.', plan: 'AI' },
    ],
    products: ['inventory', 'reports', 'siborg'],
    faqSeeds: [
      { q: 'Can it handle cartons and pairs?', a: 'Yes — pack-size variants keep both levels accurate.' },
      { q: 'How do I find dead sizes?', a: 'Stagnant-stock and slow-mover reports surface sizes that have stopped selling.' },
    ],
    seo: seo('Footwear', 'Footwear inventory software: size matrices, carton-pair variants, wholesale pricing and slow-mover detection.'),
  },
  {
    id: 32,
    name: 'Jewellery and precious goods',
    slug: 'jewellery-and-precious-goods',
    category: 'Fashion & lifestyle',
    summary:
      'Jewellery retail tracks high-value pieces by design, weight and purity — where a single counting error is a real loss.',
    challenges: [
      'Each piece effectively unique by weight and purity',
      'Metal rate movements affecting pricing daily',
      'Old-gold exchange alongside new sales',
      'Trust-critical documentation for every transaction',
    ],
    workflows: [
      { label: 'Detailed variant records', how: 'Record design, weight and purity attributes per piece with precise SKUs.', plan: 'Core' },
      { label: 'Metal rates reference', how: 'The console carries a metal-rates page for rate-aware pricing workflows.', plan: 'Core' },
      { label: 'Sales and exchange records', how: 'Document new sales, exchanges and payments with full history.', plan: 'Core' },
      { label: 'Audit trail', how: 'Every write is attributed and logged — critical for high-value stock.', plan: 'Core' },
    ],
    products: ['inventory', 'pos', 'reports'],
    faqSeeds: [
      { q: 'Can pieces be tracked by weight and purity?', a: 'Yes — detailed product records hold these attributes per piece.' },
      { q: 'How are old-gold exchanges recorded?', a: 'Exchanges are documented as part of the sales and returns workflows.' },
    ],
    seo: seo('Jewellery retail', 'Jewellery inventory software: piece-level records with weight and purity, metal-rate reference and full audit trail.'),
  },
  {
    id: 33,
    name: 'Watches and accessories',
    slug: 'watches-and-accessories',
    category: 'Fashion & lifestyle',
    summary:
      'Watch and accessory retail combines serialized high-value units with strap, battery and repair-parts stock.',
    challenges: [
      'Serialized units needing movement history',
      'Warranty periods differing by brand',
      'Small parts (straps, batteries, buckles) with high SKU counts',
      'Grey-market risk making provenance documentation important',
    ],
    workflows: [
      { label: 'Serial tracking and history', how: 'Every unit’s serial carries its full movement history.', plan: 'Core' },
      { label: 'Warranty lookup', how: 'Check coverage instantly from the serial and its sale record.', plan: 'Core' },
      { label: 'Small-parts catalog', how: 'Hundreds of accessory SKUs stay organized with barcodes.', plan: 'Core' },
      { label: 'Customer records', how: 'Link every unit to its buyer for service and trust.', plan: 'Core' },
    ],
    products: ['inventory', 'pos', 'reports'],
    faqSeeds: [
      { q: 'Can I trace a watch by serial?', a: 'Yes — serial search shows the unit’s complete history.' },
      { q: 'How are warranties checked?', a: 'Warranty lookup ties the serial to its sale date and terms.' },
    ],
    seo: seo('Watches and accessories', 'Inventory software for watch retail: serialized units, warranty lookup, parts catalog and customer records.'),
  },
  {
    id: 34,
    name: 'Bags and luggage',
    slug: 'bags-and-luggage',
    category: 'Fashion & lifestyle',
    summary:
      'Bags and luggage retail mixes fashion-driven models with size variants and warranty-covered hardware.',
    challenges: [
      'Model-colour-size variants across seasonal collections',
      'Warranty claims on zips, wheels and handles',
      'Slow colours from last season occupying prime space',
      'Online returns needing condition tracking',
    ],
    workflows: [
      { label: 'Variant catalog with barcodes', how: 'Track every model, colour and size as its own SKU.', plan: 'Core' },
      { label: 'Warranty lookup', how: 'Verify coverage from the sale record at claim time.', plan: 'Core' },
      { label: 'Returns with reasons', how: 'Record return reasons and conditions for every item that comes back.', plan: 'Core' },
      { label: 'Stagnant-stock report', how: 'Find the colours and models that have stopped moving.', plan: 'Core' },
    ],
    products: ['inventory', 'pos', 'reports'],
    faqSeeds: [
      { q: 'How are seasonal collections managed?', a: 'Variants and reports keep each collection visible so slow lines get marked down in time.' },
      { q: 'Can returns be condition-tracked?', a: 'Return reasons are recorded per item; detailed grading workflows are an Enterprise conversation.' },
    ],
    seo: seo('Bags and luggage', 'Inventory software for bags and luggage retail: variants, warranty lookup, returns and slow-stock reports.'),
  },
  {
    id: 35,
    name: 'Consumer electronics',
    slug: 'consumer-electronics',
    category: 'Electronics & tech',
    summary:
      'Electronics retail is serial-driven, price-volatile and EMI-heavy — margins live in attachments, warranties and old-stock timing.',
    challenges: [
      'Serialized units across phones, TVs and appliances',
      'Manufacturer price drops stranding old stock',
      'Warranty and service-ticket lookups at the counter',
      'Accessory attach-rate invisibility',
    ],
    workflows: [
      { label: 'Serial tracking and history', how: 'Every unit moves by serial — sold, returned or exchanged.', plan: 'Core' },
      { label: 'Warranty lookup', how: 'Instant coverage checks from serial at the service counter.', plan: 'Core' },
      { label: 'Stock-age reporting', how: 'Catch ageing models before the next price drop hits them.', plan: 'Core' },
      { label: 'Sales reports by category', how: 'See attach performance on accessories, not just headline units.', plan: 'Core' },
    ],
    products: ['inventory', 'pos', 'reports'],
    faqSeeds: [
      { q: 'Can I check warranty at the counter?', a: 'Yes — warranty lookup by serial gives the answer in seconds.' },
      { q: 'How do I spot risky old stock?', a: 'Stock-age and stagnant reports list models sitting longest.' },
    ],
    seo: seo('Consumer electronics', 'Electronics retail inventory software: serial tracking, warranty lookup, stock-age reports and category sales visibility.'),
  },
  {
    id: 36,
    name: 'Mobile phones and accessories',
    slug: 'mobile-phones-and-accessories',
    category: 'Electronics & tech',
    summary:
      'Mobile retail is IMEI-level accountability, razor-thin handset margins and high-velocity accessory attachment.',
    challenges: [
      'IMEI/serial accountability per handset',
      'Daily price changes from brands and online channels',
      'Hundreds of case and protector variants per model',
      'Exchange devices creating second-hand stock',
    ],
    workflows: [
      { label: 'Serial/IMEI tracking', how: 'Each handset’s IMEI is recorded with its full movement history.', plan: 'Core' },
      { label: 'Variant catalog for accessories', how: 'Keep model-specific cases and protectors precisely organized.', plan: 'Core' },
      { label: 'Sales and exchange records', how: 'Document exchanges with condition notes and proper pricing.', plan: 'Core' },
      { label: 'Stagnant-stock report', how: 'Find ageing handsets before the next launch erodes their value.', plan: 'Core' },
    ],
    products: ['inventory', 'pos', 'reports'],
    faqSeeds: [
      { q: 'Are IMEIs tracked?', a: 'Yes — serial tracking records each handset by its identifier with movement history.' },
      { q: 'How are exchanges handled?', a: 'Exchanges are documented in the sales workflow with condition notes.' },
    ],
    seo: seo('Mobile phones', 'Mobile retail inventory software: IMEI tracking, accessory variants, exchanges and stagnant-stock reports.'),
  },
  {
    id: 37,
    name: 'Computers and IT hardware',
    slug: 'computers-and-it-hardware',
    category: 'Electronics & tech',
    summary:
      'IT retail and distribution mixes serialized devices, configurable builds and corporate account billing.',
    challenges: [
      'Serials across laptops, desktops and peripherals',
      'Custom configurations assembled from component stock',
      'Corporate accounts with quotation-driven sales',
      'RMA and warranty coordination with brands',
    ],
    workflows: [
      { label: 'Serial tracking', how: 'Follow every device by serial through sale, return and RMA.', plan: 'Core' },
      { label: 'Quotations to orders', how: 'Quote corporate requirements and convert on acceptance.', plan: 'Core' },
      { label: 'Customer accounts', how: 'Manage corporate billing cycles with statements and balances.', plan: 'Core' },
      { label: 'Warranty lookup', how: 'Verify device coverage from serial and sale record.', plan: 'Core' },
    ],
    products: ['inventory', 'pos', 'purchasing'],
    note: 'Build-to-order assembly is handled through variant and order records today; full BOM/kitting is scoped via Enterprise consultation.',
    faqSeeds: [
      { q: 'Can custom PC builds be tracked?', a: 'Components and assembled units are tracked through variants and orders; formal BOM workflows are an Enterprise topic.' },
      { q: 'Does it support corporate quotes?', a: 'Yes — quotations convert to orders without re-entry.' },
    ],
    seo: seo('Computers and IT hardware', 'IT hardware inventory software: serials, quotations, corporate accounts and warranty lookup.'),
  },
  {
    id: 38,
    name: 'Electrical and electronic components',
    slug: 'electrical-and-electronic-components',
    category: 'Industrial & hardware',
    summary:
      'Component traders handle thousands of tiny SKUs — resistors to relays — where bin discipline decides picking speed.',
    challenges: [
      'Extremely high SKU counts in tiny physical sizes',
      'Near-identical parts differing by one specification',
      'Reel, strip and piece quantities needing clean conversion',
      'Obsolete stock accumulating silently',
    ],
    workflows: [
      { label: 'Precise SKU and barcode system', how: 'Separate near-identical parts with disciplined naming and labels.', plan: 'Core' },
      { label: 'Pack-size variants', how: 'Track reels, strips and pieces as linked quantity variants.', plan: 'Core' },
      { label: 'Locations and bins (rolling out)', how: 'Bin-level locating is available as the locations/bins rollout reaches your shop — confirm during setup.', plan: 'AI', gated: true },
      { label: 'Stagnant-stock report', how: 'Surface obsolescing lines before they become dead value.', plan: 'Core' },
    ],
    products: ['inventory', 'stock-control', 'reports'],
    faqSeeds: [
      { q: 'Can it handle reel-to-piece conversions?', a: 'Yes — variants keep each pack level accurate.' },
      { q: 'Are bins supported?', a: 'Location and bin features are rolling out behind feature flags; confirm availability for your shop during setup.' },
    ],
    seo: seo('Electronic components', 'Component trading inventory software: precise SKUs, pack conversions, bin locating (rolling out) and obsolescence reports.'),
  },
  {
    id: 39,
    name: 'Home appliances',
    slug: 'home-appliances',
    category: 'Electronics & tech',
    summary:
      'Appliance retail moves serialized big-ticket units with installation coordination and brand warranty workflows.',
    challenges: [
      'Serialized units with delivery and installation steps',
      'Brand warranty and extended-warranty tracking',
      'Display units needing condition flags',
      'Seasonal demand (ACs in summer, geysers in winter)',
    ],
    workflows: [
      { label: 'Serial tracking', how: 'Record every unit by serial from receipt to delivery.', plan: 'Core' },
      { label: 'Warranty lookup', how: 'Check brand and extended warranty status instantly.', plan: 'Core' },
      { label: 'Stock adjustments with reasons', how: 'Flag display and damaged units explicitly out of sellable stock.', plan: 'Core' },
      { label: 'Dispatch records', how: 'Document every delivery and installation visit.', plan: 'Core' },
    ],
    products: ['inventory', 'pos', 'reports'],
    faqSeeds: [
      { q: 'Can display units be separated?', a: 'Yes — reasoned adjustments keep display stock distinct from sellable stock.' },
      { q: 'How is seasonality handled?', a: 'Sales history and reports show your seasonal patterns; AI reorder suggestions use them.' },
    ],
    seo: seo('Home appliances', 'Appliance retail inventory software: serials, warranty lookup, display-unit adjustments and delivery records.'),
  },
  {
    id: 40,
    name: 'Furniture retail and wholesale',
    slug: 'furniture-retail-and-wholesale',
    category: 'Home & living',
    summary:
      'Furniture businesses manage bulky made-to-order and ready stock, long supplier lead times and delivery scheduling.',
    challenges: [
      'Made-to-order and ready stock in one catalog',
      'Long manufacturing and import lead times',
      'Fabric/finish variant combinations per model',
      'Delivery damage claims needing documentation',
    ],
    workflows: [
      { label: 'Variant catalog', how: 'Track models with fabric, finish and size options cleanly.', plan: 'Core' },
      { label: 'Purchase orders with lead times', how: 'Manage factory and import orders with expected dates and overdue flags.', plan: 'Core' },
      { label: 'Order tracking', how: 'Follow each customer order through production and delivery.', plan: 'AI' },
      { label: 'Dispatch and delivery records', how: 'Document deliveries so damage claims have evidence.', plan: 'Core' },
    ],
    products: ['purchasing', 'pos', 'reports'],
    faqSeeds: [
      { q: 'Can made-to-order items be tracked?', a: 'Yes — customer orders link to supplier or factory purchase orders with lead-time visibility.' },
      { q: 'How are fabric options handled?', a: 'Variants keep each finish combination as its own trackable SKU.' },
    ],
    seo: seo('Furniture', 'Furniture inventory software: variant catalogs, long-lead purchase orders, order tracking and delivery records.'),
  },
  {
    id: 41,
    name: 'Home decor and furnishings',
    slug: 'home-decor-and-furnishings',
    category: 'Home & living',
    summary:
      'Decor retail sells taste: constantly rotating collections, one-off pieces and gift-driven seasonal spikes.',
    challenges: [
      'Constantly changing collections with one-off items',
      'Visual merchandising stock scattered across the floor',
      'Festival and wedding-season demand spikes',
      'Fragile items with above-average damage rates',
    ],
    workflows: [
      { label: 'Flexible catalog', how: 'Add one-off and short-run items quickly with proper SKUs and labels.', plan: 'Core' },
      { label: 'Stock adjustments with reasons', how: 'Record breakage and display movement honestly.', plan: 'Core' },
      { label: 'POS with discounts', how: 'Run festival promotions with recorded, consistent pricing.', plan: 'Core' },
      { label: 'Sales insights', how: 'See which themes and price points actually move.', plan: 'AI' },
    ],
    products: ['inventory', 'pos', 'siborg'],
    faqSeeds: [
      { q: 'Is it practical for one-off pieces?', a: 'Yes — single-quantity SKUs are normal in the catalog model.' },
      { q: 'How is festival stock planned?', a: 'Your own sales history drives reports and AI reorder suggestions.' },
    ],
    seo: seo('Home decor', 'Inventory software for decor retail: fast-changing catalogs, damage adjustments, promotions and sales insights.'),
  },
  {
    id: 42,
    name: 'Mattresses and bedding',
    slug: 'mattresses-and-bedding',
    category: 'Home & living',
    summary:
      'Mattress retail sells comfort on trial periods and size variants, with bulky logistics and brand warranty terms.',
    challenges: [
      'Size × firmness × brand variant matrix',
      'Trial-period returns needing careful tracking',
      'Bulky warehouse and delivery coordination',
      'Long warranty periods (5–15 years) to look up',
    ],
    workflows: [
      { label: 'Variant catalog', how: 'Track every size and firmness combination as its own SKU.', plan: 'Core' },
      { label: 'Warranty lookup', how: 'Long warranties stay findable from the sale record.', plan: 'Core' },
      { label: 'Returns with reasons', how: 'Trial returns are recorded with reasons and conditions.', plan: 'Core' },
      { label: 'Dispatch records', how: 'Document deliveries for the bulky-logistics paper trail.', plan: 'Core' },
    ],
    products: ['inventory', 'pos', 'reports'],
    faqSeeds: [
      { q: 'How are trial returns handled?', a: 'Returns record the reason and link back to the original sale.' },
      { q: 'Can 10-year warranties be found quickly?', a: 'Yes — warranty lookup retrieves them from the sale record.' },
    ],
    seo: seo('Mattresses and bedding', 'Inventory software for mattress retail: size and firmness variants, warranty lookup, trial returns and delivery records.'),
  },
  {
    id: 43,
    name: 'Toys and games',
    slug: 'toys-and-games',
    category: 'Books, stationery & education',
    summary:
      'Toy retail is extreme seasonality: most of the year’s revenue lands in festival and holiday windows.',
    challenges: [
      'Festival-window demand concentration',
      'Character and trend-driven lines with short lives',
      'Age and category labeling across thousands of SKUs',
      'Post-season dead stock needing decisive clearance',
    ],
    workflows: [
      { label: 'Large variant catalog', how: 'Organize thousands of SKUs by category and age band.', plan: 'Core' },
      { label: 'Sales reports by period', how: 'Compare windows year over year from your own data.', plan: 'Core' },
      { label: 'Clearance campaign drafts', how: 'SiBorg drafts markdown proposals for post-season stock.', plan: 'AI' },
      { label: 'Reorder suggestions', how: 'Draft next season’s quantities from actual movement, for review.', plan: 'AI' },
    ],
    products: ['inventory', 'pos', 'siborg'],
    faqSeeds: [
      { q: 'How do I plan festival stock?', a: 'Period sales reports show last year’s window; AI reorder drafts use your real numbers.' },
      { q: 'How do I clear post-season stock?', a: 'Clearance drafts propose markdowns you review and approve.' },
    ],
    seo: seo('Toys and games', 'Toy retail inventory software: large catalogs, seasonal reporting, clearance drafts and reorder suggestions.'),
  },
  {
    id: 44,
    name: 'Sports and outdoor equipment',
    slug: 'sports-and-outdoor-equipment',
    category: 'Retail & specialty',
    summary:
      'Sports retail spans apparel, footwear and equipment — three variant logics in one shop, plus school and club accounts.',
    challenges: [
      'Mixed variant models: sizes, weights, specifications',
      'Seasonal sports calendars driving demand',
      'Institutional bulk orders from schools and clubs',
      'Equipment warranty and service queries',
    ],
    workflows: [
      { label: 'Flexible variant catalog', how: 'Handle size runs, weight classes and spec variants in one system.', plan: 'Core' },
      { label: 'Quotations and orders', how: 'Quote institutional requirements and convert to orders.', plan: 'Core' },
      { label: 'Customer accounts', how: 'Manage school and club billing with statements.', plan: 'Core' },
      { label: 'Warranty lookup', how: 'Check equipment coverage at the counter.', plan: 'Core' },
    ],
    products: ['inventory', 'pos', 'purchasing'],
    faqSeeds: [
      { q: 'Can it handle school bulk orders?', a: 'Yes — quotations, orders and account statements manage institutional sales.' },
      { q: 'How are seasonal sports managed?', a: 'Sales history by period keeps each season’s pattern visible.' },
    ],
    seo: seo('Sports equipment', 'Sports retail inventory software: flexible variants, institutional quotes, accounts and warranty lookup.'),
  },
  {
    id: 45,
    name: 'Books and stationery',
    slug: 'books-and-stationery',
    category: 'Books, stationery & education',
    summary:
      'Bookshops manage enormous catalogs with tiny margins per unit — returns to publishers and school-season rushes define the year.',
    challenges: [
      'Tens of thousands of titles, most selling rarely',
      'Publisher returns needing documentation',
      'School book-list season creating order chaos',
      'Stationery fast-movers alongside slow literature',
    ],
    workflows: [
      { label: 'Bulk catalog import', how: 'Load publisher catalogs by spreadsheet with validation.', plan: 'Core' },
      { label: 'Supplier returns', how: 'Send unsold titles back with proper documentation.', plan: 'Core' },
      { label: 'Quotations and orders', how: 'Handle school book lists as proper orders.', plan: 'Core' },
      { label: 'Stagnant-stock report', how: 'Identify titles to return or mark down before they yellow.', plan: 'Core' },
    ],
    products: ['inventory', 'purchasing', 'reports'],
    faqSeeds: [
      { q: 'Can publisher catalogs be imported?', a: 'Yes — spreadsheet import with column mapping and validation.' },
      { q: 'How are school lists handled?', a: 'As quotations converted to orders, with customer records per school.' },
    ],
    seo: seo('Books and stationery', 'Bookshop inventory software: catalog import, publisher returns, school orders and slow-title reports.'),
  },
  {
    id: 46,
    name: 'Office supplies',
    slug: 'office-supplies',
    category: 'Retail & specialty',
    summary:
      'Office-supply businesses serve walk-ins and monthly corporate accounts with thousands of commodity SKUs.',
    challenges: [
      'Commodity pricing pressure from online channels',
      'Corporate accounts on monthly billing',
      'Huge catalog with frequent price updates',
      'Contract rates differing per account',
    ],
    workflows: [
      { label: 'Bulk price maintenance', how: 'Update large catalogs by spreadsheet import with validation.', plan: 'Core' },
      { label: 'Customer price lists', how: 'Apply account-specific contract rates automatically.', plan: 'AI' },
      { label: 'Customer statements', how: 'Issue clean monthly statements per corporate account.', plan: 'Core' },
      { label: 'Sales insights', how: 'See which categories hold margin as commodity prices compress.', plan: 'AI' },
    ],
    products: ['inventory', 'pos', 'reports'],
    faqSeeds: [
      { q: 'Can contract rates be stored per account?', a: 'Yes — customer price lists are part of the AI plan.' },
      { q: 'How are monthly accounts billed?', a: 'Customer statements summarize each account’s purchases and balance.' },
    ],
    seo: seo('Office supplies', 'Office supply inventory software: catalog maintenance, contract pricing, monthly accounts and category insights.'),
  },
  {
    id: 47,
    name: 'School and education supplies',
    slug: 'school-and-education-supplies',
    category: 'Books, stationery & education',
    summary:
      'Education suppliers run a June-July business: uniform sets, book bundles and institutional contracts in one frantic season.',
    challenges: [
      'Extreme season concentration',
      'Bundle sales (book sets, uniform kits) needing component stock',
      'Institutional contracts with negotiated rates',
      'Size exchanges after the rush',
    ],
    workflows: [
      { label: 'Variant catalog', how: 'Track uniform sizes and bundle components as structured SKUs.', plan: 'Core' },
      { label: 'Quotations and orders', how: 'Convert institutional contracts into trackable orders.', plan: 'Core' },
      { label: 'Exchanges and returns', how: 'Process post-season size exchanges properly.', plan: 'Core' },
      { label: 'Sales reports by period', how: 'Measure each season against the last from your own data.', plan: 'Core' },
    ],
    products: ['inventory', 'pos', 'reports'],
    faqSeeds: [
      { q: 'Can bundles be handled?', a: 'Bundle SKUs sell as units; component-level kitting workflows are an Enterprise consultation topic.' },
      { q: 'How are exchanges processed?', a: 'Through the standard returns and exchange workflow with records.' },
    ],
    seo: seo('School supplies', 'Education supply inventory software: variants, institutional orders, exchanges and seasonal reporting.'),
  },
  {
    id: 48,
    name: 'Gifts and handicrafts',
    slug: 'gifts-and-handicrafts',
    category: 'Retail & specialty',
    summary:
      'Gift and craft retail trades in uniqueness: artisan batches, festival hampers and personalization work.',
    challenges: [
      'One-off artisan pieces resisting standard catalogs',
      'Festival hamper assembly from component stock',
      'Corporate gifting orders with custom requirements',
      'Fragile stock with above-average damage',
    ],
    workflows: [
      { label: 'Flexible catalog', how: 'Give one-off pieces proper SKUs without catalog bureaucracy.', plan: 'Core' },
      { label: 'Quotations and orders', how: 'Handle corporate gifting enquiries as trackable quotes and orders.', plan: 'Core' },
      { label: 'Stock adjustments with reasons', how: 'Record breakage honestly so counts stay real.', plan: 'Core' },
      { label: 'Sales insights', how: 'See which craft lines earn their shelf space.', plan: 'AI' },
    ],
    products: ['inventory', 'pos', 'siborg'],
    faqSeeds: [
      { q: 'Can hamper assembly be tracked?', a: 'Hampers sell as SKUs; component assembly workflows are an Enterprise consultation topic.' },
      { q: 'How are corporate orders handled?', a: 'As quotations converted to orders with customer records.' },
    ],
    seo: seo('Gifts and handicrafts', 'Gift retail inventory software: unique-piece catalogs, corporate orders, breakage adjustments and sales insights.'),
  },
  {
    id: 49,
    name: 'Arts and crafts materials',
    slug: 'arts-and-crafts-materials',
    category: 'Retail & specialty',
    summary:
      'Craft-supply retail serves hobbyists and institutions with thousands of small items — paints to canvases to specialty papers.',
    challenges: [
      'Very high SKU count in small, similar items',
      'Shade and size variants per medium',
      'Institutional orders from schools and studios',
      'Trend-driven craft categories rising and fading',
    ],
    workflows: [
      { label: 'Variant catalog with barcodes', how: 'Keep every shade and size labeled and countable.', plan: 'Core' },
      { label: 'Quotations and orders', how: 'Serve school and studio requirements with proper orders.', plan: 'Core' },
      { label: 'Low-stock alerts', how: 'Replenish fast-moving basics before the weekend rush.', plan: 'Core' },
      { label: 'Sales insights', how: 'Watch which craft categories are growing in your own numbers.', plan: 'AI' },
    ],
    products: ['inventory', 'pos', 'siborg'],
    faqSeeds: [
      { q: 'How are shade variants managed?', a: 'Each shade is a tracked SKU with its own barcode and stock count.' },
      { q: 'Can it handle institutional orders?', a: 'Yes — quotations, orders and customer accounts.' },
    ],
    seo: seo('Arts and crafts supplies', 'Craft supply inventory software: shade variants, institutional orders, low-stock alerts and trend insights.'),
  },
  {
    id: 50,
    name: 'Textiles and fabrics',
    slug: 'textiles-and-fabrics',
    category: 'Fashion & lifestyle',
    summary:
      'Fabric retail and wholesale sells by the metre from bolts — cut quantities, shade lots and season collections.',
    challenges: [
      'Cut-length selling from bolt stock',
      'Shade lot differences across dye batches',
      'Festival and wedding season concentration',
      'Tailor and boutique accounts on credit',
    ],
    workflows: [
      { label: 'Precise quantity tracking', how: 'Sell by the metre while the ledger keeps exact remaining lengths.', plan: 'Core' },
      { label: 'Variant catalog', how: 'Organize by fabric, design and shade with barcodes per bolt.', plan: 'Core' },
      { label: 'Customer accounts', how: 'Manage tailor and boutique credit with statements.', plan: 'Core' },
      { label: 'Sales insights', how: 'See which fabrics and price bands actually move each season.', plan: 'AI' },
    ],
    products: ['inventory', 'pos', 'reports'],
    faqSeeds: [
      { q: 'Can it sell by the metre?', a: 'Yes — quantities are precise, so partial-bolt sales keep lengths accurate.' },
      { q: 'How are boutique accounts managed?', a: 'Customer records hold orders, payments and balances with statements.' },
    ],
    seo: seo('Textiles and fabrics', 'Fabric retail inventory software: cut-length selling, shade variants, credit accounts and seasonal insights.'),
  },
  {
    id: 51,
    name: 'Apparel and textile manufacturing',
    slug: 'apparel-and-textile-manufacturing',
    category: 'Manufacturing & processing',
    summary:
      'Garment manufacturers manage fabric and trim inventory, production orders and buyer dispatches — with production workflows needing careful scoping.',
    challenges: [
      'Fabric and trim inventory feeding production',
      'Style-wise production orders across buyers',
      'Cutting and stitching wastage visibility',
      'Export dispatches with documentation requirements',
    ],
    workflows: [
      { label: 'Raw-material inventory', how: 'Track fabric, trims and accessories with full ledger discipline.', plan: 'Core' },
      { label: 'Purchasing and receiving', how: 'Manage supplier orders for materials with receiving reconciliation.', plan: 'Core' },
      { label: 'Dispatch records', how: 'Document every buyer dispatch against its order.', plan: 'Core' },
    ],
    products: ['stock-control', 'purchasing'],
    note: 'Production orders, cutting and stitching workflows are gathered through Enterprise consultation; the full manufacturing workflow is not advertised as available until verified.',
    faqSeeds: [
      { q: 'Can it run production orders?', a: 'Manufacturing workflows are scoped via Enterprise consultation — share your production process in a quote request.' },
      { q: 'What works today?', a: 'Material inventory, purchasing, supplier records and dispatch documentation.' },
    ],
    seo: seo('Apparel manufacturing', 'Inventory foundations for garment manufacturing: materials, purchasing and dispatch; production workflows via Enterprise.'),
  },
  {
    id: 52,
    name: 'Printing and paper products',
    slug: 'printing-and-paper-products',
    category: 'Manufacturing & processing',
    summary:
      'Printers manage paper stock by GSM and sheet size, job-wise consumption and finished-goods dispatch for every order.',
    challenges: [
      'Paper stock across many GSM, size and finish combinations',
      'Job-wise material consumption estimation',
      'Wastage and overrun quantities per job',
      'Finished jobs awaiting dispatch and payment',
    ],
    workflows: [
      { label: 'Variant catalog', how: 'Track paper by GSM, size and finish as structured SKUs.', plan: 'Core' },
      { label: 'Stock adjustments with reasons', how: 'Record job consumption and wastage transparently.', plan: 'Core' },
      { label: 'Order and dispatch records', how: 'Track finished jobs through delivery and payment.', plan: 'Core' },
      { label: 'Customer accounts', how: 'Run credit accounts for regular trade customers.', plan: 'Core' },
    ],
    products: ['inventory', 'purchasing', 'reports'],
    note: 'Formal job-costing and production workflows are scoped via Enterprise consultation.',
    faqSeeds: [
      { q: 'Can it do job costing?', a: 'Material consumption is tracked via adjustments; formal job-costing is an Enterprise consultation topic.' },
      { q: 'How is paper stock organized?', a: 'Variants keep GSM, size and finish combinations precise.' },
    ],
    seo: seo('Printing and paper', 'Inventory software for printers: paper variants, job consumption adjustments, dispatch and customer accounts.'),
  },
  {
    id: 53,
    name: 'Packaging materials and supplies',
    slug: 'packaging-materials-and-supplies',
    category: 'Industrial & hardware',
    summary:
      'Packaging suppliers stock cartons, films, tapes and disposables in hundreds of sizes for every industry around them.',
    challenges: [
      'Size and specification variant explosion',
      'Bulky low-value stock filling the warehouse',
      'Regular customers expecting their sizes always in stock',
      'Thin margins needing volume discipline',
    ],
    workflows: [
      { label: 'Variant catalog', how: 'Keep every size and spec as a clear, countable SKU.', plan: 'Core' },
      { label: 'Low-stock alerts', how: 'Never run a regular customer’s standard size out.', plan: 'Core' },
      { label: 'Customer price lists', how: 'Apply volume rates consistently per account.', plan: 'AI' },
      { label: 'Reorder suggestions', how: 'Draft replenishment from actual movement, reviewed by you.', plan: 'AI' },
    ],
    products: ['inventory', 'purchasing', 'siborg'],
    faqSeeds: [
      { q: 'How are volume discounts handled?', a: 'Customer price lists in the AI plan apply volume rates automatically.' },
      { q: 'Can it keep standard sizes in stock?', a: 'Low-stock alerts and reorder suggestions keep regular lines available.' },
    ],
    seo: seo('Packaging supplies', 'Packaging supplier inventory software: size variants, low-stock alerts, volume pricing and reorder suggestions.'),
  },
  {
    id: 54,
    name: 'Building materials',
    slug: 'building-materials',
    category: 'Industrial & hardware',
    summary:
      'Building-material stores move cement, steel, aggregates and finishes — heavy logistics, credit sales and contractor relationships.',
    challenges: [
      'Heavy materials with transport-coordinated deliveries',
      'Contractor credit accounts needing tight control',
      'Price volatility in cement and steel',
      'Site deliveries requiring documentation',
    ],
    workflows: [
      { label: 'Precise quantity tracking', how: 'Track bags, tonnes, pieces and bundles accurately per material.', plan: 'Core' },
      { label: 'Customer accounts and credit', how: 'Manage contractor balances with statements and reminders.', plan: 'AI' },
      { label: 'Dispatch records', how: 'Document every site delivery against its order.', plan: 'Core' },
      { label: 'Purchase orders and receiving', how: 'Manage supplier loads with proper receiving records.', plan: 'Core' },
    ],
    products: ['inventory', 'purchasing', 'reports'],
    faqSeeds: [
      { q: 'Can it handle contractor credit?', a: 'Yes — receivables tracking with ageing and reminders is in the AI plan.' },
      { q: 'How are site deliveries documented?', a: 'Dispatch records tie each delivery to its order and customer.' },
    ],
    seo: seo('Building materials', 'Building material inventory software: quantity tracking, contractor credit, dispatch records and purchasing.'),
  },
  {
    id: 55,
    name: 'Hardware and fasteners',
    slug: 'hardware-and-fasteners',
    category: 'Industrial & hardware',
    summary:
      'Hardware stores are the original high-SKU business: thousands of small parts where a good bin system is survival.',
    challenges: [
      'Enormous SKU counts in tiny, similar parts',
      'Weight and piece selling from the same bin',
      'Trade customers expecting instant availability',
      'Slow lines quietly occupying prime rack space',
    ],
    workflows: [
      { label: 'SKU and barcode discipline', how: 'Organize thousands of parts with clear naming and printed labels.', plan: 'Core' },
      { label: 'Precise quantities', how: 'Sell by piece or weight with accurate remaining counts.', plan: 'Core' },
      { label: 'Low-stock alerts', how: 'Keep trade-standard items always available.', plan: 'Core' },
      { label: 'Stagnant-stock report', how: 'Reclaim rack space from lines that stopped moving.', plan: 'Core' },
    ],
    products: ['inventory', 'pos', 'reports'],
    faqSeeds: [
      { q: 'Can it handle weight-based selling?', a: 'Yes — quantities are precise to support weight and piece sales.' },
      { q: 'How do I find dead stock?', a: 'The stagnant-stock report lists what has not moved recently.' },
    ],
    seo: seo('Hardware and fasteners', 'Hardware store inventory software: high-SKU discipline, weight and piece selling, low-stock alerts and dead-stock reports.'),
  },
  {
    id: 56,
    name: 'Paints and coatings',
    slug: 'paints-and-coatings',
    category: 'Industrial & hardware',
    summary:
      'Paint dealers manage base-plus-colorant tinting, shade cards and contractor accounts with seasonal exterior cycles.',
    challenges: [
      'Tinted shades produced from base stock',
      'Batch variation across production lots',
      'Contractor credit with project-based billing',
      'Seasonal exterior demand spikes',
    ],
    workflows: [
      { label: 'Batch tracking', how: 'Track production lots so shade batches stay consistent per project.', plan: 'AI' },
      { label: 'Customer accounts', how: 'Run contractor project billing with statements and reminders.', plan: 'AI' },
      { label: 'Variant catalog', how: 'Organize bases, finishes and pack sizes clearly.', plan: 'Core' },
      { label: 'Sales insights', how: 'Watch seasonal patterns in your own sales history.', plan: 'AI' },
    ],
    products: ['inventory', 'reports', 'siborg'],
    faqSeeds: [
      { q: 'Can tinting be managed?', a: 'Base and colorant stock is tracked; formal tinting-machine integration is an Enterprise consultation topic.' },
      { q: 'How are contractor accounts handled?', a: 'Receivables with ageing and reminders, in the AI plan.' },
    ],
    seo: seo('Paints and coatings', 'Paint dealer inventory software: batch tracking, contractor accounts, variants and seasonal insights.'),
  },
  {
    id: 57,
    name: 'Plumbing supplies',
    slug: 'plumbing-supplies',
    category: 'Industrial & hardware',
    summary:
      'Plumbing stockists carry pipes, fittings and fixtures in confusing dimension systems across brands and price tiers.',
    challenges: [
      'Diameter × schedule × material variant complexity',
      'Length-based and piece-based selling mixed',
      'Plumber loyalty driven by availability',
      'Brand-wise price tier management',
    ],
    workflows: [
      { label: 'Variant catalog', how: 'Keep dimension and material combinations as clear SKUs.', plan: 'Core' },
      { label: 'Precise quantities', how: 'Track lengths and pieces accurately per variant.', plan: 'Core' },
      { label: 'Low-stock alerts', how: 'Keep fast fittings always on the shelf.', plan: 'Core' },
      { label: 'Customer price lists', how: 'Maintain plumber and retail rates from one catalog.', plan: 'AI' },
    ],
    products: ['inventory', 'pos', 'reports'],
    faqSeeds: [
      { q: 'Can it handle length-based selling?', a: 'Yes — precise quantities keep length stock accurate.' },
      { q: 'How are plumber rates managed?', a: 'Customer price lists apply trade rates automatically in the AI plan.' },
    ],
    seo: seo('Plumbing supplies', 'Plumbing stockist inventory software: dimension variants, precise quantities, low-stock alerts and trade pricing.'),
  },
  {
    id: 58,
    name: 'Electrical supplies and switchgear',
    slug: 'electrical-supplies-and-switchgear',
    category: 'Industrial & hardware',
    summary:
      'Electrical wholesalers manage wire coils, switchgear ratings and project supply contracts with strict specification accuracy.',
    challenges: [
      'Rating and specification accuracy critical for safety',
      'Wire sold by coil and cut length',
      'Project supply contracts with staged delivery',
      'High-value switchgear needing order discipline',
    ],
    workflows: [
      { label: 'Precise variant records', how: 'Keep ratings and specifications exact per SKU.', plan: 'Core' },
      { label: 'Precise quantities', how: 'Sell wire by coil or cut length with accurate stock.', plan: 'Core' },
      { label: 'Order tracking', how: 'Manage project contracts with partial deliveries.', plan: 'AI' },
      { label: 'Quotations', how: 'Quote project requirements professionally and convert on acceptance.', plan: 'Core' },
    ],
    products: ['inventory', 'purchasing', 'reports'],
    faqSeeds: [
      { q: 'Can project deliveries be staged?', a: 'Yes — order tracking supports partial fulfilment in the AI plan.' },
      { q: 'How are specifications kept accurate?', a: 'Detailed variant records hold ratings per SKU.' },
    ],
    seo: seo('Electrical supplies', 'Electrical wholesale inventory software: specification-accurate SKUs, cut lengths, project orders and quotations.'),
  },
  {
    id: 59,
    name: 'Tools and industrial consumables',
    slug: 'tools-and-industrial-consumables',
    category: 'Industrial & hardware',
    summary:
      'Industrial suppliers feed workshops and factories their daily consumables — abrasives, cutting tools, safety gear — on account.',
    challenges: [
      'Factory accounts with monthly procurement cycles',
      'Specification-driven product selection',
      'Warranty handling on power tools',
      'Stock-out costs measured in customer downtime',
    ],
    workflows: [
      { label: 'Detailed catalog', how: 'Specification-rich SKUs with barcodes for fast counter service.', plan: 'Core' },
      { label: 'Customer accounts', how: 'Monthly factory billing with statements and reminders.', plan: 'AI' },
      { label: 'Warranty lookup', how: 'Check power-tool coverage from the sale record.', plan: 'Core' },
      { label: 'Low-stock alerts', how: 'Keep contract items perpetually available.', plan: 'Core' },
    ],
    products: ['inventory', 'pos', 'reports'],
    faqSeeds: [
      { q: 'Can it handle monthly factory accounts?', a: 'Yes — statements, ageing and reminders are in the AI plan.' },
      { q: 'How are tool warranties checked?', a: 'Warranty lookup ties the tool to its sale record.' },
    ],
    seo: seo('Industrial consumables', 'Industrial supply inventory software: specification catalogs, factory accounts, warranty lookup and availability alerts.'),
  },
  {
    id: 60,
    name: 'Industrial machinery and equipment',
    slug: 'industrial-machinery-and-equipment',
    category: 'Industrial & hardware',
    summary:
      'Machinery dealers sell few, expensive, serialized units with long sales cycles, installation and spare-parts after-sales.',
    challenges: [
      'High-value serialized units',
      'Long quotation-driven sales cycles',
      'Installation and commissioning documentation',
      'Spare-parts inventory for after-sales service',
    ],
    workflows: [
      { label: 'Serial tracking', how: 'Every machine by serial from receipt to installation.', plan: 'Core' },
      { label: 'Quotation-to-order flow', how: 'Manage long sales cycles with proper quotes and orders.', plan: 'Core' },
      { label: 'Warranty lookup', how: 'Verify coverage years after the sale.', plan: 'Core' },
      { label: 'Parts catalog', how: 'Keep spares organized with the same SKU discipline.', plan: 'Core' },
    ],
    products: ['inventory', 'pos', 'reports'],
    faqSeeds: [
      { q: 'Can machines be tracked by serial?', a: 'Yes — serial search shows each unit’s full history.' },
      { q: 'How are spare parts managed?', a: 'As standard catalog SKUs with stock tracking and barcodes.' },
    ],
    seo: seo('Industrial machinery', 'Machinery dealer inventory software: serial tracking, quotations, warranty lookup and spare-parts catalog.'),
  },
  {
    id: 61,
    name: 'Automotive parts and spares',
    slug: 'automotive-parts-and-spares',
    category: 'Automotive',
    summary:
      'Auto-parts trading is application-driven: the right part for the right vehicle, across thousands of SKUs and brands.',
    challenges: [
      'Vehicle-application fitment complexity',
      'OEM, aftermarket and brand-tier variants per part',
      'Fast-moving service parts needing availability',
      'Warranty returns on electrical and mechanical parts',
    ],
    workflows: [
      { label: 'Detailed catalog', how: 'Record make, model and application attributes per SKU.', plan: 'Core' },
      { label: 'Brand and tier variants', how: 'Keep OEM and aftermarket options clearly separated.', plan: 'Core' },
      { label: 'Low-stock alerts', how: 'Keep service-critical parts always available.', plan: 'Core' },
      { label: 'Returns with reasons', how: 'Process warranty returns with documentation.', plan: 'Core' },
    ],
    products: ['inventory', 'pos', 'reports'],
    faqSeeds: [
      { q: 'Can fitment data be stored?', a: 'Yes — product records hold application attributes per part.' },
      { q: 'How are warranty returns handled?', a: 'Through the returns workflow with reasons and supplier linkage.' },
    ],
    seo: seo('Automotive parts', 'Auto-parts inventory software: application catalogs, brand tiers, availability alerts and warranty returns.'),
  },
  {
    id: 62,
    name: 'Tyres and batteries',
    slug: 'tyres-and-batteries',
    category: 'Automotive',
    summary:
      'Tyre and battery dealers manage size/rating variants, manufacturing-date-sensitive stock and warranty registration.',
    challenges: [
      'Manufacturing-date-sensitive inventory (fresh stock sells)',
      'Size and rating variant complexity',
      'Warranty registration and claim lookups',
      'Old stock depreciating on the rack',
    ],
    workflows: [
      { label: 'Batch tracking', how: 'Track manufacturing dates so the oldest stock sells first.', plan: 'AI' },
      { label: 'Variant catalog', how: 'Organize sizes, ratings and brands precisely.', plan: 'Core' },
      { label: 'Warranty lookup', how: 'Check registered warranties at claim time.', plan: 'Core' },
      { label: 'Stock-age reporting', how: 'Flag ageing stock before it becomes unsellable.', plan: 'Core' },
    ],
    products: ['inventory', 'pos', 'reports'],
    faqSeeds: [
      { q: 'Can manufacturing dates be tracked?', a: 'Yes — batch tracking keeps date codes visible per item.' },
      { q: 'How are warranty claims checked?', a: 'Warranty lookup retrieves the sale record instantly.' },
    ],
    seo: seo('Tyres and batteries', 'Tyre and battery inventory software: date-code tracking, size variants, warranty lookup and stock-age reports.'),
  },
  {
    id: 63,
    name: 'Two-wheeler parts and accessories',
    slug: 'two-wheeler-parts-and-accessories',
    category: 'Automotive',
    summary:
      'Two-wheeler parts retail serves workshops and riders with high-velocity small parts and model-specific accessories.',
    challenges: [
      'Model-specific fitment across many brands',
      'Workshop accounts expecting trade rates',
      'High-velocity service parts (cables, pads, chains)',
      'Counterfeit-prone categories needing sourcing records',
    ],
    workflows: [
      { label: 'Application catalog', how: 'Organize parts by model and brand with barcodes.', plan: 'Core' },
      { label: 'Customer price lists', how: 'Apply workshop trade rates automatically.', plan: 'AI' },
      { label: 'Low-stock alerts', how: 'Never run out of service staples.', plan: 'Core' },
      { label: 'Supplier records', how: 'Keep sourcing documented per part for trust.', plan: 'Core' },
    ],
    products: ['inventory', 'pos', 'purchasing'],
    faqSeeds: [
      { q: 'Can workshop rates be automated?', a: 'Yes — customer price lists apply trade rates in the AI plan.' },
      { q: 'How is sourcing documented?', a: 'Supplier records link every purchase to its source.' },
    ],
    seo: seo('Two-wheeler parts', 'Two-wheeler parts inventory software: model fitment, trade pricing, availability alerts and supplier records.'),
  },
  {
    id: 64,
    name: 'Farm machinery and implements',
    slug: 'farm-machinery-and-implements',
    category: 'Agriculture',
    summary:
      'Agri-machinery dealers sell seasonal big-ticket equipment with finance-linked sales and spare-parts after-sales.',
    challenges: [
      'Seasonal sales windows tied to crop cycles',
      'High-value serialized equipment',
      'Finance and subsidy documentation per sale',
      'Spare parts and service as a parallel business',
    ],
    workflows: [
      { label: 'Serial tracking', how: 'Every machine by serial from receipt to delivery.', plan: 'Core' },
      { label: 'Warranty lookup', how: 'Check coverage seasons after the sale.', plan: 'Core' },
      { label: 'Parts catalog', how: 'Run the spares counter with proper SKU discipline.', plan: 'Core' },
      { label: 'Sales reports by period', how: 'Plan next season from this season’s actual numbers.', plan: 'Core' },
    ],
    products: ['inventory', 'pos', 'reports'],
    faqSeeds: [
      { q: 'Can finance-linked sales be recorded?', a: 'Sales records document payment method and status per transaction.' },
      { q: 'How are spares managed?', a: 'As a standard catalog with stock tracking and low-stock alerts.' },
    ],
    seo: seo('Farm machinery', 'Agri-machinery dealer inventory software: serials, warranty lookup, spares catalog and seasonal reporting.'),
  },
  {
    id: 65,
    name: 'Seeds and fertilizers',
    slug: 'seeds-and-fertilizers',
    category: 'Agriculture',
    summary:
      'Seed and fertilizer retail is the most seasonal, most date-sensitive trade in agriculture — a wrong month means dead stock.',
    challenges: [
      'Sowing-window concentration of demand',
      'Germination-sensitive dated seed stock',
      'Subsidy and scheme pricing complexity',
      'Farmer credit through the crop cycle',
    ],
    workflows: [
      { label: 'Batch and expiry tracking', how: 'Track seed lots by packing date and sell them in the right order.', plan: 'AI' },
      { label: 'Customer accounts', how: 'Manage farmer credit with statements and reminders.', plan: 'AI' },
      { label: 'Supplier returns', how: 'Return unsold seasonal stock to companies with documentation.', plan: 'Core' },
      { label: 'Sales reports by period', how: 'Compare seasons from your own sales history.', plan: 'Core' },
    ],
    products: ['inventory', 'reports', 'siborg'],
    faqSeeds: [
      { q: 'Can seed lots be date-tracked?', a: 'Yes — batch tracking with expiry-style alerts is in the AI plan.' },
      { q: 'How are company returns handled?', a: 'Through documented supplier returns linked to purchases.' },
    ],
    seo: seo('Seeds and fertilizers', 'Agri-input retail inventory software: lot dating, farmer credit, company returns and seasonal reporting.'),
  },
  {
    id: 66,
    name: 'Agrochemicals and crop-care supplies',
    slug: 'agrochemicals-and-crop-care-supplies',
    category: 'Agriculture',
    summary:
      'Crop-care retail handles regulated chemicals with expiry discipline, seasonal demand and recommendation-driven sales.',
    challenges: [
      'Expiry and batch discipline on regulated products',
      'Pest and disease cycles driving sudden demand',
      'Farmer credit through harvest cycles',
      'Company schemes and returns documentation',
    ],
    workflows: [
      { label: 'Batch and expiry alerts', how: 'Track every lot and act before expiry.', plan: 'AI' },
      { label: 'Customer accounts', how: 'Manage crop-cycle credit with clear statements.', plan: 'AI' },
      { label: 'Supplier returns', how: 'Process company returns with proper documentation.', plan: 'Core' },
      { label: 'Reorder suggestions', how: 'Draft pre-season quantities from your own sales history.', plan: 'AI' },
    ],
    products: ['inventory', 'reports', 'siborg'],
    faqSeeds: [
      { q: 'How is expiry managed?', a: 'Batch tracking with alerts keeps regulated stock rotating correctly.' },
      { q: 'Can pre-season stock be planned?', a: 'AI reorder drafts use your historical sales, reviewed by you.' },
    ],
    seo: seo('Agrochemicals', 'Crop-care retail inventory software: lot expiry, farmer credit, company returns and pre-season planning.'),
  },
  {
    id: 67,
    name: 'Animal feed and livestock supplies',
    slug: 'animal-feed-and-livestock-supplies',
    category: 'Agriculture',
    summary:
      'Feed suppliers move bulk bags on short dates to dairy and poultry farmers who buy weekly and pay on cycles.',
    challenges: [
      'Bulk weight-based stock with short shelf life',
      'Weekly recurring purchases per farm',
      'Mixed cash and credit customers',
      'Price sensitivity to commodity movements',
    ],
    workflows: [
      { label: 'Precise bulk quantities', how: 'Track bags and kilos accurately per feed type.', plan: 'Core' },
      { label: 'Batch and expiry tracking', how: 'Keep short-dated feed rotating correctly.', plan: 'AI' },
      { label: 'Customer accounts', how: 'Run weekly farm accounts with statements.', plan: 'Core' },
      { label: 'Reorder suggestions', how: 'Draft replenishment from actual farm demand.', plan: 'AI' },
    ],
    products: ['inventory', 'reports', 'siborg'],
    faqSeeds: [
      { q: 'Can weekly farm accounts be managed?', a: 'Yes — customer records hold recurring orders and balances.' },
      { q: 'How is feed freshness managed?', a: 'Batch tracking with expiry alerts in the AI plan.' },
    ],
    seo: seo('Animal feed', 'Feed supplier inventory software: bulk quantities, batch dating, farm accounts and reorder suggestions.'),
  },
  {
    id: 68,
    name: 'Irrigation and agricultural supplies',
    slug: 'irrigation-and-agricultural-supplies',
    category: 'Agriculture',
    summary:
      'Irrigation dealers sell pipes, pumps and drip systems — project quotes mixed with spare-parts counter sales.',
    challenges: [
      'Project quotations with component lists',
      'Pump and motor serials with warranties',
      'Seasonal installation demand (pre-sowing)',
      'Spare parts across many brands',
    ],
    workflows: [
      { label: 'Quotations to orders', how: 'Convert project enquiries into trackable orders.', plan: 'Core' },
      { label: 'Serial and warranty records', how: 'Track pumps and motors by serial with warranty lookup.', plan: 'Core' },
      { label: 'Parts catalog', how: 'Organize fittings and spares with barcode discipline.', plan: 'Core' },
      { label: 'Customer accounts', how: 'Manage farmer project billing with statements.', plan: 'Core' },
    ],
    products: ['inventory', 'pos', 'purchasing'],
    faqSeeds: [
      { q: 'Can project quotes be managed?', a: 'Yes — quotations convert to orders on acceptance.' },
      { q: 'How are pump warranties handled?', a: 'Serial records with warranty lookup.' },
    ],
    seo: seo('Irrigation supplies', 'Irrigation dealer inventory software: project quotes, serials and warranty, parts catalog and farmer accounts.'),
  },
  {
    id: 69,
    name: 'Pet supplies',
    slug: 'pet-supplies',
    category: 'Retail & specialty',
    summary:
      'Pet retail combines dated food and treats with accessories, grooming stock and a loyal repeat customer base.',
    challenges: [
      'Expiry on food, treats and medicines',
      'Breed and size-specific product variants',
      'Repeat purchase cycles per pet owner',
      'Slow accessory lines tying up space',
    ],
    workflows: [
      { label: 'Batch and expiry tracking', how: 'Keep dated food and medicine lots rotating.', plan: 'AI' },
      { label: 'Variant catalog', how: 'Organize by pet, size and flavour with barcodes.', plan: 'Core' },
      { label: 'Customer records', how: 'Know each regular’s purchase pattern.', plan: 'Core' },
      { label: 'Stagnant-stock report', how: 'Clear slow accessories before they gather dust.', plan: 'Core' },
    ],
    products: ['inventory', 'pos', 'reports'],
    faqSeeds: [
      { q: 'Can it track food expiry?', a: 'Yes — batch and expiry alerts are in the AI plan.' },
      { q: 'How are repeat customers handled?', a: 'Customer records show purchase history and patterns.' },
    ],
    seo: seo('Pet supplies', 'Pet retail inventory software: expiry tracking, variants, customer records and slow-stock reports.'),
  },
  {
    id: 70,
    name: 'Chemicals and laboratory reagents',
    slug: 'chemicals-and-laboratory-reagents',
    category: 'Industrial & hardware',
    summary:
      'Chemical traders manage hazardous, dated and specification-critical stock for labs and industry.',
    challenges: [
      'Lot and expiry discipline on reactive materials',
      'Specification and purity documentation per batch',
      'Institutional accounts with procurement processes',
      'Storage segregation awareness in the warehouse',
    ],
    workflows: [
      { label: 'Batch and expiry tracking', how: 'Lot-level dating with alerts for reactive materials.', plan: 'AI' },
      { label: 'Detailed product records', how: 'Hold specification attributes per chemical SKU.', plan: 'Core' },
      { label: 'Customer price lists', how: 'Maintain institutional contract rates.', plan: 'AI' },
      { label: 'Quotations and orders', how: 'Serve procurement processes with proper quotes.', plan: 'Core' },
    ],
    products: ['inventory', 'reports', 'purchasing'],
    note: 'Sikick tracks inventory, lots and documents. Regulated chemical storage compliance and safety documentation remain your responsibility.',
    faqSeeds: [
      { q: 'Can batch purity data be stored?', a: 'Product records hold specification attributes; certificates travel as attachments in purchasing workflows.' },
      { q: 'Does it handle hazmat compliance?', a: 'Inventory and lot tracking are covered; regulatory storage compliance stays with you.' },
    ],
    seo: seo('Laboratory chemicals', 'Chemical trading inventory software: lot tracking, specification records, contract pricing and quotations.'),
  },
  {
    id: 71,
    name: 'Plastics and rubber products',
    slug: 'plastics-and-rubber-products',
    category: 'Industrial & hardware',
    summary:
      'Plastics traders stock sheets, rods, moulded parts and raw material in grade and dimension combinations.',
    challenges: [
      'Grade × dimension variant complexity',
      'Weight-based and piece-based selling mixed',
      'Industrial accounts with monthly cycles',
      'Offcut and remnant stock visibility',
    ],
    workflows: [
      { label: 'Variant catalog', how: 'Track grades, thicknesses and dimensions as clear SKUs.', plan: 'Core' },
      { label: 'Precise quantities', how: 'Sell by weight or piece with accurate stock.', plan: 'Core' },
      { label: 'Customer accounts', how: 'Run industrial monthly billing with statements.', plan: 'AI' },
      { label: 'Stock adjustments with reasons', how: 'Record cutting and offcuts transparently.', plan: 'Core' },
    ],
    products: ['inventory', 'reports', 'pos'],
    faqSeeds: [
      { q: 'Can offcuts be tracked?', a: 'Yes — reasoned adjustments keep remnants visible and honest.' },
      { q: 'How are monthly accounts handled?', a: 'Customer statements and receivables in the AI plan.' },
    ],
    seo: seo('Plastics and rubber', 'Plastics trading inventory software: grade variants, weight selling, industrial accounts and offcut tracking.'),
  },
  {
    id: 72,
    name: 'Metals and metal components',
    slug: 'metals-and-metal-components',
    category: 'Industrial & hardware',
    summary:
      'Metal stockists sell rods, sheets and sections by weight and length with daily price-linked selling.',
    challenges: [
      'Weight and length-based selling',
      'Daily metal price movements affecting rates',
      'Grade and standard documentation per lot',
      'Large credit exposures to fabricators',
    ],
    workflows: [
      { label: 'Precise quantities', how: 'Sell by kilo or length with accurate stock.', plan: 'Core' },
      { label: 'Metal rates reference', how: 'The console includes a metal-rates page for rate-aware pricing.', plan: 'Core' },
      { label: 'Batch records', how: 'Track lots for grade documentation.', plan: 'AI' },
      { label: 'Receivables and ageing', how: 'Control fabricator credit with ageing and reminders.', plan: 'AI' },
    ],
    products: ['inventory', 'reports', 'purchasing'],
    faqSeeds: [
      { q: 'Can rates follow metal prices?', a: 'A metal-rates reference page supports rate-aware pricing workflows.' },
      { q: 'How is fabricator credit controlled?', a: 'Receivables ageing and reminders are in the AI plan.' },
    ],
    seo: seo('Metals and components', 'Metal stockist inventory software: weight and length selling, rate reference, lot records and credit control.'),
  },
  {
    id: 73,
    name: 'Component and parts manufacturing',
    slug: 'component-and-parts-manufacturing',
    category: 'Manufacturing & processing',
    summary:
      'Component makers convert raw material into precision parts for OEMs — raw stock discipline today, production workflows carefully scoped.',
    challenges: [
      'Raw material in, finished parts out',
      'Customer-specific part numbering and revisions',
      'Work-in-progress visibility',
      'Dispatch documentation per delivery schedule',
    ],
    workflows: [
      { label: 'Raw-material inventory', how: 'Track input materials with full ledger discipline.', plan: 'Core' },
      { label: 'Finished-goods catalog', how: 'Organize parts by customer part number and revision.', plan: 'Core' },
      { label: 'Dispatch records', how: 'Document every schedule dispatch against its order.', plan: 'Core' },
    ],
    products: ['stock-control', 'purchasing'],
    note: 'Production tracking, BOM and WIP workflows are gathered through Enterprise consultation; the full manufacturing workflow is not advertised as available until verified.',
    faqSeeds: [
      { q: 'Can it track work-in-progress?', a: 'WIP and production workflows are scoped via Enterprise consultation.' },
      { q: 'What works today?', a: 'Raw-material and finished-goods inventory with dispatch documentation.' },
    ],
    seo: seo('Component manufacturing', 'Inventory foundations for component makers: materials and finished parts today; production workflows via Enterprise.'),
  },
  {
    id: 74,
    name: 'General manufacturing and assembly',
    slug: 'general-manufacturing-and-assembly',
    category: 'Manufacturing & processing',
    summary:
      'General manufacturers need materials in, goods out, and honest stock between — with production workflows scoped to their actual process.',
    challenges: [
      'Raw material purchasing against production plans',
      'Finished goods and dispatch coordination',
      'Scrap and wastage visibility',
      'Customer orders driving production priorities',
    ],
    workflows: [
      { label: 'Raw-material inventory', how: 'Track inputs with the same discipline as finished goods.', plan: 'Core' },
      { label: 'Purchasing and receiving', how: 'Manage supplier orders with proper receiving.', plan: 'Core' },
      { label: 'Order and dispatch records', how: 'Link customer orders to production and dispatch.', plan: 'Core' },
      { label: 'Stock adjustments with reasons', how: 'Record scrap and wastage transparently.', plan: 'Core' },
    ],
    products: ['stock-control', 'purchasing'],
    note: 'BOM and production-run workflows are captured through Enterprise consultation; the full manufacturing workflow is not advertised as available until verified.',
    faqSeeds: [
      { q: 'Can it run BOMs and production?', a: 'Manufacturing workflows are scoped via Enterprise consultation — share your process in a quote request.' },
      { q: 'What works today?', a: 'Materials, finished goods, purchasing, orders and dispatch.' },
    ],
    seo: seo('General manufacturing', 'Inventory foundations for manufacturing: materials, purchasing and dispatch today; production workflows via Enterprise.'),
  },
  {
    id: 75,
    name: 'Contract manufacturing',
    slug: 'contract-manufacturing',
    category: 'Manufacturing & processing',
    summary:
      'Contract manufacturers run customer-owned materials through their lines — accountability for every gram in and out.',
    challenges: [
      'Customer-owned material accountability',
      'Job-work billing with yield reconciliation',
      'Multiple principals with separate stock views',
      'Dispatch back with documentation',
    ],
    workflows: [
      { label: 'Material inventory with reasons', how: 'Track customer materials with explicit receipt and consumption records.', plan: 'Core' },
      { label: 'Stock adjustments with reasons', how: 'Document consumption, yield and wastage per job.', plan: 'Core' },
      { label: 'Customer accounts', how: 'Keep each principal’s materials and billing separate.', plan: 'Core' },
      { label: 'Dispatch records', how: 'Document every return dispatch against its job.', plan: 'Core' },
    ],
    products: ['stock-control', 'reports'],
    note: 'Formal job-work and multi-principal workflows are scoped via Enterprise consultation.',
    faqSeeds: [
      { q: 'Can customer-owned stock be separated?', a: 'Materials are tracked with explicit records; formal multi-principal controls are an Enterprise topic.' },
      { q: 'How is job-work billed?', a: 'Through customer accounts; formal job-work workflows are scoped via Enterprise.' },
    ],
    seo: seo('Contract manufacturing', 'Inventory foundations for job work: material accountability and dispatch; formal workflows via Enterprise.'),
  },
  {
    id: 76,
    name: 'Construction trade stores and contractor supplies',
    slug: 'construction-trade-and-contractor-supplies',
    category: 'Industrial & hardware',
    summary:
      'Contractor supply houses deliver everything a site needs — from shuttering to safety gear — on project credit.',
    challenges: [
      'Extremely broad catalog across trades',
      'Project-based credit with milestone payments',
      'Site deliveries needing documentation',
      'Hired and returned equipment tracking',
    ],
    workflows: [
      { label: 'Broad catalog management', how: 'Organize thousands of trade SKUs with barcodes.', plan: 'Core' },
      { label: 'Customer accounts and credit', how: 'Run project accounts with ageing and reminders.', plan: 'AI' },
      { label: 'Dispatch records', how: 'Document every site delivery.', plan: 'Core' },
      { label: 'Returns processing', how: 'Handle site returns and hire returns with records.', plan: 'Core' },
    ],
    products: ['inventory', 'purchasing', 'reports'],
    faqSeeds: [
      { q: 'Can project credit be managed?', a: 'Yes — receivables with ageing and reminders in the AI plan.' },
      { q: 'How are hire returns handled?', a: 'Through the returns workflow with condition notes.' },
    ],
    seo: seo('Contractor supplies', 'Contractor supply inventory software: broad catalogs, project credit, site dispatch and returns.'),
  },
  {
    id: 77,
    name: 'Hospitality operations and back-of-house inventory',
    slug: 'hospitality-back-of-house-inventory',
    category: 'Hospitality & services',
    summary:
      'Hotels and large kitchens manage housekeeping, maintenance and F&B stores — many small consumables across many departments.',
    challenges: [
      'Department-wise consumption visibility',
      'Perishable F&B stores with expiry',
      'Linen and housekeeping asset tracking',
      'Vendor management across many categories',
    ],
    workflows: [
      { label: 'Multi-category catalog', how: 'Organize housekeeping, maintenance and kitchen stores cleanly.', plan: 'Core' },
      { label: 'Batch and expiry tracking', how: 'Keep kitchen stores rotating by date.', plan: 'AI' },
      { label: 'Supplier records and payments', how: 'Manage many vendors with payment tracking.', plan: 'Core' },
      { label: 'Stock adjustments with reasons', how: 'Record department issues and wastage transparently.', plan: 'Core' },
    ],
    products: ['inventory', 'purchasing', 'reports'],
    note: 'Department-level cost-centre workflows are available in the console; full PMS integration is an Enterprise consultation topic.',
    faqSeeds: [
      { q: 'Can departments be tracked separately?', a: 'Cost-centre style reporting exists in the console; confirm fit during setup.' },
      { q: 'How are kitchen stores dated?', a: 'Batch and expiry tracking is in the AI plan.' },
    ],
    seo: seo('Hospitality inventory', 'Back-of-house inventory software: multi-category stores, expiry tracking, vendors and issue records.'),
  },
  {
    id: 78,
    name: 'Repair, service and spare-parts workshops',
    slug: 'repair-service-and-spare-parts-workshops',
    category: 'Hospitality & services',
    summary:
      'Workshops live and die by parts availability: the right spare in stock turns a two-day job into a two-hour job.',
    challenges: [
      'Parts for many brands and models',
      'Job-wise parts consumption visibility',
      'Old cores and exchanged parts tracking',
      'Supplier warranty on installed parts',
    ],
    workflows: [
      { label: 'Parts catalog with barcodes', how: 'Organize spares by brand and model for fast counter picks.', plan: 'Core' },
      { label: 'Stock adjustments with reasons', how: 'Record job consumption so parts don’t vanish.', plan: 'Core' },
      { label: 'Low-stock alerts', how: 'Keep fast-moving service parts always in stock.', plan: 'Core' },
      { label: 'Supplier records', how: 'Document sourcing for warranty follow-ups.', plan: 'Core' },
    ],
    products: ['inventory', 'purchasing', 'reports'],
    faqSeeds: [
      { q: 'Can job-wise parts be tracked?', a: 'Yes — reasoned adjustments record what went into which job.' },
      { q: 'How are part warranties followed up?', a: 'Supplier records link purchases to sources for claims.' },
    ],
    seo: seo('Repair workshops', 'Workshop inventory software: parts catalogs, job consumption, availability alerts and supplier records.'),
  },
];

export const INDUSTRY_CATEGORIES: IndustryCategory[] = [
  'Retail & specialty',
  'Grocery & food',
  'Pharma & health',
  'Beauty & care',
  'Fashion & lifestyle',
  'Electronics & tech',
  'Home & living',
  'Books, stationery & education',
  'Industrial & hardware',
  'Automotive',
  'Agriculture',
  'Manufacturing & processing',
  'Trade & distribution',
  'Hospitality & services',
];

export const industryBySlug = (slug: string): Industry | undefined =>
  INDUSTRIES.find((industry) => industry.slug === slug);

/** Curated homepage selection — varied categories, not the first N entries. */
export const FEATURED_INDUSTRY_SLUGS = [
  'pharmacies-and-drugstores',
  'apparel-and-fashion-retail',
  'wholesale-trading',
  'consumer-electronics',
  'bakeries-and-confectioners',
  'automotive-parts-and-spares',
  'supermarkets-and-hypermarkets',
  'furniture-retail-and-wholesale',
] as const;
