import React from 'react';
import s from './PlansDescription.module.css';

function PlansDescription() {
    return (
        <div className={s.PlansDescription}>
            <p><b>SKU</b> means a unique item of clothing, footwear or accessory.</p>
            <br/>
            <p><b>Credit</b> is a final image of an item on one model with either front or back view. The customer can choose how many models they want to present items on as well as front/back view option.</p>
        </div>
    );
}

export default PlansDescription;