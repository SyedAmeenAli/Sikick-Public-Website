import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PLATFORMS, STATUS_LABEL, platform, type MigrationStatus } from '../../data/migration';
import { SIKICK_APP_URL } from '../../config/site';
import { prefersReducedMotion } from '../../lib/motion';
import { PlatformLogo } from './Logo';
import { MigrationFlow } from './MigrationFlow';

export const StatusPill = ({ status }: { status: MigrationStatus }) => <span className={`mstatus mstatus-${status}`}>{STATUS_LABEL[status]}</span>;

export function NextStep({ next }: { next: { label: string; to: string } }) {
  if (next.to === 'app') {
    return (
      <a className="btn btn-primary" href={`${SIKICK_APP_URL}/import`}>
        {next.label} <ArrowRight size={16} aria-hidden="true" />
      </a>
    );
  }
  return (
    <a className="btn btn-primary" href={next.to}>
      {next.label} <ArrowRight size={16} aria-hidden="true" />
    </a>
  );
}

/** Logo selector plus the detail panel and pipeline for the chosen source. */
export function PlatformSwitcher({ sel, onSel }: { sel: string; onSel: (id: string) => void }) {
  const p = platform(sel);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setStage(4);
      return;
    }
    setStage(0);
    const timers = [1, 2, 3, 4].map((s) => window.setTimeout(() => setStage(s), 500 + s * 650));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [sel]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(e.key)) return;
    e.preventDefault();
    const next = (i + (e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1) + PLATFORMS.length) % PLATFORMS.length;
    onSel(PLATFORMS[next].id);
    document.getElementById(`pf-${PLATFORMS[next].id}`)?.focus();
  };

  return (
    <div className="pswitch">
      <div className="pswitch-list" role="radiogroup" aria-label="Your current software">
        {PLATFORMS.map((x, i) => (
          <button
            key={x.id}
            id={`pf-${x.id}`}
            type="button"
            role="radio"
            aria-checked={sel === x.id}
            tabIndex={sel === x.id ? 0 : -1}
            className="pswitch-opt"
            data-active={sel === x.id}
            onClick={() => onSel(x.id)}
            onKeyDown={(e) => onKey(e, i)}
          >
            <PlatformLogo platform={x} area={5200} maxWidth={150} />
            <span className="pswitch-name">{x.name}</span>
            <span className="pswitch-kind">{x.kind}</span>
          </button>
        ))}
      </div>

      <div className="pswitch-panel glass-elevated" aria-live="polite" key={p.id}>
        <div className="pswitch-head">
          <div>
            <h3>{p.name}</h3>
            <StatusPill status={p.status} />
          </div>
        </div>
        <div className="pswitch-flow">
          <MigrationFlow platform={p} stage={stage} />
        </div>
        <p className="pswitch-method">{p.method}</p>
        <div className="pswitch-cols">
          <div>
            <h4>What can move</h4>
            <ul>{p.transfers.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
          <div>
            <h4>Accepted formats</h4>
            <ul className="pswitch-chips">{p.formats.map((f) => <li key={f}>{f}</li>)}</ul>
            <h4>Limits and caveats</h4>
            <ul>{p.limits.map((l) => <li key={l}>{l}</li>)}</ul>
          </div>
        </div>
        <p className="pswitch-not"><strong>What this is not.</strong> {p.notThis}</p>
        <div className="pswitch-cta">
          <NextStep next={p.next} />
          <Link className="btn btn-secondary" to="/integrations">See all connections</Link>
        </div>
      </div>
    </div>
  );
}
