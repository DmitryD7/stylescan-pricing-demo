import React, {useEffect} from 'react';
import s from './AccountPage.module.css';
import {useAppDispatch} from "../../utils/utils";
import {authActions, selectIsLoggedIn} from "../../app/authReducer";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {accountActions, accSelectors} from "../../app/accountReducer";
import {selectStatus} from "../../app/appReducer";
import {Loader} from "../../components/Loader/Loader";

function AccountPage() {
    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const status = useSelector(selectStatus);

    const navigate = useNavigate();

    const {selectCurrentPlan, selectAccEmail} = accSelectors;
    const accEmail = useSelector(selectAccEmail);
    const currentPlan = useSelector(selectCurrentPlan)

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

    const onChangePasswordHandler = () => console.log('change password');

    const onUpgradePlanHandler = () => navigate('/changePlan')
    const onCancelPlanHandler = () => console.log('onCancelPlanHandler');


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
                    <h3>Your Current Plan: {currentPlan}</h3>
                    {currentPlan === 'Basic' || currentPlan === 'Entry'
                        ? <button onClick={onUpgradePlanHandler} className={s.Btn}>Upgrade plan</button>
                        : null
                    }
                    {/*<button onClick={onCancelPlanHandler} className={s.Btn}>Cancel plan</button>*/}
                    <button className={`${s.Btn} ${s.Btn_WithLink}`}>
                        <a href="https://billing.stripe.com/p/login/test_7sI6rD4lT672bPGbII">Cancel plan</a>
                    </button>
                    <button className={`${s.Btn} ${s.Btn_WithLink}`}>
                        <a href="https://billing.stripe.com/p/login/test_7sI6rD4lT672bPGbII">Stripe Manage</a>
                    </button>
                    <ButtonMailto />

                </section>

                <section className={s.AccountPage_Settings}>
                    <h3>Account settings</h3>
                    <button onClick={onChangePasswordHandler} className={s.Btn}>Change Password</button>
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