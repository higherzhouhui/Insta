import Image from 'next/image';
import {FC, memo} from 'react';

import {EmptyComp} from './style';

type EmptyProps = {
  text?: string;
  className?: string;
};

const Empty: FC<EmptyProps> = memo((props) => {
  const {children, text, className} = props;
  return (
    <EmptyComp className={className}>
      <span className='image-wrapper'>
        <Image
          alt='develop'
          height={80}
          src='/static/icon/develop-icon.png'
          width={80}
        />
      </span>
      <br />
      <span>{text || 'Data is empty...'}</span>
      {children}
    </EmptyComp>
  );
});

Empty.displayName = 'Empty';
export default Empty;
