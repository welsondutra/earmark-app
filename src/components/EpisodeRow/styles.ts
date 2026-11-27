import styled from 'styled-components/native';
import { theme } from '../../theme';

export const Row = styled.Pressable`
  flex-direction: row;
  gap: 14px;
  padding: 12px 20px;
`;

export const Body = styled.View`
  flex: 1;
  gap: 4px;
`;

export const Title = styled.Text<{ $played: boolean }>`
  color: ${(p) => (p.$played ? theme.muted : theme.text)};
  font-size: 16px;
  font-weight: 600;
  line-height: 21px;
`;

export const Meta = styled.Text`
  color: ${theme.muted};
  font-size: 13px;
`;

export const Synopsis = styled.Text`
  color: ${theme.muted};
  font-size: 13px;
  line-height: 18px;
`;

export const Track = styled.View`
  height: 3px;
  border-radius: 2px;
  background-color: ${theme.border};
  margin-top: 6px;
`;

export const Fill = styled.View<{ $pct: number; $accent: string }>`
  height: 3px;
  border-radius: 2px;
  width: ${(p) => p.$pct}%;
  background-color: ${(p) => p.$accent};
`;
