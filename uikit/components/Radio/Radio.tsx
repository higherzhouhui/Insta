import {FC, memo} from 'react';

import {RadioContainer, RadioBox, RadioText} from './style';
import {RadioProps, scales} from './types';

const Radio: FC<RadioProps> = memo(({children, mr, ...props}) => {
  return (
    <RadioContainer mr={mr}>
      <RadioBox {...(props as any)} />
      {children ? <RadioText>{children}</RadioText> : null}
    </RadioContainer>
  );
});

Radio.defaultProps = {
  scale: scales.SM,
  m: 0,
};
Radio.displayName = 'Radio';
export default Radio;
