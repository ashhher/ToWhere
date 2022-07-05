import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import languageReducer from "./language/languageReducer";
import { stateLog } from "./middlewares/stateLog";
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";
import { productDetailSlice } from "./productDetail/productDetailSlice";
import { productSearchSlice } from "./productSearch/productSearchSlice";
import { userSlice } from "./user/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user"]
}

const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer,
    productDetail: productDetailSlice.reducer,
    productSearch: productSearchSlice.reducer,
    user: userSlice.reducer,
});

// 储存持久化登录信息
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 原生createStore 
// const store = createStore(rootReducer, applyMiddleware(thunk));

// 与原生原生createStore功能类似 但支持createAsyncThunk
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), stateLog],
    devTools: true,
});

// 持久化store
const persistor = persistStore(store);

// typescript 类型约束
export type RootState = ReturnType<typeof store.getState>;

export default { store, persistor };