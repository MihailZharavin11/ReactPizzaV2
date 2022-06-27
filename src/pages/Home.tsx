import React, { useEffect, useRef, useCallback } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Pagination from '../components/Pagination/Pagination';
import { useSelector } from 'react-redux';
import { setCurrentPage } from '../redux/slices/filter/slice';
import { useNavigate } from 'react-router-dom';
import { getPizzas } from '../redux/slices/pizzas/thunk';

import Error from '../components/Error/Error';
import { RootState, useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const { sortProperty } = useSelector((state: RootState) => state.filterSlice.sort);
  const { categoryId, currentPage, searchValue } = useSelector(
    (state: RootState) => state.filterSlice,
  );
  const { items, loadingStatus } = useSelector((state: RootState) => state.pizzasSlice);
  const dispatch = useAppDispatch();

  const onChangePage = (index: number) => {
    dispatch(setCurrentPage(index));
  };

  const fetchPizzaz = useCallback(() => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sort = `${sortProperty.replace('-', '')}`;
    const order = `${sortProperty.includes('-') ? 'asc' : 'desc'}`;
    const sortBy = searchValue;
    dispatch(
      getPizzas({
        category,
        sort,
        order,
        currentPage,
        sortBy,
      }),
    );
    window.scrollTo(0, 0);
  }, [categoryId, currentPage, dispatch, searchValue, sortProperty]);

  useEffect(() => {
    fetchPizzaz();
  }, [currentPage, sortProperty, categoryId, fetchPizzaz]);

  if (loadingStatus === 'error') {
    return <Error />;
  }

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {loadingStatus === 'loading'
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((element) => {
              return <PizzaBlock key={element.id} {...element} />;
            })}
      </div>
      <Pagination currentPage={currentPage} onChange={onChangePage} />
    </div>
  );
};

export default Home;
