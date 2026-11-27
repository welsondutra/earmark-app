import { useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import { EpisodeRow } from '../../components/EpisodeRow';
import { Message, Screen } from '../../components/Screen';
import { matches } from '../../format';
import type { CatalogState } from '../../hooks/useCatalog';
import { usePlayer } from '../../player/PlayerProvider';
import { theme } from '../../theme';
import { Input } from './styles';

export function SearchScreen({ catalog }: { catalog: CatalogState }) {
  const { play, progress } = usePlayer();
  const [query, setQuery] = useState('');
  const q = query.trim();

  const results = useMemo(
    () =>
      q
        ? catalog.episodes.filter((e) => [e.title, e.synopsis, e.tags.join(' '), e.topics.map((t) => t.title).join(' ')].some((field) => matches(field, q)))
        : [],
    [catalog.episodes, q],
  );

  return (
    <Screen title="Search">
      <Input
        value={query}
        onChangeText={setQuery}
        placeholder="Titles, topics and tags"
        placeholderTextColor={theme.muted}
        autoCorrect={false}
        returnKeyType="search"
        accessibilityLabel="Search episodes"
      />
      <FlatList
        data={results}
        keyExtractor={(e) => e.id}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => <EpisodeRow episode={item} progress={progress[item.id]} onPress={() => void play(item)} />}
        ListEmptyComponent={<Message>{q ? 'Nothing found. Try another word.' : 'Search every episode by title, topic or tag.'}</Message>}
      />
    </Screen>
  );
}
