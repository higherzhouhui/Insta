import styled from 'styled-components';
import {BackgroundProps} from 'styled-system';

export const MessageWrapper = styled.div<BackgroundProps>`
  width: fit-content;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: ${(props) => props.background}; */
  background: #000;
  color: #fff;
  position: fixed;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 70%;
  z-index: 10001;
  padding: 10px 20px;
  border-radius: 8px;
  .text {
    font-size: 16px;
    font-family: HarmonyOs-Bold;
    color: #ffffff;
  }
`;
