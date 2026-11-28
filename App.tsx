import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { BackHandler, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MiniPlayer } from './src/components/MiniPlayer';
import { TabBar, type TabId } from './src/components/TabBar';
import { useCatalog } from './src/hooks/useCatalog';
import { PlayerProvider } from './src/player/PlayerProvider';
import { subscribeToShows } from './src/push/subscribe';
import { LibraryScreen } from './src/screens/Library';
import { PlayerScreen } from './src/screens/Player';
import { SearchScreen } from './src/screens/Search';
import { ShowScreen } from './src/screens/Show';
import { theme } from './src/theme';

function Shell() {
  const catalog = useCatalog();
  const [tab, setTab] = useState<TabId>('library');
  const [show, setShow] = useState<string | null>(null);
  const [playerOpen, setPlayerOpen] = useState(false);

  useEffect(() => {
    const slugs = catalog.index?.podcasts.map((p) => p.slug);
    if (slugs && slugs.length > 0) void subscribeToShows(slugs);
  }, [catalog.index]);

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (playerOpen) setPlayerOpen(false);
      else if (show) setShow(null);
      else return false;
      return true;
    });
    return () => sub.remove();
  }, [playerOpen, show]);

  if (playerOpen) return <PlayerScreen onClose={() => setPlayerOpen(false)} />;

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <View style={{ flex: 1 }}>
        {tab === 'search' ? (
          <SearchScreen catalog={catalog} />
        ) : show ? (
          <ShowScreen slug={show} catalog={catalog} onBack={() => setShow(null)} />
        ) : (
          <LibraryScreen catalog={catalog} onOpenShow={setShow} />
        )}
      </View>
      <MiniPlayer onOpen={() => setPlayerOpen(true)} />
      <TabBar
        active={tab}
        onChange={(next) => {
          setTab(next);
          if (next === 'library') setShow(null);
        }}
      />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PlayerProvider>
        <StatusBar style="light" />
        <Shell />
      </PlayerProvider>
    </SafeAreaProvider>
  );
}
