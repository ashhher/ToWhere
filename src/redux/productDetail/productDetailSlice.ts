import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductDetailState {
    loading: boolean;
    error: string | null;
    data: any;
}

const initialState: ProductDetailState = {
    loading: true,
    error: null,
    data: null
}

export const getProductDetail = createAsyncThunk(
    "productDetail/getProductDetail",
    async (tourId: string, thunkAPI) => {
        // 【1.1】手动dispatch
        // thunkAPI.dispatch(productDetailSlice.actions.fetchStart());
        // try {
        //     const { data } = await axios.get(`http://123.56.149.216:8080/api/touristRoutes/${tourId}`);
        //     thunkAPI.dispatch(productDetailSlice.actions.fetchSuccess(data));
        // } catch (error) {
        //     if (error instanceof Error) {
        //         thunkAPI.dispatch(productDetailSlice.actions.fetchFail(error.message));
        //     }
        // }

        // 【2.1】返回promise 给自动生成的三个action处理
        const { data } = await axios.get(`http://123.56.149.216:8080/api/touristRoutes/${tourId}`);
        return data;
    }
)

export const productDetailSlice = createSlice({
    // 命名空间
    name: "productDetail",
    // 初始化数据
    initialState,
    // reducer + action 集合体 【1.2】手动处理
    reducers: {
        // fetchStart: (state) => {
        //     // return {...state, loading: true};
        //     // immer框架实现了可直接操作state
        //     // 实际是immer在底层返回了一个新state对象
        //     state.loading = true;
        // },
        // fetchSuccess: (state, action) => {
        //     state.data = action.payload;
        //     state.error = null;
        //     state.loading = false;
        // },
        // // payload默认类型为any 此处也可重新定义payload类型
        // fetchFail: (state, action: PayloadAction<string | null>) => {
        //     state.error = action.payload;
        //     state.loading = false;
        // }
    },
    // 【2.2】自动映射
    extraReducers: {
        [getProductDetail.pending.type]: (state) => {
            state.loading = true;
        },
        [getProductDetail.fulfilled.type]: (state, action) => {
            state.data = action.payload;
            state.error = null;
            state.loading = false;
        },
        [getProductDetail.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
})