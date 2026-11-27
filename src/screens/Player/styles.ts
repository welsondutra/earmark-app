import styled from 'styled-components/native';
import { theme } from '../../theme';

export const Wrap = styled.ScrollView.attrs({ contentContainerStyle: { padding: 20, gap: 18 } })`
  flex: 1;
`;

export const Close = styled.Pressable`
  padding: 8px 0;
`;

export const CloseLabel = styled.Text`
  color: ${theme.muted};
  font-size: 14px;
`;

export const Art = styled.Image`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 18px;
  background-color: ${theme.surfaceHigh};
`;

export const Title = styled.Text`
  color: ${theme.text};
  font-size: 22px;
  font-weight: 700;
  line-height: 28px;
`;

export const Meta = styled.Text`
  color: ${theme.muted};
  font-size: 13px;
`;

export const Bar = styled.View`
  height: 36px;
  justify-content: center;
`;

export const BarTrack = styled.View`
  height: 4px;
  border-radius: 2px;
  background-color: ${theme.border};
`;

export const BarFill = styled.View<{ $pct: number; $accent: string }>`
  height: 4px;
  border-radius: 2px;
  width: ${(p) => p.$pct}%;
  background-color: ${(p) => p.$accent};
`;

export const Times = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Controls = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Ctl = styled.Pressable`
  min-width: 56px;
  height: 56px;
  align-items: center;
  justify-content: center;
`;

export const CtlText = styled.Text`
  color: ${theme.text};
  font-size: 15px;
  font-weight: 600;
`;

export const PlayBtn = styled.Pressable<{ $accent: string }>`
  width: 72px;
  height: 72px;
  border-radius: 36px;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => p.$accent};
`;

export const PlayGlyph = styled.Text`
  color: #0c0d0f;
  font-size: 26px;
`;

export const Heading = styled.Text`
  color: ${theme.text};
  font-size: 16px;
  font-weight: 700;
  margin-top: 8px;
`;

export const Body = styled.Text`
  color: ${theme.muted};
  font-size: 15px;
  line-height: 23px;
`;

export const Tags = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;
