import React from 'react';
import s from './LoginPage.module.css';
import {LoginParamsType} from "../../api/api";
import {FormikHelpers, useFormik} from "formik";

function LoginPage() {
    const validate = (values: LoginParamsType) => {
        const errors: FormErrorType = {};

        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (!values.password) {
            errors.password = 'Required'
        } else if (values.password.length < 3) {
            errors.password = 'Too short password'
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        onSubmit: (values, formikHelpers: FormikHelpers<FormValuesType>) => {
            console.log(values)
        },
    });

    return (
        <div className={s.LoginPage}>
            <h1>Login</h1>
            <div className="form">
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <label>Username </label>
                        <input
                            type="email"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                    </div>
                    <div>
                        <label>Password </label>
                        <input
                            type="password"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                    </div>
                    <div>
                        <button type={"submit"}>Log In</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;

type FormErrorType = {
    email?: string
    password?: string
}

type FormValuesType = {
    email: string
    password: string
}