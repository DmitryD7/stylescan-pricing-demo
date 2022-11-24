import React, {useCallback} from "react";
import s from './ChangePlanPage.module.css';
import {plans} from "../../assets/plans";
import {PlanCardMemo} from "../../components/PlanCard/PlanCard";
import PlansDescription from "../../components/PlansDescription/PlansDescription";
import {useAppDispatch} from "../../utils/utils";
import {accountActions} from "../../app/accountReducer";
import {redirectToCheckout} from "../../utils/stripe";
import {useSelector} from "react-redux";
import {CurrentPlanType} from "../../app/accountReducer/accountReducer";
import {appSelectors} from "../../app/appReducer";

function ChangePlanPage(props: ChangePlanPropsType) {
    const {currentPlan} = props;
    const dispatch = useAppDispatch();
    const {selectStatus} = appSelectors;
    const status = useSelector(selectStatus);
    const {setCurrentPlan} = accountActions;

    const setCurrentPlanHandler = useCallback((currentPlan: CurrentPlanType) => dispatch(setCurrentPlan({currentPlan})),
        [dispatch, setCurrentPlan]);

    const availablePlans = plans.filter(plan => plan.title !== currentPlan);

    return (
        <>
            <h1 className={s.Header}>Choose the subscription that works for you</h1>
            <section className={s.PlansList}>
                {availablePlans.map(plan => <PlanCardMemo
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

export default ChangePlanPage;

type ChangePlanPropsType = {
    currentPlan: CurrentPlanType
}