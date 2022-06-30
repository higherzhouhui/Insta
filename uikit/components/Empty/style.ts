import styled from 'styled-components';
import {LayoutProps, SpaceProps} from 'styled-system';

interface EmptyCompProps extends LayoutProps, SpaceProps {}

export const EmptyComp = styled.div<EmptyCompProps>`
  width: 100%;
  padding: 120px 0;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  color: #d2d2d2;
  line-height: 26px;
  .image-wrapper {
    position: relative;
    display: inline-block;
    width: 80px;
    height: 80px;
    margin: 0 auto;
  }
`;
