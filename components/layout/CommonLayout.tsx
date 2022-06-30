import {memo} from 'react';

import {LayoutContentContainer} from './styles';

export const CommonLayout = memo(({children}) => {
  return <LayoutContentContainer>{children}</LayoutContentContainer>;
});

CommonLayout.displayName = 'CommonLayout';
