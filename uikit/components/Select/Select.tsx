import {FC, memo} from 'react';
import ReactSelect from 'react-select';

import {SelectContainer} from './style';
import {SelectProps} from './types';

const Select: FC<SelectProps> = memo(
  ({
    options,
    placeholder,
    onChange = () => {},
    defaultValue = null,
    ...props
  }) => {
    const handleChange = (value: any) => {
      value && onChange(value);
    };
    return (
      <SelectContainer {...(props as any)}>
        <ReactSelect
          defaultValue={defaultValue}
          options={options}
          placeholder={placeholder}
          onChange={handleChange}
        />
      </SelectContainer>
    );
  }
);

Select.defaultProps = {
  options: [],
};

Select.displayName = 'Select';
export default Select;
