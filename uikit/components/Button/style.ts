import styled, {css} from 'styled-components';
import {
  height,
  width,
  color,
  fontSize,
  backgroundColor,
  border,
  borderRadius,
  backgroundImage,
  space,
} from 'styled-system';

import {BaseButtonProps, variants} from './types';

const getVariants = ({variant}: BaseButtonProps) => {
  if (variant === variants.PRIMARY) {
    return css`
      background: #53a9ff;
      border: 0;
      color: white;
      &:hover {
        background: #358fe9;
      }
    `;
  }

  if (variant === variants.TEXT) {
    return css`
      border: 0;
      color: #989898;
    `;
  }

  if (variant === variants.TERTIARY) {
    return css`
      border: 1px solid #53a9ff;
      color: #53a9ff;
      &:hover {
        box-shadow: 0 0 5px #53a9ff;
      }
    `;
  }
  if (variant === variants.DANGER) {
    return css`
      color: #fff;
      background: #ff6666;
      border: none;
      &:hover {
        background: red;
      }
    `;
  }
  if (variant === variants.SUBTLE) {
    return css`
      border: 1px solid #f3f3f3;
      &:hover {
        font-family: HarmonyOs-Bold;
        border: 1px solid #71717e;
      }
    `;
  }
  if (variant === variants.DELETE) {
    return css`
      &:hover {
        font-family: HarmonyOs-Bold;
        background: #ff6666;
        color: #fff;
      }
    `;
  }
};

export const ButtonContainer = styled.button<BaseButtonProps>`
  background-color: rgba(0, 0, 0, 0);
  border-radius: 8px;
  border: 1px solid #eef0f2;
  font-size: 14px;
  font-family: HarmonyOs-Medium;
  color: #333333;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  ${getVariants}
  ${width};
  ${height};
  ${borderRadius};
  ${border};
  ${backgroundColor};
  ${backgroundImage};
  ${color};
  ${space};
  ${fontSize}
  .prev-icon {
    margin-right: 8px;
    display: flex;
    align-items: center;
  }
  .next-icon {
    margin-left: 8px;
    display: flex;
    align-items: center;
  }
  .button-loading {
    position: absolute;
    width: 100%;
    height: 100%;
    ${borderRadius};
    background: rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    cursor: no-drop;
  }
  :disabled {
    background-color: rgb(128 139 151) !important;
    color: #fff !important;
    cursor: default;
  }
`;

export const IconButtonContainer = styled.button<BaseButtonProps>`
  background-color: rgba(0, 0, 0, 0);
  border-radius: 8px;
  border: 1px solid #eef0f2;
  font-size: 14px;
  font-family: HarmonyOs-Medium;
  color: #333333;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  ${getVariants}
  ${width};
  ${height};
  ${borderRadius};
  ${border};
  ${backgroundColor};
  ${backgroundImage};
  ${color};
  ${space};
  ${fontSize}
`;
