import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Progress {
  position: number;
  duration: number;
  finished: boolean;
  updatedAt: number;
}

const KEY = 'progress:v1';
let cache: Record<string, Progress> | null = null;

async function load(): Promise<Record<string, Progress>> {
  if (cache) return cache;
  try {
    const raw = await AsyncStorage.getItem(KEY);
    cache = raw ? (JSON.parse(raw) as Record<string, Progress>) : {};
  } catch {
    cache = {};
  }
  return cache;
}

export const loadProgress = load;

export async function saveProgress(id: string, position: number, duration: number): Promise<Record<string, Progress>> {
  const all = await load();
  const finished = duration > 0 && position >= duration - 15;
  all[id] = { position: finished ? 0 : position, duration, finished, updatedAt: Date.now() };
  await AsyncStorage.setItem(KEY, JSON.stringify(all)).catch(() => undefined);
  return { ...all };
}
