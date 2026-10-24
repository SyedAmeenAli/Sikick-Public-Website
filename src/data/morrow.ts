/**
 * One fictional workspace behind every product preview on the site.
 * Morrow Goods is a made-up retailer used for illustration. It is not a
 * Sikick customer and none of these records are real results.
 *
 * Every figure used by the POS, shelf, purchasing, stock-movement, analytics,
 * story and SiBorg previews is derived from this file, so a product shows the
 * same quantity everywhere unless a view is explicitly a different moment.
 */

export const WORKSPACE = {
  name: 'Morrow Goods',
  location: 'Main Store',
  till: 'Till 2',
  supplier: 'Aster Wholesale',
  today: '24 Oct 2026',
} as const;

export const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

export type Product = {
  sku: string;
  name: string;
  category: 'Apparel' | 'Electronics' | 'Home' | 'Stationery';
  price: number;
  /** on hand at the start of today's trading */
  stock: number;
  reorderPoint: number;
  /** shelf location at Main Store */
  shelf: string;
  /** units sold in the last 30 days */
  sold30: number;
  /** days since the last sale, 0 = sold today */
  lastSaleDays: number;
  /** received and not yet reconciled */
  damaged?: number;
  kind: 'box' | 'case' | 'mug' | 'bottle' | 'lamp';
};

export const PRODUCTS: Product[] = [
  { sku: 'SKU-1042', name: 'Cotton T-shirt (M)', category: 'Apparel', price: 499, stock: 128, reorderPoint: 40, shelf: 'A2 · shelf 1', sold30: 96, lastSaleDays: 0, kind: 'box' },
  { sku: 'SKU-1043', name: 'Cotton T-shirt (L)', category: 'Apparel', price: 499, stock: 96, reorderPoint: 40, shelf: 'A2 · shelf 1', sold30: 71, lastSaleDays: 1, kind: 'box' },
  { sku: 'SKU-2081', name: 'Wireless earbuds', category: 'Electronics', price: 1499, stock: 14, reorderPoint: 15, shelf: 'A1 · shelf 1', sold30: 61, lastSaleDays: 0, kind: 'case' },
  { sku: 'SKU-3310', name: 'Ceramic mug', category: 'Home', price: 249, stock: 212, reorderPoint: 60, shelf: 'B1 · shelf 2', sold30: 0, lastSaleDays: 63, kind: 'mug' },
  { sku: 'SKU-3311', name: 'Steel bottle 750ml', category: 'Home', price: 649, stock: 63, reorderPoint: 25, shelf: 'B1 · shelf 2', sold30: 38, lastSaleDays: 1, kind: 'bottle' },
  { sku: 'SKU-4120', name: 'Notebook A5', category: 'Stationery', price: 149, stock: 340, reorderPoint: 120, shelf: 'C1 · shelf 2', sold30: 210, lastSaleDays: 0, kind: 'box' },
  { sku: 'SKU-5002', name: 'LED desk lamp', category: 'Electronics', price: 1199, stock: 9, reorderPoint: 12, shelf: 'A1 · shelf 3', sold30: 24, lastSaleDays: 2, kind: 'lamp' },
  { sku: 'SKU-5003', name: 'USB-C cable 1m', category: 'Electronics', price: 299, stock: 150, reorderPoint: 50, shelf: 'A1 · shelf 3', sold30: 88, lastSaleDays: 0, damaged: 2, kind: 'case' },
  { sku: 'SKU-6001', name: 'Canvas tote bag', category: 'Apparel', price: 399, stock: 77, reorderPoint: 30, shelf: 'A2 · shelf 3', sold30: 0, lastSaleDays: 71, kind: 'box' },
];

export const product = (sku: string): Product => PRODUCTS.find((p) => p.sku === sku)!;

/** whole days of stock left at the 30-day sales rate */
export const coverDays = (p: Product, stock = p.stock): number | null => (p.sold30 > 0 ? Math.round(stock / (p.sold30 / 30)) : null);
export const isLow = (p: Product, stock = p.stock) => stock <= p.reorderPoint;
export const lowStock = (): Product[] => PRODUCTS.filter((p) => isLow(p));
export const slowMovers = (): Product[] => PRODUCTS.filter((p) => p.lastSaleDays >= 60 && p.stock > 30);

export type PurchaseOrder = {
  no: string;
  supplier: string;
  status: 'Draft' | 'In transit' | 'Received';
  date: string;
  due?: string;
  lines: Array<{ sku: string; qty: number; received?: number }>;
};

export const PURCHASE_ORDERS: PurchaseOrder[] = [
  { no: 'PO-0182', supplier: WORKSPACE.supplier, status: 'Received', date: '14 Oct 2026', lines: [{ sku: 'SKU-5003', qty: 60, received: 58 }] },
  { no: 'PO-0183', supplier: WORKSPACE.supplier, status: 'In transit', date: '20 Oct 2026', due: '28 Oct 2026', lines: [{ sku: 'SKU-4120', qty: 200 }] },
  { no: 'PO-0184', supplier: WORKSPACE.supplier, status: 'Draft', date: '24 Oct 2026', lines: [{ sku: 'SKU-2081', qty: 60 }, { sku: 'SKU-5002', qty: 36 }] },
];
export const po = (no: string) => PURCHASE_ORDERS.find((o) => o.no === no)!;
export const poTotal = (o: PurchaseOrder) => o.lines.reduce((s, l) => s + l.qty * product(l.sku).price, 0);
export const MIN_ORDER_QTY = 30;

/** Today's sales, in order. Stock at the start of the day is PRODUCTS[].stock plus what was sold before the first sale listed here. */
export const LEDGER_EARBUDS = {
  sku: 'SKU-2081',
  opening: 17,
  rows: [
    { time: '09:48', ref: 'Sale #4819', delta: -1 },
    { time: '10:31', ref: 'Sale #4821', delta: -2 },
  ],
  /** the sale completed in the POS preview */
  next: { time: '11:26', ref: 'Sale #4822', delta: -2 },
};

/** Weekly units sold, oldest first. The last four weeks add up to the 30-day figure on the product. */
export const EARBUDS_WEEKLY = {
  '7w': { label: '7 weeks', data: [8, 10, 9, 13, 15, 16, 17], weeks: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'] },
  '12w': { label: '12 weeks', data: [5, 6, 7, 7, 8, 9, 8, 9, 13, 15, 16, 17], weeks: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'] },
} as const;

export const LOCATIONS = [
  { id: 'recv', label: 'Receiving', x: 60, y: 60 },
  { id: 'a1', label: 'Shelf A1', x: 230, y: 40 },
  { id: 'b2', label: 'Bin B2', x: 230, y: 150 },
  { id: 'shop', label: 'Shop floor', x: 400, y: 60 },
  { id: 'ret', label: 'Returns', x: 400, y: 170 },
];
export const TRANSFERS = [
  { id: 'm1', from: 'recv', to: 'a1', qty: 58, sku: 'SKU-5003', note: 'PO-0182 put away. 2 damaged units held back and not counted' },
  { id: 'm2', from: 'a1', to: 'shop', qty: 12, sku: 'SKU-2081', note: 'Replenish the shop floor from the shelf' },
  { id: 'm3', from: 'a1', to: 'b2', qty: 40, sku: 'SKU-5003', note: 'Overflow to the reserve bin' },
  { id: 'm4', from: 'ret', to: 'b2', qty: 3, sku: 'SKU-1042', note: 'Returned stock back to its bin' },
];
