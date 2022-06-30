import React, {FC, memo} from 'react';

import {ButtonContainer} from './style';
import {ButtonProps, scales, variants} from './types';

import {Loading} from '@/components';

const Button: FC<ButtonProps> = memo(
  ({children, startIcon, endIcon, ...props}) => {
    const onClike = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
    };
    return (
      <ButtonContainer {...(props as any)}>
        {startIcon && <span className='prev-icon'>{startIcon}</span>}
        {children}
        {endIcon && <span className='next-icon'>{endIcon}</span>}
        {props.isLoading ? (
          <div
            className='button-loading'
            onClick={(e) => {
              onClike(e);
            }}
          >
            <Loading size='mini' />
          </div>
        ) : null}
      </ButtonContainer>
    );
  }
);

Button.defaultProps = {
  isLoading: false,
  external: false,
  variant: variants.Default,
  scale: scales.MD,
  disabled: false,
};
Button.displayName = 'Button';
export default Button;
