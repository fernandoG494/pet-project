import { createSlice } from "@reduxjs/toolkit";

const initialValue: any = () => {
    const token = localStorage.getItem('token');
    if(token){
        return {
            token: token
        };
    };

    return {
        token: '',
    };
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialValue,
    reducers: {
        login: (state: any, action: any) => {
            state.token = action.payload.user.token;
        },
        logout: (state: any, action: any) => {
            state.token = '';
        },
    },
});

export const { login, logout } = authSlice.actions;
