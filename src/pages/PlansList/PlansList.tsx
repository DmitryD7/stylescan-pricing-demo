import React, {useState} from "react";
import s from './PlansList.module.css';
import {plans} from "../../assets/plans";
import PlanCard from "../../components/PlanCard/PlanCard";
import PlansDescription from "../../components/PlansDescription/PlansDescription";
import {loadStripe} from "@stripe/stripe-js";
import {appActions} from "../../app/appReducer";
import {useAppDispatch} from "../../utils/utils";
import {accountActions} from "../../app/accountReducer";

let stripePromise: any;

const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY as string)
    }

    return stripePromise;
};

function PlansList() {
    const [stripeError, setStripeError] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const dispatch = useAppDispatch();
    const {setCurrentPlan} = accountActions;

    const setCurrentPlanHandler = (currentPlan: string) => dispatch(setCurrentPlan({currentPlan}));

    const redirectToCheckout = async (item: { price: string, quantity: number}) => {
        const checkoutOptions = {
            lineItems: [item],
            mode: 'subscription',
            successUrl: `${window.location.origin}/success`,
            cancelUrl: `${window.location.origin}/cancel`
        };

        setLoading(true);

        const stripe = await getStripe();
        const {error} = await stripe.redirectToCheckout(checkoutOptions);
        //dispatch(setCurrentPlan({currentPlan: item.title}))
        console.log("Stripe checkout error", error);

        if (error) setStripeError(error.message);
        setLoading(false);
    };

    if (stripeError) alert(stripeError);

    return (
        <>
            <h1 className={s.Header}>Choose the subscription that works for you</h1>
            <section className={s.PlansList}>
                {plans.map(plan => <PlanCard
                    key={plan.price}
                    title={plan.title}
                    price={plan.price}
                    description={plan.description}
                    isMostPopular={plan.isMostPopular}
                    isDisabledButton={isLoading}
                    onBuyClick={redirectToCheckout}
                    setCurrentPlan={setCurrentPlanHandler}
                    quantity={plan.quantity}
                    priceUI={plan.priceUI}
                />)}
            </section>
            <PlansDescription/>
        </>
    );
}

export default PlansList;