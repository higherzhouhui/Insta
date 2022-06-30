import styled from 'styled-components';

import {ILoadingProps} from './index';

export const LoadingWrapper = styled.div<ILoadingProps>`
  width: ${({size}) =>
    size === 'large' ? '128px' : size === 'mini' ? '32px' : '64px'};
  height: ${({size}) =>
    size === 'large' ? '64px' : size === 'mini' ? '16px' : '32px'};
  position: relative;
  .loading-item-box {
    width: ${({size}) =>
      size === 'large' ? '64px' : size === 'mini' ? '16px' : '32px'};
    height: ${({size}) =>
      size === 'large' ? '64px' : size === 'mini' ? '16px' : '32px'};
    border-radius: 50%;
    position: absolute;
    &.loading-left-box {
      background: rgba(83, 169, 255, 0.1);
      box-shadow: inset 1px 2px 3px 1px #e0efff,
        inset -1px -2px 2px 1px rgba(217, 236, 255, 0.5);
      left: 0;
      top: 0;
      backdrop-filter: blur(32px);
      animation-name: move1;
      animation-direction: alternate;
      animation-timing-function: linear;
      animation-delay: 0s;
      animation-iteration-count: infinite;
      animation-duration: 1.5s;
    }
    &.loading-right-box {
      background: #53a9ff;
      right: 0;
      top: 0;
      animation-name: move2;
      animation-direction: alternate;
      animation-timing-function: linear;
      animation-delay: 0s;
      animation-iteration-count: infinite;
      animation-duration: 1.5s;
    }
    @keyframes move1 {
      0% {
        left: 0;
      }
      25% {
        left: 25%;
      }
      50% {
        left: 50%;
      }
      75% {
        left: 25%;
      }
      100% {
        left: 0%;
      }
    }
    @keyframes move2 {
      0% {
        right: 0;
      }
      25% {
        right: 25%;
      }
      50% {
        right: 50%;
      }
      75% {
        right: 25%;
      }
      100% {
        right: 0%;
      }
    }
  }
`;
