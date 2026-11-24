const base = process.env.EXPO_PUBLIC_API_BASE ?? 'https://dutra.tail09d109.ts.net';

export const config = {
  apiBase: base.replace(/\/+$/, ''),
  catalogToken: process.env.EXPO_PUBLIC_CATALOG_TOKEN ?? '',
} as const;
