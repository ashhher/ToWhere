import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
    loading: boolean;
    error: string | null;
    token: string | null;
}

const initialState: UserState = {
    loading: false,
    error: null,
    token: null,
}

export const signIn = createAsyncThunk(
    "user/signIn",
    async (parameters: {
        email: string,
        password: string
    }, thunkAPI) => {
        const { data } = await axios.post(`http://123.56.149.216:8080/auth/login`, {
            email: parameters.email,
            password: parameters.password
        });
        console.log("================");

        console.log(data);

        return data.token;
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signOut: (state) => {
            state.token = null;
            state.error = null;
            state.loading = false;
        }
    },
    extraReducers: {
        [signIn.pending.type]: (state) => {
            state.loading = true;
        },
        [signIn.fulfilled.type]: (state, action) => {
            state.token = action.payload;
            state.error = null;
            state.loading = false;
        },
        [signIn.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
})