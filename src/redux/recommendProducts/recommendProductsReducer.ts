import {
    FETCH_RECOMMEND_PRODUCTS_START,
    FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    FETCH_RECOMMEND_PRODUCTS_FAIL,
    RecommendProductsAction
} from "./recommendProductsActions";

export interface RecommendProductsState {
    loading: boolean,
    error: string | null,
    productList: any[],
}

const defaultState: RecommendProductsState = {
    loading: true,
    error: null,
    productList: [],
};

export default (state = defaultState, action: RecommendProductsAction) => {
    switch (action.type) {
        case FETCH_RECOMMEND_PRODUCTS_START:
            return { ...state, loading: true };
        case FETCH_RECOMMEND_PRODUCTS_SUCCESS:
            return { ...state, loading: false, productList: action.payload };
        case FETCH_RECOMMEND_PRODUCTS_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
};