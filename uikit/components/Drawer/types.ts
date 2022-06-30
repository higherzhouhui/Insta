import {CSSProperties} from 'react';
import {LayoutProps, SpaceProps, PositionProps} from 'styled-system';

export interface DrawerProps extends LayoutProps, SpaceProps, PositionProps {
  width?: number | string;
  visible?: boolean;
  closable?: boolean;
  destroyOnClose?: boolean;
  getContainer?: any;
  maskClosable?: boolean;
  mask?: boolean;
  drawerStyle?: CSSProperties;
  placement?: string;
  zIndex?: number;
  onClose: () => void;
}

export interface DrawerContainerProps {
  visible?: boolean;
  zIndex?: number;
}

export interface DrawerContentContainerProps {
  width?: number | string;
  top?: number | string;
  visible?: boolean;
  placement?: string;
}
