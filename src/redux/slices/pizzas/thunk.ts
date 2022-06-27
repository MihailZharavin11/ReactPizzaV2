import { createAsyncThunk } from '@reduxjs/toolkit';
import { TPizzaItem, SearchPizzaParams } from './types';
import axios from 'axios';

export const getPizzas = createAsyncThunk<TPizzaItem[], SearchPizzaParams>(
  'pizzasSlice/getPizzas',
  async (params) => {
    const { category, sort, order, currentPage, sortBy } = params;
    debugger;

    const { data } = await axios.get<TPizzaItem[]>(
      `https://628a8158e5e5a9ad322547c8.mockapi.io/items?search=${sortBy}&page=${currentPage}&limit=${3}&${category}&sortBy=${sort}&order=${order}`,
    );
    return data;
  },
);

export const getPizzaById = createAsyncThunk<TPizzaItem, number>(
  'pizzasSlice/getPizzaById',
  async (id) => {
    const { data } = await axios.get(`https://628a8158e5e5a9ad322547c8.mockapi.io/items/${id}`);
    return data;
  },
);
