import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ShoppingCartState {
    loading: boolean;
    error: string | null;
    items: any[];
}

const initialState: ShoppingCartState = {
    loading: true,
    error: null,
    items: []
}

export const getShoppingCart = createAsyncThunk(
    "shoppingCart/getShoppingCart",
    async (jwt: string, thunkAPI) => {
        const { data } = await axios.get(`http://123.56.149.216:8080/api/shoppingCart`,
            {
                headers: {
                    Authorization: `bearer ${jwt}`,
                },
            }
        );
        return data.shoppingCartItems;
    }
);

export const addShoppingCartItem = createAsyncThunk(
    "shoppingCart/addShoppingCartItem",
    async (parameters: { jwt: string, tourId: String }, thunkAPI) => {
        const { data } = await axios.post(`http://123.56.149.216:8080/api/shoppingCart/items`,
            {
                touristRouteId: parameters.tourId
            },
            {
                headers: {
                    Authorization: `bearer ${parameters.jwt}`,
                },
            }
        );
        return data.shoppingCartItems;
    }
);


export const deleteShoppingCartItems = createAsyncThunk(
    "shoppingCart/deleteShoppingCartItems",
    async (parameters: { jwt: string, itemIds: number[] }, thunkAPI) => {
        return await axios.delete(`http://123.56.149.216:8080/api/shoppingCart/items/(${parameters.itemIds.join(',')})`,
            {
                headers: {
                    Authorization: `bearer ${parameters.jwt}`,
                },
            }
        );
    }
);

export const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {},
    extraReducers: {
        // get shopping cart items
        [getShoppingCart.pending.type]: (state) => {
            state.loading = true;
        },
        [getShoppingCart.fulfilled.type]: (state, action) => {
            state.items = action.payload;
            state.error = null;
            state.loading = false;
        },
        [getShoppingCart.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.loading = false;
        },
        // add shopping cart item
        [addShoppingCartItem.pending.type]: (state) => {
            state.loading = true;
        },
        [addShoppingCartItem.fulfilled.type]: (state, action) => {
            state.items = action.payload;
            state.error = null;
            state.loading = false;
        },
        [addShoppingCartItem.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.loading = false;
        },
        // delete shopping cart items
        [deleteShoppingCartItems.pending.type]: (state) => {
            state.loading = true;
        },
        [deleteShoppingCartItems.fulfilled.type]: (state) => {
            state.items = [];
            state.error = null;
            state.loading = false;
        },
        [deleteShoppingCartItems.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.loading = false;
        },
    }
})