import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";
import axios from "axios";



export const getPizzas = createAsyncThunk(
    'pizzasSlice/getPizzas',
    async ({
        category,
        sort,
        order,
        currentPage
    }) => {
        const {
            data
        } = await axios.get(
            `https://628a8158e5e5a9ad322547c8.mockapi.io/items?page=${currentPage}&limit=${3}&${category}&sortBy=${sort}&order=${order}`,
        );
        return data
    }
)

const initialState = {
    items: [],
    loadingStatus: 'idle'
}



const handlePendingStatus = (state) => {
    state.loadingStatus = 'loading';
    state.pizzaPageError = null;
    state.items = [];
}

const hadleFulfilledStatus = (state) => {
    state.loadingStatus = 'idle'
}

const handleRejectedStatus = (state, action) => {
    state.loadingStatus = 'error'
    state.items = [];
}





const pizzasSlice = createSlice({
    name: 'pizzasSlice',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPizzas.pending, handlePendingStatus)
            .addCase(getPizzas.fulfilled, (state, action) => {
                hadleFulfilledStatus(state);
                state.items = action.payload
            })
            .addCase(getPizzas.rejected, handleRejectedStatus)
    }

})



const {
    reducer,
    actions
} = pizzasSlice;

export default reducer;

export const {
    setItems
} = actions;