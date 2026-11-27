import { theme } from '../../theme';
import { Chip, Label } from './styles';

interface Props {
  label: string;
  active?: boolean;
  accent?: string;
  onPress?: () => void;
}

export function TagChip({ label, active = false, accent = theme.fallbackAccent, onPress }: Props) {
  return (
    <Chip $active={active} $accent={accent} onPress={onPress} accessibilityRole="button" accessibilityState={{ selected: active }}>
      <Label $active={active}>{label}</Label>
    </Chip>
  );
}
