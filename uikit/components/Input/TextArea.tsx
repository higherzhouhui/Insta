import {FC, memo} from 'react';

import {TextAreaContainer} from './style';
import {TextAreaProps} from './types';

const TextArea: FC<TextAreaProps> = memo((props) => {
  return <TextAreaContainer {...(props as any)} />;
});

TextArea.defaultProps = {
  hasClose: true,
  type: 'text',
  autocomplete: 'off',
  width: '100%',
};

TextArea.displayName = 'TextArea';
export default TextArea;
