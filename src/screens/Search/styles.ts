import styled from 'styled-components/native';
import { theme } from '../../theme';

export const Input = styled.TextInput`
  margin: 0 20px 12px;
  padding: 12px 16px;
  border-radius: ${theme.radius}px;
  background-color: ${theme.surfaceHigh};
  color: ${theme.text};
  font-size: 16px;
`;
