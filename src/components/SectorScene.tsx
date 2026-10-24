import { useState } from 'react';
import type { Industry, IndustryCategory } from '../data/industries';
import { HairSvg, Node, P, Signal, T } from './hairline/kit';

/**
 * A sector-specific product scene. Sample records and the glyph change with the
 * sector; every workflow shown is taken from the sector's own verified data, so
 * the scene never introduces a capability the sector page does not already state.
 */

type Glyph = 'shelf' | 'boxes' | 'capsule' | 'hanger' | 'chip' | 'leaf' | 'wheel';

const PROFILE: Record<IndustryCategory, { glyph: Glyph; items: Array<[string, number]> }> = {
  'Retail & specialty': { glyph: 'shelf', items: [['Gift hamper', 24], ['Scented candle', 86], ['Greeting card set', 140]] },
  'Grocery & food': { glyph: 'leaf', items: [['Basmati rice 5kg', 64], ['Sunflower oil 1L', 120], ['Tea leaves 500g', 48]] },
  'Pharma & health': { glyph: 'capsule', items: [['Paracetamol 500mg strip', 320], ['Surgical gloves box', 45], ['Digital thermometer', 18]] },
  'Beauty & care': { glyph: 'capsule', items: [['Face serum 30ml', 54], ['Shampoo 250ml', 130], ['Lip balm', 210]] },
  'Fashion & lifestyle': { glyph: 'hanger', items: [['Linen shirt (M)', 38], ['Denim jacket (L)', 22], ['Leather belt', 60]] },
  'Electronics & tech': { glyph: 'chip', items: [['Phone charger 20W', 96], ['Bluetooth speaker', 31], ['HDMI cable 2m', 150]] },
  'Home & living': { glyph: 'shelf', items: [['Cushion cover', 72], ['Table lamp', 19], ['Bed sheet set', 40]] },
  'Books, stationery & education': { glyph: 'shelf', items: [['Textbook set', 55], ['Gel pens pack', 300], ['Notebook A4', 420]] },
  'Industrial & hardware': { glyph: 'boxes', items: [['Hex bolt M8 (box)', 240], ['Safety helmet', 34], ['Power drill', 12]] },
  Automotive: { glyph: 'wheel', items: [['Brake pad set', 28], ['Engine oil 4L', 66], ['Wiper blade', 90]] },
  Agriculture: { glyph: 'leaf', items: [['Hybrid seed 1kg', 80], ['Organic fertiliser 25kg', 45], ['Drip fitting', 260]] },
  'Manufacturing & processing': { glyph: 'boxes', items: [['Steel sheet 2mm', 40], ['Packaging film roll', 18], ['Finished unit A', 120]] },
  'Trade & distribution': { glyph: 'boxes', items: [['Carton, assorted', 210], ['Pallet, beverages', 14], ['Bulk pack of 24', 96]] },
  'Hospitality & services': { glyph: 'shelf', items: [['Bath towel', 150], ['Cleaning supplies kit', 24], ['Toiletry set', 300]] },
};

