import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";

export const FETCH_RECOMMEND_PRODUCTS_START = "fetch_recommend_products_start";
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS = "fetch_recommend_products_success";
export const FETCH_RECOMMEND_PRODUCTS_FAIL = "fetch_recommend_products_fail";

interface FetchRecommendProductsStartAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_START,
}

interface FetchRecommendProductsSuccessAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    payload: any,
}

interface FetchRecommendProductsFailAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL,
    payload: any,
}

export type RecommendProductsAction =
    FetchRecommendProductsStartAction |
    FetchRecommendProductsSuccessAction |
    FetchRecommendProductsFailAction;

export const fetchRecommendProductsStartActionCreator = (): FetchRecommendProductsStartAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_START,
    };
};

export const fetchRecommendProductsSuccessActionCreator = (data): FetchRecommendProductsSuccessAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
        payload: data,
    };
};

export const fetchRecommendProductsFailActionCreator = (error): FetchRecommendProductsFailAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_FAIL,
        payload: error,
    };
};

// thunk 可以返回一个函数 不一定是action对象
// 在一个thunk action中可以完成一系列连续的action操作
// 并可以处理异步逻辑
// 以此保证代码的清晰分层
export const fetchrecommendProductsActionCreator = (): ThunkAction<
    void,
    RootState,
    unknown,
    RecommendProductsAction
// dispatch 用于之后再次派发action
// getState 用于获取之前的一些状态
> => async (dispatch, getState) => {
    dispatch(fetchRecommendProductsStartActionCreator);
    try {
        // axios异步网络请求
        const { data } = await axios.get("http://123.56.149.216:8080/api/productCollections");
        // 更新state
        dispatch(fetchRecommendProductsSuccessActionCreator(data));
    } catch (error) {
        if (error instanceof Error) {
            dispatch(fetchRecommendProductsFailActionCreator(error));
        }
    }
};
