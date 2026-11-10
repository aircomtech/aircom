import { BLOG_POSTS, INDUSTRIES_DATA, PRODUCTS_DATA, SERVICES_DATA } from './core/data/site.data';

describe('Aircom Site Data & Route Slugs', () => {
  it('should define all 10 service slugs', () => {
    const expected = [
      'erpnext',
      'hrms',
      'biometric',
      'crm',
      'tally',
      'restaurant',
      'jewellery',
      'infrastructure',
      'cloud',
      'web-development'
    ];
    expect(SERVICES_DATA.map((s) => s.slug)).toEqual(expected);
  });

  it('should define all 5 product slugs', () => {
    const expected = ['cloud-erp', 'analytics', 'security', 'automation', 'it-support'];
    expect(PRODUCTS_DATA.map((p) => p.slug)).toEqual(expected);
  });

  it('should define all 8 industries', () => {
    expect(INDUSTRIES_DATA.length).toBe(8);
  });

  it('should define blog posts', () => {
    expect(BLOG_POSTS.length).toBeGreaterThanOrEqual(4);
  });
});

