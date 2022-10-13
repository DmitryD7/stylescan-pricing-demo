import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RequestStatusType} from "../types";
import {authActions} from "../authReducer";
import {appActions} from "../applicationCommonActions";
import {authAPI} from "../../api/api";

const {setIsLoggedIn} = authActions;
const {setAppStatus, setAppError} = appActions;

const initializeApp = createAsyncThunk('app/initializeApp', async (params, {dispatch}) => {
    const res = await authAPI.refresh();
    if (res.data.resultCode === 0) {
        dispatch(setIsLoggedIn({value: true}));
    } else {
        dispatch(setIsLoggedIn({value: false}))
    }
    console.log(res)
});

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle' as RequestStatusType,
        error: null as string | null,
        isInitialized: false,
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(initializeApp.fulfilled, state => {
            state.isInitialized = true;
        });
        builder.addCase(setAppStatus, (state, action) => {
            state.status = action.payload.status;
        });
        builder.addCase(setAppError, (state, action) => {
            state.error = action.payload.error;
        });
    },
});

export const asyncAppActions = {initializeApp};