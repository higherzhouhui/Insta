import {FC, memo} from 'react';

import {LoadingWrapper} from './styles';

export type ILoadingProps = {
  size?: 'mini' | 'regular' | 'large';
};

export const Loading: FC<ILoadingProps> = memo(({size}) => {
  return (
    <LoadingWrapper size={size}>
      <div className='loading-item-box loading-left-box' />
      <div className='loading-item-box loading-right-box' />
    </LoadingWrapper>
  );
});

Loading.defaultProps = {
  size: 'regular',
};

Loading.displayName = 'Loading';
