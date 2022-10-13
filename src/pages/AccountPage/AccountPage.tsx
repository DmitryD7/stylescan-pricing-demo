import React from 'react';
import s from './AccountPage.module.css';
import {useAppDispatch} from "../../utils/utils";
import {authActions, selectIsLoggedIn} from "../../app/authReducer";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {log} from "util";

function AccountPage() {
    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const onLogoutHandler = async () => await dispatch(authActions.logout());

    const onChangePasswordHandler = () => console.log('change password');

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={s.AccountPage}>
            <h1>Welcome to your account!</h1>

            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab animi debitis eaque eum eveniet harum hic, ipsam molestias nam nemo neque nesciunt nihil numquam omnis perferendis, perspiciatis quam quas quia quis quo quod ratione vitae! Beatae cum eum, expedita explicabo illo nostrum possimus unde! Dolor dolore hic pariatur possimus quos! A aliquam cupiditate delectus doloribus ea esse et exercitationem fugiat fugit illo mollitia numquam obcaecati officia quas qui, quos reiciendis repellendus soluta unde veritatis. Aliquam aperiam aspernatur, deleniti dicta ea excepturi inventore libero nesciunt numquam obcaecati, perferendis possimus reiciendis repellat, soluta tempora tenetur vel velit voluptates? Maxime officia quam unde!</p>

            <button onClick={onChangePasswordHandler}>Change Password</button>

            <button onClick={onLogoutHandler}>Logout</button>
        </div>
    );
}

export default AccountPage;