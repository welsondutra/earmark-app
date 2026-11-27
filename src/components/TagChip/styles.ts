import styled from 'styled-components/native';
import { theme } from '../../theme';

export const Chip = styled.Pressable<{ $active: boolean; $accent: string }>`
  padding: 6px 12px;
  border-radius: 999px;
  border-width: 1px;
  border-color: ${(p) => (p.$active ? p.$accent : theme.border)};
  background-color: ${(p) => (p.$active ? p.$accent : 'transparent')};
`;

export const Label = styled.Text<{ $active: boolean }>`
  font-size: 13px;
  color: ${(p) => (p.$active ? '#0c0d0f' : theme.muted)};
`;
