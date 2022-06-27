import { ICartSliceState, TCartItem } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ICartSliceState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addPizzaToCart: (state, action: PayloadAction<TCartItem>) => {
      if (state.items.length) {
        const found = state.items.find(
          (element) =>
            element.title === action.payload.title &&
            element.sizes === action.payload.sizes &&
            element.types === action.payload.types,
        );
        found ? (found.count += 1) : state.items.push(action.payload);
      } else {
        state.items.push(action.payload);
      }
      setTotalCount(state);
      setTotalPrice(state);
    },
    removePizzaFromCart: (state, action: PayloadAction<string>) => {
      state.items.forEach((element, index) => {
        if (element.id === action.payload) {
          state.items.splice(index, 1);
        }
      });
      setTotalPrice(state);
      setTotalCount(state);
    },
    removeAllPizzaFromCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
    incrementPizzaCount: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((element) => element.id === action.payload);
      if (findItem) {
        findItem.count++;
        setTotalPrice(state);
        setTotalCount(state);
      }
    },
    decrementPizzaCount: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((element) => element.id === action.payload);
      if (findItem) {
        findItem.count--;
        setTotalPrice(state);
        setTotalCount(state);
      }
    },
  },
});

const setTotalCount = (state: ICartSliceState) => {
  state.totalCount = state.items.reduce((sum, element) => {
    sum += element.count;
    return sum;
  }, 0);
};

const setTotalPrice = (state: ICartSliceState) => {
  state.totalPrice = state.items.reduce((sum, element) => {
    sum += element.price * element.count;
    return sum;
  }, 0);
};

const { actions, reducer } = cartSlice;

export default reducer;

export const {
  addPizzaToCart,
  removePizzaFromCart,
  removeAllPizzaFromCart,
  incrementPizzaCount,
  decrementPizzaCount,
} = actions;
