import React, { useState, useEffect, useRef, useMemo } from 'react';
import Categories from '../Categories';
import Sort from '../Sort';
import Skeleton from '../PizzaBlock/Skeleton';
import PizzaBlock from '../PizzaBlock/PizzaBlock';
import Pagination from '../Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, setFilres } from '../../redux/slices/filterSlice';
import qs from 'qs';
import { useNavigate, useLocation } from 'react-router-dom';
import { listSort } from '../Sort';
import { getPizzas } from '../../redux/slices/pizzasSlice';
import Error from '../Error/Error';

const Home = () => {
  const { sortProperty } = useSelector((state) => state.filterSlice.sort);
  const { categoryId, currentPage } = useSelector((state) => state.filterSlice);
  const { items, loadingStatus } = useSelector((state) => state.pizzasSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMounted = useRef(false);
  const firstRender = useRef(false);

  const onChangePage = (index) => {
    dispatch(setCurrentPage(index));
  };

  const fetchPizzaz = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sort = `${sortProperty.replace('-', '')}`;
    const order = `${sortProperty.includes('-') ? 'asc' : 'desc'}`;
    await dispatch(
      getPizzas({
        category,
        sort,
        order,
        currentPage,
      }),
    );
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (isMounted.current) {
      const params = {
        categoryId: categoryId > 0 ? categoryId : null,
        sortProperty: sortProperty,
        currentPage,
      };
      const queryString = qs.stringify(params, {
        skipNulls: true,
      });
      navigate(`/?${queryString}`);
    }
  }, [currentPage, sortProperty, categoryId, navigate]);

  useEffect(() => {
    if (isMounted.current) {
      fetchPizzaz();
    }
  }, [currentPage, sortProperty, categoryId]);

  useEffect(() => {
    if (firstRender.current) {
      isMounted.current = true;
      return;
    }
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = listSort.find((element) => element.sortProperty == params.sortProperty);
      if (sort) {
        params.sort = sort;
      }
      dispatch(setFilres(params));
    }
    firstRender.current = true;
  }, []);

  useEffect(() => {
    if (!window.location.search) {
      fetchPizzaz();
    }
  }, []);

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
