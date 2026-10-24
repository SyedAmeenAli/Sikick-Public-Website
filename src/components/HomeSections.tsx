import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useMedia, useScrollProgress } from '../lib/motion';
import { HeroFilm } from './HeroFilm';
import { LEDGER_EARBUDS, PRODUCTS, inr, po, product } from '../data/morrow';
import { PLATFORMS } from '../data/migration';
import { PlatformLogo } from './migration/Logo';
import { HairSvg, P, Signal } from './hairline/kit';

/* ------------------------------------------------------------------ */
/* Hero scene with layered parallax. Layers move a few px, transform   */
/* only, driven by one scroll-progress variable (--p).                 */
/* ------------------------------------------------------------------ */

export function HeroScene() {
  const ref = useScrollProgress<HTMLDivElement>(undefined, 'leave');
  return (
    <div ref={ref} className="hero-scene">
      <div className="hero-layer hero-bg" aria-hidden="true">
        <svg viewBox="0 0 1000 520" preserveAspectRatio="xMidYMid slice" className="hero-contours">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <ellipse key={i} cx="500" cy="300" rx={170 + i * 90} ry={90 + i * 52} className="hero-contour" style={{ animationDelay: `${i * 120}ms`, opacity: 0.55 - i * 0.07 }} pathLength={1} />
          ))}
        </svg>
      </div>
      <div className="hero-layer hero-main">
        <HeroFilm />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Horizontal module walk (desktop, scroll-linked) / swipe row (touch) */
/* ------------------------------------------------------------------ */

const MODULES = [
  { to: '/product/inventory', title: 'Inventory & catalog', body: 'Products, variants, SKUs, barcodes and stock visibility in one place.', glyph: 'inventory' },
  { to: '/product/pos', title: 'POS & selling', body: 'Till checkout, orders, quotations, customers and standard returns.', glyph: 'pos' },
  { to: '/product/purchasing', title: 'Purchasing', body: 'Purchase orders, receiving, supplier records and payments.', glyph: 'purchasing' },
  { to: '/product/reports', title: 'Reports & analytics', body: 'Sales, stock and purchasing visibility for decisions.', glyph: 'reports' },
] as const;

function Glyph({ kind }: { kind: (typeof MODULES)[number]['glyph'] }) {
  return (
    <HairSvg viewBox="0 0 220 120" label={`${kind} illustration`} maxWidth={260}>
      {kind === 'inventory' && (
        <>
          <P d="M30 14 V104 M190 14 V104 M30 48 H190 M30 82 H190 M30 104 H190" />
          <P d="M44 48 V30 H70 V48 M80 48 V24 H108 V48 M52 82 V62 H84 V82 M96 82 V58 H130 V82 M146 82 V66 H174 V82" tone="dim" delay={300} />
          <P id="g-inv" d="M140 48 V30 H170 V48" tone="wine" delay={700} />
        </>
      )}
      {kind === 'pos' && (
        <>
          <rect x="52" y="20" width="116" height="66" rx="8" className="hl-p hl-ivory hl-draw" pathLength={1} fill="none" />
          <P d="M64 40 H120 M64 54 H104 M64 68 H112" tone="dim" delay={300} />
          <rect x="130" y="38" width="28" height="36" rx="4" className="hl-p hl-wine hl-draw" pathLength={1} fill="none" style={{ animationDelay: '500ms' }} />
          <P d="M110 86 V100 M78 104 H142" delay={500} />
          <P id="g-pos" d="M10 70 H52" tone="wine" delay={800} />
          <Signal pathId="g-pos" delay={900} dur={800} />
        </>
      )}
      {kind === 'purchasing' && (
        <>
          <P d="M18 50 L38 40 L58 50 V72 L38 82 L18 72 Z M18 50 L38 60 L58 50 M38 60 V82" />
          <P id="g-pur" d="M66 62 H150" tone="wine" delay={500} />
          <P d="M158 48 H206 V80 H158 Z M168 80 V62 H196 V80" delay={300} tone="dim" />
          <Signal pathId="g-pur" delay={1000} dur={1000} />
        </>
      )}
      {kind === 'reports' && (
        <>
          <P d="M24 14 V98 H200" />
          <P d="M24 76 H200 M24 54 H200 M24 32 H200" tone="dim" delay={200} />
          <P id="g-rep" d="M30 86 L62 70 L94 76 L126 48 L158 54 L192 24" tone="wine" delay={500} />
          <Signal pathId="g-rep" delay={700} dur={1200} />
        </>
      )}
    </HairSvg>
  );
}

