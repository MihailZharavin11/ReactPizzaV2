import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSort } from '../redux/slices/filter/slice';
import { SortPropety } from '../redux/slices/filter/types';
import { selectSort } from '../redux/slices/filter/selectors';

type SortItem = {
  name: string;
  sortProperty: SortPropety;
};

export const listSort: SortItem[] = [
  { name: 'Популярности (DESC)', sortProperty: SortPropety.RATING_DESC },
  { name: 'Популярности (ASC)', sortProperty: SortPropety.RATING_ASC },
  { name: 'Цене (DESC)', sortProperty: SortPropety.PRICE_DESC },
  { name: 'Цене (ASC)', sortProperty: SortPropety.PRICE_ASC },
  { name: 'Алфавиту (DESC)', sortProperty: SortPropety.TITLE_DESC },
  { name: 'Алфавиту (ASC)', sortProperty: SortPropety.TITLE_ASC },
];

const Sort = () => {
  const dispatch = useDispatch();
  const { name } = useSelector(selectSort);
  const [showSort, setShowSort] = useState(false);
  const [activeModal, setActiveModal] = useState(0);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hadleClickOutside = (e: MouseEvent) => {
      const _event = e as MouseEvent & {
        path: Node[];
      };
      if (sortRef.current && !_event.path.includes(sortRef.current) && showSort) {
        setShowSort(!showSort);
      }
    };
    document.body.addEventListener('click', hadleClickOutside);
    return () => document.body.removeEventListener('click', hadleClickOutside);
  }, [showSort]);

  const onSelectedSort = (index: number) => {
    dispatch(setSort(listSort[index]));
    setActiveModal(index);
    setShowSort(false);
  };

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span
          onClick={() => {
            setShowSort(!showSort);
          }}>
          {name}
        </span>
      </div>
      {showSort && (
        <div className="sort__popup">
          <ul>
            {listSort.map((element, index) => {
              return (
                <li
                  key={element.name}
                  onClick={() => {
                    onSelectedSort(index);
                  }}
                  className={index === activeModal ? 'active' : ''}>
                  {element.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
