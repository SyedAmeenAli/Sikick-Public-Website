import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, RotateCcw } from 'lucide-react';
import { ITEM_FIELDS, JOURNEY, platform } from '../../data/migration';
import { PlatformLogo } from './Logo';
import { MigrationFlow } from './MigrationFlow';
import { StatusPill } from './PlatformSwitcher';
import { analyse, defaultMapping } from './sampleFile';

/** Five-step walkthrough. Illustrative only: nothing is uploaded or imported. */
export function MigrationJourney({ sel }: { sel: string }) {
  const p = platform(sel);
  const [step, setStep] = useState(0);
  const mapping = defaultMapping(p.headers);
  const result = analyse(p.headers, mapping);

  const body = (() => {
    switch (step) {
      case 0:
        return (
          <div className="mj-source">
            <PlatformLogo platform={p} area={9000} />
            <div>
              <h4>{p.name}</h4>
              <StatusPill status={p.status} />
              <p>{p.method}</p>
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <p>{p.prepare}</p>
            <ul className="pswitch-chips" aria-label="Accepted formats">{p.formats.map((f) => <li key={f}>{f}</li>)}</ul>
            <p className="mj-note">Up to 5,000 rows per file. The item name is the only column that must exist.</p>
          </div>
        );
      case 2:
        return (
          <div>
            <p>{JOURNEY[2].body}</p>
            <table className="mj-table">
              <thead><tr><th>Column in your file</th><th>Becomes in Sikick</th></tr></thead>
              <tbody>
                {p.headers.map((h, i) => (
                  <tr key={h}><td>{h}</td><td><Check size={14} aria-hidden="true" /> {ITEM_FIELDS[i].label}{ITEM_FIELDS[i].required ? ' (required)' : ''}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 3:
        return (
          <div>
            <p>{JOURNEY[3].body}</p>
            <ul className="mj-counts">
              <li><strong>{result.valid}</strong> ready to create</li>
              <li><strong>{result.duplicates}</strong> duplicate in the file</li>
              <li><strong>{result.missingName}</strong> missing an item name</li>
              <li><strong>{result.badNumber}</strong> with a price that is not a number</li>
            </ul>
          </div>
        );
      default:
        return (
          <div>
            <p>{JOURNEY[4].body}</p>
            <table className="mj-table">
              <tbody>
                <tr><td>Rows in the file</td><td className="num">{result.total}</td></tr>
                <tr><td>Created in your catalogue</td><td className="num">{result.valid}</td></tr>
                <tr><td>Set aside for you to fix</td><td className="num">{result.total - result.valid}</td></tr>
              </tbody>
            </table>
            <p className="mj-note">Reconcile the created count against your source system’s own item count before you start trading on it.</p>
          </div>
        );
    }
  })();

  return (
    <div className="mj">
      <ol className="mj-steps" aria-label="Migration steps">
        {JOURNEY.map((s, i) => (
          <li key={s.id} data-state={i === step ? 'active' : i < step ? 'done' : 'todo'}>
            <button type="button" onClick={() => setStep(i)} aria-current={i === step ? 'step' : undefined}>
              <span className="mj-dot">{i < step ? <Check size={14} aria-hidden="true" /> : `0${i + 1}`}</span>
              <span className="mj-title">{s.title}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className="mj-stage glass-elevated">
        <div className="mj-flow"><MigrationFlow platform={p} stage={step} /></div>
        <div className="mj-body" key={`${step}-${p.id}`} aria-live="polite">
          <p className="eyebrow">{`0${step + 1} / 05`}</p>
          <h3>{JOURNEY[step].title}</h3>
          {body}
        </div>
        <div className="mj-actions">
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}><ArrowLeft size={14} aria-hidden="true" /> Back</button>
          {step < JOURNEY.length - 1 ? (
            <button type="button" className="btn btn-primary btn-sm" onClick={() => setStep((s) => s + 1)}>Next <ArrowRight size={14} aria-hidden="true" /></button>
          ) : (
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => setStep(0)}><RotateCcw size={14} aria-hidden="true" /> Start again</button>
          )}
          <span className="mj-disclaimer">Illustrative walkthrough. Nothing here is uploaded or imported.</span>
        </div>
      </div>
    </div>
  );
}
