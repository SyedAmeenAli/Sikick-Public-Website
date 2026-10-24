/**
 * What can honestly be said about moving into Sikick, per source system.
 *
 * Every status below was checked against the Sikick console code and its tests
 * (src/application/services/import/*, src/api/routes/connectors.routes.ts,
 * web/src/pages/ImportPage.tsx). Where a claim is only a vendor's published
 * behaviour, or an importer preset that has not met a real export file, it says
 * so. Nothing here is a statement that a live import has happened.
 */

export type MigrationStatus = 'file' | 'guided' | 'development' | 'unverified' | 'assisted';

export const STATUS_LABEL: Record<MigrationStatus, string> = {
  file: 'File-based migration supported',
  guided: 'Guided migration available',
  development: 'Direct integration in development',
  unverified: 'Not yet verified',
  assisted: 'Assisted migration',
};

export type Platform = {
  id: string;
  name: string;
  /** product line shown under the name */
  kind: string;
  /** local asset, original proportions and colours */
  logo: { src: string; w: number; h: number } | null;
  status: MigrationStatus;
  method: string;
  formats: string[];
  transfers: string[];
  prepare: string;
  limits: string[];
  /** what this route is NOT, to keep file import, API sync and assisted help apart */
  notThis: string;
  next: { label: string; to: string };
  /** header row of the illustrative file used in the mapping walkthrough */
  headers: string[];
};

export type ItemFieldId = 'name' | 'sku' | 'category' | 'unit' | 'openingStock' | 'salePrice' | 'costPrice' | 'taxRate' | 'hsn';
export const ITEM_FIELDS: ReadonlyArray<{ id: ItemFieldId; label: string; required?: boolean }> = [
  { id: 'name', label: 'Item name', required: true },
  { id: 'sku', label: 'SKU / item code' },
  { id: 'category', label: 'Category' },
  { id: 'unit', label: 'Unit' },
  { id: 'openingStock', label: 'Opening stock' },
  { id: 'salePrice', label: 'Sale price' },
  { id: 'costPrice', label: 'Cost price' },
  { id: 'taxRate', label: 'Tax rate' },
  { id: 'hsn', label: 'HSN' },
];

export const PARTY_FIELDS = ['Name', 'Customer or supplier', 'Email', 'Phone', 'GSTIN', 'City', 'Opening balance'];

