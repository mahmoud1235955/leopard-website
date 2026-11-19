import { describe, expect, it } from 'vitest';
import { feedCountries, feedImporters, feedSuppliers, filterByCountry, filterByProduct } from '@/lib/feed-hub';

describe('Owner-supplied feed directory', () => {
  it('replaces placeholders with ten Egyptian suppliers and nine Gulf importers', () => {
    expect(feedSuppliers).toHaveLength(10);
    expect(feedImporters).toHaveLength(9);
    expect(filterByCountry(feedSuppliers, 'Egypt')).toHaveLength(10);
    expect(feedSuppliers.some((record) => record.id.startsWith('exp-'))).toBe(false);
    expect(feedImporters.some((record) => record.id.startsWith('imp-'))).toBe(false);
  });

  it('includes every supplied country in the filter', () => {
    expect(feedCountries.map((country) => country.en).sort()).toEqual(
      ['Egypt', 'United Arab Emirates', 'Qatar', 'Saudi Arabia', 'Oman', 'Kuwait'].sort(),
    );
  });

  it('combines Kuwait and product filters without assigning unspecified products', () => {
    const kuwait = filterByCountry(feedImporters, 'Kuwait');
    expect(kuwait.map((record) => record.id)).toEqual([
      'alfalfa-al-salmi', 'feeds-kuwait', 'kuwait-animal-feed-factory', 'kfo',
    ]);
    expect(filterByProduct(kuwait, 'all')).toHaveLength(4);
    expect(filterByProduct(kuwait, 'alfalfa')).toEqual([]);
    expect(filterByCountry(filterByProduct(feedImporters, 'corn'), 'Oman').map((record) => record.id)).toEqual(['sohul-al-maha']);
  });

  it('preserves supplied contact details and opens bare website domains externally', () => {
    const shahd = feedSuppliers.find((record) => record.id === 'el-shahd');
    expect(shahd?.phones).toEqual(['01096754864', '01204424045']);
    expect(shahd?.email).toBe('info@elshahd-company.com');
    expect(feedSuppliers.find((record) => record.id === 'al-reefia')?.website).toBe('https://expoegypt.gov.eg/');
    expect(feedImporters.find((record) => record.id === 'zawiah-feeds')?.website).toBe('https://zawiah.ae/');
    expect([...feedSuppliers, ...feedImporters].some((record) => record.verified)).toBe(false);
  });
});