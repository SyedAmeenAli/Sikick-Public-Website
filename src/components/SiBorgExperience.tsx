import { useEffect, useRef, useState } from 'react';
import { HairSvg, P, Signal, T } from './hairline/kit';
import { SiBorgMark, type SiBorgState } from './hairline/SiBorgMark';
import { SiBorgObject3D } from './SiBorgObject3D';
import { MIN_ORDER_QTY, WORKSPACE, coverDays, lowStock, po, product, slowMovers, EARBUDS_WEEKLY } from '../data/morrow';

/* ------------------------------------------------------------------ */
/* Constellation: central mark with five operational signals           */
/* ------------------------------------------------------------------ */

const E = product('SKU-2081');
const L = product('SKU-5002');
const OPEN_PO = po('PO-0183');
const RECV_PO = po('PO-0182');
const WK = EARBUDS_WEEKLY['7w'].data;
const SIGNALS = [
  { id: 'inventory', label: 'Inventory', x: 70, y: 70, title: 'Inventory signal', body: `${E.name} are down to ${E.stock} units, below the reorder point of ${E.reorderPoint}. At the 30-day rate that is about ${coverDays(E)} days of cover.`, src: `Stock ledger, ${WORKSPACE.location}` },
  { id: 'purchasing', label: 'Purchasing', x: 70, y: 250, title: 'Purchasing signal', body: `${OPEN_PO.no} from ${OPEN_PO.supplier} is in transit with ${OPEN_PO.lines[0].qty} ${product(OPEN_PO.lines[0].sku).name}, due ${OPEN_PO.due}. Nothing is on order for the earbuds yet.`, src: 'Purchase orders' },
  { id: 'sales', label: 'Sales', x: 490, y: 70, title: 'Sales signal', body: `Earbuds sold ${WK[WK.length - 3]}, ${WK[WK.length - 2]} and ${WK[WK.length - 1]} units in the last three weeks, rising each week.`, src: 'Sales orders, weekly' },
  { id: 'alerts', label: 'Alerts', x: 490, y: 250, title: 'Exception signal', body: `${RECV_PO.no} received ${RECV_PO.lines[0].received} of ${RECV_PO.lines[0].qty} ${product(RECV_PO.lines[0].sku).name}. The 2 damaged units are held apart and not yet reconciled.`, src: 'Receiving log' },
  { id: 'insight', label: 'Insight', x: 280, y: 345, title: 'Business insight', body: `A draft of 60 earbuds and ${po('PO-0184').lines[1].qty} desk lamps to ${WORKSPACE.supplier} is ready for review. It respects the supplier minimum of ${MIN_ORDER_QTY} per line.`, src: 'Computed from the signals above' },
];

const HUB = { x: 280, y: 175, r: 92 };
/** Straight hairline from a label's edge to the hub ring, so lines never cross the label text or the mark. */
function signalPath(x: number, y: number) {
  const dx = HUB.x - x;
  const dy = HUB.y - y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const k = Math.min(Math.abs(ux) > 1e-6 ? 52 / Math.abs(ux) : Infinity, Math.abs(uy) > 1e-6 ? 22 / Math.abs(uy) : Infinity);
  return `M${(x + ux * k).toFixed(1)} ${(y + uy * k).toFixed(1)} L${(HUB.x - ux * HUB.r).toFixed(1)} ${(HUB.y - uy * HUB.r).toFixed(1)}`;
}

