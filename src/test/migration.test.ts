import { describe, expect, it } from 'vitest';
import { EXPORTS, PLATFORMS, STATUS_LABEL } from '../data/migration';
import { ROWS, analyse, defaultMapping } from '../components/migration/sampleFile';

describe('migration data', () => {
  it('every platform has a status that exists and a next step', () => {
    PLATFORMS.forEach((p) => {
      expect(STATUS_LABEL[p.status]).toBeTruthy();
      expect(p.next.label.length).toBeGreaterThan(3);
      expect(p.headers).toHaveLength(9);
    });
  });

  it('only platforms checked against real files claim file-based support', () => {
    const file = PLATFORMS.filter((p) => p.status === 'file' && p.id !== 'excel').map((p) => p.id).sort();
    expect(file).toEqual(['tally', 'vyapar']);
    expect(PLATFORMS.find((p) => p.id === 'zoho')!.status).toBe('development');
    expect(PLATFORMS.find((p) => p.id === 'busy')!.status).toBe('unverified');
  });

  it('exports list does not include records the console cannot export', () => {
    expect(EXPORTS.map((e) => e.id).sort()).toEqual(['audit', 'bs', 'cashier', 'cf', 'gst', 'pnl', 'trial']);
  });

  it('the illustrative file validates to a known result', () => {
    const r = analyse(PLATFORMS[0].headers, defaultMapping(PLATFORMS[0].headers));
    expect(r).toMatchObject({ total: ROWS.length, valid: 9, duplicates: 1, missingName: 1, badNumber: 1, nameMapped: true });
    const unmapped = defaultMapping(PLATFORMS[0].headers).map((f) => (f === 'name' ? '' : f)) as ReturnType<typeof defaultMapping>;
    expect(analyse(PLATFORMS[0].headers, unmapped).nameMapped).toBe(false);
  });
});
