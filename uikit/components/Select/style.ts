import styled, {css} from 'styled-components';
import {
  height,
  width,
  color,
  backgroundColor,
  border,
  borderRadius,
  backgroundImage,
  space,
  minHeight,
  fontSize,
} from 'styled-system';

import {BasicStyle} from '../Input/style';
import {
  SelectContainerProps,
  BaseMultiSelectSearchContainerProps,
} from './types';

const multi = css`
  .css-1rhbuit-multiValue {
    background-color: #53a9ff;
    div {
      color: white;
    }
    .css-xb97g8 {
      &:hover {
        background-color: #ea6e6e;
      }
    }
  }
  .css-14el2xx-placeholder {
    font-size: 16px !important;
    color: #989898;
    margin-left: 0;
  }
`;

export const SelectContainer = styled.div<SelectContainerProps>`
  .css-1s2u09g-control {
    min-height: 40px;
    border: 1px solid #eef0f2;
    ${width}
    ${height};
    ${minHeight};
    cursor: pointer;
    transition: all 0s;
    &:hover {
      min-height: 40px;
      ${width};
      ${height};
      border: 0;
      box-shadow: 0 0 10px #e4e4e4;
    }
  }
  .css-1pahdxg-control {
    cursor: pointer;
    min-height: 40px;
    ${width};
    ${minHeight};
    border: 0 !important;
    box-shadow: 0 0 10px #e4e4e4;
  }
  .css-x19aeh-control,
  .css-196tu16-control {
    min-height: 48px;
    ${minHeight}
    border-radius: 12px;
    background-color: #fff;
    font-size: 16px;
    border: 0;
    border: 2px solid red;
  }
  .css-196tu16-control {
    box-shadow: none;
  }
  .css-qc6sy-singleValue {
    font-size: 16px;
    ${fontSize};
    color: #333333;
    font-weight: 400;
    margin-left: 0;
  }
  .css-14el2xx-placeholder {
    font-size: 14px !important;
    color: #989898;
    margin-left: 0;
  }
  .css-6j8wv5-Input {
    margin: 0;
    input {
      min-width: 20px !important;
      font-size: 16px !important;
    }
  }
  .css-319lph-ValueContainer {
    padding: 2px 12px;
  }
  .css-1hb7zxy-IndicatorsContainer {
    display: ${({isMulti}) => (isMulti ? 'none' : 'flex')};
    ${height};
  }
  .css-1okebmr-indicatorSeparator {
    display: none;
  }
  .css-26l3qy-menu {
    z-index: 2;
    .css-4ljt47-MenuList {
      max-height: 200px;
      .css-1n7v3ny-option {
        background-color: #53a9ff;
        color: #fff;
      }
    }
  }
  ${width};
  ${height};
  ${borderRadius};
  ${border};
  ${backgroundColor};
  ${backgroundImage};
  ${color};
  ${space};
  ${({isMulti}) => (isMulti ? multi : '')}
`;

export const MultiSelectSearchContainer = styled.div<BaseMultiSelectSearchContainerProps>`
  width: 100%;
  min-height: 40px;
  color: #333333;
  border: 1px solid #eef0f2;
  font-size: 16px;
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  box-shadow: ${({isFocus}) => (isFocus ? '0 0 10px #e4e4e4' : 'none')};
  position: relative;
`;
export const MultiSelectSearchTagContainer = styled.div<BaseMultiSelectSearchContainerProps>`
  width: 100%;
  min-height: 40px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 5px;
  .tag-box {
    background-color: #53a9ff;
    height: 23px;
    color: white;
    display: flex;
    align-items: center;
    margin: 3px 3px;
    border-radius: 3px;
    overflow: hidden;
    .tag-title {
      padding-left: 5px;
      padding-right: 2px;
    }
    .tag-operate {
      width: 20px;
      height: 23px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: white;
      &:hover {
        background-color: red;
      }
    }
  }
`;

export const MultiSelectSearchInputBoxContainer = styled.div`
  margin: 2px;
  padding-bottom: 2px;
  padding-top: 2px;
  visibility: visible;
  color: hsl(0, 0%, 20%);
  /* -webkit-flex: 1 1 auto;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    display: inline-grid;
    grid-area: 1/1/2/3; */
  flex: 1;
  grid-template-columns: 0 min-content;
`;

export const MultiSelectSearchInputContainer = styled.input<BaseMultiSelectSearchContainerProps>`
  ${BasicStyle}
  min-width: 20px;
  font-size: 16px;
  color: inherit;
  background: 0px center;
  opacity: 1;
  width: 100%;
  grid-area: 1 / 2 / auto / auto;
  font: inherit;
  min-width: 2px;
  border: 0px;
  margin: 0px;
  outline: 0px;
  padding: 0px 0px 0px 7px;
`;

export const MultiSelectSearchListContainer = styled.div<BaseMultiSelectSearchContainerProps>`
  position: absolute;
  width: 100%;
  max-height: 200px;
  box-shadow: 0 0 5px #e4e4e4;
  background-color: white;
  z-index: 999;
  border-radius: 0 0 4px 4px;
  overflow-y: auto;
  left: 0;
  top: calc(100% + 3px);
  padding: 10px 0;
  .list-item-box {
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
    font-size: 14px;
    cursor: pointer;
    &:hover {
      background-color: #53a9ff;
      color: white;
    }
    &.selected-item-box {
      background-color: #e5e5e5;
      color: white;
      cursor: no-drop;
    }
  }
`;
