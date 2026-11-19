import rawCountries from '@/data/feed-hub/countries.json';
import rawImporters from '@/data/feed-hub/importers.json';
import rawExporters from '@/data/feed-hub/exporters.json';
import rawProducts from '@/data/feed-hub/products.json';

export type FeedProductId = 'corn' | 'alfalfa' | 'soybeanMeal';
export type DirectoryLocale = 'ar' | 'en';
export type LocalizedValue = Record<DirectoryLocale, string>;

export interface FeedProductDefinition {
  id: FeedProductId;
  name: LocalizedValue;
}

export interface FeedDirectoryRecord {
  id: string;
  name: LocalizedValue;
  country: LocalizedValue;
  activity: LocalizedValue;
  products: FeedProductId[];
  city?: string;
  verified?: boolean;
  phones?: string[];
  email?: string;
  website?: string;
}

type RawFeedDirectoryRecord = Omit<FeedDirectoryRecord, 'products'> & {
  products: string[];
};

function parseProductId(value: string): FeedProductId {
  if (value === 'corn' || value === 'alfalfa' || value === 'soybeanMeal') return value;
  throw new Error(`Unknown feed product id in static data: ${value}`);
}

function parseDirectoryRecords(records: RawFeedDirectoryRecord[]): FeedDirectoryRecord[] {
  return records.map((record) => ({
    ...record,
    products: record.products.map(parseProductId),
    ...(record.website ? {
      website: new URL(/^https?:\/\//i.test(record.website) ? record.website : `https://${record.website}`).href,
    } : {}),
  }));
}

export const feedProducts: FeedProductDefinition[] = rawProducts.map((product) => ({
  id: parseProductId(product.id),
  name: product.name,
}));

export const feedCountries: LocalizedValue[] = rawCountries.map(({ ar, en }) => ({ ar, en }));
export const feedSuppliers = parseDirectoryRecords(rawExporters as RawFeedDirectoryRecord[]);
export const feedImporters = parseDirectoryRecords(rawImporters as RawFeedDirectoryRecord[]);

export function filterByProduct(
  records: FeedDirectoryRecord[],
  productId: FeedProductId | 'all',
): FeedDirectoryRecord[] {
  if (productId === 'all') return records;
  return records.filter((record) => record.products.includes(productId));
}

export function filterByCountry(
  records: FeedDirectoryRecord[],
  countryEnglishName?: string,
): FeedDirectoryRecord[] {
  if (!countryEnglishName) return records;
  return records.filter((record) => record.country.en === countryEnglishName);
}
