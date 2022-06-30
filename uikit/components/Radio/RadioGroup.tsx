import {FC, memo, Children, cloneElement} from 'react';

import {RadioGroupContainer} from './style';
import {RadioGroupContainerProps} from './types';

const RadioGroup: FC<RadioGroupContainerProps> = memo(
  ({children, onChange, value, ...props}) => {
    const handleActiveChange = (e: any) => {
      onChange && onChange(e.target.value);
    };
    return (
      <RadioGroupContainer {...(props as any)}>
        {Children.map(children, (child: any) => {
          const isActive = value === child.props.value;
          return cloneElement(child, {
            label: child.props.children,
            value: child.props.value,
            checked: isActive,
            onClick: handleActiveChange,
          });
        })}
      </RadioGroupContainer>
    );
  }
);

RadioGroup.defaultProps = {
  onChange: (val: any) => {},
  value: null,
};
RadioGroup.displayName = 'RadioGroup';
export default RadioGroup;
