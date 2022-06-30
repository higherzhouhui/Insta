import styled from 'styled-components';

import {RowProps, ColProps} from './types';

import {handleToPx} from '@/utils';

const getColWidth = ({span, gutter}: ColProps) => {
  if (gutter && span) {
    return `calc((100% - ${gutter * (span - 1)}px) / ${span})`;
  }
  return '25%';
};

const getNthChild = ({span}: ColProps) => {
  let num = 4;
  if (span) {
    num = span;
  }
  return `
        &:nth-child(${num}n){
            margin-right: 0;
        }
    `;
};

export const RowContainer = styled.div<RowProps>`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-flow: row wrap;
`;

export const ColContainer = styled.div<ColProps>`
  width: ${getColWidth};
  margin-right: ${({gutter}) => (gutter ? handleToPx(gutter) : '24px')};
  margin-bottom: ${({colGutter}) =>
    colGutter ? handleToPx(colGutter) : '24px'};
  ${getNthChild}
`;