export function SiBorgConstellation() {
  const [sel, setSel] = useState('inventory');
  const cur = SIGNALS.find((s) => s.id === sel)!;
  return (
    <div className="ill-split ill-split-wide sb-const">
      <HairSvg viewBox="0 0 560 380" label="SiBorg intelligence mark at the centre with five operational signals connected by hairlines" maxWidth={620}>
        {SIGNALS.map((s, i) => (
          <P
            key={s.id}
            id={`sbc-${s.id}`}
            d={signalPath(s.x, s.y)}
            delay={400 + i * 160}
            tone={sel === s.id ? 'wine' : 'dim'}
          />
        ))}
        <Signal pathId={`sbc-${sel}`} delay={0} dur={1100} />
        <circle cx="280" cy="175" r="86" className="hl-p hl-dim" fill="none" strokeDasharray="2 5" />
        <foreignObject x="220" y="115" width="120" height="120">
          <div className="sb-const-mark">
            <SiBorgMark size={116} state="idle" />
          </div>
        </foreignObject>
        {SIGNALS.map((s) => (
          <g
            key={s.id}
            className="hl-hit"
            role="button"
            tabIndex={0}
            aria-pressed={sel === s.id}
            aria-label={`${s.label} signal`}
            onClick={() => setSel(s.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSel(s.id);
              }
            }}
          >
            <rect x={s.x - 48} y={s.y - 18} width="96" height="36" rx="18" className={`hl-box ${sel === s.id ? 'is-active' : ''}`} />
            <T x={s.x} y={s.y + 4} anchor="middle" size={13} tone={sel === s.id ? 'wine' : 'ivory'}>{s.label}</T>
          </g>
        ))}
      </HairSvg>
      <div className="ill-panel glass-elevated" aria-live="polite" key={cur.id}>
        <span className="ill-tag">{WORKSPACE.location}</span>
        <h4>{cur.title}</h4>
        <p>{cur.body}</p>
        <p className="ill-hint">Source: {cur.src}. SiBorg connects what your own records already show. It does not know anything outside them.</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Conversational demo                                                 */
/* ------------------------------------------------------------------ */

type Reply = {
  lead: string;
  evidence: string[];
  detail: string;
  proposal?: { title: string; lines: Array<{ item: string; qty: number }>; reason: string };
};

const DRAFT = po('PO-0184');
const draftLines = DRAFT.lines.map((l) => ({ item: product(l.sku).name, qty: l.qty }));
const attention = lowStock();
const slow = slowMovers();
const PROMPTS: Array<{ q: string; reply: Reply }> = [
  {
    q: 'Which items need attention this week?',
    reply: {
      lead: `${attention.length} items are at or below their reorder point. The earbuds are the most urgent.`,
      evidence: [
        ...attention.map((p) => `${p.name}: ${p.stock} left, reorder point ${p.reorderPoint}${coverDays(p) ? `, about ${coverDays(p)} days of cover` : ''}`),
        `${product('SKU-5003').name}: ${product('SKU-5003').damaged} damaged units from ${RECV_PO.no} not yet reconciled`,
      ],
      detail: 'Cover is stock divided by the 30-day sales rate. Reorder points come from each product\'s settings. Units marked damaged are held apart from accepted stock.',
      proposal: { title: `Draft ${DRAFT.no} to ${DRAFT.supplier}`, lines: draftLines, reason: `Covers the 7-day lead time plus a 14-day buffer and respects the supplier minimum of ${MIN_ORDER_QTY} per line.` },
    },
  },
  {
    q: 'Why is the earbuds stock dropping?',
    reply: {
      lead: 'Sales have risen for three weeks and nothing is on order.',
      evidence: [`Units sold per week: ${WK.slice(-4).join(', ')}`, `${E.sold30} sold in 30 days against ${E.stock} on hand`, 'No transfers out of this product in the period'],
      detail: `The drop is demand, not stock moving or being adjusted away. Every sale and transfer is in the ledger for ${E.sku}.`,
    },
  },
  {
    q: 'What should I reorder from my main supplier?',
    reply: {
      lead: `Two lines are worth ordering from ${DRAFT.supplier}. I have prepared a draft for your review.`,
      evidence: [`${E.name}: 60 units covers about ${Math.round(((E.stock + 60) / (E.sold30 / 30)))} days`, `${L.name}: ${po('PO-0184').lines[1].qty} units lifts it above its reorder point of ${L.reorderPoint}`, `Supplier minimum order is ${MIN_ORDER_QTY} units per line`],
      detail: 'Quantities use your lead times and 30-day sales. If a product lacked sales history, SiBorg would say so and fall back to the reorder rule you set.',
      proposal: { title: `Draft ${DRAFT.no} to ${DRAFT.supplier}`, lines: draftLines, reason: 'Lead time 7 days, buffer 14 days, supplier minimum 30.' },
    },
  },
  {
    q: 'Show me slow-moving stock',
    reply: {
      lead: `${slow.length} products have not sold in 60 days. ${slow[0].name} holds the most units.`,
      evidence: slow.map((p) => `${p.name}: ${p.stock} units, last sale ${p.lastSaleDays} days ago`),
      detail: 'Slow movers are products with no sale for 60 days and more than 30 units on hand. Both thresholds are configurable.',
    },
  },
];

type Phase = 'idle' | 'thinking' | 'answered';

export function SiBorgDemo() {
  const [idx, setIdx] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const [open, setOpen] = useState(false);
  const [review, setReview] = useState<'closed' | 'review' | 'approved'>('closed');
  const [qtys, setQtys] = useState<number[]>([]);
  const timer = useRef<number | null>(null);

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  const ask = (i: number) => {
    if (timer.current) window.clearTimeout(timer.current);
    setIdx(i);
    setPhase('thinking');
    setOpen(false);
    setReview('closed');
    setQtys(PROMPTS[i].reply.proposal?.lines.map((l) => l.qty) ?? []);
    timer.current = window.setTimeout(() => setPhase('answered'), 1100);
  };

  const reply = idx === null ? null : PROMPTS[idx].reply;
  const markState: SiBorgState = phase === 'thinking' ? 'thinking' : phase === 'answered' ? (review === 'review' ? 'recommend' : reply?.proposal ? 'recommend' : 'insight') : 'idle';

  return (
    <div className="sbd glass-elevated" aria-label="SiBorg demonstration">
      <div className="sbd-head">
        <div className="sbd-bot3d"><SiBorgObject3D state={markState} label={`SiBorg, ${markState} state`} /></div>
        <div>
          <strong>SiBorg</strong>
          <span>{WORKSPACE.name} · illustrative responses</span>
        </div>
        <span className="pill pill-info">Demo</span>
      </div>
      <div className="sbd-body" data-lenis-prevent>
        {reply === null && <p className="sbd-empty">Pick a question to see how SiBorg answers from a business’s own records.</p>}
        {idx !== null && <div className="sbd-msg sbd-user">{PROMPTS[idx].q}</div>}
        {phase === 'thinking' && (
          <div className="sbd-msg sbd-bot sbd-thinking" role="status">
            Reading stock, sales and purchase records
            <span className="sbd-dots" aria-hidden="true"><i /><i /><i /></span>
          </div>
        )}
        {phase === 'answered' && reply && (
          <div className="sbd-msg sbd-bot" key={idx}>
            <p className="sbd-lead">{reply.lead}</p>
            <ul className="sbd-evidence">
              {reply.evidence.map((e, i) => (
                <li key={e} style={{ animationDelay: `${i * 90}ms` }}>{e}</li>
              ))}
            </ul>
            <button type="button" className="sbd-link" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
              {open ? 'Hide how this was worked out' : 'How this was worked out'}
            </button>
            <div className="sbd-detail" data-open={open}>
              <div><p>{reply.detail}</p></div>
            </div>
            {reply.proposal && review === 'closed' && (
              <button type="button" className="sbd-proposal glass" onClick={() => setReview('review')}>
                <span className="ill-tag">Proposed action</span>
                <strong>{reply.proposal.title}</strong>
                <span>{reply.proposal.lines.map((l, i) => `${qtys[i] ?? l.qty} × ${l.item}`).join(' · ')}</span>
                <span className="sbd-cta">Review draft →</span>
              </button>
            )}
            {reply.proposal && review !== 'closed' && (
              <div className="sbd-review glass-elevated" role="group" aria-label="Review proposed purchase order">
                <span className="ill-tag">{review === 'approved' ? 'Approved in demo' : 'Review draft'}</span>
                <strong>{reply.proposal.title}</strong>
                {reply.proposal.lines.map((l, i) => (
                  <div key={l.item} className="sbd-review-line">
                    <span>{l.item}</span>
                    <span className="sbd-stepper">
                      <button type="button" aria-label={`Decrease ${l.item}`} disabled={review === 'approved' || (qtys[i] ?? l.qty) <= 30} onClick={() => setQtys((q) => q.map((v, k) => (k === i ? v - 6 : v)))}>−</button>
                      <output className="num">{qtys[i] ?? l.qty}</output>
                      <button type="button" aria-label={`Increase ${l.item}`} disabled={review === 'approved'} onClick={() => setQtys((q) => q.map((v, k) => (k === i ? v + 6 : v)))}>+</button>
                    </span>
                  </div>
                ))}
                <p className="sbd-reason">{reply.proposal.reason}</p>
                {review === 'review' ? (
                  <div className="sbd-actions">
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => setReview('approved')}>Approve draft (demo)</button>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => setReview('closed')}>Back</button>
                  </div>
                ) : (
                  <p className="sbd-done" role="status">Marked approved inside this demo. No order was created or sent, and no account is connected.</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="sbd-prompts" role="group" aria-label="Suggested questions">
        {PROMPTS.map((p, i) => (
          <button key={p.q} type="button" className="chip" aria-pressed={idx === i} onClick={() => ask(i)}>{p.q}</button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Identity stage: the 3D form, its states, and the 2D mark at 3 sizes */
/* ------------------------------------------------------------------ */

const STATE_COPY: Array<{ id: SiBorgState; label: string; note: string }> = [
  { id: 'idle', label: 'Idle', note: 'Waiting. The eyes glow softly and the shells drift, never across the face.' },
  { id: 'listening', label: 'Listening', note: 'A question arrives. The eyes brighten and the two shells open a little to take it in.' },
  { id: 'thinking', label: 'Thinking', note: 'The shells draw in and realign slowly while the records are read. The face stays readable.' },
  { id: 'insight', label: 'Insight', note: 'The eyes brighten once, the form settles, and a line leads to the evidence.' },
  { id: 'recommend', label: 'Recommendation', note: 'The line reaches a proposal. It stays a draft until a person approves it.' },
  { id: 'error', label: 'Unavailable', note: 'Calm and still. If SiBorg cannot answer, it says so and stops.' },
];

export function SiBorgStage({ wide = false }: { wide?: boolean }) {
  const [state, setState] = useState<SiBorgState>('idle');
  const cur = STATE_COPY.find((s) => s.id === state)!;
  return (
    <div className={`sbs ${wide ? 'sbs-wide' : ''}`}>
      <div className="sbs-figure">
        <SiBorgObject3D state={state} label={`SiBorg, ${cur.label.toLowerCase()} state`} />
      </div>
      <div className="sbs-side">
        <div className="sbs-states" role="group" aria-label="SiBorg states">
          {STATE_COPY.map((s) => (
            <button key={s.id} type="button" className="chip" aria-pressed={state === s.id} onClick={() => setState(s.id)}>
              {s.label}
            </button>
          ))}
        </div>
        <p className="sbs-note" aria-live="polite">{cur.note}</p>
      </div>
    </div>
  );
}
