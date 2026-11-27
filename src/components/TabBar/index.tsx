import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Bar, Label, Tab } from './styles';

export type TabId = 'library' | 'search';
const TABS: { id: TabId; label: string }[] = [
  { id: 'library', label: 'Library' },
  { id: 'search', label: 'Search' },
];

export function TabBar({ active, onChange }: { active: TabId; onChange: (tab: TabId) => void }) {
  const insets = useSafeAreaInsets();
  return (
    <Bar style={{ paddingBottom: insets.bottom }}>
      {TABS.map((tab) => (
        <Tab key={tab.id} onPress={() => onChange(tab.id)} accessibilityRole="tab" accessibilityState={{ selected: active === tab.id }}>
          <Label $active={active === tab.id}>{tab.label}</Label>
        </Tab>
      ))}
    </Bar>
  );
}
