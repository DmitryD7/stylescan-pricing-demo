import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://stylescan.com/account/',
    withCredentials: true,
});

export const authAPI = {
    signUp(data: SignupParamsType) {
        return instance.post<SignupResponseType>('signup', data);
    },
    login(data: LoginParamsType) {
        return instance.post<LoginResponseType>('login', data);
    },
    logout() {
        return instance.get('logout');
    },
    deleteAcc() {
        return instance.get('delete');
    },
    changePassword(data: ChangePasswordDataType) {
        return instance.post('reset-password', data);
    },
    requestPasswordReset(data: RequestPasswordResetType) {
        return instance.post('reset-request', data);
    },
    refresh() {
        return instance.post<LoginResponseType>('refresh');
    },
    debug() {
        return instance.get('debug.json');
    },
};

export type LoginParamsType = {
    email: string,
    password: string,
}
export type LoginResponseType = {
    email: string,		// account identifier
    payment: boolean,		// does user have a stripe account
    admin?: boolean,		// is user an administrator
    error?: string
}

export type SignupParamsType = LoginParamsType & { redirect?: string }
export type SignupResponseType = {
    email: string
}

export type RequestPasswordResetType = {
    email: string,
    redirect?: string,
}

export type ChangePasswordDataType = {
    code: string,
    password: string,
}