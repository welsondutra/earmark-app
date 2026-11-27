import styled from 'styled-components/native';
import { theme } from '../../theme';

export const Top = styled.View`
  padding: 4px 20px 12px;
  gap: 10px;
`;

export const Back = styled.Pressable`
  padding: 8px 0;
`;

export const BackLabel = styled.Text`
  color: ${theme.muted};
  font-size: 14px;
`;

export const Name = styled.Text`
  color: ${theme.text};
  font-size: 28px;
  font-weight: 700;
`;

export const About = styled.Text`
  color: ${theme.muted};
  font-size: 14px;
  line-height: 20px;
`;

export const Tags = styled.ScrollView`
  flex-grow: 0;
`;
