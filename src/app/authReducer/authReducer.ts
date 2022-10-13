import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, LoginParamsType, SignupParamsType,} from "../../api/api";
import {appActions} from "../applicationCommonActions";

const {setAppStatus, setAppError} = appActions

const login = createAsyncThunk('auth/login', async (params: LoginParamsType, {dispatch}) => {
    try {
        dispatch(setAppStatus({status: 'loading'}));
        const res = await authAPI.login(params);
        if (res.data.ok === 1) {
            dispatch(setAppStatus({status: 'succeeded'}));
            return res.data.ok;
        } else {
            dispatch(setAppStatus({status: 'failed'}));
            dispatch(setAppError({error: res.data.error}));
            return {error: res.data.error}
        }
    } catch (error) {
        dispatch(setAppStatus({status: 'failed'}));
        dispatch(setAppError({error: 'error'}));
        console.error(error)
    }
})

const logout = createAsyncThunk('auth/logout', async (param, {dispatch}) => {
    try {
        setAppStatus({status: 'loading'});
        const res = await authAPI.logout();
        if (res.data.ok === 1) {
            dispatch(setAppStatus({status: 'succeeded'}));
            return res.data.ok;
        } else {
            dispatch(setAppStatus({status: 'failed'}));
            dispatch(setAppError({error: res.data.error}));
            return {error: res.data.error};
        }
    } catch (error) {
        dispatch(setAppStatus({status: 'failed'}));
        dispatch(setAppError({error: 'error'}));
        console.error(error);
    }
})

const signup = createAsyncThunk('auth/signup', async (params: SignupParamsType, {dispatch}) => {
    try {
        setAppStatus({status: 'loading'});
        const res = await authAPI.signUp(params);
        if (res.data.ok === 1) {
            dispatch(setAppStatus({status: 'succeeded'}));
            return res.data.ok;
        } else {
            dispatch(setAppStatus({status: 'failed'}));
            dispatch(setAppError({error: res.data.error}));
            return {error: res.data.error};
        }
    } catch (error) {
        dispatch(setAppStatus({status: 'failed'}));
        dispatch(setAppError({error: 'error'}));
        console.error(error);
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