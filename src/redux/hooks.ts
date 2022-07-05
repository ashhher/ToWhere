import { useSelector as useReduxSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "./store";

// 包装useSelector 使组件与store解耦
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;