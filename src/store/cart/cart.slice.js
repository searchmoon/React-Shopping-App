import { createSlice } from "@reduxjs/toolkit";

const cartProducts = localStorage.getItem("cartProducts");
const userId = localStorage.getItem("userId");

const initialState = {
    products: cartProducts ? JSON.parse(cartProducts || "") : [],
    totalPrice: 0,
    userId: userId ? JSON.parse(userId || "") : "",
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;

            localStorage.setItem("userId", JSON.stringify(state.userId));
        },
        removeUserId: (state) => {
            state.userId = "";

            localStorage.setItem("userId", JSON.stringify(state.userId));
        },
        addToCart: (state, action) => {
            state.products.push({
                ...action.payload,
                quantity: 1,
                total: action.payload.price,
            });

            localStorage.setItem(
                "cartProducts",
                JSON.stringify(state.products),
            );
        },
        deleteFromCart: (state, action) => {
            state.products = state.products.filter(
                (item) => item.id !== action.payload,
            );

            localStorage.setItem(
                "cartProducts",
                JSON.stringify(state.products),
            );
        },
        incrementProduct: (state, action) => {
            state.products = state.products.map((item) =>
                item.id === action.payload
                    ? {
                          ...item,
                          quantity: item.quantity + 1,
                          total: item.price * (item.quantity + 1),
                      }
                    : item,
            );
            console.log(state.products);
            localStorage.setItem(
                "cartProducts",
                JSON.stringify(state.products),
            );
        },

        decrementProduct: (state, action) => {
            state.products = state.products.map((item) =>
                item.id === action.payload
                    ? {
                          ...item,
                          quantity: item.quantity - 1,
                          total: item.price * (item.quantity - 1),
                      }
                    : item,
            );
            localStorage.setItem(
                "cartProducts",
                JSON.stringify(state.products),
            );
        },
        getTotalPrice: (state) => {
            state.totalPrice = state.products.reduce(
                (acc, item) => (acc += item.total),
                0,
            );
        },
    },
});

export const {
    addToCart,
    deleteFromCart,
    incrementProduct,
    decrementProduct,
    getTotalPrice,
    setUserId,
    removeUserId,
} = cartSlice.actions;

export default cartSlice.reducer;