function GlyphArt({ glyph }: { glyph: Glyph }) {
  switch (glyph) {
    case 'shelf':
      return (<><P d="M10 8 V92 M110 8 V92 M10 40 H110 M10 70 H110" /><P d="M22 40 V24 H44 V40 M56 40 V18 H80 V40 M24 70 V52 H52 V70 M66 70 V56 H98 V70" tone="dim" delay={250} /></>);
    case 'boxes':
      return (<><P d="M10 92 V64 H50 V92 Z M50 92 V50 H90 V92 Z M30 64 V38 H70 V50" /><P d="M10 78 H50 M50 70 H90" tone="dim" delay={250} /></>);
    case 'capsule':
      return (<><P d="M20 70 L60 30 A18 18 0 0 1 86 56 L46 96 A18 18 0 0 1 20 70 Z" /><P d="M40 50 L66 76" tone="dim" delay={250} /></>);
    case 'hanger':
      return (<><P d="M60 24 A8 8 0 1 1 68 32 Q60 36 60 44 M60 44 L14 78 Q8 84 16 84 H104 Q112 84 106 78 L60 44" /><P d="M30 84 V92 M90 84 V92" tone="dim" delay={250} /></>);
    case 'chip':
      return (<><rect x="32" y="32" width="56" height="56" rx="6" className="hl-p hl-ivory hl-draw" pathLength={1} fill="none" /><P d="M44 20 V32 M60 20 V32 M76 20 V32 M44 88 V100 M60 88 V100 M76 88 V100 M20 44 H32 M20 60 H32 M20 76 H32 M88 44 H100 M88 60 H100 M88 76 H100" tone="dim" delay={250} /></>);
    case 'leaf':
      return (<><P d="M20 90 C 20 40, 60 14, 100 16 C 102 56, 76 90, 20 90 Z" /><P d="M20 90 L72 38" tone="dim" delay={250} /></>);
    default:
      return (<><circle cx="60" cy="60" r="40" className="hl-p hl-ivory hl-draw" pathLength={1} fill="none" /><circle cx="60" cy="60" r="12" className="hl-p hl-dim hl-draw" pathLength={1} fill="none" style={{ animationDelay: '250ms' }} /><P d="M60 20 V48 M60 72 V100 M20 60 H48 M72 60 H100" tone="dim" delay={400} /></>);
  }
}

export function SectorScene({ industry }: { industry: Industry }) {
  const profile = PROFILE[industry.category];
  const [sel, setSel] = useState(0);
  const flow = industry.workflows[sel] ?? industry.workflows[0];
  const label = flow.label.length > 26 ? `${flow.label.slice(0, 25)}…` : flow.label;
  return (
    <section className="section sector-scene" aria-label={`${industry.name} workspace view`}>
      <div className="container">
        <div className="sector-grid">
          <div className="glass-elevated sector-screen">
            <div className="sector-screen-head">
              <strong>{industry.name}</strong>
              <span className="pill pill-info">Illustrative</span>
            </div>
            <table className="sector-table">
              <thead><tr><th>SKU</th><th>Item</th><th className="num">On hand</th></tr></thead>
              <tbody>
                {profile.items.map(([name, qty], i) => (
                  <tr key={name} style={{ animationDelay: `${i * 90}ms` }}>
                    <td>SKU-{(industry.slug.length * 37 + i * 111) % 900 + 100}</td>
                    <td>{name}</td>
                    <td className="num">{qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <HairSvg viewBox="0 0 520 110" label={`Sample flow: supplier to receiving to ${flow.label} to sale`} maxWidth={520} key={sel}>
              <P id="sector-flow" d="M40 55 H480" tone="dim" delay={100} />
              {['Supplier', 'Receive', label, 'Sell'].map((t, i) => {
                const x = 40 + i * 146.6;
                return (
                  <g key={t}>
                    <Node cx={x} cy={55} r={5} active={i === 2} delay={300 + i * 150} />
                    <T x={x} y={88} anchor={i === 0 ? 'start' : i === 3 ? 'end' : 'middle'} size={12} tone={i === 2 ? 'wine' : 'dim'} delay={300 + i * 150}>{t}</T>
                  </g>
                );
              })}
              <Signal pathId="sector-flow" delay={500} dur={1400} />
            </HairSvg>
          </div>
          <div>
            <p className="eyebrow">{industry.category}</p>
            <h2>One system, set to the way your sector works.</h2>
            <div className="sector-art" aria-hidden="true">
              <HairSvg viewBox="0 0 120 110" label="" maxWidth={150}><GlyphArt glyph={profile.glyph} /></HairSvg>
            </div>
            <div className="ill-tabs" role="tablist" aria-label="Sector workflows">
              {industry.workflows.map((w, i) => (
                <button key={w.label} type="button" role="tab" aria-selected={sel === i} className="ill-tab" data-active={sel === i} onClick={() => setSel(i)}>
                  {w.label}
                </button>
              ))}
            </div>
            <div className="sector-note glass" aria-live="polite">
              <span className="ill-tag">{flow.plan}{flow.gated ? ' · rolling out' : ''}</span>
              <p>{flow.how}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