export function ModuleWalk() {
  const desktop = useMedia('(min-width: 960px)');
  const trackRef = useRef<HTMLDivElement | null>(null);
  const ref = useScrollProgress<HTMLElement>((p) => {
    const track = trackRef.current;
    if (!track || !desktop) return;
    const travel = Math.max(0, track.scrollWidth - track.parentElement!.clientWidth);
    track.style.transform = `translate3d(${(-p * travel).toFixed(1)}px,0,0)`;
  }, 'sticky');

  return (
    <section ref={ref} className="module-walk" data-desktop={desktop} aria-labelledby="mw-title">
      <div className="module-walk-stage">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Modules</p>
            <h2 id="mw-title">One system for the work that moves stock.</h2>
            <p className="section-lede">Catalog, stock, purchasing, sales and reporting share the same truth, so a change in one place is visible everywhere.</p>
          </div>
        </div>
        <div className="module-walk-view container">
          <div ref={trackRef} className="module-walk-track">
            {MODULES.map((m, i) => (
              <Link key={m.to} to={m.to} className="module-tile glass">
                <span className="module-tile-num">0{i + 1}</span>
                <Glyph kind={m.glyph} />
                <h3>{m.title}</h3>
                <p>{m.body}</p>
                <span className="module-link">Explore <ArrowRight size={14} /></span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Sticky workflow story: one product thread, six stages               */
/* ------------------------------------------------------------------ */

const STEPS = [
  { title: 'Catalogue', body: 'Products, variants, SKUs and barcodes are imported from a spreadsheet or entered by hand.' },
  { title: 'Goods receiving', body: 'Purchase orders are received line by line. Damaged units are recorded separately from accepted stock.' },
  { title: 'Storage location', body: 'Accepted units are put away to a shelf or bin so anyone can find them without walking the aisle.' },
  { title: 'POS sale', body: 'Till checkout, orders and quotations all draw from the same stock truth.' },
  { title: 'Stock update', body: 'Every sale writes to the ledger: who, what, when. On-hand and reserved quantities move together.' },
  { title: 'Business insight', body: 'Reports and SiBorg turn the ledger into trends, cover and reviewable reorder drafts.' },
];

const SALE_LINES = [
  { p: product('SKU-2081'), qty: 2 },
  { p: product('SKU-4120'), qty: 1 },
];
const SALE_TOTAL = SALE_LINES.reduce((t, l) => t + l.p.price * l.qty, 0);

function StepScreen({ i }: { i: number }) {
  const recv = po('PO-0183');
  const recvLine = recv.lines[0];
  const recvProduct = product(recvLine.sku);
  const led = LEDGER_EARBUDS;
  switch (i) {
    case 0:
      return (
        <>
          {PRODUCTS.slice(0, 3).map((p, k) => (
            <div className="ui-row ws-in" key={p.sku} style={{ animationDelay: `${k * 80}ms` }}>
              <span className="ui-name">{p.sku} · {p.name}</span>
              <span className="ui-badge ui-badge-ok">{inr(p.price)}</span>
            </div>
          ))}
          <p className="ws-foot">Barcodes generated, variants linked</p>
        </>
      );
    case 1:
      return (
        <>
          <div className="ws-bar-row ws-in">
            <span>{recv.no} · {recvProduct.name}</span>
            <span className="ws-bar"><i style={{ width: '100%' }} /></span>
            <span className="num">{recvLine.qty}/{recvLine.qty}</span>
          </div>
          <p className="ws-foot">From {recv.supplier}, due {recv.due}. Damaged units are recorded apart from accepted stock.</p>
        </>
      );
    case 2:
      return (
        <div className="ws-shelf">
          {Array.from({ length: 9 }).map((_, k) => (
            <span key={k} data-hot={k === 4} className="ws-in" style={{ animationDelay: `${k * 30}ms` }}>{k === 4 ? product('SKU-2081').shelf.split(' · ')[0] + '-1' : ''}</span>
          ))}
          <p className="ws-foot">{product('SKU-2081').name} sit on {product('SKU-2081').shelf}</p>
        </div>
      );
    case 3:
      return (
        <>
          {SALE_LINES.map((l, k) => (
            <div className="ui-row ws-in" key={l.p.sku} style={{ animationDelay: `${k * 80}ms` }}>
              <span className="ui-name">{l.qty} × {l.p.name}</span>
              <span className="ui-qty">{inr(l.p.price * l.qty)}</span>
            </div>
          ))}
          <div className="ui-row ws-in"><span className="ui-name"><b>Total</b></span><span className="ui-qty">{inr(SALE_TOTAL)}</span></div>
          <p className="ws-foot">UPI selected at Till 2</p>
        </>
      );
    case 4:
      return (
        <>
          {[...led.rows, led.next].map((r, k) => (
            <div className="ui-row ws-in" key={r.ref} style={{ animationDelay: `${k * 80}ms` }}>
              <span className="ui-sku">{r.time}</span>
              <span className="ui-name">{r.ref} · {product(led.sku).name} {r.delta}</span>
            </div>
          ))}
          <p className="ws-foot">On hand now {product(led.sku).stock + led.next.delta}. Every entry is attributed and time-stamped</p>
        </>
      );
    default:
      return (
        <>
          <svg viewBox="0 0 240 70" className="ws-mini" aria-hidden="true">
            <path d="M4 58 L40 46 L76 50 L112 30 L148 36 L184 18 L236 8" pathLength={1} className="ws-mini-line" />
          </svg>
          <div className="ui-panel ui-siborg ws-in">
            <div className="ui-panel-title">SiBorg · draft for review</div>
            <div style={{ fontSize: '0.78rem' }}>{po('PO-0184').no} · 60 {product('SKU-2081').name} to {po('PO-0184').supplier}</div>
          </div>
        </>
      );
  }
}

export function WorkflowStory() {
  const desktop = useMedia('(min-width: 960px)');
  const [active, setActive] = useState(0);
  const ref = useScrollProgress<HTMLDivElement>((p) => {
    if (!desktop) return;
    const next = Math.min(STEPS.length - 1, Math.floor(p * STEPS.length));
    setActive((cur) => (cur === next ? cur : next));
  }, 'sticky');

  return (
    <section ref={ref} className="ws" data-desktop={desktop} aria-labelledby="ws-title" style={{ ['--steps' as string]: STEPS.length }}>
      <div className="ws-stage">
        <div className="container ws-grid">
          <div className="ws-copy">
            <p className="eyebrow">From stock to sale</p>
            <h2 id="ws-title">Follow one item through the whole system.</h2>
            <ol className="ws-steps">
              {STEPS.map((s, i) => (
                <li key={s.title} data-active={active === i} data-done={i < active}>
                  <button type="button" onClick={() => setActive(i)} aria-current={active === i ? 'step' : undefined}>
                    <span className="ws-node" aria-hidden="true" />
                    <span className="ws-step-title">{s.title}</span>
                  </button>
                  <div className="ws-step-body" data-open={active === i}><div><p>{s.body}</p></div></div>
                </li>
              ))}
            </ol>
          </div>
          <div className="ws-visual">
            <div className="ui-frame glass-elevated">
              <div className="ui-chrome">
                <span className="ui-chrome-dot" /><span className="ui-chrome-dot" /><span className="ui-chrome-dot" />
                <span className="ui-chrome-url">sikick · {STEPS[active].title.toLowerCase()}</span>
                <span className="ui-demo-tag">Morrow Goods</span>
              </div>
              <div className="ui-body" key={active}>
                <div className="ui-topbar"><span className="ui-topbar-title">{STEPS[active].title}</span></div>
                <StepScreen i={active} />
              </div>
            </div>
            <div className="ws-progress" aria-hidden="true"><i style={{ transform: `scaleX(${(active + 1) / STEPS.length})` }} /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Chapter rail: a fine wine line that fills as the four product       */
/* chapters (stock, sell, receive, understand) are read in order.      */
/* ------------------------------------------------------------------ */

export function ChapterRail({ children }: { children: React.ReactNode }) {
  const ref = useScrollProgress<HTMLDivElement>(undefined, 'sticky');
  return (
    <div ref={ref} className="chapters">
      {children}
    </div>
  );
}

/** Reading progress for long legal pages: a thin wine bar under the header. */
export function ReadingProgress() {
  const ref = useScrollProgress<HTMLDivElement>(undefined, 'sticky');
  return <div ref={ref} className="reading-progress" aria-hidden="true" />;
}

/** Quiet pointer to the migration page, where a visitor would wonder how to bring their data. */
export function SwitchBand() {
  return (
    <div className="switch-band">
      <div>
        <p className="eyebrow">Moving from another system?</p>
        <h2>Bring your catalog with you.</h2>
        <p>Import items and parties from Excel, CSV or Tally XML. Every route says what has been verified and what has not, and the file is checked before anything is written.</p>
        <p style={{ marginTop: 'var(--space-24)' }}>
          <Link className="btn btn-primary" to="/switch-to-sikick">Explore data migration <ArrowRight size={16} aria-hidden="true" /></Link>
        </p>
      </div>
      <div className="switch-band-logos" aria-label="Software you can move from">
        {PLATFORMS.filter((p) => p.logo && p.id !== 'excel').map((p) => (
          <Link key={p.id} to={`/switch-to-sikick#from=${p.id}`} aria-label={`Moving from ${p.name}`}><PlatformLogo platform={p} area={3200} maxWidth={110} /></Link>
        ))}
      </div>
    </div>
  );
}
