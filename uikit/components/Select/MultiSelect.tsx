import {FC, memo, useState} from 'react';
import ReactSelect from 'react-select';

import {SelectContainer} from './style';
import {SelectOptionProps} from './types';

const MultiSelect: FC<any> = memo(
  ({options, onAddOption, onSearch, onChange, ...props}) => {
    const [selectedOption, setSelectedOption] = useState<SelectOptionProps[]>(
      []
    );
    const [inputValue, setInputValue] = useState<string>('');
    const handleChange = (value: any) => {
      setSelectedOption(value);
      onChange(value);
    };

    const handleInputChange = (value: string) => {
      setInputValue(value);
      onSearch && onSearch(value);
    };

    const handleKeyDown = (e: any) => {
      // 回车
      if (e.key === 'Enter' && e.keyCode === 13) {
        let flag = false;
        options?.forEach((item: any) => {
          if (item.label === inputValue) {
            flag = true;
          }
        });
        if (!options?.length && inputValue && !flag) {
          onAddOption && onAddOption(inputValue);
          setInputValue('');
          e.preventDefault();
        }
      }
    };

    return (
      <SelectContainer isMulti>
        <ReactSelect
          {...props}
          isMulti
          defaultValue={selectedOption}
          inputValue={inputValue}
          options={Array.from(new Set(options))}
          onChange={handleChange}
          onInputChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </SelectContainer>
    );
  }
);

MultiSelect.defaultProps = {
  options: [],
};
MultiSelect.displayName = 'MultiSelect';
export default MultiSelect;
