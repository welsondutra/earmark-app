import AsyncStorage from '@react-native-async-storage/async-storage';
import { config } from '../config';
import type { CatalogIndex, EpisodeWithShow, MonthFile } from './types';

const root = () => `${config.apiBase}/catalog/${config.catalogToken}`;

/** Fetches JSON and keeps the last good copy, so the library still opens offline. */
async function getCached<T>(path: string): Promise<T> {
  const key = `catalog:${path}`;
  try {
    const res = await fetch(`${root()}/${path}`, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`Catalog request failed (${res.status})`);
    const body = (await res.json()) as T;
    await AsyncStorage.setItem(key, JSON.stringify(body)).catch(() => undefined);
    return body;
  } catch (error) {
    const saved = await AsyncStorage.getItem(key).catch(() => null);
    if (saved) return JSON.parse(saved) as T;
    throw error;
  }
}

export const fetchIndex = () => getCached<CatalogIndex>('index.json');

export async function fetchEpisodes(slug: string, months: string[]): Promise<EpisodeWithShow[]> {
  const files = await Promise.all(months.map((month) => getCached<MonthFile>(`${slug}/${month}.json`)));
  return files
    .flatMap((file) => file.episodes.map((episode) => ({ ...episode, podcast: slug })))
    .sort((a, b) => b.date.localeCompare(a.date) || (b.number ?? 0) - (a.number ?? 0));
}

/** Prefers the smallest rendition the device can play; Opus today, AAC when it exists for iPhone. */
export function pickAudio(episode: EpisodeWithShow, ios: boolean): string | null {
  const wanted = ios ? 'aac-m4a' : 'opus-ogg';
  const found = episode.audio.find((a) => a.format === wanted) ?? episode.audio[0];
  return found?.url ?? null;
}
