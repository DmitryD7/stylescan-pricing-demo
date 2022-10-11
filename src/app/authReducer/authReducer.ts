import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, LoginParamsType, SignupParamsType,} from "../../api/api";

const login = createAsyncThunk('auth/login', async (params: LoginParamsType) => {
    try {
        await authAPI.login(params);
    } catch (error) {
        console.error(error)
    }
})

const logout = createAsyncThunk('auth/logout', async () => {
    try {
        await authAPI.logout();
    } catch (error) {
        console.error(error)
    }
})

const signup = createAsyncThunk('auth/signup', async (params: SignupParamsType) => {
    try {
        await authAPI.signUp(params);
    } catch (error) {
        console.error(error)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value;
        }
    },
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state) => {
            state.isLoggedIn = true;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.isLoggedIn = false;
        });
    },
});

export const authAsyncActions = {
    login,
    logout,
    signup,
}