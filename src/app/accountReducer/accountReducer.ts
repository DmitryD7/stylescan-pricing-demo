import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "../../api/api";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../utils/errorUtils";
import {appActions} from "../applicationCommonActions";

const {setAppStatus} = appActions;

const debug = createAsyncThunk('auth/debug', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await authAPI.debug();
        if (res.data.account) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            return res.data.account.email;
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    } catch (error: unknown | any) {
        return handleAsyncServerNetworkError(error, thunkAPI);
    }
})

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        email: '',
        currentPlan: 'entry',
    },
    reducers: {
        setCurrentPlan: (state, action: PayloadAction<{ currentPlan: string }>) => {
            state.currentPlan = action.payload.currentPlan;
        }
    },
    extraReducers: builder => {
        builder.addCase(debug.fulfilled, (state, action) => {
            state.email = action.payload;
        });
    },
});

export const accountAsync = {debug};
