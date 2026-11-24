export interface PodcastSummary {
  slug: string;
  name: string;
  description: string;
  language: string;
  coverUrl: string | null;
  episodeCount: number;
  months: string[];
  tags: string[];
}

export interface CatalogIndex {
  version: number;
  generatedAt: string;
  podcasts: PodcastSummary[];
}

export interface AudioRendition {
  format: 'opus-ogg' | 'aac-m4a';
  bitrateKbps: number;
  url: string;
  sizeBytes: number;
}

export interface EpisodeTopic {
  title: string;
  sourceUrl: string | null;
}

export interface Episode {
  id: string;
  number: number | null;
  title: string;
  date: string;
  synopsis: string;
  durationSec: number;
  tags: string[];
  coverUrl: string | null;
  available: boolean;
  audio: AudioRendition[];
  topics: EpisodeTopic[];
}

export interface EpisodeWithShow extends Episode {
  podcast: string;
}

export interface MonthFile {
  version: number;
  podcast: string;
  month: string;
  episodes: Episode[];
}
