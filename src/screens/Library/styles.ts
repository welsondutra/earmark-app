import styled from 'styled-components/native';
import { theme } from '../../theme';

export const Shows = styled.View`
  flex-direction: row;
  gap: 14px;
  padding: 0 20px 8px;
`;

export const ShowCard = styled.Pressable`
  flex: 1;
  gap: 8px;
`;

export const ShowCover = styled.Image`
  width: 100%;
  aspect-ratio: 1;
  border-radius: ${theme.radius}px;
  background-color: ${theme.surfaceHigh};
`;

export const ShowName = styled.Text`
  color: ${theme.text};
  font-size: 15px;
  font-weight: 600;
`;

export const ShowMeta = styled.Text`
  color: ${theme.muted};
  font-size: 12px;
`;

export const Section = styled.Text`
  color: ${theme.text};
  font-size: 18px;
  font-weight: 700;
  padding: 20px 20px 4px;
`;
