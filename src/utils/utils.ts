import {useDispatch} from "react-redux";
import {AppDispatchType} from "../app/types";

export const emailValidate = (email: string) => {
    let emailErrors = '';

    if (!email) {
        emailErrors = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        emailErrors = 'Invalid email address';
    }

    return emailErrors;
}

export const passwordValidate = (password: string) => {
    let passwordError = '';

    if (!password) {
        passwordError = 'Required'
    } else if (password.length < 3) {
        passwordError = 'Too short password'
    }

    return passwordError;
}

export const passwordConfirmValidate = (password: string, passwConfirm: string) => {
    let passwordError = '';

    if (!password) {
        passwordError = 'Required'
    } else if (password.length < 3) {
        passwordError = 'Too short password'
    } else if (password !== passwConfirm) {
        passwordError = 'Passwords must be equal'
    }

    return passwordError;
}


// export const validate = (values: LoginParamsType) => {
//     const errors: FormErrorType = {};
//
//     if (!values.email) {
//         errors.email = 'Required';
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//         errors.email = 'Invalid email address';
//     }
//
//     if (!values.password) {
//         errors.password = 'Required'
//     } else if (values.password.length < 3) {
//         errors.password = 'Too short password'
//     }
//
//     return errors;
// };


export const useAppDispatch = () => useDispatch<AppDispatchType>()