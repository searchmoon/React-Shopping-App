import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/user.slice";
import categoriesSlice from "./categories/categories.slice";
import productsSlice from "./products/products.slice";
import cartSlice from "./cart/cart.slice";
import productSlice from "./products/product.slice";
import orderSlice from "./order/order.slice";

export const store = configureStore({
    reducer: {
        orderSlice,
        productSlice,
        userSlice,
        categoriesSlice,
        productsSlice,
        cartSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
//ReturnType: 함수에서 반환하는 타입을 가져올수 있는 타입

export type AppDispatch = typeof store.dispatch;
