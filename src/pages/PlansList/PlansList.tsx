import React, {useCallback} from "react";
import s from './PlansList.module.css';
import {plans} from "../../assets/plans";
import {PlanCardMemo} from "../../components/PlanCard/PlanCard";
import PlansDescription from "../../components/PlansDescription/PlansDescription";
import {useAppDispatch} from "../../utils/utils";
import {accountActions} from "../../app/accountReducer";
import {redirectToCheckout} from "../../utils/stripe";
import {useSelector} from "react-redux";
import {appSelectors} from "../../app/appReducer";
import {CurrentPlanType} from "../../app/accountReducer/accountReducer";

function PlansList() {
    const dispatch = useAppDispatch();
    const {setCurrentPlan} = accountActions;

    const {selectStatus} = appSelectors;
    const status = useSelector(selectStatus);

    const setCurrentPlanHandler = useCallback((currentPlan: CurrentPlanType) => dispatch(setCurrentPlan({currentPlan})),
        [dispatch, setCurrentPlan]);

    return (
        <>
            <h1 className={s.Header}>Choose the subscription that works for you</h1>
            <section className={s.PlansList}>
                {plans.map(plan => <PlanCardMemo
                    key={plan.price}
                    plan={plan}
                    isDisabledButton={status === "loading"}
                    onBuyClick={redirectToCheckout(dispatch)}
                    setCurrentPlan={setCurrentPlanHandler}
                />)}
            </section>
            <PlansDescription/>
        </>
    );
}

export default PlansList;