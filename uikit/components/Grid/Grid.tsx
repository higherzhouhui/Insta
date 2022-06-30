import {FC, memo} from 'react';

import {RowContainer, ColContainer} from './style';
import {RowProps, ColProps} from './types';

export const Row: FC<RowProps> = memo((props) => {
  const {children} = props;
  return <RowContainer>{children}</RowContainer>;
});

Row.displayName = 'Row';
export const Col: FC<ColProps> = memo((props) => {
  const {children, ...rest} = props;
  // console.log(props)
  return <ColContainer {...(rest as ColProps)}>{children}</ColContainer>;
});

Col.displayName = 'Col';

Col.defaultProps = {
  gutter: 24,
  span: 4,
};
