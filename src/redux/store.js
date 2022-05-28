import {
    configureStore,
    getDefaultMiddleware
} from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice';
import cartSlice from './slices/cartSlice';
import pizzasSlice from './slices/pizzasSlice';

export const store = configureStore({
    reducer: {
        filterSlice,
        cartSlice,
        pizzasSlice
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware()
})