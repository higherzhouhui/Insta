import {FC, memo} from 'react';

import {PromptComp} from './style';

type PromptProps = {
  text?: string;
};

const Prompt: FC<PromptProps> = memo((props) => {
  const {children} = props;
  return (
    <PromptComp>
      {children}
      <div className='textWrapper'>
        <div className='content'>
          <div className='text'>{props.text}</div>
          <div className='jiantou' />
        </div>
      </div>
    </PromptComp>
  );
});

Prompt.displayName = 'Prompt';
export default Prompt;
