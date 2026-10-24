import { HairSvg, Node, P, Signal, T } from '../hairline/kit';
import { useMedia } from '../../lib/motion';
import type { Platform } from '../../data/migration';

/**
 * Source system, field mapping, validation and Sikick, drawn as one pipeline.
 * Each connector runs from one box edge to the next and never crosses a label.
 * `stage` (0-4) is the journey step: it lights the pipeline up to that point.
 * Remounted (keyed) on a platform change so the lines redraw from the source.
 * It illustrates the process; it never shows records as imported.
 */
export function MigrationFlow({ platform, stage }: { platform: Platform; stage: number }) {
  const narrow = useMedia('(max-width: 640px)');
  const lit = (i: number) => stage >= i;
  const records = platform.id === 'other' ? 'Your export' : 'Items · Parties';

  if (narrow) {
    // vertical pipeline for phones
    return (
      <HairSvg viewBox="0 0 320 470" label={`Migration pipeline from ${platform.name} through field mapping and validation into Sikick`} maxWidth={360} key={`${platform.id}-v`}>
        <rect x="70" y="8" width="180" height="76" rx="14" className="mf-plate" />
        {platform.logo && <image href={platform.logo.src} x="86" y="22" width="148" height="48" preserveAspectRatio="xMidYMid meet" />}
        {!platform.logo && <T x={160} y={52} anchor="middle" size={15} tone="dim">Your file</T>}
        <P id="mfv1" d="M160 84 V132" tone={lit(1) ? 'wine' : 'dim'} delay={200} />
        <T x={172} y={112} size={11} tone="dim" delay={500}>{records}</T>
        <g transform="translate(70 132)">
          <rect width="180" height="54" rx="12" className={`hl-box ${lit(2) ? 'is-active' : ''}`} />
          <T x={90} y={24} anchor="middle" size={14} tone={lit(2) ? 'wine' : 'ivory'}>Map fields</T>
          <T x={90} y={42} anchor="middle" size={11} tone="dim">name · SKU · stock · price</T>
        </g>
        <P id="mfv2" d="M160 186 V234" tone={lit(3) ? 'wine' : 'dim'} delay={500} />
        <g transform="translate(70 234)">
          <rect width="180" height="54" rx="12" className={`hl-box ${lit(3) ? 'is-active' : ''}`} />
          <T x={90} y={24} anchor="middle" size={14} tone={lit(3) ? 'wine' : 'ivory'}>Validate</T>
          <T x={90} y={42} anchor="middle" size={11} tone="dim">check run, nothing written</T>
        </g>
        <P id="mfv3" d="M160 288 V336" tone={lit(4) ? 'wine' : 'dim'} delay={800} />
        <rect x="70" y="336" width="180" height="120" rx="14" className="mf-plate" />
        <image href="/brand/sikick-logo.svg" x="104" y="352" width="112" height="40" preserveAspectRatio="xMidYMid meet" />
        <T x={160} y={418} anchor="middle" size={12} tone="dim">Your Sikick workspace</T>
        <Signal pathId="mfv1" delay={700} dur={900} />
        <Signal pathId="mfv2" delay={1500} dur={900} />
        <Signal pathId="mfv3" delay={2300} dur={900} />
        <Node cx={160} cy={132} r={4} active={lit(2)} delay={900} />
        <Node cx={160} cy={234} r={4} active={lit(3)} delay={1700} />
        <Node cx={160} cy={336} r={4} active={lit(4)} delay={2500} />
      </HairSvg>
    );
  }

  return (
    <HairSvg viewBox="0 0 860 240" label={`Migration pipeline from ${platform.name} through field mapping and validation into Sikick`} maxWidth={940} key={`${platform.id}-h`}>
      <rect x="8" y="70" width="190" height="100" rx="16" className="mf-plate" />
      {platform.logo && <image href={platform.logo.src} x="24" y="86" width="158" height="68" preserveAspectRatio="xMidYMid meet" />}
      {!platform.logo && <T x={103} y={125} anchor="middle" size={16} tone="dim">Your file</T>}
      <P id="mfh1" d="M198 120 H282" tone={lit(1) ? 'wine' : 'dim'} delay={200} />
      <T x={240} y={106} anchor="middle" size={11} tone="dim" delay={500}>{platform.id === 'other' ? 'export' : 'file'}</T>

      <g transform="translate(282 84)">
        <rect width="136" height="72" rx="14" className={`hl-box ${lit(2) ? 'is-active' : ''}`} />
        <T x={68} y={30} anchor="middle" size={15} tone={lit(2) ? 'wine' : 'ivory'}>Map fields</T>
        <T x={68} y={52} anchor="middle" size={11} tone="dim">name · SKU · stock</T>
      </g>
      <P id="mfh2" d="M418 120 H500" tone={lit(3) ? 'wine' : 'dim'} delay={500} />
      <T x={459} y={106} anchor="middle" size={11} tone="dim" delay={800}>{records.split(' · ')[0]}</T>

      <g transform="translate(500 84)">
        <rect width="136" height="72" rx="14" className={`hl-box ${lit(3) ? 'is-active' : ''}`} />
        <T x={68} y={30} anchor="middle" size={15} tone={lit(3) ? 'wine' : 'ivory'}>Validate</T>
        <T x={68} y={52} anchor="middle" size={11} tone="dim">check, write nothing</T>
      </g>
      <P id="mfh3" d="M636 120 H684" tone={lit(4) ? 'wine' : 'dim'} delay={800} />

      <rect x="684" y="50" width="168" height="140" rx="16" className="mf-plate" />
      <image href="/brand/sikick-logo.svg" x="710" y="72" width="116" height="42" preserveAspectRatio="xMidYMid meet" />
      <T x={768} y={150} anchor="middle" size={12} tone="dim">Your Sikick workspace</T>
      <T x={768} y={170} anchor="middle" size={11} tone="dim">review, then apply</T>

      <Signal pathId="mfh1" delay={700} dur={900} />
      <Signal pathId="mfh2" delay={1500} dur={900} />
      <Signal pathId="mfh3" delay={2300} dur={700} />
      <Node cx={282} cy={120} r={4} active={lit(2)} delay={900} />
      <Node cx={500} cy={120} r={4} active={lit(3)} delay={1700} />
      <Node cx={684} cy={120} r={4} active={lit(4)} delay={2500} />
    </HairSvg>
  );
}
