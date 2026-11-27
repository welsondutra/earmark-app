import { FlatList, RefreshControl } from 'react-native';
import type { EpisodeWithShow } from '../../api/types';
import { EpisodeRow } from '../../components/EpisodeRow';
import { Message, Screen } from '../../components/Screen';
import type { CatalogState } from '../../hooks/useCatalog';
import { usePlayer } from '../../player/PlayerProvider';
import { theme } from '../../theme';
import { Section, ShowCard, ShowCover, ShowMeta, ShowName, Shows } from './styles';

interface Props {
  catalog: CatalogState;
  onOpenShow: (slug: string) => void;
}

export function LibraryScreen({ catalog, onOpenShow }: Props) {
  const { play, progress } = usePlayer();
  const { index, episodes, loading, error, reload } = catalog;

  const header = (
    <>
      <Shows>
        {index?.podcasts.map((show) => (
          <ShowCard key={show.slug} onPress={() => onOpenShow(show.slug)} accessibilityRole="button" accessibilityLabel={show.name}>
            <ShowCover source={show.coverUrl ? { uri: show.coverUrl } : undefined} />
            <ShowName>{show.name}</ShowName>
            <ShowMeta>{`${show.episodeCount} ${show.episodeCount === 1 ? 'episode' : 'episodes'}`}</ShowMeta>
          </ShowCard>
        ))}
      </Shows>
      <Section accessibilityRole="header">Latest</Section>
    </>
  );

  return (
    <Screen title="Earmark">
      {error && !index ? (
        <Message>{`Can't reach the server. ${error}. Pull down to try again.`}</Message>
      ) : null}
      <FlatList<EpisodeWithShow>
        data={episodes}
        keyExtractor={(e) => e.id}
        ListHeaderComponent={index ? header : undefined}
        renderItem={({ item }) => <EpisodeRow episode={item} progress={progress[item.id]} onPress={() => void play(item)} />}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={reload} tintColor={theme.muted} />}
        ListEmptyComponent={!loading && index ? <Message>No episodes yet.</Message> : undefined}
      />
    </Screen>
  );
}
