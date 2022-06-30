import styled from 'styled-components';
import {ColorProps} from 'styled-system';

export const FavoriteHeartWrapper = styled.span<ColorProps>`
  height: 24px;
  display: flex;
  .wrapperIcon {
    width: 24px;
    height: 24px;
    min-width: 24px;
  }
  .icon {
    cursor: pointer;
  }
  .amount {
    min-width: 16px;
    height: 24px;
    font-size: 16px;
    font-family: 'HarmonyOs-Medium';
    color: ${(props) => props.color};
    line-height: 24px;
    margin-left: 4px;
  }
`;
