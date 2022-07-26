import { createSlice } from "@reduxjs/toolkit";

interface IUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
    role: string;
    favorites: string[];
}

// const initialValue = {
//     isLogged: false,
//     token: '',
//     user: {
//         id: '',
//         email: '',
//         firstName: '',
//         lastName: '',
//         avatar: '',
//         role: '',
//         favorites: []
//     },
// };

interface IAuthState {
    isLogged: boolean;
    token: string;
    user: IUser;
};

const initialValue: any = () => {
    const user = localStorage.getItem('data');
    if(user){
        return {
            isLogged: true,
            user: JSON.parse(user)
        }
    }
    return {
        isLogged: false,
        user: {
            id: '',
            email: '',
            firstName: '',
            lastName: '',
            avatar: '',
            role: '',
            favorites: []
        }
    };
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialValue,
    reducers: {
        login: (state: IAuthState, action: any) => {
            state.isLogged = true;
            state.token = action.payload.user.token;
            state.user = {
                id: action.payload.user.id,
                email: action.payload.user.email,
                firstName: action.payload.user.firstName,
                lastName: action.payload.user.lastName,
                avatar: action.payload.user.avatar,
                role: action.payload.user.role,
                favorites: action.payload.favorites
            };
        },
        logout: (state: IAuthState, action: any) => {
            state.isLogged = false;
            state.token = '';
            state.user = {
                id: '',
                email: '',
                firstName: '',
                lastName: '',
                avatar: '',
                role: '',
                favorites: []
            };
        },
    },
});

export const { login, logout } = authSlice.actions;
