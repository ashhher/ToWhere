import { Middleware } from "redux";

export const stateLog: Middleware = (store) => (next) => (action) => {
    console.log("old state", store.getState());
    console.log("fire action", action);
    next(action);
    console.log("current state", store.getState());
};