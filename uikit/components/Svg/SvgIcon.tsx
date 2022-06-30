import {FC, memo} from 'react';

import {SvgContainer} from './style';
import {SvgIconProps} from './types';

const importAll = (requireContext: __WebpackModuleApi.RequireContext) => {
  requireContext.keys().forEach(requireContext);
};
try {
  importAll(require.context('../../../public/static/svg', true, /\.svg$/));
} catch (error) {
  console.log(error);
}

const SvgIcon: FC<SvgIconProps> = memo(({name, ...props}) => {
  return (
    <SvgContainer {...(props as any)}>
      <use xlinkHref={`#${name}`} />
    </SvgContainer>
  );
});

SvgIcon.displayName = 'SvgIcon';
export default SvgIcon;
