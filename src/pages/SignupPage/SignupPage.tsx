import React from 'react';
import s from './SignupPage.module.css';
import {FormikHelpers, useFormik} from "formik";
import {useSelector} from "react-redux";
import {authActions, selectIsLoggedIn} from "../../app/authReducer";
import {Link, Navigate} from 'react-router-dom';
import {emailValidate, passwordConfirmValidate, passwordValidate, useAppDispatch} from "../../utils/utils";
import {FormErrorType} from "../../app/types";

function SignupPage() {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const dispatch = useAppDispatch();

    const validate = (values: FormValuesType) => {
        const errors: FormErrorType = {};
        errors.email = emailValidate(values.email)
        errors.password = passwordValidate(values.password)
        errors.passwordConfirmation = passwordConfirmValidate(values.passwordConfirmation, values.password)

        return errors
    };


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            passwordConfirmation: '',
        },
        validate,
        onSubmit: async (values, formikHelpers: FormikHelpers<FormValuesType>) => {
            await dispatch(authActions.signup(values))
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
                        {formik.errors.email ? <div className={s.LoginPage_Form_Element_Error}>{formik.errors.email}</div> : null}
                    </div>

                    <div className={s.LoginPage_Form_Element}>
                        <input
                            type="password"
                            placeholder={'Password'}
                            {...formik.getFieldProps('password')}
                        />
                        <div className={s.LoginPage_ForgotPasswBtn}><Link to={'/'}>Forgot password?</Link></div>
                        {formik.errors.password ? <div className={s.LoginPage_Form_Element_Error}>{formik.errors.password}</div> : null}
                    </div>

                    <div className={s.LoginPage_Form_Element}>
                        <input
                            type="password"
                            placeholder={'Confirm your password'}
                            {...formik.getFieldProps('passwordConfirmation')}
                        />
                        <div className={s.LoginPage_ForgotPasswBtn}><Link to={'/'}>Forgot password?</Link></div>
                        {formik.errors.passwordConfirmation ? <div className={s.LoginPage_Form_Element_Error}>{formik.errors.passwordConfirmation}</div> : null}
                    </div>

                    <button className={s.LoginPage_Form_Btn} type={"submit"}>Signup</button>
                </form>
            </div>
        </div>
    );
}

export default SignupPage;

type FormValuesType = {
    email: string
    password: string
    passwordConfirmation: string
}