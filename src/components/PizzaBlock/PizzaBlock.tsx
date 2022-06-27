import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPizzaToCart } from '../../redux/slices/cart/slice';
import { countPizza } from '../../redux/slices/cart/selectors';
import { TCartItem } from '../../redux/slices/cart/types';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

type PizzaBlockProps = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, title, price, imageUrl, types, sizes }) => {
  const typesName: string[] = ['тонкое', 'традиционное'];
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const [selectSize, setSelectSize] = useState(sizes[0]);
  const dispatch = useDispatch();
  const coutPizzaInCart = useSelector(countPizza(title));

  const onClickAdd = () => {
    const newPizza: TCartItem = {
      id: uuidv4(),
      title,
      price,
      imageUrl,
      types: typesName[activeType],
      sizes: selectSize,
      count: 1,
    };

    dispatch(addPizzaToCart(newPizza));
  };

  return (
    <div className="pizza-block">
      <Link to={`pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </Link>
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((indexType: number, index: number) => {
            return (
              <li
                key={index}
                onClick={() => {
                  setActiveType(indexType);
                }}
                className={activeType === index ? 'active' : ''}>
                {typesName[indexType]}
              </li>
            );
          })}
        </ul>
        <ul>
          {sizes.map((size, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  setActiveSize(index);
                  setSelectSize(size);
                }}
                className={activeSize === index ? 'active' : ''}>
                {size} см.
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button onClick={onClickAdd} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          <i>{coutPizzaInCart}</i>
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;