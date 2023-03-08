import {FC, memo} from 'react';
import ReactSelect from 'react-select';

import {SelectContainer} from './style';

const Select: FC<any> = memo(
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
      <SelectContainer {...props}>
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
