import React, {useEffect} from 'react';
import s from './AccountPage.module.css';
import {useAppDispatch} from "../../utils/utils";
import {authActions, selectIsLoggedIn} from "../../app/authReducer";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectAccEmail} from "../../app/accountReducer";
import {debug} from "../../app/accountReducer/accountReducer";

function AccountPage() {
    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const accEmail = useSelector(selectAccEmail);

    useEffect(() => {
        dispatch(debug());
    }, []);

    const onLogoutHandler = async () => {
        const res = await dispatch(authActions.logout());
        if (res.payload?.error) {
            const error = res.payload.error;
            alert(error)
        }
    }

    const onChangePasswordHandler = () => console.log('change password');

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={s.AccountPage}>
            <h1>Welcome to your account!</h1>
            <h3>Your email: {accEmail}</h3>

            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab animi debitis eaque eum eveniet harum hic,
                ipsam molestias nam nemo neque nesciunt nihil numquam omnis perferendis, perspiciatis quam quas quia
                quis quo quod ratione vitae! </p>

            <button onClick={onChangePasswordHandler}>Change Password</button>

            <button onClick={onLogoutHandler}>Logout</button>
        </div>
    );
}

export default AccountPage;