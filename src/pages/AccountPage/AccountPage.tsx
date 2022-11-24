import React, {useCallback, useEffect} from 'react';
import s from './AccountPage.module.css';
import {useAppDispatch} from "../../utils/utils";
import {authActions, authSelectors} from "../../app/authReducer";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {accountActions, accSelectors} from "../../app/accountReducer";
import {Loader} from "../../components/Loader/Loader";
import {appSelectors} from "../../app/appReducer";

function AccountPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {debug} = accountActions;
    const {logout} = authActions;
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn);
    const {selectStatus} = appSelectors;

    const {selectCurrentPlan, selectAccEmail, selectIsEnterprisePending} = accSelectors;
    const status = useSelector(selectStatus);
    const accEmail = useSelector(selectAccEmail);
    const currentPlan = useSelector(selectCurrentPlan);
    const isEnterprisePending = useSelector(selectIsEnterprisePending);

    useEffect(() => {
        dispatch(debug());
    }, [dispatch, debug]);

    const onLogoutHandler = useCallback(async () => {
        await dispatch(logout());
    }, [dispatch, logout]);

    const onUpgradePlanHandler = () => navigate('/changePlan');

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    if (status === "loading") {
        return <Loader/>
    }
    if (isEnterprisePending) {
        return <Navigate to={'/enterprisePending'}/>
    }

    return (
        <div className={s.AccountPage}>
            <h1>Hello {accEmail}!</h1>
            <div className={s.AccountPage_Data}>
                <section className={s.AccountPage_PlanInfo}>
                    <h3>Your Current Plan: {currentPlan}</h3>
                    {currentPlan === 'Basic' || currentPlan === 'Entry'
                        ? <button onClick={onUpgradePlanHandler} className={s.Btn}>Upgrade plan</button>
                        : null
                    }
                    <button className={`${s.Btn} ${s.Btn_WithLink}`}>
                        <a href="https://billing.stripe.com/p/login/test_7sI6rD4lT672bPGbII">Cancel plan</a>
                    </button>
                    <button className={`${s.Btn} ${s.Btn_WithLink}`}>
                        <a href="https://billing.stripe.com/p/login/test_7sI6rD4lT672bPGbII">Stripe Manage</a>
                    </button>
                    <ButtonMailto/>

                </section>

                <section className={s.AccountPage_Settings}>
                    <h3>Account settings</h3>
                    <button className={`${s.Btn} ${s.Btn_WithLink}`}>
                        <Link to={'/reset_request'}>Change Password</Link>
                    </button>
                    <button onClick={onLogoutHandler} className={s.Btn}>Logout</button>
                </section>
            </div>
        </div>
    );
}

export default AccountPage;

const ButtonMailto = () => {
    return (
        <button className={`${s.Btn} ${s.Btn_WithLink}`}>
            <Link
                to='#'
                onClick={(e) => {
                    window.location.href = "mailto:info@stylescan.com";
                    e.preventDefault();
                }}
            >
                Contact Us
            </Link>
        </button>
    );
};