import {memo} from 'react';

import {LayoutListContentContainer} from './styles';

export const ListLayout = memo(({children}) => {
  return <LayoutListContentContainer>{children}</LayoutListContentContainer>;
});

ListLayout.displayName = 'ListLayout';
