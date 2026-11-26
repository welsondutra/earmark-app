import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from 'expo-audio';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Platform } from 'react-native';
import { pickAudio } from '../api/catalog';
import type { EpisodeWithShow } from '../api/types';
import { loadProgress, saveProgress, type Progress } from '../storage/positions';

interface PlayerState {
  episode: EpisodeWithShow | null;
  playing: boolean;
  position: number;
  duration: number;
  rate: number;
  progress: Record<string, Progress>;
  play: (episode: EpisodeWithShow) => Promise<void>;
  toggle: () => void;
  seekBy: (delta: number) => void;
  seekTo: (seconds: number) => void;
  setRate: (rate: number) => void;
}

const Ctx = createContext<PlayerState | null>(null);

export function usePlayer(): PlayerState {
  const value = useContext(Ctx);
  if (!value) throw new Error('usePlayer needs PlayerProvider');
  return value;
}

const SAVE_EVERY_MS = 5000;

export function PlayerProvider({ children }: { children: ReactNode }) {
  const player = useRef<AudioPlayer | null>(null);
  const [episode, setEpisode] = useState<EpisodeWithShow | null>(null);
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRateState] = useState(1);
  const [progress, setProgress] = useState<Record<string, Progress>>({});
  const current = useRef<EpisodeWithShow | null>(null);
  const lastSave = useRef(0);

  useEffect(() => {
    void loadProgress().then((saved) => setProgress({ ...saved }));
    void setAudioModeAsync({ playsInSilentMode: true, shouldPlayInBackground: true, interruptionMode: 'doNotMix' });
    const p = createAudioPlayer(null, { updateInterval: 500 });
    player.current = p;
    const sub = p.addListener('playbackStatusUpdate', (status) => {
      setPlaying(status.playing);
      setPosition(status.currentTime);
      if (status.duration > 0) setDuration(status.duration);
      const ep = current.current;
      if (!ep) return;
      const dueToSave = Date.now() - lastSave.current > SAVE_EVERY_MS;
      if (status.didJustFinish || (status.playing && dueToSave) || (!status.playing && dueToSave && status.currentTime > 0)) {
        lastSave.current = Date.now();
        const total = status.duration > 0 ? status.duration : ep.durationSec;
        void saveProgress(ep.id, status.didJustFinish ? total : status.currentTime, total).then((all) => setProgress(all));
      }
    });
    return () => {
      sub.remove();
      p.remove();
    };
  }, []);

  const play = useCallback(async (next: EpisodeWithShow) => {
    const p = player.current;
    const url = pickAudio(next, Platform.OS === 'ios');
    if (!p || !url) return;
    if (current.current?.id === next.id) {
      p.play();
      return;
    }
    // Remember where the previous episode stopped before switching.
    if (current.current) await saveProgress(current.current.id, p.currentTime, p.duration || current.current.durationSec);
    const saved = (await loadProgress())[next.id];
    current.current = next;
    setEpisode(next);
    setDuration(next.durationSec);
    setPosition(saved?.position ?? 0);
    p.replace({ uri: url });
    if (saved && saved.position > 0) await p.seekTo(saved.position);
    p.setActiveForLockScreen(true, {
      title: next.title,
      artist: next.podcast === 'tech' ? 'Daily Diff' : 'Loose Ends',
      artworkUrl: next.coverUrl ?? undefined,
    });
    p.setPlaybackRate(rate);
    p.play();
  }, [rate]);

  const toggle = useCallback(() => {
    const p = player.current;
    if (!p) return;
    if (p.playing) {
      p.pause();
      if (current.current) void saveProgress(current.current.id, p.currentTime, p.duration).then(setProgress);
    } else p.play();
  }, []);

  const seekTo = useCallback((seconds: number) => void player.current?.seekTo(Math.max(0, seconds)), []);
  const seekBy = useCallback((delta: number) => {
    const p = player.current;
    if (p) void p.seekTo(Math.max(0, Math.min(p.duration || Infinity, p.currentTime + delta)));
  }, []);
  const setRate = useCallback((value: number) => {
    setRateState(value);
    player.current?.setPlaybackRate(value);
  }, []);

  const value = useMemo(
    () => ({ episode, playing, position, duration, rate, progress, play, toggle, seekBy, seekTo, setRate }),
    [episode, playing, position, duration, rate, progress, play, toggle, seekBy, seekTo, setRate],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
