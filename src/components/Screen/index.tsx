import type { ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Root, Title } from './styles';

export { Message } from './styles';

export function Screen({ title, children }: { title?: string; children: ReactNode }) {
  const insets = useSafeAreaInsets();
  return (
    <Root style={{ paddingTop: insets.top }}>
      {title ? <Title accessibilityRole="header">{title}</Title> : null}
      {children}
    </Root>
  );
}
