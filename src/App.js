import './App.css';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
// import itemsPizza from './assets/pizzas.json';
import './scss/app.scss';
import PizzaBlock from './components/PizzaBlock/PizzaBlock';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Skeleton from './components/PizzaBlock/Skeleton';

function App() {
  const [itemsPizza, setItemsPizza] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

 
  useEffect(() => {
    axios.get('https://628a8158e5e5a9ad322547c8.mockapi.io/items').then((response) => {
      const { data } = response;
      setItemsPizza(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
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
        </div>
      </div>
    </div>
  );
}

export default App;
