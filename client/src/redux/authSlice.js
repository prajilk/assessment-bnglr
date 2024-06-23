import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token"); // Get auth token from storage

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: token ? true : false // Set auth status as default 
    },
    reducers: {
        setAuth(_, action) {
            return { user: action.payload };
        },
    },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
