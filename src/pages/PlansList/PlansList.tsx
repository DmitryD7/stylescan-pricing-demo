import React from "react";
import s from './PlansList.module.css';
import {plans} from "../../assets/plans";
import PlanCard from "../../components/PlanCard/PlanCard";

function PlansList() {
    return (
        <section className={s.PlansList}>
            {plans.map(plan => <PlanCard
                title={plan.title}
                price={plan.price}
                description={plan.description}
                isMostPopular={plan.isMostPopular}
            />)}
        </section>
    );
}

export default PlansList;