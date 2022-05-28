import debounce from 'lodash.debounce';
import React, { useCallback, useRef, useState } from 'react';
import styles from './search.module.scss';

const Search = () => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  const onClickClear = () => {
    setInputValue('');
    inputRef.current.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      console.log(str);
    }, 1000),
    [],
  );

  const onChangeInput = (e) => {
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
      <p onClick={onClickClear}>X</p>
    </div>
  );
};

export default Search;
