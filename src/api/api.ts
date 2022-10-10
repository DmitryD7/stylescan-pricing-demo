import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://stylescan.com/account/',
});

export const authAPI = {
    me() {
        return instance.get('');
    },
    signUp(data: SignupDataType) {
        return instance.post('signup', data);
    },
    login(data: LoginDataType) {
        return instance.post('login', data);
    },
    logout() {
        return instance.get('logout');
    },
    deleteAcc() {
        return instance.get('delete');
    },
    changePassword(data: ResetPasswordDataType) {
        return instance.post('reset_password', data);
    },
    requestResetPassword(data: RequestResetPasswordType) {
        return instance.post('reset_request', data);
    },
    refreshCookie() {
        return instance.get('refresh');
    },
};

export type LoginDataType = {
    email: string,
    password: string,
}

type SignupDataType = LoginDataType & { redirect?: string }

type RequestResetPasswordType = {
    email: string,
    redirect?: string,
}

type ResetPasswordDataType = {
    code: string,
    password: string,
}