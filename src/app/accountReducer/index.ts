import {AppRootStateType} from "../types";
import {accountSlice} from "./accountReducer";

const selectAccEmail = (state: AppRootStateType) => state.account.email;

const accountReducer = accountSlice.reducer;

export {
    accountReducer,
    selectAccEmail
}