export const PLATFORMS: Platform[] = [
  {
    id: 'zoho',
    name: 'Zoho Inventory',
    kind: 'Inventory software',
    logo: { src: '/assets/integrations/zoho-inventory.svg', w: 1130, h: 296 },
    status: 'development',
    method:
      'A direct connection for Zoho Inventory is built in the console but is not switched on and has not been proven against a real Zoho account. It is a one-time pull of your items into the same check-then-apply import, not continuous sync.',
    formats: ['CSV or Excel export (route not yet verified for Zoho layouts)'],
    transfers: ['Items: name, SKU, category, unit, opening stock, prices, tax rate (once the connection is live)'],
    prepare:
      'Export your items from Zoho Inventory to CSV or Excel. Sikick reads any file that has an item-name column, but Zoho’s own export layout has not been checked here, so expect to confirm the column mapping.',
    limits: ['Not live in production yet', 'Not proven against a real account', 'One-time pull, not ongoing synchronisation'],
    notThis: 'Not a live integration today. Do not expect your Zoho data to appear by connecting an account.',
    next: { label: 'Ask for an assisted migration', to: '#assisted' },
    headers: ['Name', 'SKU', 'Category', 'Unit', 'Stock', 'Sale price', 'Cost price', 'Tax rate', 'HSN'],
  },
  {
    id: 'tally',
    name: 'TallyPrime',
    kind: 'Accounting and inventory',
    logo: { src: '/assets/integrations/tallyprime.svg', w: 114, h: 26 },
    status: 'file',
    method:
      'Import the Excel or XML file you export from TallyPrime. Sikick reads the exported XML directly. TallyPrime runs on your own computer, so there is no direct connection and nothing syncs afterwards.',
    formats: ['Excel (.xlsx)', 'Tally XML', 'CSV'],
    transfers: ['Stock items: name, alias as SKU, stock group, units, opening balance, selling and purchase rate, GST rate, HSN', 'Ledgers as customers or suppliers: name, GSTIN, phone, email, city, opening balance'],
    prepare: 'Export your stock item master from TallyPrime as Excel or XML, and your party ledgers the same way. Sikick recognises the column names Tally uses.',
    limits: ['Up to 5,000 rows per file; split larger files', 'Checked against real Tally files', 'Existing SKUs have their catalogue fields corrected and their opening stock ignored'],
    notThis: 'A file import, not an API link. Changes you make in Tally later do not flow into Sikick.',
    next: { label: 'Open the app to start an import', to: 'app' },
    headers: ['Stock Item Name', 'Alias', 'Stock Group', 'Units', 'Opening Balance', 'Selling Rate', 'Purchase Rate', 'GST Rate', 'HSN SAC'],
  },
  {
    id: 'vyapar',
    name: 'Vyapar',
    kind: 'Billing and inventory app',
    logo: { src: '/assets/integrations/vyapar.svg', w: 535, h: 120 },
    status: 'file',
    method:
      'Import the Excel or CSV export from Vyapar. Vyapar publishes no developer API, so a file is the only route there will be. Sikick recognises its columns and reads items and parties.',
    formats: ['Excel (.xlsx)', 'CSV'],
    transfers: ['Items: name, item code, category, brand, unit, opening quantity, sale and purchase price, tax rate, HSN', 'Parties: name, type, phone, email, GSTIN, city, opening balance'],
    prepare: 'Export your item list and your party list from Vyapar as Excel or CSV and keep the header row as it is.',
    limits: ['Up to 5,000 rows per file; split larger files', 'Checked against real Vyapar files', 'Existing SKUs have their catalogue fields corrected and their opening stock ignored'],
    notThis: 'A file import, not a live link. Nothing syncs after the import.',
    next: { label: 'Open the app to start an import', to: 'app' },
    headers: ['Item name', 'Item code', 'Item category', 'Unit', 'Opening quantity', 'Sale price', 'Purchase price', 'Tax rate', 'HSN'],
  },
  {
    id: 'busy',
    name: 'BUSY Accounting Software',
    kind: 'Accounting and inventory',
    logo: { src: '/assets/integrations/busy-accounting.png', w: 309, h: 122 },
    status: 'unverified',
    method:
      'BUSY has no named import preset in Sikick and no first-party public API that we have assessed. A CSV or Excel export may import if it has an item-name column, but that has not been tested against a real BUSY export.',
    formats: ['CSV or Excel (untested for BUSY layouts)'],
    transfers: ['Not confirmed. The generic importer reads name, SKU, category, unit, stock, prices, tax rate and HSN from any file that carries them.'],
    prepare: 'Export your item list from BUSY to Excel or CSV. Because the route is unverified, send us the file’s column names through the assisted form before you rely on it.',
    limits: ['No tested BUSY preset', 'No direct integration', 'Mapping may be needed for every column'],
    notThis: 'Not a supported migration route yet. It is a possibility we can check with you.',
    next: { label: 'Ask for an assisted migration', to: '#assisted' },
    headers: ['Name', 'SKU', 'Category', 'Unit', 'Stock', 'Sale price', 'Cost price', 'Tax rate', 'HSN'],
  },
  {
    id: 'marg',
    name: 'Marg ERP',
    kind: 'ERP for retail and pharma',
    logo: { src: '/assets/integrations/marg-erp.png', w: 144, h: 74 },
    status: 'guided',
    method:
      'Import your Marg Excel export and map its columns yourself. Marg’s export columns vary by version and are not published, so Sikick’s Marg preset is a best guess that has not met a real Marg file. Marg offers a paid API gateway; Sikick has not built a connector for it.',
    formats: ['Excel (.xlsx)', 'CSV'],
    transfers: ['Items: name, code, group, unit, opening stock, sale and purchase rate, GST, HSN (as you map them)', 'Parties: name, type, phone, email, GSTIN, city, opening balance'],
    prepare: 'Export your item master to Excel from Marg. Open the file, check the column names, and map any column Sikick does not recognise on the mapping step.',
    limits: ['Preset not verified against a real Marg export', 'Column mapping is expected', 'No Marg API connector built'],
    notThis: 'Neither a direct integration nor continuous sync.',
    next: { label: 'Plan the migration with us', to: '#assisted' },
    headers: ['Item Name', 'Item Code', 'Group', 'Unit', 'Op Stock', 'Sale Rate', 'Purc Rate', 'GST', 'HSN'],
  },
  {
    id: 'excel',
    name: 'Excel or CSV file',
    kind: 'Spreadsheet',
    logo: { src: '/assets/integrations/microsoft-excel.svg', w: 56, h: 56 },
    status: 'file',
    method:
      'Import a spreadsheet directly. Sikick reads .xlsx, CSV and Tally XML, detects the text encoding and tells you which one it read, and lets you map any column it does not recognise.',
    formats: ['Excel (.xlsx)', 'CSV', 'Tally XML'],
    transfers: ['Items: name (required), SKU, category, brand, unit, opening stock, sale price, cost price, HSN, tax rate, image link', 'Parties: name, customer or supplier, email, phone, GSTIN, city, opening balance'],
    prepare: 'Put one item per row under a header row. The item name is the only column that must exist. Save as .xlsx or CSV.',
    limits: ['Up to 5,000 rows per file; split larger files', 'Rows are checked first and nothing is written until you confirm', 'Your plan’s product limit is checked before you commit'],
    notThis: 'A one-off file import, not synchronisation.',
    next: { label: 'Open the app to start an import', to: 'app' },
    headers: ['Name', 'SKU', 'Category', 'Unit', 'Stock', 'Sale price', 'Cost price', 'Tax rate', 'HSN'],
  },
  {
    id: 'other',
    name: 'Another system',
    kind: 'Any inventory or accounting software',
    logo: null,
    status: 'assisted',
    method:
      'If your software can export items to Excel or CSV, the file route works. If it cannot, or you are not sure, ask for an assisted migration and we will tell you what is possible before you commit.',
    formats: ['Excel (.xlsx)', 'CSV', 'Tally XML'],
    transfers: ['Whatever the export contains from the item and party fields Sikick supports'],
    prepare: 'Export your items and parties if you can, and tell us the software name and roughly how many records you have.',
    limits: ['Each source is assessed before we promise a route'],
    notThis: 'No source is assumed to work until it has been checked.',
    next: { label: 'Ask for an assisted migration', to: '#assisted' },
    headers: ['Name', 'SKU', 'Category', 'Unit', 'Stock', 'Sale price', 'Cost price', 'Tax rate', 'HSN'],
  },
];

