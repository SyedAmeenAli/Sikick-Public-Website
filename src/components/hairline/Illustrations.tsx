import { useMemo, useState } from 'react';
import { HairSvg, Node, P, Signal, T } from './kit';
import { EARBUDS_WEEKLY, LOCATIONS, PRODUCTS, TRANSFERS, WORKSPACE, isLow, po, product } from '../../data/morrow';

/* ------------------------------------------------------------------ */
/* Inventory shelf — select a product, its slot lights and a path runs */
/* to the detail panel. Records come from src/data/morrow.ts.          */
/* ------------------------------------------------------------------ */

const SHELF_ITEMS = PRODUCTS.map((p) => ({ sku: p.sku, name: p.name, qty: p.stock, loc: p.shelf, kind: p.kind, low: isLow(p), reorder: p.reorderPoint }));

function Silhouette({ kind, x, y, active }: { kind: string; x: number; y: number; active: boolean }) {
  const cls = `hl-p hl-${active ? 'wine' : 'ivory'}`;
  const common = { className: cls, fill: 'none' as const };
  switch (kind) {
    case 'mug':
      return (
        <g transform={`translate(${x} ${y})`}>
          <path {...common} d="M0 -26 H30 V-4 Q30 0 26 0 H4 Q0 0 0 -4 Z" />
          <path {...common} d="M30 -20 H36 Q40 -20 40 -15 V-12 Q40 -8 36 -8 H30" />
        </g>
      );
    case 'bottle':
      return (
        <g transform={`translate(${x + 6} ${y})`}>
          <path {...common} d="M6 -42 H14 V-34 Q20 -30 20 -24 V-2 Q20 0 18 0 H2 Q0 0 0 -2 V-24 Q0 -30 6 -34 Z" />
        </g>
      );
    case 'lamp':
      return (
        <g transform={`translate(${x} ${y})`}>
          <path {...common} d="M4 0 H28 M16 0 V-24 L30 -38 M30 -38 L40 -28 L26 -14" />
        </g>
      );
    case 'case':
      return (
        <g transform={`translate(${x} ${y})`}>
          <rect {...common} x="0" y="-24" width="34" height="24" rx="4" />
          <path {...common} d="M6 -16 H28 M6 -10 H20" />
        </g>
      );
    default:
      return (
        <g transform={`translate(${x} ${y})`}>
          <rect {...common} x="0" y="-30" width="34" height="30" rx="2" />
          <path {...common} d="M0 -22 H34 M12 -30 V-22" />
        </g>
      );
  }
}

export function InventoryShelfIllustration() {
  const [sel, setSel] = useState(2);
  const item = SHELF_ITEMS[sel];
  const slotX = (i: number) => 54 + (i % 3) * 82;
  const shelfY = (i: number) => 96 + Math.floor(i / 3) * 84;
  const sx = slotX(sel) + 17;
  const sy = shelfY(sel) - 14;
  const low = item.low;
  return (
    <div className="ill-split">
      <HairSvg viewBox="0 0 320 300" label="Hairline shelving unit with nine products; the selected product's slot is highlighted" maxWidth={400}>
        <P d="M30 40 V272" delay={0} />
        <P d="M296 40 V272" delay={80} />
        <P d="M30 40 H296" delay={160} tone="dim" />
        {[0, 1, 2].map((r) => (
          <P key={r} d={`M30 ${96 + r * 84} H296`} delay={240 + r * 120} />
        ))}
        {SHELF_ITEMS.map((it, i) => (
          <g
            key={it.sku}
            className="hl-hit"
            role="button"
            tabIndex={0}
            aria-pressed={sel === i}
            aria-label={`${it.name}, ${it.qty} in stock`}
            onClick={() => setSel(i)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSel(i);
              }
            }}
          >
            <rect x={slotX(i) - 8} y={shelfY(i) - 54} width="66" height="56" rx="6" className={`hl-slot ${sel === i ? 'is-active' : ''}`} />
            <Silhouette kind={it.kind} x={slotX(i)} y={shelfY(i) - 2} active={sel === i} />
            <T x={slotX(i) + 17} y={shelfY(i) + 14} anchor="middle" size={9} tone={sel === i ? 'wine' : 'dim'}>
              {it.qty}
            </T>
          </g>
        ))}
        <path
          key={sel}
          id="shelf-trace"
          d={`M${sx + 24} ${sy} H312 V150 H320`}
          pathLength={1}
          className="hl-p hl-wine hl-draw hl-trace"
          fill="none"
        />
        <Node cx={sx + 24} cy={sy} r={3} active />
      </HairSvg>
      <div className="ill-panel glass" aria-live="polite">
        <span className="ill-tag">{WORKSPACE.location}</span>
        <h4>{item.name}</h4>
        <dl className="ill-dl">
          <div><dt>SKU</dt><dd>{item.sku}</dd></div>
          <div><dt>On hand</dt><dd className={low ? 'warn' : ''}>{item.qty} units{low ? ' · low' : ''}</dd></div>
          <div><dt>Reorder point</dt><dd>{item.reorder} units</dd></div>
          <div><dt>Location</dt><dd>{item.loc}</dd></div>
        </dl>
        <p className="ill-hint">Select any product on the shelf. The slot lights up and its path leads here.</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Barcode scan — beam crosses the code, resolves into a product row   */
