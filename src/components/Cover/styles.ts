import styled from 'styled-components/native';
import { theme } from '../../theme';

export const Image = styled.Image<{ $size: number }>`
  width: ${(p) => p.$size}px;
  height: ${(p) => p.$size}px;
  border-radius: 10px;
  background-color: ${theme.surfaceHigh};
`;
