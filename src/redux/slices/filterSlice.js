import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortProperty: 'rating'
    }
}

export const filterSlice = createSlice({
    name: 'filterSlice',
    initialState,
    reducers: {
        setCategoryId: (state, action) => {
            state.categoryId = action.payload;
        },
        setSort: (state, action) => {
            state.sort = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setFilres: (state, action) => {
            if (Object.keys(action.payload).length) {
                state.currentPage = Number(action.payload.currentPage);
                state.sort = action.payload.sort;
                state.categoryId = action.payload.categoryId
            } else {
                state.currentPage = 1
                state.categoryId = 0;
                state.sort = {
                    name: 'популярности',
                    sortProperty: 'rating'
                }
            }
        }
    }
})


const {
    actions,
    reducer
} = filterSlice;

export default reducer;

export const {
    setCategoryId,
    setSort,
    setCurrentPage,
    setFilres
} = actions;