/* ------------------------------------------------------------------ */

const BARS = [3, 1, 2, 1, 4, 1, 1, 3, 2, 1, 2, 4, 1, 2, 1, 3, 1, 1, 2, 3, 1, 2, 4, 1, 1, 2, 1, 3];

export function BarcodeScanIllustration() {
  const [run, setRun] = useState(0);
  const bars = useMemo(() => {
    let x = 0;
    return BARS.map((w) => {
      const bar = { x, w };
      x += w * 2.2 + 2.4;
      return bar;
    });
  }, []);
  const total = bars[bars.length - 1].x + 8;
  const offset = (170 - total) / 2;
  return (
    <div className="ill-split ill-split-narrow">
      <HairSvg viewBox="0 0 440 220" label="Hairline barcode scanner reading a barcode, with a beam crossing the code" maxWidth={520} key={run}>
        <P d="M24 150 L70 96 Q76 90 84 92 L108 98 Q116 100 116 108 V122 Q116 130 108 132 L52 168 Q44 172 36 168 Z" delay={0} />
        <P d="M108 108 H128 M108 120 H128" delay={300} tone="dim" />
        <P d="M128 100 L160 94 M128 128 L160 134" delay={450} tone="dim" dashed />
        <rect x="160" y="52" width="230" height="116" rx="10" className="hl-p hl-ivory hl-draw" pathLength={1} style={{ animationDelay: '200ms' }} fill="none" />
        <g transform={`translate(${200 + offset} 74)`}>
          {bars.map((b, i) => (
            <rect key={i} x={b.x} y="0" width={b.w * 2.2} height="56" className="hl-bar" style={{ animationDelay: `${600 + i * 22}ms` }} />
          ))}
        </g>
        <T x="275" y="152" anchor="middle" size={11} tone="dim">SKU-2081 · 8 901234 567897</T>
        <rect x="170" y="62" width="2" height="96" className="hl-beam" />
        <P id="scan-trace" d="M390 110 H420 V196" delay={1700} tone="wine" />
        <Signal pathId="scan-trace" delay={1800} dur={900} />
        <Node cx={420} cy={196} r={4} active delay={2600} />
      </HairSvg>
      <div className="ill-panel glass ill-scan-result" key={`r${run}`}>
        <span className="ill-tag">{WORKSPACE.till}</span>
        <div className="ill-row-resolve">
          <span className="ill-sku">{product('SKU-2081').sku}</span>
          <span>{product('SKU-2081').name}</span>
          <span className="pill pill-warning">{product('SKU-2081').stock} left</span>
        </div>
        <p className="ill-hint">The beam reads the code and resolves it to a catalog row with live stock.</p>
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => setRun((v) => v + 1)}>
          Scan again
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* POS flow — scanner to product card to cart to receipt               */
/* ------------------------------------------------------------------ */

export function PosFlowIllustration() {
  return (
    <HairSvg viewBox="0 0 520 300" label="Hairline point-of-sale flow from barcode scanner through product card and cart to a printed receipt" maxWidth={560}>
      {/* scanner */}
      <P d="M18 214 L46 176 Q50 172 56 173 L74 178 Q80 180 80 186 V196 Q80 202 74 204 L34 230 Q28 233 22 230 Z" delay={0} />
      <P d="M80 188 H96" tone="dim" delay={200} />
      {/* terminal */}
      <rect x="150" y="96" width="190" height="124" rx="10" className="hl-p hl-ivory hl-draw" pathLength={1} fill="none" style={{ animationDelay: '150ms' }} />
      <P d="M150 120 H340" tone="dim" delay={350} />
      <P d="M176 146 H262 M176 164 H236 M176 182 H250" tone="dim" delay={500} />
      <rect x="276" y="140" width="46" height="62" rx="5" className="hl-p hl-wine hl-draw" pathLength={1} fill="none" style={{ animationDelay: '700ms' }} />
      <P d="M214 220 V240 M170 244 H258" delay={600} />
      <P d="M228 244 H306 Q312 244 312 250 V256 H184 V250 Q184 244 190 244" delay={700} tone="dim" />
      {/* receipt */}
      <P d="M404 52 H484 V228 L474 220 L464 228 L454 220 L444 228 L434 220 L424 228 L414 220 L404 228 Z" delay={1500} />
      <P d="M418 78 H470 M418 98 H456 M418 118 H470 M418 138 H448" tone="dim" delay={1900} />
      <P d="M418 170 H470" delay={2200} />
      <T x="418" y="190" size={10} tone="dim" delay={2400}>Total</T>
      <T x="418" y="210" size={14} tone="wine" delay={2400}>₹3,147</T>
      {/* flow path */}
      <P id="pos-flow" d="M96 188 C 120 188 126 168 150 168" delay={900} tone="wine" />
      <P id="pos-flow-2" d="M340 160 C 372 160 380 120 404 120" delay={1300} tone="wine" />
      <Signal pathId="pos-flow" delay={1000} dur={900} />
      <Signal pathId="pos-flow-2" delay={1600} dur={900} />
      <Node cx={299} cy={171} r={3} active delay={1100} />
      <T x="36" y="262" tone="dim" size={11}>Scan</T>
      <T x="245" y="82" anchor="middle" tone="dim" size={11}>Terminal</T>
      <T x="444" y="40" anchor="middle" tone="dim" size={11}>Receipt</T>
    </HairSvg>
  );
}

/* ------------------------------------------------------------------ */
/* Purchasing route — supplier to dock to shelf, with stock impact     */
/* ------------------------------------------------------------------ */

const ROUTE_PO = po('PO-0183');
const ROUTE_LINE = ROUTE_PO.lines[0];
const ROUTE_PRODUCT = product(ROUTE_LINE.sku);
const ROUTE_STEPS = [
  { key: 'ordered', label: 'Order placed', on: ROUTE_PRODUCT.stock, incoming: ROUTE_LINE.qty, note: `${ROUTE_PO.no} went to ${ROUTE_PO.supplier} on ${ROUTE_PO.date}, due ${ROUTE_PO.due}. On-hand does not change yet.` },
  { key: 'received', label: 'Goods received', on: ROUTE_PRODUCT.stock, incoming: ROUTE_LINE.qty, note: `Receiving counts the delivery line by line: ${ROUTE_LINE.qty} of ${ROUTE_LINE.qty} ${ROUTE_PRODUCT.name.toLowerCase()}s. Anything damaged is recorded apart from accepted stock.` },
  { key: 'shelved', label: 'Put away', on: ROUTE_PRODUCT.stock + ROUTE_LINE.qty, incoming: 0, note: `Accepted units move to ${ROUTE_PRODUCT.shelf}. On-hand becomes ${ROUTE_PRODUCT.stock + ROUTE_LINE.qty} and the ledger records who did it.` },
] as const;

export function SupplierRouteIllustration() {
  const [step, setStep] = useState(0);
  const pos = [
    { x: 52, y: 110 },
    { x: 234, y: 110 },
    { x: 412, y: 110 },
  ][step];
  return (
    <div className="ill-split ill-split-wide">
      <div>
        <HairSvg viewBox="0 0 464 220" label="Hairline route from supplier package to receiving dock to inventory shelf" maxWidth={560}>
          {/* supplier package */}
          <P d="M24 84 L52 70 L80 84 V116 L52 130 L24 116 Z M24 84 L52 98 L80 84 M52 98 V130" delay={0} />
          {/* dock */}
          <P d="M196 92 H272 V132 H196 Z M212 132 V108 H256 V132" delay={300} />
          <P d="M196 92 L234 74 L272 92" delay={450} tone="dim" />
          {/* shelf */}
          <P d="M376 70 V138 M448 70 V138 M376 94 H448 M376 118 H448" delay={600} />
          <P d="M386 94 V84 H402 V94 M410 94 V80 H426 V94 M386 118 V108 H398 V118 M404 118 V104 H430 V118" delay={900} tone="dim" />
          <P id="route-a" d="M84 110 H190" delay={800} tone={step >= 1 ? 'wine' : 'dim'} className="hl-keep" />
          <P id="route-b" d="M276 110 H370" delay={1000} tone={step >= 2 ? 'wine' : 'dim'} className="hl-keep" />
          <g className="hl-marker" style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}>
            <circle r="5" className="hl-signal" />
            <circle r="10" className="hl-ping" />
          </g>
          <Node cx={52} cy={110} r={3} active={step >= 0} delay={1100} />
          <Node cx={234} cy={110} r={3} active={step >= 1} delay={1200} />
          <Node cx={412} cy={110} r={3} active={step >= 2} delay={1300} />
          <T x="52" y="164" anchor="middle" size={12} tone={step === 0 ? 'wine' : 'dim'}>Aster Wholesale</T>
          <T x="234" y="164" anchor="middle" size={12} tone={step === 1 ? 'wine' : 'dim'}>Receiving dock</T>
          <T x="412" y="164" anchor="middle" size={12} tone={step === 2 ? 'wine' : 'dim'}>{ROUTE_PRODUCT.shelf.split(' · ')[0]}</T>
        </HairSvg>
        <div className="ill-tabs" role="tablist" aria-label="Purchasing stage">
          {ROUTE_STEPS.map((s, i) => (
            <button key={s.key} type="button" role="tab" aria-selected={step === i} className="ill-tab" data-active={step === i} onClick={() => setStep(i)}>
              <span>{i + 1}</span> {s.label}
            </button>
          ))}
        </div>
      </div>
      <div className="ill-panel glass" aria-live="polite">
        <span className="ill-tag">{ROUTE_PO.supplier}</span>
        <h4>{ROUTE_PRODUCT.name} · {ROUTE_PO.no}</h4>
        <dl className="ill-dl">
          <div><dt>On hand</dt><dd className="num">{ROUTE_STEPS[step].on}</dd></div>
          <div><dt>Incoming</dt><dd className="num">{ROUTE_STEPS[step].incoming}</dd></div>
          <div><dt>Stage</dt><dd>{ROUTE_STEPS[step].label}</dd></div>
        </dl>
        <p className="ill-hint">{ROUTE_STEPS[step].note}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stock movement — location nodes with directional paths              */
/* ------------------------------------------------------------------ */

const BIN_HALF = { w: 34, h: 18 };
/** Point where the ray from a towards b leaves a's label box (plus a small gap). */
function trimToBox(a: { x: number; y: number }, b: { x: number; y: number }, gap = 4) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const k = Math.min(dx ? (BIN_HALF.w + gap) / Math.abs(dx) : Infinity, dy ? (BIN_HALF.h + gap) / Math.abs(dy) : Infinity);
  return { x: a.x + dx * k, y: a.y + dy * k };
}

const BINS = LOCATIONS;
const MOVES = TRANSFERS.map((t) => ({ ...t, reason: t.note, name: product(t.sku).name }));

export function StockMovementIllustration() {
  const [mv, setMv] = useState(1);
  const move = MOVES[mv];
  const by = (id: string) => BINS.find((b) => b.id === id)!;
  const a = by(move.from);
  const b = by(move.to);
  const ra = trimToBox(a, b);
  const rb = trimToBox(b, a);
  const route = `M${ra.x.toFixed(1)} ${ra.y.toFixed(1)} L${rb.x.toFixed(1)} ${rb.y.toFixed(1)}`;
  return (
    <div className="ill-split ill-split-wide">
      <HairSvg viewBox="0 0 470 220" label="Hairline map of stock locations with directional movement paths" maxWidth={560}>
        {MOVES.map((m, i) => {
          const f = by(m.from);
          const t = by(m.to);
          const p0 = trimToBox(f, t);
          const p1 = trimToBox(t, f);
          return <P key={m.id} d={`M${p0.x.toFixed(1)} ${p0.y.toFixed(1)} L${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`} delay={200 + i * 150} tone={m.id === move.id ? 'wine' : 'dim'} className={m.id === move.id ? 'hl-keep' : ''} />;
        })}
        {BINS.map((bin, i) => {
          const on = bin.id === move.from || bin.id === move.to;
          return (
            <g key={bin.id} transform={`translate(${bin.x} ${bin.y})`}>
              <rect x="-34" y="-18" width="68" height="36" rx="8" className={`hl-box ${on ? 'is-active' : ''}`} style={{ animationDelay: `${i * 120}ms` }} />
              <T x={0} y={4} anchor="middle" size={11} tone={on ? 'wine' : 'dim'}>{bin.label}</T>
            </g>
          );
        })}
        <g key={move.id}>
          <path id="mv-route" d={route} fill="none" stroke="none" />
          <circle r="5" className="hl-signal">
            <animateMotion dur="1.4s" fill="freeze" path={route} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.5 0 0.2 1" />
          </circle>
        </g>
      </HairSvg>
      <div className="ill-panel glass" aria-live="polite">
        <span className="ill-tag">{WORKSPACE.location}</span>
        <ul className="ill-list" role="listbox" aria-label="Stock transfers">
          {MOVES.map((m, i) => (
            <li key={m.id}>
              <button type="button" role="option" aria-selected={mv === i} className="ill-list-btn" data-active={mv === i} onClick={() => setMv(i)}>
                <strong>{by(m.from).label} → {by(m.to).label}</strong>
                <span>{m.qty} × {m.name}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="ill-hint">{move.reason}. Every transfer is attributed and written to the stock ledger.</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Analytics line — drawn trend with labelled points                   */
/* ------------------------------------------------------------------ */

const SERIES = EARBUDS_WEEKLY;

export function AnalyticsLineIllustration() {
  const [range, setRange] = useState<keyof typeof SERIES>('7w');
  const [pt, setPt] = useState<number | null>(null);
  const { data, weeks } = SERIES[range];
  const W = 460;
  const H = 220;
  const pad = { l: 36, r: 16, t: 22, b: 30 };
  const max = Math.ceil((Math.max(...data) * 1.2) / 5) * 5;
  const xs = data.map((_, i) => pad.l + (i * (W - pad.l - pad.r)) / (data.length - 1));
  const ys = data.map((v) => H - pad.b - (v / max) * (H - pad.t - pad.b));
  const line = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${ys[i].toFixed(1)}`).join(' ');
  const cur = pt ?? data.length - 1;
  const prev = Math.max(0, cur - 1);
  const delta = data[cur] - data[prev];
  return (
    <div className="ill-split ill-split-wide">
      <div>
        <HairSvg viewBox={`0 0 ${W} ${H}`} label="Hairline chart of weekly units sold for wireless earbuds" maxWidth={560} key={range}>
          {[0, 1, 2, 3, 4].map((q) => (q * max) / 4).map((g, i) => {
            const y = H - pad.b - (g / max) * (H - pad.t - pad.b);
            return (
              <g key={g}>
                <P d={`M${pad.l} ${y} H${W - pad.r}`} tone="dim" delay={i * 80} className="hl-grid" />
                <T x={pad.l - 8} y={y + 4} anchor="end" size={10} tone="dim">{g}</T>
              </g>
            );
          })}
          <P d={`M${pad.l} ${pad.t - 6} V${H - pad.b}`} delay={0} />
          <P d={line} delay={400} tone="wine" id="trend-line" />
          {xs.map((x, i) => (
            <g
              key={i}
              role="button"
              tabIndex={0}
              aria-label={`${weeks[i]}: ${data[i]}`}
              className="hl-hit"
              onClick={() => setPt(i)}
              onFocus={() => setPt(i)}
              onMouseEnter={() => setPt(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setPt(i);
                }
              }}
            >
              <circle cx={x} cy={ys[i]} r="12" fill="transparent" />
              <circle cx={x} cy={ys[i]} r={cur === i ? 5 : 3} className={`hl-node hl-pt ${cur === i ? 'is-active' : ''}`} style={{ animationDelay: `${1300 + i * 60}ms` }} />
              {(data.length <= 8 || i % 2 === 0) && (
                <T x={x} y={H - 10} anchor="middle" size={10} tone={cur === i ? 'wine' : 'dim'}>{weeks[i]}</T>
              )}
            </g>
          ))}
          <P d={`M${xs[cur]} ${ys[cur] + 8} V${H - pad.b}`} tone="wine" dashed className="hl-keep hl-drop" key={`drop${cur}`} />
        </HairSvg>
        <div className="ill-tabs" role="tablist" aria-label="Chart range">
          {(Object.keys(SERIES) as Array<keyof typeof SERIES>).map((k) => (
            <button key={k} type="button" role="tab" aria-selected={range === k} className="ill-tab" data-active={range === k} onClick={() => { setRange(k); setPt(null); }}>
              {SERIES[k].label}
            </button>
          ))}
        </div>
      </div>
      <div className="ill-panel glass" aria-live="polite">
        <span className="ill-tag">{product('SKU-2081').name}</span>
        <h4>Units sold · {weeks[cur]}</h4>
        <p className="ill-big num">{data[cur]}</p>
        <p className={`ill-delta ${delta >= 0 ? 'up' : 'down'}`}>{delta >= 0 ? '+' : ''}{delta} vs {weeks[prev]}</p>
        <p className="ill-hint">Hover or focus a point to read it. Sales, stock and purchasing reports follow the same pattern.</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Integration topology — readiness shown by line style, not by claim  */
/* ------------------------------------------------------------------ */

const TOPO = [
  { id: 'import', label: 'Data import', status: 'Available', x: 70, y: 56, style: 'solid' },
  { id: 'barcode', label: 'Barcode printing', status: 'Available', x: 70, y: 174, style: 'solid' },
  { id: 'pay', label: 'Payment gateway', status: 'Setup required', x: 410, y: 56, style: 'dashed' },
  { id: 'acct', label: 'Accounting systems', status: 'Enterprise custom', x: 410, y: 174, style: 'dotted' },
];

export function IntegrationTopologyIllustration() {
  const [sel, setSel] = useState('import');
  return (
    <div className="ill-split ill-split-wide">
      <HairSvg viewBox="0 0 480 230" label="Hairline topology of Sikick connected to four integration categories, with readiness shown by line style" maxWidth={560}>
        {TOPO.map((n, i) => (
          <P
            key={n.id}
            id={`topo-${n.id}`}
            d={n.x < 240 ? `M${n.x + 54} ${n.y} C 170 ${n.y}, 170 115, 206 115` : `M${n.x - 54} ${n.y} C 310 ${n.y}, 310 115, 274 115`}
            delay={300 + i * 150}
            tone={sel === n.id ? 'wine' : 'dim'}
            dashed={n.style !== 'solid'}
            className={n.style === 'dotted' ? 'hl-dotted' : ''}
          />
        ))}
        <circle cx="240" cy="115" r="34" className="hl-box is-active" />
        <T x="240" y="119" anchor="middle" size={13} tone="ivory">Sikick</T>
        {TOPO.map((n, i) => (
          <g key={n.id} className="hl-hit" role="button" tabIndex={0} aria-pressed={sel === n.id} aria-label={`${n.label}: ${n.status}`} onClick={() => setSel(n.id)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSel(n.id); } }}>
            <rect x={n.x - 54} y={n.y - 20} width="108" height="40" rx="10" className={`hl-box ${sel === n.id ? 'is-active' : ''}`} style={{ animationDelay: `${i * 140}ms` }} />
            <T x={n.x} y={n.y + 4} anchor="middle" size={11} tone={sel === n.id ? 'wine' : 'dim'}>{n.label}</T>
          </g>
        ))}
        <Signal pathId="topo-import" delay={1400} dur={1200} />
        <Signal pathId="topo-barcode" delay={1700} dur={1200} />
      </HairSvg>
      <div className="ill-panel glass" aria-live="polite">
        {TOPO.filter((n) => n.id === sel).map((n) => (
          <div key={n.id}>
            <span className="ill-tag">{n.status}</span>
            <h4>{n.label}</h4>
            <p className="ill-hint">
              {n.style === 'solid' && 'Available today. A signal travels along solid lines only.'}
              {n.style === 'dashed' && 'Needs configuration with your provider before it carries anything. Dashed until set up.'}
              {n.style === 'dotted' && 'Scoped per customer under Enterprise. Dotted until a connector is agreed.'}
            </p>
          </div>
        ))}
        <p className="ill-hint">Line style shows readiness. No connector is shown as active unless it is available.</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Access path — what happens to one action inside a workspace         */
/* Only describes protections the site already states elsewhere.       */
/* ------------------------------------------------------------------ */

const ACCESS_STEPS = [
  { id: 'signin', label: 'Sign in', note: 'A person signs in to their own workspace. Email and password signups verify their email first.' },
  { id: 'role', label: 'Role check', note: 'Role-based access decides which screens and actions that person can use inside the workspace.' },
  { id: 'action', label: 'Action', note: 'The person works with stock, sales or purchasing records within the access they were given.' },
  { id: 'audit', label: 'Audit log', note: 'Important business actions are written to an audit log with who did what and when.' },
  { id: 'export', label: 'Export', note: 'Products, stock, customers and transactions can be exported, so the data stays under your control.' },
];

export function AccessPathIllustration() {
  const [sel, setSel] = useState(1);
  return (
    <div className="ill-split ill-split-wide">
      <HairSvg viewBox="0 0 520 150" label="Hairline path from sign in through role check, action and audit log to export" maxWidth={620}>
        <P id="access-line" d="M44 70 H476" tone="dim" delay={100} />
        <P d={`M44 70 H${44 + (sel * 432) / 4}`} tone="wine" delay={0} className="hl-keep" key={sel} />
        {ACCESS_STEPS.map((s, i) => {
          const x = 44 + (i * 432) / 4;
          return (
            <g key={s.id} className="hl-hit" role="button" tabIndex={0} aria-pressed={sel === i} aria-label={s.label} onClick={() => setSel(i)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSel(i); } }}>
              <circle cx={x} cy={70} r="16" className={`hl-box ${sel === i ? 'is-active' : ''}`} style={{ animationDelay: `${300 + i * 120}ms` }} />
              <T x={x} y={74} anchor="middle" size={11} tone={sel === i ? 'wine' : 'dim'} delay={400 + i * 120}>{i + 1}</T>
              <T x={x} y={116} anchor="middle" size={12} tone={sel === i ? 'ivory' : 'dim'} delay={500 + i * 120}>{s.label}</T>
            </g>
          );
        })}
        <Signal pathId="access-line" delay={900} dur={1800} />
      </HairSvg>
      <div className="ill-panel glass" aria-live="polite">
        <span className="ill-tag">Step {sel + 1} of {ACCESS_STEPS.length}</span>
        <h4>{ACCESS_STEPS[sel].label}</h4>
        <p className="ill-hint">{ACCESS_STEPS[sel].note}</p>
      </div>
    </div>
  );
}
