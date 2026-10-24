import { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle2, RotateCcw } from 'lucide-react';
import { ITEM_FIELDS, PARTY_FIELDS, platform, type ItemFieldId } from '../../data/migration';
import { ROWS, analyse, defaultMapping, type Mapping } from './sampleFile';

/** Interactive mapping and check run on an illustrative file. Works entirely in the page. */
export function ImportMapper({ sel }: { sel: string }) {
  const p = platform(sel);
  const [mapping, setMapping] = useState<Mapping>(() => defaultMapping(p.headers));
  useEffect(() => setMapping(defaultMapping(p.headers)), [p.id, p.headers]);
  const result = analyse(p.headers, mapping);

  const assign = (colIndex: number, field: ItemFieldId | '') =>
    setMapping((m) => m.map((f, i) => (i === colIndex ? field : field !== '' && f === field ? '' : f)));
  const mappedFields = ITEM_FIELDS.filter((f) => mapping.includes(f.id));
  const colOf = (f: ItemFieldId) => mapping.indexOf(f);
  const issueOf = (i: number) => result.issues.find((r) => r.index === i);

  return (
    <div className="im">
      <div className="im-map glass">
        <div className="im-head">
          <h3>Map your columns</h3>
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => setMapping(defaultMapping(p.headers))}><RotateCcw size={14} aria-hidden="true" /> Reset</button>
        </div>
        <p className="im-sub">An illustrative {p.id === 'other' ? 'file' : `${p.name} style file`}. Choose where each column goes. Nothing is uploaded from your device.</p>
        <ul className="im-cols">
          {p.headers.map((h, i) => (
            <li key={h}>
              <label htmlFor={`im-col-${i}`}>{h}</label>
              <select id={`im-col-${i}`} value={mapping[i]} onChange={(e) => assign(i, e.target.value as ItemFieldId | '')}>
                <option value="">Do not import</option>
                {ITEM_FIELDS.map((f) => <option key={f.id} value={f.id}>{f.label}{f.required ? ' (required)' : ''}</option>)}
              </select>
            </li>
          ))}
        </ul>
        <p className="im-parties"><strong>Customers and suppliers</strong> import the same way, with {PARTY_FIELDS.join(', ').toLowerCase()}.</p>
      </div>

      <div className="im-check glass-elevated" aria-live="polite">
        <div className="im-head"><h3>Check run</h3><span className="im-tag">Nothing written</span></div>
        {!result.nameMapped ? (
          <p className="im-fatal" role="alert"><AlertTriangle size={16} aria-hidden="true" /> No column is mapped to Item name, so this file cannot be read. Point one column at it.</p>
        ) : (
          <ul className="im-counts">
            <li data-tone="ok"><strong>{result.valid}</strong><span>ready to create</span></li>
            <li data-tone={result.duplicates ? 'warn' : 'quiet'}><strong>{result.duplicates}</strong><span>duplicates in file</span></li>
            <li data-tone={result.missingName ? 'warn' : 'quiet'}><strong>{result.missingName}</strong><span>missing a name</span></li>
            <li data-tone={result.badNumber ? 'warn' : 'quiet'}><strong>{result.badNumber}</strong><span>bad numbers</span></li>
          </ul>
        )}
        <div className="im-scroll" data-lenis-prevent tabIndex={0} role="region" aria-label="Preview of mapped rows">
          <table className="im-table">
            <thead>
              <tr><th scope="col">#</th>{mappedFields.map((f) => <th scope="col" key={f.id}>{f.label}</th>)}<th scope="col">Result</th></tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => {
                const issue = issueOf(i);
                return (
                  <tr key={i} data-bad={!!issue}>
                    <td>{i + 1}</td>
                    {mappedFields.map((f) => <td key={f.id}>{row[colOf(f.id)] || <em>empty</em>}</td>)}
                    <td className="im-result">{issue ? <><AlertTriangle size={13} aria-hidden="true" /> {issue.reasons.join(', ')}</> : <><CheckCircle2 size={13} aria-hidden="true" /> Ready</>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="im-note">Rows whose SKU already exists in a workspace have their catalogue fields corrected and their opening stock ignored. The real check run says so before you apply anything.</p>
      </div>
    </div>
  );
}
