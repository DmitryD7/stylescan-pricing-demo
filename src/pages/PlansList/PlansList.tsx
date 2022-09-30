import React, {useState} from "react";
import s from './PlansList.module.css';
import {plans} from "../../assets/plans";
import PlanCard from "../../components/PlanCard/PlanCard";
import PlansDescription from "../../components/PlansDescription/PlansDescription";
import {loadStripe} from "@stripe/stripe-js";

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


    const redirectToCheckout = async (item: { price: string, quantity: number }) => {
        const checkoutOptions = {
            lineItems: [item],
            mode: 'subscription',
            successUrl: `${window.location.origin}/success`,
            cancelUrl: `${window.location.origin}/cancel`
        };

        setLoading(true);
        console.log("redirectToCheckout");

        const stripe = await getStripe();
        const {error} = await stripe.redirectToCheckout(checkoutOptions);
        console.log("Stripe checkout error", error);

        if (error) setStripeError(error.message);
        setLoading(false);
    };

    if (stripeError) alert(stripeError);

    return (
        <>
            <section className={s.PlansList}>
                {plans.map(plan => <PlanCard
                    key={plan.price}
                    title={plan.title}
                    price={plan.price}
                    description={plan.description}
                    isMostPopular={plan.isMostPopular}
                    isDisabledButton={isLoading}
                    onBuyClick={redirectToCheckout}
                    quantity={plan.quantity}
                    priceUI={plan.priceUI}
                />)}
            </section>
            <PlansDescription/>
        </>
    );
}

export default PlansList;