import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import s from './App.module.css';
import PlansList from "./pages/PlansList/PlansList";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import CancellationPage from "./pages/CancellationPage/CancellationPage";
import Header from "./components/Header/Header";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import VerifyingEmailPage from "./pages/VerifyingEmailPage/VerifyingEmailPage";
import ResetPasswPage from "./pages/ResetPasswPage/ResetPasswPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import {useAppDispatch} from "./utils/utils";
import {appActions, appSelectors} from './app/appReducer';
import ChangePasswPage from "./pages/ChangePasswPage/ChangePasswPage";
import ChangePlanPage from "./pages/ChangePlanPage/ChangePlanPage";
import {useSelector} from "react-redux";
import {accSelectors} from "./app/accountReducer";
import EnterprisePendingPage from './pages/EnterprisePendingPage/EnterprisePendingPage';
import {Loader} from "./components/Loader/Loader";
import {CurrentPlanType} from "./app/accountReducer/accountReducer";
import {authSelectors} from "./app/authReducer";

function App() {
    const dispatch = useAppDispatch();
    const {selectCurrentPlan} = accSelectors;
    const {initializeApp} = appActions;
    const {selectStatus} = appSelectors;
    const {selectIsLoggedIn} = authSelectors;

    const status = useSelector(selectStatus);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const currentPlan = useSelector(selectCurrentPlan);

    useEffect(() => {
        dispatch(initializeApp());
    }, [dispatch, initializeApp]);

    return (
        <div className={s.Container}>
            <div className={s.App}>
                <Header/>
                {status === "loading" && <Loader/>}
                <Routes>
                    <Route path={'/'} element={<StartPage isLoggedIn={isLoggedIn} currentPlan={currentPlan}/>}/>
                    <Route path={'plans'} element={<PlansList/>}/>
                    <Route path={'success'} element={<SuccessPage/>}/>
                    <Route path={'cancel'} element={<CancellationPage/>}/>
                    <Route path={'login'} element={<LoginPage/>}/>
                    <Route path={'signup'} element={<SignupPage/>}/>
                    <Route path={'verify'} element={<VerifyingEmailPage/>}/>
                    <Route path={'reset_request'} element={<ResetPasswPage/>}/>
                    <Route path={'reset_password'} element={<ChangePasswPage/>}/>
                    <Route path={'account'} element={<AccountPage/>}/>
                    <Route path={'changePlan'} element={<ChangePlanPage currentPlan={currentPlan}/>}/>
                    <Route path={'enterprisePending'} element={<EnterprisePendingPage/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;

const StartPage = (props: { currentPlan: CurrentPlanType, isLoggedIn: boolean }) => {
    const {currentPlan, isLoggedIn} = props;

    if (!isLoggedIn) {
        return <LoginPage/>
    } else if (currentPlan === '') {
        return <PlansList/>
    } else {
        return <AccountPage/>
    }
};
