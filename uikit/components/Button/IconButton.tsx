import React, {FC, memo} from 'react';

import {IconButtonContainer} from './style';
import {ButtonProps, scales, variants} from './types';

const IconButton: FC<ButtonProps> = memo(({children, ...props}) => {
  return (
    <IconButtonContainer {...(props as any)}>{children}</IconButtonContainer>
  );
});

IconButton.defaultProps = {
  isLoading: false,
  external: false,
  variant: variants.PRIMARY,
  scale: scales.MD,
  disabled: false,
};
IconButton.displayName = 'IconButton';
export default IconButton;
