import { FileSpreadsheet } from 'lucide-react';
import type { Platform } from '../../data/migration';

/**
 * A vendor logo on an ivory plate, in its original colours and proportions.
 * Sizes are normalised by visual AREA, not by width or height, so a wide
 * wordmark and a near-square mark carry the same weight. The artwork itself is
 * never recoloured, stretched or given effects; the plate is what makes dark
 * wordmarks readable on Sikick's dark surfaces.
 */
export function PlatformLogo({ platform, area = 7600, maxWidth = 190, className = '' }: { platform: Platform; area?: number; maxWidth?: number; className?: string }) {
  const l = platform.logo;
  if (!l) {
    return (
      <span className={`plogo plogo-generic ${className}`} aria-hidden="true">
        <FileSpreadsheet size={34} strokeWidth={1.25} />
      </span>
    );
  }
  const ratio = l.w / l.h;
  const w = Math.min(maxWidth, Math.sqrt(area * ratio));
  const h = w / ratio;
  return (
    <span className={`plogo ${className}`}>
      <img src={l.src} alt="" width={Math.round(w)} height={Math.round(h)} style={{ width: w, height: h }} draggable={false} loading="lazy" decoding="async" />
    </span>
  );
}
