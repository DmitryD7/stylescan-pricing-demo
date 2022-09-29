import React from 'react';
import s from './App.module.css';
import PlansList from "./pages/PlansList/PlansList";
import PlansDescription from "./components/PlansDescription/PlansDescription";

function App() {


    return (
        <div className={s.Container}>
            <div className={s.App}>
                <h1 className={s.Header}>Choose the subscription that works for you</h1>
                <PlansList/>
                <PlansDescription/>
            </div>
        </div>
    );
}

export default App;
