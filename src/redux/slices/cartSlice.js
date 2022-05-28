import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalPrice: 0,
    totalCount: 0
}

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        addPizzaToCart: (state, action) => {
            if (state.items.length) {
                const found = state.items.find(
                    (element) => element.title === action.payload.title && element.sizes === action.payload.sizes && element.types === action.payload.types
                );
                found ? found.count += 1 : state.items.push(action.payload)
            } else {
                state.items.push(action.payload)
            }
            state.totalPrice += action.payload.price
            state.totalCount += 1
        },
        removePizzaFromCart: (state, action) => {
            state.items.forEach((element, index) => {
                if (element.id === action.payload) {
                    state.items.splice(index, 1)
                    state.totalPrice -= (element.price * element.count);
                    state.totalCount -= (element.count)
                }
            })
        },
        removeAllPizzaFromCart: (state) => {
            state.items = [];
            state.totalPrice = 0;
            state.totalCount = 0;
        },
        incrementPizzaCount: (state, action) => {
            const findItem = state.items.find((element) => element.id === action.payload)
            if (findItem) {
                findItem.count++
            }
            state.totalPrice += findItem.price;
            state.totalCount += 1;
        },
        decrementPizzaCount: (state, action) => {
            const findItem = state.items.find((element) => element.id === action.payload)
            if (findItem) {
                findItem.count--
            }
            state.totalPrice -= findItem.price;
            state.totalCount -= 1;
        }
    }
})


const {
    actions,
    reducer
} = cartSlice;

export default reducer;

export const {
    addPizzaToCart,
    removePizzaFromCart,
    removeAllPizzaFromCart,
    incrementPizzaCount,
    decrementPizzaCount
} = actions;