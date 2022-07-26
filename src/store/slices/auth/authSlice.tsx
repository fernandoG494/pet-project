import { createSlice } from "@reduxjs/toolkit";

const initialValue: any = () => {
    const token = localStorage.getItem('token');
    if(token){
        return {
            token: token
        };
    };

    return {
        token: ''
    };
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialValue,
    reducers: {
        login: (state, action) => {
            console.log("Action => ", action.payload.user.token);
            state.token = action.payload.user.token;
        },
        logout: (state, action) => {
            state.token = '';
        },
    },
});

export const { login, logout } = authSlice.actions;
