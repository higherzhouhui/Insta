import {FC, memo} from 'react';

import {InputContainer} from './style';
import {InputProps} from './types';

const Input: FC<InputProps> = memo((props) => {
  return <InputContainer {...(props as any)} />;
});

Input.defaultProps = {
  hasClose: true,
  type: 'text',
  autocomplete: 'off',
  width: '100%',
};

Input.displayName = 'Input';
export default Input;
