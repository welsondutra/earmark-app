import { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { EpisodeRow } from '../../components/EpisodeRow';
import { Message, Screen } from '../../components/Screen';
import { TagChip } from '../../components/TagChip';
import type { CatalogState } from '../../hooks/useCatalog';
import { usePlayer } from '../../player/PlayerProvider';
import { accentFor } from '../../theme';
import { About, Back, BackLabel, Name, Tags, Top } from './styles';

export function ShowScreen({ slug, catalog, onBack }: { slug: string; catalog: CatalogState; onBack: () => void }) {
  const { play, progress } = usePlayer();
  const [tag, setTag] = useState<string | null>(null);
  const show = catalog.index?.podcasts.find((p) => p.slug === slug);
  const accent = accentFor(slug);

  const episodes = useMemo(
    () => catalog.episodes.filter((e) => e.podcast === slug && (!tag || e.tags.includes(tag))),
    [catalog.episodes, slug, tag],
  );

  return (
    <Screen>
      <Top>
        <Back onPress={onBack} accessibilityRole="button" accessibilityLabel="Back">
          <BackLabel>‹ Library</BackLabel>
        </Back>
        <Name accessibilityRole="header">{show?.name ?? ''}</Name>
        <About>{show?.description ?? ''}</About>
        {show && show.tags.length > 0 ? (
          <Tags horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {show.tags.map((t) => (
                <TagChip key={t} label={t} accent={accent} active={tag === t} onPress={() => setTag(tag === t ? null : t)} />
              ))}
            </View>
          </Tags>
        ) : null}
      </Top>
      <FlatList
        data={episodes}
        keyExtractor={(e) => e.id}
        renderItem={({ item }) => <EpisodeRow episode={item} progress={progress[item.id]} onPress={() => void play(item)} />}
        ListEmptyComponent={<Message>No episodes match this tag.</Message>}
      />
    </Screen>
  );
}
