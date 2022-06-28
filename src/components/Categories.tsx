import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filter/slice';
import { RootState } from '../redux/store';

export const Categories: React.FC = () => {
  const dispatch = useDispatch();
  const { categoryId } = useSelector((state: RootState) => state.filterSlice);
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const onClickCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((element, index) => {
          return (
            <li
              key={element}
              onClick={() => {
                onClickCategory(index);
              }}
              className={categoryId === index ? 'active' : ''}>
              {element}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
