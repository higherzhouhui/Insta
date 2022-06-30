import styled from 'styled-components';

export const PromptComp = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  .textWrapper {
    position: absolute;
    height: 28px;
    border-radius: 4px;
    transform: translate(-50%, 0);
    left: 50%;
    top: calc(-100% - 20px);
    opacity: 0;
    width: max-content;
    padding: 0 8px;
    background: #0d0b21;
    transition: all 0.3s;
  }
  &:hover .textWrapper {
    opacity: 1;
  }
  .content {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.9;
  }
  .text {
    height: 20px;
    font-size: 14px;
    font-family: 'HarmonyOs-Medium';
    color: #ffffff;
    line-height: 20px;
  }
  .jiantou {
    position: absolute;
    left: 50%;
    top: 28px;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-top-color: #0d0b21;
  }
`;
