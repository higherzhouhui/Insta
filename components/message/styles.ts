import styled from 'styled-components';
import {BackgroundProps} from 'styled-system';

export const MessageWrapper = styled.div<BackgroundProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.background};
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10001;
  .text {
    font-size: 12px;
    font-family: HarmonyOs-Bold;
    color: #ffffff;
  }
`;
