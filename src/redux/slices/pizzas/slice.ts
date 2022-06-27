import { IPizzasSliceState, Status } from './types';
import { createSlice } from '@reduxjs/toolkit';
import { getPizzas, getPizzaById } from './thunk';

const initialState: IPizzasSliceState = {
  items: [],
  loadingStatus: Status.IDLE,
  itemsById: null,
};

const pizzasSlice = createSlice({
  name: 'pizzasSlice',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    getPizza: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPizzas.pending, (state) => {
        state.items = [];
        handlePendingStatus(state);
      })
      .addCase(getPizzas.fulfilled, (state, action) => {
        hadleFulfilledStatus(state);
        state.items = action.payload;
      })
      .addCase(getPizzas.rejected, (state, action) => {
        handleRejectedStatus(state);
        state.items = [];
      })
      .addCase(getPizzaById.pending, (state) => {
        state.itemsById = null;
        handlePendingStatus(state);
      })
      .addCase(getPizzaById.fulfilled, (state, action) => {
        hadleFulfilledStatus(state);
        state.itemsById = action.payload;
      })
      .addCase(getPizzaById.rejected, (state) => {
        handleRejectedStatus(state);
        state.itemsById = null;
      });
  },
});

const handlePendingStatus = (state: IPizzasSliceState) => {
  state.loadingStatus = Status.LOADING;
};

const hadleFulfilledStatus = (state: IPizzasSliceState) => {
  state.loadingStatus = Status.IDLE;
};

const handleRejectedStatus = (state: IPizzasSliceState) => {
  state.loadingStatus = Status.ERROR;
};

const { reducer, actions } = pizzasSlice;

export default reducer;

export const { setItems } = actions;
