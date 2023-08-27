import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (category, thunkAPI) => {
        try {
            let response;

            if (category) {
                response = await axios.get(
                    `https://fakestoreapi.com/products/category/${category}`,
                );
            } else {
                response = await axios.get("https://fakestoreapi.com/products");
            }

            console.log("@@@", response);
            return response.data; //payload;
        } catch (error) {
            thunkAPI.rejectWithValue("error loading products");
        }
    },
);
const initialState = {
    products: [],
    isLoading: false,
    error: "",
};

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    // reducer를 추가하면 프로미스의 진행 상태에 따라서 리듀서를 실행할 수 있다.(상태에 따라 실행되는 리듀서가 다름)
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default productsSlice.reducer;
