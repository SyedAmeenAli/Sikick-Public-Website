import { describe, it, expect } from 'vitest';
import { INDUSTRIES, industryBySlug } from '../data/industries';

describe('industries directory', () => {
  it('contains exactly 78 sectors', () => {
    expect(INDUSTRIES).toHaveLength(78);
  });

  it('has unique slugs', () => {
    const slugs = INDUSTRIES.map((industry) => industry.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('resolves a sector by slug', () => {
    const industry = industryBySlug('pharmacies-and-drugstores');
    expect(industry?.name).toBe('Pharmacies and drugstores');
  });

  it('every sector has at least one workflow and FAQ seed', () => {
    for (const industry of INDUSTRIES) {
      expect(industry.workflows.length).toBeGreaterThan(0);
      expect(industry.faqSeeds.length).toBeGreaterThan(0);
    }
  });
});
