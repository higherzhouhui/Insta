import {ElementType, ReactNode} from 'react';
import {
  BackgroundColorProps,
  BorderProps,
  BorderRadiusProps,
  FontSizeProps,
  LayoutProps,
  SpaceProps,
} from 'styled-system';

import {PolymorphicComponentProps} from '../Button/types';

export const scales = {
  SM: 'sm',
  MD: 'md',
} as const;
export type Scales = typeof scales[keyof typeof scales];

export interface RadioContainerProps extends LayoutProps, SpaceProps {}

export interface RadioGroupContainerProps extends LayoutProps, SpaceProps {
  onChange?: (value: any) => void;
  value?: any;
}

export interface BaseInputProps
  extends LayoutProps,
    SpaceProps,
    BackgroundColorProps,
    BorderRadiusProps,
    BorderProps,
    FontSizeProps {
  scale?: Scales;
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
  onChange?: (value: string) => void;
  onBlur?: (value?: string) => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: (e: KeyboardEvent) => void;
}

export type RadioProps<P extends ElementType = 'input'> =
  PolymorphicComponentProps<P, BaseInputProps>;
