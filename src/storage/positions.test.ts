import { beforeEach, describe, expect, it, vi } from 'vitest';

const store = new Map<string, string>();
vi.mock('@react-native-async-storage/async-storage', () => ({
  default: {
    getItem: async (k: string) => store.get(k) ?? null,
    setItem: async (k: string, v: string) => void store.set(k, v),
  },
}));

beforeEach(() => {
  store.clear();
  vi.resetModules();
});

describe('progress', () => {
  it('keeps the exact position of an episode', async () => {
    const { saveProgress, loadProgress } = await import('./positions');
    await saveProgress('a', 612.4, 1965);
    expect((await loadProgress()).a?.position).toBe(612.4);
  });

  it('marks an episode finished near the end and resets its position', async () => {
    const { saveProgress } = await import('./positions');
    const all = await saveProgress('a', 1960, 1965);
    expect(all.a).toMatchObject({ finished: true, position: 0 });
  });
});
