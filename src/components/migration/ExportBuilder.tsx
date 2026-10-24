import { useState } from 'react';
import { ArrowRight, FileDown } from 'lucide-react';
import { EXPORTS, NOT_YET_EXPORTABLE } from '../../data/migration';
import { SIKICK_APP_URL } from '../../config/site';

const FILE: Record<string, string> = {
  trial: 'trial-balance', pnl: 'profit-loss', bs: 'balance-sheet', cf: 'cash-flow', gst: 'gstr-return', audit: 'audit-log', cashier: 'cashier-activity',
};

/** Shows how the real console exports are chosen. It creates no file and reports no download. */
export function ExportBuilder() {
  const [id, setId] = useState('pnl');
  const item = EXPORTS.find((e) => e.id === id)!;
  const [format, setFormat] = useState('CSV');
  const [asAt, setAsAt] = useState('2026-10-24');
  const [from, setFrom] = useState('2026-10-01');
  const [to, setTo] = useState('2026-10-24');
  const [month, setMonth] = useState('2026-09');

  const pick = (next: string) => {
    setId(next);
    const e = EXPORTS.find((x) => x.id === next)!;
    if (!e.formats.includes(format)) setFormat(e.formats[0]);
  };
  const ext = format.toLowerCase();
  const rangeText =
    item.range === 'asAt' ? `as at ${asAt}` : item.range === 'period' ? `${from} to ${to}` : item.range === 'month' ? `period ${month}` : 'all entries, filtered in the console';

  const groups = Array.from(new Set(EXPORTS.map((e) => e.group)));
  return (
    <div className="eb">
      <div className="eb-pick glass">
        <h3>Choose what to take with you</h3>
        {groups.map((g) => (
          <fieldset key={g}>
            <legend>{g}</legend>
            {EXPORTS.filter((e) => e.group === g).map((e) => (
              <label key={e.id} className="eb-opt" data-active={id === e.id}>
                <input type="radio" name="export" checked={id === e.id} onChange={() => pick(e.id)} />
                <span>{e.label}</span>
                <small>{e.formats.join(' · ')}</small>
              </label>
            ))}
          </fieldset>
        ))}
        <div className="eb-opts">
          {item.formats.length > 1 && (
            <div role="radiogroup" aria-label="File format" className="eb-formats">
              {item.formats.map((f) => (
                <button key={f} type="button" role="radio" aria-checked={format === f} className="chip" aria-pressed={format === f} onClick={() => setFormat(f)}>{f}</button>
              ))}
            </div>
          )}
          {item.range === 'asAt' && <label className="eb-field">As at<input type="date" value={asAt} onChange={(e) => setAsAt(e.target.value)} /></label>}
          {item.range === 'period' && (
            <div className="eb-range">
              <label className="eb-field">From<input type="date" value={from} onChange={(e) => setFrom(e.target.value)} /></label>
              <label className="eb-field">To<input type="date" value={to} onChange={(e) => setTo(e.target.value)} /></label>
            </div>
          )}
          {item.range === 'month' && <label className="eb-field">Return period<input type="month" value={month} onChange={(e) => setMonth(e.target.value)} /></label>}
        </div>
      </div>

      <div className="eb-out glass-elevated" aria-live="polite">
        <span className="eb-icon"><FileDown size={22} aria-hidden="true" /></span>
        <h3>{item.label}</h3>
        <dl className="ill-dl">
          <div><dt>File</dt><dd>{FILE[item.id]}.{ext}</dd></div>
          <div><dt>Covers</dt><dd>{rangeText}</dd></div>
          <div><dt>Format</dt><dd>{format}</dd></div>
        </dl>
        <p>{item.contains}</p>
        <p className="eb-note">This preview shows how the export is set up. It does not create or download a file. Exports run inside the console, once you are signed in.</p>
        <a className="btn btn-secondary btn-sm" href={SIKICK_APP_URL}>Open the app <ArrowRight size={14} aria-hidden="true" /></a>
      </div>

      <div className="eb-gap glass">
        <h4>Not yet a one-click export</h4>
        <p>These records can be imported but do not have an export button in the console today:</p>
        <ul>{NOT_YET_EXPORTABLE.map((x) => <li key={x}>{x}</li>)}</ul>
        <p>If you need them, ask for an assisted export below and say what you need and by when.</p>
      </div>
    </div>
  );
}
