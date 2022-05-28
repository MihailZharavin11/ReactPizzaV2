import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPizzaToCart } from '../../redux/slices/cartSlice';
import { v4 as uuidv4 } from 'uuid';

const PizzaBlock = ({ id, title, price, imageUrl, types, sizes }) => {
  const typesName = ['тонкое', 'традиционное'];
  const [count, setCount] = useState(0);
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const [selectSize, setSelectSize] = useState(sizes[0]);
  const dispatch = useDispatch();
  const pizzasInCart = useSelector((state) => state.cartSlice.items);

  useEffect(() => {
    if (pizzasInCart.length > 0) {
      let totalSum = pizzasInCart.reduce((sum, elem) => {
        return elem.title === title ? sum + elem.count : sum + 0;
      }, 0);
      setCount(totalSum);
    } else {
      setCount(0);
    }
  }, [pizzasInCart]);

  const onClickAdd = () => {
    setCount(count + 1);
    const newPizza = {
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
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((indexType, index) => {
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
          <i>{count}</i>
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;
