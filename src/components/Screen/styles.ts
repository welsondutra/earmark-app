import styled from 'styled-components/native';
import { theme } from '../../theme';

export const Root = styled.View`
  flex: 1;
  background-color: ${theme.bg};
`;

export const Title = styled.Text`
  color: ${theme.text};
  font-size: 28px;
  font-weight: 700;
  padding: 8px 20px 12px;
`;

export const Message = styled.Text`
  color: ${theme.muted};
  font-size: 15px;
  line-height: 22px;
  padding: 24px 20px;
`;
