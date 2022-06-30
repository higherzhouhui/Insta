import {FC, memo, ReactNode} from 'react';

import {DropDownContainer} from './styles';

type IProps = {
  OptionsNode: ReactNode;
  containerClass?: string;
  optionClass?: string;
  placement?: string;
};

export const DropDown: FC<IProps> = memo(
  ({children, OptionsNode, containerClass, optionClass, placement}) => {
    return (
      <DropDownContainer
        className={`${containerClass ? containerClass : ''}`}
        placement={placement}
      >
        {children}
        <div className={`content-box ${optionClass ? optionClass : ''}`}>
          {OptionsNode}
        </div>
      </DropDownContainer>
    );
  }
);

DropDown.displayName = 'DropDown';
