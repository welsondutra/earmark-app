export const theme = {
  bg: '#0c0d0f',
  surface: '#15171a',
  surfaceHigh: '#1e2125',
  border: '#272a2f',
  text: '#f2f3f5',
  muted: '#9aa0a8',
  danger: '#ef6b6b',
  radius: 14,
  accents: { tech: '#5bde86', rest: '#f2b84b' } as Record<string, string>,
  fallbackAccent: '#7aa7ff',
} as const;

export const accentFor = (slug: string): string => theme.accents[slug] ?? theme.fallbackAccent;
