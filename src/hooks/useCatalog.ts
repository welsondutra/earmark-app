import { useCallback, useEffect, useState } from 'react';
import { fetchEpisodes, fetchIndex } from '../api/catalog';
import type { CatalogIndex, EpisodeWithShow } from '../api/types';

export interface CatalogState {
  index: CatalogIndex | null;
  episodes: EpisodeWithShow[];
  loading: boolean;
  error: string | null;
  reload: () => void;
}

export function useCatalog(): CatalogState {
  const [index, setIndex] = useState<CatalogIndex | null>(null);
  const [episodes, setEpisodes] = useState<EpisodeWithShow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const next = await fetchIndex();
      const lists = await Promise.all(next.podcasts.map((p) => fetchEpisodes(p.slug, p.months)));
      setIndex(next);
      setEpisodes(lists.flat().sort((a, b) => b.date.localeCompare(a.date)));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load the library');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { index, episodes, loading, error, reload: () => void load() };
}
