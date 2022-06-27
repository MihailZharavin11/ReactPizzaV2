import debounce from 'lodash.debounce';
import React, { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filter/slice';
import styles from './search.module.scss';

const Search = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');

  const onClickClear = () => {
    setInputValue('');
    dispatch(setSearchValue(''));
    inputRef.current?.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 1000),
    [inputRef],
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        value={inputValue}
        onChange={(e) => {
          onChangeInput(e);
        }}
        ref={inputRef}
        className={styles.input}
        placeholder="Поиск пиццы"
      />
      <p
        onClick={() => {
          onClickClear();
        }}>
        X
      </p>
    </div>
  );
};

export default Search;
