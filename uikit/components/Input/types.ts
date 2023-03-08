import {ChangeEvent, ReactNode} from 'react';
import {
  BackgroundColorProps,
  BackgroundImageProps,
  BorderProps,
  BorderRadiusProps,
  FontSizeProps,
  LayoutProps,
  SpaceProps,
} from 'styled-system';

export interface BaseInputProps
  extends LayoutProps,
    SpaceProps,
    BackgroundColorProps,
    BorderRadiusProps,
    BorderProps,
    FontSizeProps {
  required?: boolean;
  inputtitle?: string;
  style?: React.CSSProperties;
  id?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  disabled?: boolean;
  hasClose?: boolean;
  unit?: string;
  invalid?: boolean;
  errormsg?: string;
  autocomplete?: string;
  wrong?: boolean;
  selected?: boolean;
  title?: string;
  maxLength?: number;
  size?: number;
  immediatelyDetect?: boolean; // focus时onchange进行即时检测
  iconLeft?: ReactNode;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (value?: string) => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: (e: KeyboardEvent) => void;
  className?: string;
}

export interface BaseIconInputProps extends BaseInputProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  leftWidth?: number;
}

export type BaseTextAreaProps = BaseInputProps;

export interface BaseIconProps extends LayoutProps, BackgroundImageProps {}
