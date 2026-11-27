import styled from 'styled-components/native';
import { theme } from '../../theme';

export const Bar = styled.View`
  flex-direction: row;
  border-top-width: 1px;
  border-top-color: ${theme.border};
  background-color: ${theme.surface};
`;

export const Tab = styled.Pressable`
  flex: 1;
  align-items: center;
  padding: 12px 0;
`;

export const Label = styled.Text<{ $active: boolean }>`
  font-size: 13px;
  font-weight: 600;
  color: ${(p) => (p.$active ? theme.text : theme.muted)};
`;
