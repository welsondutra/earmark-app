import styled from 'styled-components/native';
import { theme } from '../../theme';

export const Bar = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  margin: 0 12px 8px;
  padding: 8px 12px 8px 8px;
  border-radius: ${theme.radius}px;
  background-color: ${theme.surfaceHigh};
`;

export const Info = styled.View`
  flex: 1;
`;

export const Name = styled.Text`
  color: ${theme.text};
  font-size: 14px;
  font-weight: 600;
`;

export const Sub = styled.Text`
  color: ${theme.muted};
  font-size: 12px;
`;

export const Button = styled.Pressable`
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
`;

export const Glyph = styled.Text<{ $accent: string }>`
  color: ${(p) => p.$accent};
  font-size: 22px;
`;

export const Track = styled.View`
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: 0;
  height: 2px;
  background-color: ${theme.border};
`;

export const Fill = styled.View<{ $pct: number; $accent: string }>`
  height: 2px;
  width: ${(p) => p.$pct}%;
  background-color: ${(p) => p.$accent};
`;
