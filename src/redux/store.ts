import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filter/slice';
import cartSlice from './slices/cart/slice';
import pizzasSlice from './slices/pizzas/slice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    pizzasSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
