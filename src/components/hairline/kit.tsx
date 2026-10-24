import { createContext, useContext, type ReactNode } from 'react';
import { useInView } from '../../lib/motion';

/**
 * Hairline SVG kit. One stroke language for every illustration:
 *  - paths use pathLength="1" so a single dash rule draws any geometry
 *  - drawing starts when the figure first enters the viewport and settles in a stable final state
 *  - signals are real SVG <animateMotion> elements riding the same path as the line
 */

const SeenContext = createContext(false);
export const useSeen = (): boolean => useContext(SeenContext);

export function HairSvg({
  viewBox,
  label,
  className = '',
  children,
  maxWidth,
}: {
  viewBox: string;
  label: string;
  className?: string;
  children: ReactNode;
  maxWidth?: number;
}) {
  const [ref, seen] = useInView<HTMLDivElement>(0.2);
  return (
    <div ref={ref} className={`hl-wrap ${className}`} data-in={seen} style={maxWidth ? { maxWidth } : undefined}>
      <SeenContext.Provider value={seen}>
        <svg className="hl" viewBox={viewBox} role="img" aria-label={label} xmlns="http://www.w3.org/2000/svg">
          {children}
        </svg>
      </SeenContext.Provider>
    </div>
  );
}

type PathProps = {
  d: string;
  /** delay in ms before drawing starts */
  delay?: number;
  tone?: 'ivory' | 'dim' | 'wine';
  dashed?: boolean;
  fill?: string;
  id?: string;
  /** skip the draw animation (static geometry that should just be there) */
  still?: boolean;
  className?: string;
};

export function P({ d, delay = 0, tone = 'ivory', dashed, fill, id, still, className = '' }: PathProps) {
  return (
    <path
      id={id}
      d={d}
      pathLength={1}
      fill={fill ?? 'none'}
      className={`hl-p hl-${tone} ${still ? '' : 'hl-draw'} ${dashed ? 'hl-dashed' : ''} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}

/** A small marker that travels once along an existing path (by id) and rests at its end. */
export function Signal({ pathId, delay = 0, dur = 1600, r = 3 }: { pathId: string; delay?: number; dur?: number; r?: number }) {
  const seen = useSeen();
  if (!seen) return null;
  return (
    <circle r={r} className="hl-signal" opacity="0">
      <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.05;1" dur={`${dur}ms`} begin={`${delay}ms`} fill="freeze" />
      <animateMotion dur={`${dur}ms`} begin={`${delay}ms`} fill="freeze" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.5 0 0.2 1">
        <mpath href={`#${pathId}`} />
      </animateMotion>
    </circle>
  );
}

export function Node({
  cx,
  cy,
  r = 4,
  active,
  delay = 0,
}: {
  cx: number;
  cy: number;
  r?: number;
  active?: boolean;
  delay?: number;
}) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      className={`hl-node ${active ? 'is-active' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}

export function T({
  x,
  y,
  children,
  anchor = 'start',
  tone = 'ivory',
  size = 12,
  delay = 0,
}: {
  x: number | string;
  y: number | string;
  children: ReactNode;
  anchor?: 'start' | 'middle' | 'end';
  tone?: 'ivory' | 'dim' | 'wine';
  size?: number;
  delay?: number;
}) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} className={`hl-text hl-text-${tone}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </text>
  );
}
