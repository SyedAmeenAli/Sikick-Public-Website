import { useId } from 'react';
import { SB_MEDIUM, SB_SMALL } from './siborgShapes';

export type SiBorgState = 'idle' | 'listening' | 'thinking' | 'insight' | 'recommend' | 'error';

/**
 * The SiBorg 2D mark. The folded ribbons and egg core are projected from the
 * same parametric form as the 3D object (src/lib/siborgGeometry.ts), so the
 * vector and 3D versions share one silhouette. Shapes are real SVG polygons,
 * not an embedded raster, and the two ribbons are separately addressable so
 * each state can move them independently (see motion.css, `.sb-*`).
 *
 * Size hierarchy: launcher / header sizes use the flat small set; 48px and up
 * use the shaded medium set plus orbital contours.
 */
export function SiBorgMark({
  size = 56,
  state = 'idle',
  className = '',
  title,
}: {
  size?: number;
  state?: SiBorgState;
  className?: string;
  title?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const rich = size >= 48;
  const data = rich ? SB_MEDIUM : SB_SMALL;
  const gid = `sbcore-${uid}`;
  return (
    <svg
      className={`sb-mark ${rich ? 'sb-rich' : 'sb-flat'} ${className}`}
      data-state={state}
      width={size}
      height={size}
      viewBox="26 34 188 212"
      preserveAspectRatio="xMidYMid meet"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {rich && (
        <defs>
          <radialGradient id={gid} cx="0.36" cy="0.28" r="0.95">
            <stop offset="0" stopColor="#fffaf5" />
            <stop offset="0.55" stopColor="#e6d6cb" />
            <stop offset="1" stopColor="#9b8176" />
          </radialGradient>
        </defs>
      )}
      {rich && (
        <g className="sb-orbit" fill="none">
          <ellipse cx="120" cy="140" rx="94" ry="32" transform="rotate(-24 120 140)" />
          <ellipse cx="120" cy="140" rx="66" ry="92" transform="rotate(14 120 140)" />
        </g>
      )}
      {data.shapes.map((s, i) =>
        s.k === 'poly' ? (
          <polygon key={i} points={s.pts} fill={s.fill} stroke={s.fill} strokeWidth={0.5} strokeLinejoin="round" className={`sb-p sb-${s.g}`} />
        ) : (
          <g key={i} className="sb-face">
            <polygon points={data.face} fill={rich ? `url(#${gid})` : '#f3ece6'} />
            <g className="sb-eyes">
              {data.eyes.map((e) => (
                <g key={e.cx}>
                  <ellipse className="sb-eye-halo" cx={e.cx} cy={e.cy} rx={e.w * 2} ry={e.h * 0.78} />
                  <rect className="sb-eye" x={e.x} y={e.y} width={e.w} height={e.h} rx={e.w / 2} />
                </g>
              ))}
            </g>
          </g>
        ),
      )}
      <path className="sb-lead" d="M168 124 H236" pathLength={1} />
      <path className="sb-pointer" d="M222 116 L236 124 L222 132" />
    </svg>
  );
}
