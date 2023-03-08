import {
  OptionsOrGroups,
  GroupBase,
  PropsValue,
  SingleValue,
  ActionMeta,
} from 'react-select';
import {
  BackgroundColorProps,
  BorderProps,
  BorderRadiusProps,
  FontSizeProps,
  LayoutProps,
  SpaceProps,
} from 'styled-system';

export interface SelectOptionProps {
  label: string;
  value: string | number;
}

export interface SelectContainerProps {
  isMulti?: boolean;
}

export interface BaseSelectProps
  extends LayoutProps,
    SpaceProps,
    BackgroundColorProps,
    BorderRadiusProps,
    BorderProps,
    FontSizeProps {
  options?: OptionsOrGroups<string, GroupBase<string>> | undefined;
  defaultValue?: PropsValue<string> | undefined;
  onChange?:
    | ((newValue: SingleValue<string>, actionMeta: ActionMeta<string>) => void)
    | undefined;
}

export interface BaseMultiSelectProps
  extends LayoutProps,
    SpaceProps,
    BackgroundColorProps,
    BorderRadiusProps,
    BorderProps,
    FontSizeProps {
  options?: SelectOptionProps[];
  onAddOption?: (value: string) => void;
  onSearch?: (value: string) => void;
  onChange: (value: SelectOptionProps[]) => void;
}

export interface BaseMultiSelectSearchContainerProps
  extends LayoutProps,
    SpaceProps,
    BackgroundColorProps,
    BorderRadiusProps,
    BorderProps,
    FontSizeProps {
  isFocus?: boolean;
}

export interface BaseMultiSelectSearchBoxProps
  extends BaseMultiSelectSearchContainerProps {
  options?: SelectOptionProps[];
  onChange: (value: SelectOptionProps[]) => void;
}
