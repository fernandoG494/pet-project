import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    isLogged: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialValue,
    reducers: {
        login: (state, action) => {
            state.isLogged = true;
        },
        logout: (state, action) => {
            state.isLogged = false;
        },
    },
});

export const { login, logout } = authSlice.actions;
