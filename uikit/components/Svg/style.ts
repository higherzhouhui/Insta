import styled from 'styled-components';
import {height, width, fontSize, space} from 'styled-system';

import {SvgIconProps} from './types';

export const SvgContainer = styled.svg<SvgIconProps>`
  fill: ${({color}) => (color ? color : '#333')};
  ${width};
  ${height};
  ${fontSize};
  ${space}
`;
