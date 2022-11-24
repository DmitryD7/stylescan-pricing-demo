import {AppRootStateType} from "../types";
import {authAsyncActions, authSlice} from "./authReducer";

const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn;

const authActions = {
    ...authAsyncActions,
    ...authSlice.actions,
};

const authSelectors = {
    selectIsLoggedIn
};

const authReducer = authSlice.reducer;

export {
    authReducer,
    authSelectors,
    authActions,
};