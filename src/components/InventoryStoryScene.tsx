import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const states = [
  {
    id: 'receive',
    label: 'Receive stock',
    title: 'Stock arrives and the ledger updates.',
    body: 'A purchase order is received line by line. Cartons are scanned onto the shelf, the receiving status appears, and on-hand quantities update without a separate spreadsheet.',
  },
  {
    id: 'find',
    label: 'Find an item',
    title: 'The right bin is visible before anyone walks the aisle.',
    body: 'A barcode scan or search highlights the shelf location. The product, variant and stock position stay connected, so the operator knows exactly where to look.',
  },
  {
    id: 'reorder',
    label: 'Prepare a reorder',
    title: 'SiBorg prepares a draft; a person approves it.',
    body: 'When stock reaches a threshold, SiBorg prepares a reviewable purchase-order draft using stock and supplier context. It is not sent until someone approves it.',
  },
];

export function InventoryStoryScene() {
  const [active, setActive] = useState('receive');
  const current = states.find((state) => state.id === active) ?? states[0];
  const [mounted, setMounted] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      const nextIndex = (states.findIndex((s) => s.id === active) + 1) % states.length;
      setActive(states[nextIndex]!.id);
    }, 5200);
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [active]);

  return (
    <section className="section section-blush inventory-story-section" aria-labelledby="inventory-story-title">
      <div className="container">
        <div className="inventory-story-grid">
          <div className="inventory-story-copy">
            <p className="eyebrow">Everything in its place</p>
            <h2 id="inventory-story-title">{current.title}</h2>
            <p className="section-lede">{current.body}</p>
            <div className="inventory-story-controls" role="tablist" aria-label="Inventory story states">
              {states.map((state) => (
                <button
                  key={state.id}
                  type="button"
                  role="tab"
                  aria-selected={active === state.id}
                  className={`inventory-control ${active === state.id ? 'is-active' : ''}`}
                  onClick={() => setActive(state.id)}
                >
                  {state.label}
                </button>
              ))}
            </div>
            <p className="inventory-story-live" aria-live="polite">
              Selected state: {current.label}
            </p>
            <Link className="btn btn-secondary" to="/product/stock-control">
              Explore stock control <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="inventory-scene" aria-hidden="true">
            <StockroomSvg state={active} mounted={mounted} />
          </div>
        </div>
      </div>
    </section>
  );
}

function StockroomSvg({ state, mounted }: { state: string; mounted: boolean }) {
  return (
    <svg
      viewBox="0 0 480 320"
      className="stockroom-svg"
      style={{ width: '100%', maxWidth: 520, height: 'auto' }}
    >
      <defs>
        <linearGradient id="shelfGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fffefc" />
          <stop offset="100%" stopColor="#f5e8ea" />
        </linearGradient>
        <linearGradient id="crateGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b45c7a" />
          <stop offset="100%" stopColor="#8b1538" />
        </linearGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="rgb(42 11 19 / 0.12)" />
        </filter>
      </defs>

      {/* Room backdrop */}
      <rect x="40" y="40" width="400" height="240" rx="18" fill="url(#shelfGrad)" filter="url(#softShadow)" />
      <rect x="60" y="60" width="360" height="200" rx="12" fill="none" stroke="#e8dde0" strokeWidth="1" />

      {/* Shelf unit */}
      <g className="shelf-unit" transform="translate(90, 90)">
        <rect x="0" y="0" width="180" height="150" rx="10" fill="#fffefc" stroke="#e8dde0" />
        <rect x="12" y="48" width="156" height="6" rx="3" fill="#d9c8cd" />
        <rect x="12" y="96" width="156" height="6" rx="3" fill="#d9c8cd" />

        {/* Crate A - bottom shelf */}
        <g
          className="crate-a"
          style={{
            transform: state === 'receive' ? 'translate(24px, 108px)' : state === 'reorder' ? 'translate(80px, 54px)' : 'translate(24px, 108px)',
            transition: 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <rect x="0" y="0" width="56" height="38" rx="6" fill="url(#crateGrad)" filter="url(#softShadow)" />
          <text x="28" y="23" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="600">SKU-1042</text>
        </g>

        {/* Crate B - top shelf */}
        <g
          className="crate-b"
          style={{
            transform: state === 'receive' ? 'translate(100px, 54px)' : 'translate(100px, 54px)',
            transition: 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <rect x="0" y="0" width="56" height="38" rx="6" fill="#950e2d" filter="url(#softShadow)" />
          <text x="28" y="23" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="600">SKU-2081</text>
        </g>
      </g>

      {/* Scanner / delivery element */}
      <g
        className="delivery-element"
        style={{
          opacity: state === 'receive' ? 1 : 0,
          transform: state === 'receive' ? 'translate(0, 0)' : 'translate(-20px, 0)',
          transition: 'opacity 400ms, transform 400ms',
        }}
      >
        <rect x="300" y="110" width="80" height="46" rx="8" fill="#fff" stroke="#e8dde0" filter="url(#softShadow)" />
        <text x="340" y="130" textAnchor="middle" fill="#6b5c62" fontSize="8">PO-0182</text>
        <text x="340" y="144" textAnchor="middle" fill="#8b1538" fontSize="9" fontWeight="700">240 received</text>
      </g>

      {/* Bin tag */}
      <g
        className="bin-tag"
        style={{
          opacity: state === 'find' ? 1 : 0,
          transform: state === 'find' ? 'translate(0, 0)' : 'translate(0, 8px)',
          transition: 'opacity 400ms, transform 400ms',
        }}
      >
        <rect x="290" y="90" width="96" height="32" rx="16" fill="#fff" stroke="#8b1538" strokeWidth="1.5" filter="url(#softShadow)" />
        <text x="338" y="110" textAnchor="middle" fill="#8b1538" fontSize="10" fontWeight="700">Bin B-14</text>
      </g>

      {/* SiBorg card */}
      <g
        className="siborg-card"
        style={{
          opacity: state === 'reorder' ? 1 : 0,
          transform: state === 'reorder' ? 'translate(0, 0)' : 'translate(0, 12px)',
          transition: 'opacity 400ms, transform 400ms',
        }}
      >
        <rect x="280" y="180" width="140" height="82" rx="10" fill="#fff" stroke="#e8dde0" filter="url(#softShadow)" />
        <circle cx="300" cy="200" r="6" fill="#8b1538" />
        <text x="314" y="204" fill="#20181b" fontSize="10" fontWeight="700">SiBorg draft</text>
        <text x="294" y="224" fill="#6b5c62" fontSize="9">Reorder 60 units</text>
        <text x="294" y="240" fill="#6b5c62" fontSize="9">Awaiting approval</text>
        <rect x="290" y="250" width="68" height="18" rx="9" fill="#8b1538" />
        <text x="324" y="262" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="600">Approve</text>
      </g>

      {/* Animated flow lines */}
      <g className="flow-lines" opacity={mounted ? 1 : 0} style={{ transition: 'opacity 800ms' }}>
        <path
          d="M 340 156 L 340 180"
          stroke="#d9c8cd"
          strokeWidth="2"
          strokeDasharray="6 4"
          fill="none"
          style={{
            strokeDashoffset: state === 'receive' ? 0 : 20,
            transition: 'stroke-dashoffset 1s linear',
          }}
        />
      </g>
    </svg>
  );
}

export default InventoryStoryScene;
