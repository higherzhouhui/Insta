import styled from 'styled-components';

import {handleToPx} from '@/utils';

export const Content = styled.div`
  width: 100%;
  background: #f5f8fb;
  min-height: calc(100vh - 289px);
`;

export const MainContent = styled.div`
  max-width: 1312px;
  width: 100%;
  margin: 0 auto;
  flex: 1;
  padding: 40px 20px;
  .project-icon {
    width: 160px;
    height: 160px;
    border-radius: 15px;
    opacity: 1;
    position: absolute;
    top: 120px;
    z-index: 2;
    overflow: hidden;
    background: #dfe5df;
  }
`;

export const ImageWrapper = styled.div`
  max-width: 1312px;
  height: 220px;
  position: relative;
  margin: 0 auto;
  .published {
    margin: 0 auto;
    width: 70%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .titleWrapper {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .title {
    font-size: 32px;
    color: #000;
    font-family: 'HarmonyOs-Bold';
    line-height: 48px;
  }
  .underline {
    width: 40px;
    height: 4px;
    background: #53a9ff;
  }
  .nft-image {
    width: 130px;
    height: 130px;
    position: relative;
  }
  .decbubble {
    position: absolute;
    left: 50%;
    top: 0;
    width: 100%;
    height: 100%;
    transform: translateX(-50%);
    overflow: hidden;
  }
`;
export const BubbleComp = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export interface BubleStyle {
  width: number | string;
  left: number | string;
  top: number | string;
  background: string;
}

export const Bubbles = styled.div<BubleStyle>`
  width: ${(props) => handleToPx(props.width)};
  height: ${(props) => handleToPx(props.width)};
  left: ${(props) => handleToPx(props.left)};
  top: ${(props) => handleToPx(props.top)};
  background: ${(props) => props.background};
  position: absolute;
  overflow: hidden;
  border-radius: 50%;
`;
