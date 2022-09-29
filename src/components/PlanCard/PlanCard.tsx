import React from 'react';
import s from './PlanCard.module.css';
import {IPlan} from "../../assets/plans";

function PlanCard(props: IPlan) {
    const {title, price, description, isMostPopular} = props;

    return (
        <div className={s.PlanCard}>
            <h2 className={s.PlanTitle}>{title}</h2>
            <h3 className={s.PlanPrice}>{price !== 0 ? `US $${price}/mo.` : 'Contact Us at info@stylescan.com'}</h3>

            <ul className={s.PlanDesc}>
                {description.map(d => <li key={d}>{d}</li>)}
            </ul>

            <button className={s.PlanBtn}>{price !== 0 ? 'Buy now' : 'Contact Us'}</button>
        </div>
    );
}

export default PlanCard;