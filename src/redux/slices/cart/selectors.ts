import { RootState } from '../../store';

export const selectCart = (state: RootState) => state.cartSlice;

export const countPizza = (title: string) => (state: RootState) => {
  const { items } = state.cartSlice;
  if (items.length > 0) {
    let totalSum = items.reduce((sum, elem) => {
      return elem.title === title ? sum + elem.count : sum + 0;
    }, 0);
    return totalSum;
  } else {
    return 0;
  }
};
