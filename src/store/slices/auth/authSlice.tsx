import { createSlice } from "@reduxjs/toolkit";

interface IUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
    role: string;
}

const initialValue = {
    isLogged: false,
    token: '',
    user: {
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        avatar: '',
        role: ''
    }
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialValue,
    reducers: {
        login: (state, action) => {
            console.log("PAYLOAD => ", action.payload);
            state.isLogged = true;
            state.token = action.payload.user.token;
            state.user = {
                id: action.payload.user.id,
                email: action.payload.user.email,
                firstName: action.payload.user.firstName,
                lastName: action.payload.user.lastName,
                avatar: action.payload.user.avatar,
                role: action.payload.user.role
            };
        },
        logout: (state, action) => {
            state.isLogged = false;
            state.token = '';
            state.user = {
                id: '',
                email: '',
                firstName: '',
                lastName: '',
                avatar: '',
                role: ''
            };
        },
    },
});

export const { login, logout } = authSlice.actions;
