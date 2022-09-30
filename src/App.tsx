import React from 'react';
import {Route, Routes} from 'react-router-dom';
import s from './App.module.css';
import PlansList from "./pages/PlansList/PlansList";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import CancellationPage from "./pages/CancellationPage/CancellationPage";

function App() {


    return (
        <div className={s.Container}>
            <div className={s.App}>
                <h1 className={s.Header}>Choose the subscription that works for you</h1>
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
