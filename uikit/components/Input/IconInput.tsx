import {FC, memo} from 'react';

import Input from './Input';
import {InputOutContainer, LeftIcon, RightIcon} from './style';

const IconInput: FC<any> = memo(({leftIcon, rightIcon, ...props}) => {
  return (
    <InputOutContainer>
      {leftIcon ? (
        <LeftIcon width={props.leftWidth}>{leftIcon}</LeftIcon>
      ) : null}
      <Input {...props} />
      {rightIcon ? <RightIcon>{rightIcon}</RightIcon> : null}
    </InputOutContainer>
  );
});

IconInput.defaultProps = {
  hasClose: true,
  type: 'text',
  autocomplete: 'off',
  width: '100%',
};
IconInput.displayName = 'IconInput';
export default IconInput;
