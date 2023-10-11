import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import numberReducer from "./numberSlice";

export const store = configureStore({
    reducer : {
        modal : modalReducer,
        number : numberReducer,
    }
})