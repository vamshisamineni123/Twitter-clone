import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginState {
    email: string;
    password: string;
    isAuthenticated: boolean;
}

const initialState: LoginState = {
    email: '',
    password: '',
    isAuthenticated: false,
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{email: string, password: string}>) => {
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.email = '';
            state.password = '';
            state.isAuthenticated = false;
        },
    },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;