import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getPizzaById } from '../../redux/slices/pizzas/thunk';
import { RootState, useAppDispatch } from '../../redux/store';
import style from './fullPizza.module.scss';
import FullPizzaSkeleton from './FullPizzaSkeleton';

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { itemsById, loadingStatus } = useSelector((state: RootState) => state.pizzasSlice);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getPizzaById(Number(id)));
    }
  }, [dispatch, id]);

  if (loadingStatus === 'error') {
    alert('Ошибка загрузки');
    navigate('/');
  }

  return (
    <div className="container">
      {itemsById ? (
        <div className={style.pizzaWrapper}>
          <div className={style.pizzaLeftBlock}>
            <h2>{itemsById.title}</h2>
            <img src={itemsById.imageUrl} alt="pizzaImage" />
          </div>
          <div className={style.pizzaRightBlock}>
            <div className={style.pizzaPrice}>
              <h2>Цена:</h2>
              <h3>{itemsById.price} Р</h3>
            </div>
            <div className="pizzaDescription">
              <h2>Описание:</h2>
              <p>Вкуснейшая пицца</p>
            </div>
          </div>
        </div>
      ) : (
        <FullPizzaSkeleton />
      )}
    </div>
  );
};

export default FullPizza;
