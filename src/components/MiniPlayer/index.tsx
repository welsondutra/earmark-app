import { usePlayer } from '../../player/PlayerProvider';
import { formatDate } from '../../format';
import { accentFor } from '../../theme';
import { Cover } from '../Cover';
import { Bar, Button, Fill, Glyph, Info, Name, Sub, Track } from './styles';

export function MiniPlayer({ onOpen }: { onOpen: () => void }) {
  const { episode, playing, toggle, position, duration } = usePlayer();
  if (!episode) return null;
  const accent = accentFor(episode.podcast);
  const pct = duration > 0 ? (position / duration) * 100 : 0;
  return (
    <Bar onPress={onOpen} accessibilityRole="button" accessibilityLabel="Open player">
      <Cover uri={episode.coverUrl} size={44} />
      <Info>
        <Name numberOfLines={1}>{episode.title}</Name>
        <Sub>{formatDate(episode.date)}</Sub>
      </Info>
      <Button onPress={toggle} accessibilityRole="button" accessibilityLabel={playing ? 'Pause' : 'Play'}>
        <Glyph $accent={accent}>{playing ? '❚❚' : '▶'}</Glyph>
      </Button>
      <Track>
        <Fill $pct={pct} $accent={accent} />
      </Track>
    </Bar>
  );
}
