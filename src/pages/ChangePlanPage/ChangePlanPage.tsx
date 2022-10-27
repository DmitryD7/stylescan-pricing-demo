import React from "react";
import s from './ChangePlanPage.module.css';
import {plans} from "../../assets/plans";
import PlanCard from "../../components/PlanCard/PlanCard";
import PlansDescription from "../../components/PlansDescription/PlansDescription";
import {useAppDispatch} from "../../utils/utils";
import {accountActions} from "../../app/accountReducer";
import {redirectToCheckout} from "../../utils/stripe";
import {useSelector} from "react-redux";
import {selectStatus} from "../../app/appReducer";
import {CurrentPlanType} from "../../app/accountReducer/accountReducer";

function ChangePlanPage(props: ChangePlanPropsType) {
    const {currentPlan} = props;
    const status = useSelector(selectStatus);
    const dispatch = useAppDispatch();
    const {setCurrentPlan} = accountActions;

    const isLoading = status === "loading";

    const setCurrentPlanHandler = (currentPlan: CurrentPlanType) => dispatch(setCurrentPlan({currentPlan}));

    const redirectToCheckoutHandler = redirectToCheckout(dispatch);

    const availablePlans = plans.filter(plan => plan.title !== currentPlan);;


    return (
        <>
            <h1 className={s.Header}>Choose the subscription that works for you</h1>
            <section className={s.PlansList}>
                {availablePlans.map(plan => <PlanCard
                    key={plan.price}
                    title={plan.title}
                    price={plan.price}
                    description={plan.description}
                    isMostPopular={plan.isMostPopular}
                    isDisabledButton={isLoading}
                    onBuyClick={redirectToCheckoutHandler}
                    setCurrentPlan={setCurrentPlanHandler}
                    quantity={plan.quantity}
                    priceUI={plan.priceUI}
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