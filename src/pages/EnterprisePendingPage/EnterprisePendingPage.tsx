import React, {useEffect} from 'react';
import s from './EnterprisePendingPage.module.css';
import {useAppDispatch} from "../../utils/utils";
import {authActions, selectIsLoggedIn} from "../../app/authReducer";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {accountActions, accSelectors} from "../../app/accountReducer";
import {selectStatus} from "../../app/appReducer";
import {Loader} from "../../components/Loader/Loader";

function EnterprisePendingPage() {
    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const status = useSelector(selectStatus);

    const {selectAccEmail} = accSelectors;
    const accEmail = useSelector(selectAccEmail);

    const {debug} = accountActions;

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

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    if (status === "loading") {
        return <Loader/>
    }

    return (
        <div className={s.AccountPage}>
            <h1>Hello {accEmail}!</h1>
            <div className={s.AccountPage_Data}>
                <section className={s.AccountPage_PlanInfo}>
                    <h3>Your request is pending. We will contact you soon.</h3>
                    <button className={`${s.Btn} ${s.Btn_WithLink}`}>
                        <a href="https://billing.stripe.com/p/login/test_7sI6rD4lT672bPGbII">Cancel plan</a>
                    </button>
                    <button className={`${s.Btn} ${s.Btn_WithLink}`}>
                        <a href="https://billing.stripe.com/p/login/test_7sI6rD4lT672bPGbII">Stripe Manage</a>
                    </button>

                </section>

                <section className={s.AccountPage_Settings}>
                    <h3>Account settings</h3>
                    <button onClick={onLogoutHandler} className={s.Btn}>Logout</button>
                </section>
            </div>
        </div>
    );
}

export default EnterprisePendingPage;