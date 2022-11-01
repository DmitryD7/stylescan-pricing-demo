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
import {appActions} from './app/appReducer';
import ChangePasswPage from "./pages/ChangePasswPage/ChangePasswPage";
import ChangePlanPage from "./pages/ChangePlanPage/ChangePlanPage";
import {useSelector} from "react-redux";
import {accSelectors} from "./app/accountReducer";
import EnterprisePendingPage from './pages/EnterprisePendingPage/EnterprisePendingPage';

function App() {
    const dispatch = useAppDispatch();
    const {initializeApp} = appActions;
    const currentPlan = useSelector(accSelectors.selectCurrentPlan);

    useEffect(() => {
        dispatch(initializeApp());
    }, [dispatch, initializeApp]);

    // if (status === "loading") {
    //     return <Loader/>
    // }

    const StartPage = () => currentPlan === '' ? <PlansList/> : <AccountPage/>

    return (
        <div className={s.Container}>
            <div className={s.App}>
                <Header/>
                <Routes>
                    <Route path={'/'} element={<StartPage/>}/>
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
