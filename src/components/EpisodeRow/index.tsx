import type { EpisodeWithShow } from '../../api/types';
import { formatDate, formatMinutes, formatTime } from '../../format';
import type { Progress } from '../../storage/positions';
import { accentFor } from '../../theme';
import { Cover } from '../Cover';
import { Body, Fill, Meta, Row, Synopsis, Title, Track } from './styles';

interface Props {
  episode: EpisodeWithShow;
  progress?: Progress;
  onPress: () => void;
}

export function EpisodeRow({ episode, progress, onPress }: Props) {
  const started = progress && progress.position > 0 && !progress.finished;
  const pct = started && episode.durationSec > 0 ? Math.min(100, (progress.position / episode.durationSec) * 100) : 0;
  const status = !episode.available
    ? 'Archived'
    : started
      ? `${formatTime(episode.durationSec - progress.position)} left`
      : progress?.finished
        ? 'Played'
        : formatMinutes(episode.durationSec);

  return (
    <Row onPress={onPress} accessibilityRole="button" accessibilityLabel={`${episode.title}, ${status}`}>
      <Cover uri={episode.coverUrl} size={72} />
      <Body>
        <Meta>{`${formatDate(episode.date)} · ${status}`}</Meta>
        <Title $played={Boolean(progress?.finished)} numberOfLines={2}>
          {episode.title}
        </Title>
        <Synopsis numberOfLines={2}>{episode.synopsis}</Synopsis>
        {pct > 0 ? (
          <Track>
            <Fill $pct={pct} $accent={accentFor(episode.podcast)} />
          </Track>
        ) : null}
      </Body>
    </Row>
  );
}
