import {
  BackgroundImageProps,
  BackgroundProps,
  BorderProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
} from 'styled-system';

export interface ModalProps
  extends LayoutProps,
    BackgroundImageProps,
    SpaceProps,
    BorderProps,
    BackgroundProps,
    PositionProps {
  width?: number | string;
  visible?: boolean;
  closable?: boolean;
  destroyOnClose?: boolean;
  getContainer?: any;
  maskClosable?: boolean;
  mask?: boolean;
  zIndex?: number;
  onClose?: () => void;
  loading?: boolean;
}
export interface ModalContainerProps {
  visible?: boolean;
  zIndex?: number;
}

export interface ModalContentContainerProps {
  width?: number | string;
  top?: number | string;
  visible?: boolean;
  placement?: string;
}
