/**
 * Residents & style filter — edit this file to toggle what appears on the Artists page.
 *
 * 1. `residents` — the 4 artists shown side-by-side on /artists.
 * 2. `STYLES` — the big list. Set `enabled: false` to hide a style pill.
 *    Pills auto-filter to only styles that at least one resident covers.
 */

export interface StyleDef {
  id: string;
  name: string;    // DE
  nameEn: string;  // EN
  enabled: boolean;
}

export interface ResidentArtist {
  id: string;
  name: string;
  instagram: string;
  portrait: string;
  portfolio: string[];
  styleIds: string[];
  roleDe?: string;
  roleEn?: string;
}

export const STYLES: StyleDef[] = [
  { id: 'realismus-farbe',   name: 'Realismus – Farbe',           nameEn: 'Realism – Color',            enabled: true },
  { id: 'realismus-bw',      name: 'Realismus – Black & Grey',    nameEn: 'Realism – Black & Grey',     enabled: true },
  { id: 'surrealismus',      name: 'Surrealismus',                nameEn: 'Surrealism',                 enabled: true },
  { id: 'dark-art',          name: 'Dark Art / Horror',           nameEn: 'Dark Art / Horror',          enabled: true },
  { id: 'anime',             name: 'Anime / Manga',               nameEn: 'Anime / Manga',              enabled: true },
  { id: 'blackwork',         name: 'Blackwork',                   nameEn: 'Blackwork',                  enabled: true },
  { id: 'mandalas',          name: 'Mandalas / Ornamente',        nameEn: 'Mandalas / Ornaments',       enabled: false },
  { id: 'illustrativ',       name: 'Illustrativ',                 nameEn: 'Illustrative',               enabled: true },
  { id: 'floral',            name: 'Floral / Botanisch',          nameEn: 'Floral / Botanical',         enabled: true },
  { id: 'traditional',       name: 'Traditional / Neo',           nameEn: 'Traditional / Neo',          enabled: false },
  { id: 'watercolor',        name: 'Watercolor',                  nameEn: 'Watercolor',                 enabled: true },
  { id: 'fineline',          name: 'Fineline / Tiny',             nameEn: 'Fineline / Tiny',            enabled: true },
  { id: 'dotwork',           name: 'Dotwork',                     nameEn: 'Dotwork',                    enabled: true },
  { id: 'coverup',           name: 'Cover-up',                    nameEn: 'Cover-up',                   enabled: true },
];

export const residents: ResidentArtist[] = [
  {
    id: 'max',
    name: 'Max',
    roleDe: 'Gründer & Artist',
    roleEn: 'Founder & Artist',
    instagram: '@thommesen_ink',
    portrait: '/images/artists/max.webp',
    // PLATZHALTER-Bilder — gegen echte Tattoo-Bilder austauschen sobald geliefert
    portfolio: [
      '/images/artists/max_tattoo_1.webp',
      '/images/artists/max_tattoo_2.webp',
      '/images/artists/max_tattoo_3.webp',
      '/images/artists/max_tattoo_4.webp',
    ],
    styleIds: ['realismus-farbe', 'realismus-bw', 'surrealismus'],
  },
  {
    id: 'vroni',
    name: 'Vroni',
    roleDe: 'Resident Artist',
    roleEn: 'Resident Artist',
    instagram: '@tattooist_veronika',
    portrait: '/images/artists/vroni.webp',
    portfolio: [
      '/images/artists/vroni_tattoo_1.webp',
      '/images/artists/vroni_tattoo_2.webp',
      '/images/artists/vroni_tattoo_3.webp',
      '/images/artists/vroni_tattoo_4.webp',
    ],
    styleIds: ['fineline', 'floral', 'realismus-bw'],
  },
  {
    id: 'roli',
    name: 'Roli',
    roleDe: 'Resident Artist',
    roleEn: 'Resident Artist',
    instagram: '@roli_ink',
    portrait: '/images/artists/roli.webp',
    portfolio: [
      '/images/artists/roli_tattoo_1.webp',
      '/images/artists/roli_tattoo_2.webp',
      '/images/artists/roli_tattoo_3.webp',
      '/images/artists/roli_tattoo_4.webp',
    ],
    styleIds: ['realismus-farbe', 'realismus-bw', 'coverup'],
  },
  {
    id: 'rita',
    name: 'Rita',
    roleDe: 'Resident Artist',
    roleEn: 'Resident Artist',
    instagram: '@innerbloom.ink',
    portrait: '/images/artists/rita.webp',
    portfolio: [
      '/images/artists/rita_tattoo_1.webp',
      '/images/artists/rita_tattoo_2.webp',
      '/images/artists/rita_tattoo_3.webp',
      '/images/artists/rita_tattoo_4.webp',
    ],
    styleIds: ['floral', 'fineline', 'watercolor'],
  },
];

export function getActiveStyles(): StyleDef[] {
  const coveredIds = new Set(residents.flatMap(r => r.styleIds));
  return STYLES.filter(s => s.enabled && coveredIds.has(s.id));
}
