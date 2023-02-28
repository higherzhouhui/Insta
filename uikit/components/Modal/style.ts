import styled from 'styled-components';
import {
  borderRadius,
  border,
  backgroundImage,
  color,
  space,
} from 'styled-system';

import {ModalProps, ModalContainerProps} from './types';

import {handleToPx} from '@/utils';

export const ModalContainer = styled.div<ModalContainerProps>`
  opacity: ${({visible}) => (visible ? '1' : '0')};
  width: ${({visible}) => (visible ? '422px' : '0px')};
  height: ${({visible}) => (visible ? '456px' : '0px')};
  z-index: 9999;
  position: relative;
  transition: opacity 1s;
`;
export const ModalMaskContainer = styled.div<ModalContainerProps>`
  display: ${({visible}) => (visible ? 'block' : 'none')};
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 991;
`;
export const ModalContentContainer = styled.div<ModalProps>`
  display: ${({visible}) => (visible ? 'block' : 'none')};
  width: ${({width}) => (width ? handleToPx(width) : '422px')};
  height: ${({height}) => (height ? handleToPx(height) : '456px')};
  background: ${(props) => (props.background ? props.background : '#181E30')};
  border-radius: 8px;
  position: fixed;
  left: 50%;
  top: ${(props) => (props.top ? props.top : '50%')};
  transform: translate(-50%, -50%);
  z-index: 10000;
  ${borderRadius};
  ${border};
  ${backgroundImage};
  ${color};
  ${space};
`;
export const ModalLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .text {
    width: 100%;
    text-align: center;
    font-family: HarmonyOs-Bold;
    font-size: 24px;
    margin-top: 44px;
  }
  .loading {
    width: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
