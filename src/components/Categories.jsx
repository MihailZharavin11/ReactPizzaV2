import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

const Categories = () => {
  const dispatch = useDispatch();
  const { categoryId } = useSelector((state) => state.filterSlice);
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const onClickCategory = (id) => {
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

export default Categories;
