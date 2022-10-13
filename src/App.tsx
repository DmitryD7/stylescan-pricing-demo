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
import { appActions } from './app/appReducer';

function App() {
    const dispatch = useAppDispatch();
    const {initializeApp} = appActions;

    useEffect(() => {
        dispatch(initializeApp());
    }, []);

    return (
        <div className={s.Container}>
            <div className={s.App}>
                <Header/>
                <Routes>
                    <Route index element={<PlansList/>}/>
                    <Route path={'success'} element={<SuccessPage/>}/>
                    <Route path={'cancel'} element={<CancellationPage/>}/>
                    <Route path={'login'} element={<LoginPage/>}/>
                    <Route path={'signup'} element={<SignupPage/>}/>
                    <Route path={'verify'} element={<VerifyingEmailPage/>}/>
                    <Route path={'reset'} element={<ResetPasswPage/>}/>
                    <Route path={'account'} element={<AccountPage/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
