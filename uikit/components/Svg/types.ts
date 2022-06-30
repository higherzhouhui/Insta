import {LayoutProps, SpaceProps, FontSizeProps} from 'styled-system';
export interface SvgIconProps extends LayoutProps, SpaceProps, FontSizeProps {
  name: string;
  color?: string;
  className?: string;
  onClick?: () => void;
}
