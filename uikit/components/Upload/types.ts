import {
  BackgroundColorProps,
  BorderProps,
  BorderRadiusProps,
  FontSizeProps,
  LayoutProps,
  SpaceProps,
} from 'styled-system';

export interface BaseUploadProps
  extends LayoutProps,
    SpaceProps,
    BackgroundColorProps,
    BorderRadiusProps,
    BorderProps,
    FontSizeProps {
  onChange?: (filePath: string) => void;
  accept?: string;
  isLoading?: boolean;
  loadingSize?: 'mini' | 'regular' | 'large';
}
