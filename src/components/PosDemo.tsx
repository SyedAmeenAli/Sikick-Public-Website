import { useMemo, useState } from 'react';
import { PRODUCTS, WORKSPACE, inr as inrFmt } from '../data/morrow';
import { Banknote, Minus, Plus, QrCode, ScanLine, Search, Smartphone, Trash2, X } from 'lucide-react';

/**
 * Interactive point-of-sale demo. All state is local; no payment
 * is processed and nothing is sent anywhere. Rules:
 *  - selecting a product adds 1; selecting it again adds 1 more, up to stock
 *  - discount is a whole percentage 0–30 applied to the subtotal
 *  - prices exclude tax in this demo
 */

type Product = { sku: string; name: string; price: number; stock: number; cat: string };
type CartLine = { sku: string; qty: number };
type Pay = 'cash' | 'upi' | 'qr';

const CATALOG: Product[] = PRODUCTS.map((p) => ({ sku: p.sku, name: p.name, price: p.price, stock: p.stock, cat: p.category }));
const CATS = ['All', 'Apparel', 'Electronics', 'Home', 'Stationery'];
const inr = inrFmt;
const MAX_DISCOUNT = 30;

export function PosDemo() {
  const [stock, setStock] = useState<Record<string, number>>(() => Object.fromEntries(CATALOG.map((p) => [p.sku, p.stock])));
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('All');
  const [cart, setCart] = useState<CartLine[]>([]);
  const [discountText, setDiscountText] = useState('0');
  const [pay, setPay] = useState<Pay>('upi');
  const [stage, setStage] = useState<'selling' | 'done'>('selling');
  const [receipt, setReceipt] = useState<{ lines: Array<Product & { qty: number }>; subtotal: number; discount: number; total: number; pay: Pay; no: number } | null>(null);
  const [txn, setTxn] = useState(4822);
  const [note, setNote] = useState('');

  const bySku = (sku: string) => CATALOG.find((p) => p.sku === sku)!;
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CATALOG.filter((p) => (cat === 'All' || p.cat === cat) && (!q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)));
  }, [query, cat]);

  const discountNum = Number(discountText);
  const discountValid = discountText.trim() !== '' && Number.isInteger(discountNum) && discountNum >= 0 && discountNum <= MAX_DISCOUNT;
  const lines = cart.map((l) => ({ ...bySku(l.sku), qty: l.qty }));
  const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
  const discount = discountValid ? Math.round((subtotal * discountNum) / 100) : 0;
  const total = subtotal - discount;
  const items = lines.reduce((s, l) => s + l.qty, 0);

  const add = (sku: string) => {
    setNote('');
    setCart((c) => {
      const found = c.find((l) => l.sku === sku);
      const have = found?.qty ?? 0;
      if (have >= stock[sku]) {
        setNote(`${bySku(sku).name}: only ${stock[sku]} in stock.`);
        return c;
      }
      return found ? c.map((l) => (l.sku === sku ? { ...l, qty: l.qty + 1 } : l)) : [...c, { sku, qty: 1 }];
    });
  };
  const setQty = (sku: string, next: number) => {
    setNote('');
    if (next <= 0) return setCart((c) => c.filter((l) => l.sku !== sku));
    const capped = Math.min(next, stock[sku]);
    if (capped < next) setNote(`${bySku(sku).name}: only ${stock[sku]} in stock.`);
    setCart((c) => c.map((l) => (l.sku === sku ? { ...l, qty: capped } : l)));
  };
  const remove = (sku: string) => setCart((c) => c.filter((l) => l.sku !== sku));

  const complete = () => {
    if (!cart.length || !discountValid) return;
    setReceipt({ lines, subtotal, discount, total, pay, no: txn });
    setStock((s) => {
      const next = { ...s };
      cart.forEach((l) => (next[l.sku] = Math.max(0, next[l.sku] - l.qty)));
      return next;
    });
    setStage('done');
  };
  const newSale = () => {
    setCart([]);
    setDiscountText('0');
    setQuery('');
    setCat('All');
    setNote('');
    setReceipt(null);
    setTxn((n) => n + 1);
    setStage('selling');
  };
  const resetDemo = () => {
    setStock(Object.fromEntries(CATALOG.map((p) => [p.sku, p.stock])));
    newSale();
    setTxn(4822);
  };

  const payMethods: Array<{ id: Pay; label: string; icon: typeof Banknote }> = [
    { id: 'cash', label: 'Cash', icon: Banknote },
    { id: 'upi', label: 'UPI', icon: Smartphone },
    { id: 'qr', label: 'QR', icon: QrCode },
  ];

  return (
    <div className="pos glass-elevated" data-stage={stage} aria-label="Interactive point-of-sale demo">
      <div className="pos-top">
        <div className="pos-store">
          <span className="pos-dot" aria-hidden="true" />
          <strong>{WORKSPACE.name} · {WORKSPACE.location}</strong>
          <span className="pos-op">{WORKSPACE.till}</span>
        </div>
        <div className="pos-sale-label">
                    <span>Sale #{txn}</span>
        </div>
      </div>

      <div className="pos-body">
        <section className="pos-catalog" aria-label="Products">
          <label className="pos-search">
            <Search size={16} aria-hidden="true" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name or scan SKU" aria-label="Search products" disabled={stage === 'done'} />
            <ScanLine size={16} aria-hidden="true" className="pos-scan-ic" />
          </label>
          <div className="pos-cats" role="group" aria-label="Category filter">
            {CATS.map((c) => (
              <button key={c} type="button" className="chip" aria-pressed={cat === c} onClick={() => setCat(c)} disabled={stage === 'done'}>
                {c}
              </button>
            ))}
          </div>
          <div className="pos-grid" data-lenis-prevent>
            {visible.length === 0 && <p className="pos-empty">No product matches “{query}”.</p>}
            {visible.map((p) => {
              const inCart = stage === 'done' ? 0 : cart.find((l) => l.sku === p.sku)?.qty ?? 0;
              const left = stock[p.sku];
              return (
                <button key={p.sku} type="button" className="pos-prod" data-selected={inCart > 0} onClick={() => add(p.sku)} disabled={stage === 'done' || left === 0} aria-label={`Add ${p.name}, ${inr(p.price)}, ${left} in stock`}>
                  <span className="pos-prod-sku">{p.sku}</span>
                  <span className="pos-prod-name">{p.name}</span>
                  <span className="pos-prod-meta">
                    <b className="num">{inr(p.price)}</b>
                    <span className={left <= 15 ? 'pos-low' : ''}>{left === 0 ? 'Out of stock' : `${left} left`}</span>
                  </span>
                  {inCart > 0 && <span className="pos-prod-badge">{inCart}</span>}
                </button>
              );
            })}
          </div>
        </section>

        <section className="pos-cart" aria-label="Current sale">
          {stage !== 'done' ? (
            <>
              <h4 className="pos-h">Current sale <span className="num">{items} item{items === 1 ? '' : 's'}</span></h4>
              <ul className="pos-lines" data-lenis-prevent>
                {cart.length === 0 && <li className="pos-empty">Select a product to start the sale.</li>}
                {lines.map((l) => (
                  <li key={l.sku} className="pos-line">
                    <div className="pos-line-main">
                      <span>{l.name}</span>
                      <span className="pos-line-sub">{inr(l.price)} each</span>
                    </div>
                    <div className="pos-qty" role="group" aria-label={`Quantity of ${l.name}`}>
                      <button type="button" onClick={() => setQty(l.sku, l.qty - 1)} aria-label={`Decrease ${l.name}`}><Minus size={14} /></button>
                      <output className="num" aria-live="polite">{l.qty}</output>
                      <button type="button" onClick={() => setQty(l.sku, l.qty + 1)} aria-label={`Increase ${l.name}`}><Plus size={14} /></button>
                    </div>
                    <span className="pos-line-total num">{inr(l.price * l.qty)}</span>
                    <button type="button" className="pos-remove" onClick={() => remove(l.sku)} aria-label={`Remove ${l.name}`}><Trash2 size={14} /></button>
                  </li>
                ))}
              </ul>
              {note && <p className="pos-note" role="status">{note}</p>}
              <div className="pos-sum">
                <div><span>Subtotal</span><span className="num">{inr(subtotal)}</span></div>
                <div className="pos-disc">
                  <label htmlFor="pos-discount">Discount %</label>
                  <input id="pos-discount" inputMode="numeric" value={discountText} onChange={(e) => setDiscountText(e.target.value.replace(/[^\d]/g, '').slice(0, 3))} aria-invalid={!discountValid} aria-describedby="pos-disc-help" />
                  <span className="num">−{inr(discount)}</span>
                </div>
                <p id="pos-disc-help" className={`pos-help ${discountValid ? '' : 'is-error'}`}>
                  {discountValid ? `Whole number from 0 to ${MAX_DISCOUNT}. Demo totals exclude tax.` : `Enter a whole number from 0 to ${MAX_DISCOUNT}.`}
                </p>
                <div className="pos-total"><span>Total</span><span className="num">{inr(total)}</span></div>
              </div>
              <div className="pos-pay" role="radiogroup" aria-label="Payment method (illustrative)">
                {payMethods.map((m) => (
                  <button key={m.id} type="button" role="radio" aria-checked={pay === m.id} data-active={pay === m.id} onClick={() => setPay(m.id)}>
                    <m.icon size={16} aria-hidden="true" /> {m.label}
                  </button>
                ))}
              </div>
              <button type="button" className="btn btn-primary pos-checkout" onClick={complete} disabled={!cart.length || !discountValid}>
                Complete demo sale · {inr(total)}
              </button>
              <p className="pos-help">Illustrative only. No payment is processed and nothing is sent.</p>
            </>
          ) : (
            receipt && (
              <div className="pos-receipt-wrap">
                <div className="pos-receipt" role="group" aria-label="Demo receipt">
                  <span className="pos-receipt-tag">Demo receipt</span>
                  <strong>{WORKSPACE.name} · {WORKSPACE.location}</strong>
                  <span className="pos-receipt-sub">Sale #{receipt.no} · {receipt.pay.toUpperCase()}</span>
                  <hr />
                  {receipt.lines.map((l) => (
                    <div key={l.sku} className="pos-receipt-line">
                      <span>{l.qty} × {l.name}</span>
                      <span className="num">{inr(l.price * l.qty)}</span>
                    </div>
                  ))}
                  <hr />
                  <div className="pos-receipt-line"><span>Subtotal</span><span className="num">{inr(receipt.subtotal)}</span></div>
                  {receipt.discount > 0 && <div className="pos-receipt-line"><span>Discount</span><span className="num">−{inr(receipt.discount)}</span></div>}
                  <div className="pos-receipt-line is-total"><span>Total</span><span className="num">{inr(receipt.total)}</span></div>
                  <span className="pos-receipt-sub">Demo receipt. Not a real transaction.</span>
                </div>
                <div className="pos-done-actions">
                  <button type="button" className="btn btn-primary" onClick={newSale}>Start a new demo sale</button>
                </div>
              </div>
            )
          )}
        </section>

        <aside className="pos-stock" aria-label="Stock preview">
          <h4 className="pos-h">Stock preview</h4>
          <ul data-lenis-prevent>
            {CATALOG.map((p) => {
              const now = stock[p.sku];
              const reserved = stage !== 'done' ? cart.find((l) => l.sku === p.sku)?.qty ?? 0 : 0;
              const changed = now !== p.stock;
              return (
                <li key={p.sku} data-changed={changed}>
                  <span>{p.name}</span>
                  <span className="num">
                    {changed && <s>{p.stock}</s>} {now}
                    {reserved > 0 && <em> · −{reserved} in sale</em>}
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="pos-help">Stock drops when a demo sale completes. Nothing here changes a real account.</p>
          <button type="button" className="pos-reset" onClick={resetDemo}><X size={12} /> Reset demo</button>
        </aside>
      </div>
    </div>
  );
}
