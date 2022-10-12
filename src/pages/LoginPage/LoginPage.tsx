import React from 'react';
import s from './LoginPage.module.css';
import {FormikHelpers, useFormik} from "formik";
import {useSelector} from "react-redux";
import {authActions, selectIsLoggedIn} from "../../app/authReducer";
import {Link, Navigate} from 'react-router-dom';
import {emailValidate, passwordValidate, useAppDispatch} from "../../utils/utils";
import {LoginParamsType} from "../../api/api";
import {FormErrorType} from "../../app/types";

function LoginPage() {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const dispatch = useAppDispatch();

    const validate = (values: LoginParamsType) => {
        const errors: FormErrorType = {};
        errors.email = emailValidate(values.email)
        errors.password = passwordValidate(values.password)

        return errors
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        onSubmit: async (values, formikHelpers: FormikHelpers<FormValuesType>) => {
            await dispatch(authActions.login(values))
        },
    });

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return (
        <div className={s.LoginPage}>
            <h1 className={s.LoginPage_Header}>Login</h1>
            <h3 className={s.LoginPage_NewAcc}>New to StyleScan?</h3>
            <div className={s.LoginPage_Form}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={s.LoginPage_Form_Element}>
                        <input
                            type="email"
                            placeholder={'Email'}
                            {...formik.getFieldProps('email')}
                        />
                        {formik.errors.email ?
                            <div className={s.LoginPage_Form_Element_Error}>{formik.errors.email}</div> : null}
                    </div>

                    <div className={s.LoginPage_Form_Element}>
                        <input
                            type="password"
                            placeholder={'Password'}
                            {...formik.getFieldProps('password')}
                        />
                        <div className={s.LoginPage_ForgotPasswBtn}><Link to={'/'}>Forgot password?</Link></div>
                        {formik.errors.password ?
                            <div className={s.LoginPage_Form_Element_Error}>{formik.errors.password}</div> : null}
                    </div>

                    <button className={s.LoginPage_Form_Btn} type={"submit"}>Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;

type FormValuesType = {
    email: string
    password: string
}