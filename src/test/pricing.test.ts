import { describe, it, expect } from 'vitest';

describe('pricing math', () => {
  it('Core annual saves 1300', () => {
    expect(650 * 12 - 6500).toBe(1300);
  });
  it('AI annual saves 5100', () => {
    expect(2550 * 12 - 25500).toBe(5100);
  });
  it('annual monthly equivalent is two months free', () => {
    expect(6500 / 12).toBeCloseTo(541.67, 2);
    expect(25500 / 12).toBeCloseTo(2125, 2);
  });
});
