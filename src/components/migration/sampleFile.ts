import { PRODUCTS } from '../../data/morrow';
import { ITEM_FIELDS, type ItemFieldId } from '../../data/migration';

/**
 * The illustrative spreadsheet used by the mapping walkthrough: Morrow Goods'
 * catalogue plus three rows with ordinary problems (a repeated SKU, a missing
 * item name, a price that is not a number). Columns follow ITEM_FIELDS order.
 */

const TAX: Record<string, number> = { Apparel: 5, Electronics: 18, Home: 12, Stationery: 12 };
const HSN: Record<string, string> = {
  'SKU-1042': '6109', 'SKU-1043': '6109', 'SKU-2081': '8518', 'SKU-3310': '6911', 'SKU-3311': '7323',
  'SKU-4120': '4820', 'SKU-5002': '9405', 'SKU-5003': '8544', 'SKU-6001': '4202',
};

export const FIELD_ORDER: ItemFieldId[] = ITEM_FIELDS.map((f) => f.id);

export const ROWS: string[][] = [
  ...PRODUCTS.map((p) => [p.name, p.sku, p.category, 'pcs', String(p.stock), String(p.price), String(Math.round(p.price * 0.6)), String(TAX[p.category]), HSN[p.sku]]),
  ['Ceramic mug', 'SKU-3310', 'Home', 'pcs', '212', '249', '149', '12', '6911'],
  ['', 'SKU-7001', 'Home', 'pcs', '20', '350', '210', '12', '6911'],
  ['Steel flask 1L', 'SKU-3399', 'Home', 'pcs', '18', 'N/A', '280', '12', '7323'],
];

export type Mapping = Array<ItemFieldId | ''>;
export const defaultMapping = (headers: string[]): Mapping => headers.map((_, i) => FIELD_ORDER[i] ?? '');

const NUMERIC: ItemFieldId[] = ['openingStock', 'salePrice', 'costPrice', 'taxRate'];
const isNum = (v: string) => v.trim() !== '' && !Number.isNaN(Number(v));

export type RowResult = { index: number; reasons: string[] };

export function analyse(_headers: string[], mapping: Mapping) {
  const col = (f: ItemFieldId) => mapping.indexOf(f);
  const nameCol = col('name');
  const skuCol = col('sku');
  const seen = new Set<string>();
  let valid = 0;
  let duplicates = 0;
  let missingName = 0;
  let badNumber = 0;
  const issues: RowResult[] = [];
  ROWS.forEach((row, index) => {
    const reasons: string[] = [];
    if (nameCol < 0 || row[nameCol].trim() === '') {
      reasons.push('Missing item name');
      missingName += 1;
    }
    if (skuCol >= 0) {
      const sku = row[skuCol];
      if (seen.has(sku)) {
        reasons.push('Duplicate SKU in this file');
        duplicates += 1;
      }
      seen.add(sku);
    }
    for (const f of NUMERIC) {
      const c = col(f);
      if (c >= 0 && row[c].trim() !== '' && !isNum(row[c])) {
        reasons.push(`${ITEM_FIELDS.find((x) => x.id === f)!.label} is not a number`);
        badNumber += 1;
      }
    }
    if (reasons.length) issues.push({ index, reasons });
    else valid += 1;
  });
  return { total: ROWS.length, valid, duplicates, missingName, badNumber, issues, nameMapped: nameCol >= 0 };
}
