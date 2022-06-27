import { IFilterSliceState, SortPropety, TSortObj } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IFilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: SortPropety.RATING_DESC,
  },
};

export const filterSlice = createSlice({
  name: 'filterSlice',
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setSort: (state, action: PayloadAction<TSortObj>) => {
      state.sort = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilres: (state, action: PayloadAction<IFilterSliceState>) => {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage);
        state.sort = action.payload.sort;
        state.categoryId = action.payload.categoryId;
      } else {
        state.currentPage = 1;
        state.categoryId = 0;
        state.sort = {
          name: 'популярности',
          sortProperty: SortPropety.RATING_DESC,
        };
      }
    },
  },
});

const { actions, reducer } = filterSlice;

export default reducer;

export const { setCategoryId, setSort, setCurrentPage, setFilres, setSearchValue } = actions;
