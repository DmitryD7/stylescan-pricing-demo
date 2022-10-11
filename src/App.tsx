import React from 'react';
import {Route, Routes} from 'react-router-dom';
import s from './App.module.css';
import PlansList from "./pages/PlansList/PlansList";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import CancellationPage from "./pages/CancellationPage/CancellationPage";
import Header from "./components/Header/Header";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {


    return (
        <div className={s.Container}>
            {/*<LoginPage/>*/}
            <div className={s.App}>
                <Header/>
                <Routes>
                    <Route index element={<PlansList/>}/>
                    <Route path={'success'} element={<SuccessPage/>}/>
                    <Route path={'cancel'} element={<CancellationPage/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
