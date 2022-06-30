import styled from 'styled-components';
import {
  height,
  width,
  color,
  backgroundColor,
  border,
  borderRadius,
  backgroundImage,
  space,
} from 'styled-system';

import {BaseUploadProps} from './types';

export const UploadContainer = styled.div<BaseUploadProps>`
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
  ${width};
  ${height};
  ${borderRadius};
  ${border};
  ${backgroundColor};
  ${backgroundImage};
  ${color};
  ${space};
`;

export const UploadLoading = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99;
  background: #f3f3f3;
  > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
