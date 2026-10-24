import { describe, expect, it } from 'vitest';
import { EARBUDS_WEEKLY, LEDGER_EARBUDS, MIN_ORDER_QTY, PRODUCTS, PURCHASE_ORDERS, TRANSFERS, LOCATIONS, coverDays, isLow, poTotal, product } from '../data/morrow';

describe('Morrow Goods dataset', () => {
  it('has unique SKUs and positive prices', () => {
    expect(new Set(PRODUCTS.map((p) => p.sku)).size).toBe(PRODUCTS.length);
    PRODUCTS.forEach((p) => expect(p.price).toBeGreaterThan(0));
  });

  it('earbuds ledger adds up to the stock shown everywhere', () => {
    const l = LEDGER_EARBUDS;
    const balance = l.opening + l.rows.reduce((s, r) => s + r.delta, 0);
    expect(balance).toBe(product(l.sku).stock);
    expect(balance + l.next.delta).toBe(12);
  });

  it('weekly series match the 30-day figure and the cover claim', () => {
    const e = product('SKU-2081');
    (['7w', '12w'] as const).forEach((k) => {
      const d = EARBUDS_WEEKLY[k].data;
      expect(d.slice(-4).reduce((a, b) => a + b, 0)).toBe(e.sold30);
      expect(d.length).toBe(EARBUDS_WEEKLY[k].weeks.length);
    });
    expect(coverDays(e, 12)).toBe(6);
    expect(isLow(e)).toBe(true);
  });

  it('purchase orders agree with their products', () => {
    const received = PURCHASE_ORDERS.find((o) => o.no === 'PO-0182')!;
    expect(received.lines[0].qty - (received.lines[0].received ?? 0)).toBe(product(received.lines[0].sku).damaged);
    const draft = PURCHASE_ORDERS.find((o) => o.no === 'PO-0184')!;
    draft.lines.forEach((l) => expect(l.qty).toBeGreaterThanOrEqual(MIN_ORDER_QTY));
    expect(poTotal(draft)).toBe(60 * 1499 + 36 * 1199);
  });

  it('the film sale (2 earbuds + 1 notebook) totals 3,147', () => {
    expect(2 * product('SKU-2081').price + product('SKU-4120').price).toBe(3147);
  });

  it('transfers point at real locations and products', () => {
    const ids = new Set(LOCATIONS.map((l) => l.id));
    TRANSFERS.forEach((t) => {
      expect(ids.has(t.from) && ids.has(t.to)).toBe(true);
      expect(product(t.sku)).toBeTruthy();
    });
  });
});
