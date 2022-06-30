import {FC, memo, useState} from 'react';

import {
  MultiSelectSearchContainer,
  MultiSelectSearchTagContainer,
  MultiSelectSearchInputContainer,
  MultiSelectSearchInputBoxContainer,
  MultiSelectSearchListContainer,
} from './style';
import {BaseMultiSelectSearchBoxProps, SelectOptionProps} from './types';

const MultiSelectAndSearch: FC<BaseMultiSelectSearchBoxProps> = memo(
  ({options, onChange}) => {
    const [selectedList, setSelectedList] = useState<SelectOptionProps[]>([]);
    const [selectedValues, setSelectedValues] = useState<any[]>([]);
    const [isFocus, setIsFocus] = useState<boolean>(false);

    const handleFocusInput = () => {
      setIsFocus(true);
    };
    const handleBlurInput = () => {
      setIsFocus(false);
    };
    const handleSelectedClick = (item: SelectOptionProps) => {
      if (selectedValues.includes(item.value)) {
        const newSelectedList = selectedList.filter(
          (child) => child.value !== item.value
        );
        const newSelectedValues = selectedValues.filter(
          (child) => child !== item.value
        );
        setSelectedList([...newSelectedList]);
        setSelectedValues([...newSelectedValues]);
        onChange([...newSelectedList]);
      } else {
        setSelectedList([...selectedList, item]);
        setSelectedValues([...selectedValues, item.value]);
        onChange([...selectedList, item]);
      }
    };
    return (
      <MultiSelectSearchContainer isFocus={isFocus}>
        <MultiSelectSearchTagContainer>
          {selectedList.map((selected: SelectOptionProps) => {
            return (
              <div className='tag-box' key={selected.value}>
                <div className='tag-title'>{selected.label}</div>
                <div
                  className='tag-operate'
                  onClick={() => {
                    handleSelectedClick(selected);
                  }}
                >
                  <svg
                    aria-hidden='true'
                    color='#fff'
                    focusable='false'
                    height='14'
                    viewBox='0 0 20 20'
                    width='14'
                  >
                    <path d='M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z' />
                  </svg>
                </div>
              </div>
            );
          })}
          <MultiSelectSearchInputBoxContainer>
            <MultiSelectSearchInputContainer
              placeholder='Add label'
              onFocus={handleFocusInput}
            />
          </MultiSelectSearchInputBoxContainer>
        </MultiSelectSearchTagContainer>
        {isFocus ? (
          <MultiSelectSearchListContainer onBlur={handleBlurInput}>
            {options?.map((item: SelectOptionProps) => {
              return (
                <div
                  className={`list-item-box ${
                    selectedValues.includes(item.value)
                      ? 'selected-item-box'
                      : ''
                  }`}
                  key={item.value}
                  onClick={() => {
                    handleSelectedClick(item);
                  }}
                >
                  {item.label}
                </div>
              );
            })}
          </MultiSelectSearchListContainer>
        ) : null}
        {/* <MultiSelectSearchListContainer>
                {
                    options?.map((item: SelectOptionProps) => {
                        return (
                            <div
                                className={`list-item-box ${selectedValues.includes(item.value) ? 'selected-item-box' : ''}`}
                                key={item.value}
                                onClick={() => { handleSelectedClick(item) }}

                            >{item.label}</div>
                        )
                    })
                }
            </MultiSelectSearchListContainer> */}
      </MultiSelectSearchContainer>
    );
  }
);

MultiSelectAndSearch.defaultProps = {
  options: [],
};
MultiSelectAndSearch.displayName = 'MultiSelectAndSearch';
export default MultiSelectAndSearch;
