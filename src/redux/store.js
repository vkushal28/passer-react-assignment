import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "./slice/UserSlice";

export const Store = configureStore({
    reducer: {
        userState: UserSlice.reducer,
    },
});
