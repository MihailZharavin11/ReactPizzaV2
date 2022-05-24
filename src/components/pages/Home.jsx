import React, { useState, useEffect } from 'react';
import Categories from '../Categories';
import Sort from '../Sort';
import Skeleton from '../PizzaBlock/Skeleton';
import PizzaBlock from '../PizzaBlock/PizzaBlock';
import axios from 'axios';
import Pagination from '../Pagination/Pagination';

const Home = () => {
  const [itemsPizza, setItemsPizza] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://628a8158e5e5a9ad322547c8.mockapi.io/items?page=${currentPage}&limit=${3}`)
      .then((response) => {
        const { data } = response;
        setItemsPizza(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : itemsPizza.map((element) => {
              return <PizzaBlock key={element.id} {...element} />;
            })}
      </div>
      <Pagination onChange={setCurrentPage} />
    </div>
  );
};

export default Home;
