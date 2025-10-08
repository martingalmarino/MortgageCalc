/**
 * Major cities in Czech Republic for programmatic SEO
 */

export interface City {
  name: string;
  slug: string;
  region: string;
  population?: number;
}

export const citiesCZ: City[] = [
  { name: 'Praha', slug: 'praha', region: 'Hlavní město Praha', population: 1324000 },
  { name: 'Brno', slug: 'brno', region: 'Jihomoravský kraj', population: 382000 },
  { name: 'Ostrava', slug: 'ostrava', region: 'Moravskoslezský kraj', population: 285000 },
  { name: 'Plzeň', slug: 'plzen', region: 'Plzeňský kraj', population: 175000 },
  { name: 'Liberec', slug: 'liberec', region: 'Liberecký kraj', population: 104000 },
  { name: 'Olomouc', slug: 'olomouc', region: 'Olomoucký kraj', population: 100000 },
  { name: 'České Budějovice', slug: 'ceske-budejovice', region: 'Jihočeský kraj', population: 94000 },
  { name: 'Hradec Králové', slug: 'hradec-kralove', region: 'Královéhradecký kraj', population: 92000 },
  { name: 'Ústí nad Labem', slug: 'usti-nad-labem', region: 'Ústecký kraj', population: 91000 },
  { name: 'Pardubice', slug: 'pardubice', region: 'Pardubický kraj', population: 90000 },
  { name: 'Zlín', slug: 'zlin', region: 'Zlínský kraj', population: 75000 },
  { name: 'Havířov', slug: 'havirov', region: 'Moravskoslezský kraj', population: 72000 },
  { name: 'Kladno', slug: 'kladno', region: 'Středočeský kraj', population: 69000 },
  { name: 'Most', slug: 'most', region: 'Ústecký kraj', population: 65000 },
  { name: 'Opava', slug: 'opava', region: 'Moravskoslezský kraj', population: 58000 },
  { name: 'Frýdek-Místek', slug: 'frydek-mistek', region: 'Moravskoslezský kraj', population: 56000 },
  { name: 'Karlovy Vary', slug: 'karlovy-vary', region: 'Karlovarský kraj', population: 48000 },
  { name: 'Jihlava', slug: 'jihlava', region: 'Kraj Vysočina', population: 51000 },
];

/**
 * Get city by slug
 */
export function getCityBySlug(slug: string): City | undefined {
  return citiesCZ.find((city) => city.slug === slug);
}

/**
 * Get all city slugs for static path generation
 */
export function getAllCitySlugs(): string[] {
  return citiesCZ.map((city) => city.slug);
}

/**
 * Get cities for interlinking (excluding current city)
 */
export function getOtherCities(currentSlug: string, limit: number = 8): City[] {
  return citiesCZ
    .filter((city) => city.slug !== currentSlug)
    .slice(0, limit);
}