export const platform = (id: string): Platform => PLATFORMS.find((p) => p.id === id) ?? PLATFORMS[0];

export const JOURNEY = [
  { id: 'source', title: 'Choose your source', body: 'Pick the software or file you are leaving. The route, accepted formats and limits come from what has been checked, not from the logo.' },
  { id: 'prepare', title: 'Prepare your data', body: '' },
  { id: 'map', title: 'Map your fields', body: 'Sikick matches the columns it recognises and shows the rest. If the item name has no column, the file cannot be read until you point one at it.' },
  { id: 'validate', title: 'Review and validate', body: 'A check run reads every row and writes nothing. It reports what will be created, what already exists, duplicates inside the file, and rows that need attention.' },
  { id: 'import', title: 'Import and reconcile', body: 'You confirm, and the whole file is applied as one transaction, so you never end up with half a catalogue. The same file cannot be imported twice by accident, and a recent import can be undone from the import history.' },
] as const;

export type ExportItem = {
  id: string;
  label: string;
  group: string;
  formats: string[];
  range: 'none' | 'asAt' | 'period' | 'month';
  contains: string;
};

/** Exports that exist in the console today. Nothing else is claimed. */
export const EXPORTS: ExportItem[] = [
  { id: 'trial', label: 'Trial balance', group: 'Financial reports', formats: ['CSV'], range: 'asAt', contains: 'Every account with its debit and credit balance as at a date, with or without reversed entries.' },
  { id: 'pnl', label: 'Profit and loss', group: 'Financial reports', formats: ['CSV'], range: 'period', contains: 'Income and expenses for the period you choose.' },
  { id: 'bs', label: 'Balance sheet', group: 'Financial reports', formats: ['CSV'], range: 'asAt', contains: 'Assets, liabilities and equity as at a date.' },
  { id: 'cf', label: 'Cash flow', group: 'Financial reports', formats: ['CSV'], range: 'period', contains: 'Cash in and out for the period you choose.' },
  { id: 'gst', label: 'GST returns', group: 'Tax', formats: ['CSV', 'JSON'], range: 'month', contains: 'The return for a month, as CSV or as JSON for filing tools.' },
  { id: 'audit', label: 'Audit log', group: 'Records', formats: ['CSV'], range: 'none', contains: 'Who did what and when, with the filters you apply in the console.' },
  { id: 'cashier', label: 'Cashier activity', group: 'Records', formats: ['CSV'], range: 'period', contains: 'A cashier’s activity over the period you choose.' },
];

export const NOT_YET_EXPORTABLE = ['Products and variants', 'Stock levels and movements', 'Customers and suppliers', 'Sales and purchase transactions'];
