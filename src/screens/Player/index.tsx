import { useState } from 'react';
import { Linking, type LayoutChangeEvent, type GestureResponderEvent } from 'react-native';
import { TagChip } from '../../components/TagChip';
import { formatDate, formatTime } from '../../format';
import { usePlayer } from '../../player/PlayerProvider';
import { accentFor } from '../../theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Art, Bar, BarFill, BarTrack, Body, Close, CloseLabel, Controls, Ctl, CtlText, Heading, Meta, PlayBtn, PlayGlyph, Tags, Times, Title, Wrap } from './styles';

const RATES = [1, 1.25, 1.5, 2, 0.85];

export function PlayerScreen({ onClose }: { onClose: () => void }) {
  const { episode, playing, toggle, position, duration, seekBy, seekTo, rate, setRate } = usePlayer();
  const insets = useSafeAreaInsets();
  const [width, setWidth] = useState(1);
  if (!episode) return null;
  const accent = accentFor(episode.podcast);
  const pct = duration > 0 ? (position / duration) * 100 : 0;
  const nextRate = RATES[(RATES.indexOf(rate) + 1) % RATES.length] ?? 1;

  const onSeek = (e: GestureResponderEvent) => {
    if (duration > 0) seekTo((e.nativeEvent.locationX / width) * duration);
  };

  return (
    <Wrap style={{ paddingTop: insets.top }}>
      <Close onPress={onClose} accessibilityRole="button" accessibilityLabel="Close player">
        <CloseLabel>⌄ Close</CloseLabel>
      </Close>
      <Art source={episode.coverUrl ? { uri: episode.coverUrl } : undefined} accessibilityIgnoresInvertColors />
      <Meta>{`${formatDate(episode.date)} · ${episode.podcast === 'tech' ? 'Daily Diff' : 'Loose Ends'}`}</Meta>
      <Title>{episode.title}</Title>

      <Bar
        onLayout={(e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width || 1)}
        onStartShouldSetResponder={() => true}
        onResponderRelease={onSeek}
        accessibilityRole="adjustable"
        accessibilityLabel="Position"
        accessibilityValue={{ min: 0, max: Math.round(duration), now: Math.round(position) }}
      >
        <BarTrack>
          <BarFill $pct={pct} $accent={accent} />
        </BarTrack>
      </Bar>
      <Times>
        <Meta>{formatTime(position)}</Meta>
        <Meta>{`-${formatTime(Math.max(0, duration - position))}`}</Meta>
      </Times>

      <Controls>
        <Ctl onPress={() => setRate(nextRate)} accessibilityRole="button" accessibilityLabel={`Speed ${rate}x`}>
          <CtlText>{`${rate}x`}</CtlText>
        </Ctl>
        <Ctl onPress={() => seekBy(-15)} accessibilityRole="button" accessibilityLabel="Back 15 seconds">
          <CtlText>-15s</CtlText>
        </Ctl>
        <PlayBtn $accent={accent} onPress={toggle} accessibilityRole="button" accessibilityLabel={playing ? 'Pause' : 'Play'}>
          <PlayGlyph>{playing ? '❚❚' : '▶'}</PlayGlyph>
        </PlayBtn>
        <Ctl onPress={() => seekBy(30)} accessibilityRole="button" accessibilityLabel="Forward 30 seconds">
          <CtlText>+30s</CtlText>
        </Ctl>
        <Ctl accessibilityElementsHidden importantForAccessibility="no">
          <CtlText> </CtlText>
        </Ctl>
      </Controls>

      <Heading>About this episode</Heading>
      <Body>{episode.synopsis}</Body>
      {episode.tags.length > 0 ? (
        <Tags>
          {episode.tags.map((t) => (
            <TagChip key={t} label={t} accent={accent} />
          ))}
        </Tags>
      ) : null}
      {episode.topics.length > 0 ? (
        <>
          <Heading>Topics and sources</Heading>
          {episode.topics.map((topic) => (
            <Body
              key={topic.title}
              onPress={topic.sourceUrl ? () => void Linking.openURL(topic.sourceUrl as string) : undefined}
              accessibilityRole={topic.sourceUrl ? 'link' : undefined}
            >
              {`• ${topic.title}`}
            </Body>
          ))}
        </>
      ) : null}
    </Wrap>
  );
}
