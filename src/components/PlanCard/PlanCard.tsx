import React from 'react';
import s from './PlanCard.module.css';
import {IPlan} from "../../assets/plans";
import {Link} from 'react-router-dom';
import mostPopularIco from '../../assets/Vector.svg'
import Button from "../Button/Button";

function PlanCard(props: PlanCardPropsType) {
    const {title, priceUI, description, isMostPopular, isDisabledButton, onBuyClick, price, quantity} = props;

    const onClickHandler = () => onBuyClick({price, quantity});

    const ButtonMailto = () => {
        return (
            <Button>
                <Link
                    to='#'
                    onClick={(e) => {
                        window.location.href = "mailto:info@stylescan.com";
                        e.preventDefault();
                    }}
                >
                    {isDisabledButton ? 'Loading...' : 'Contact Us'}
                </Link>
            </Button>
        );
    };

    return (
        <div className={s.PlanCard}>
            {isMostPopular && <img src={mostPopularIco} alt="most popular plan" className={s.MostPopular}/>}
            <h2 className={s.PlanTitle}>{title}</h2>
            {priceUI !== 0
                ? <h3 className={s.PlanPrice}>{`US $${priceUI}/mo.`}</h3>
                : <span className={s.PlanPriceMessage}>Contact Us at info@stylescan.com</span>
            }

            <ul className={s.PlanDesc}>
                {description.map(d => <li key={d}>{d}</li>)}
            </ul>

            <div className={s.PlanBtn}>
                {priceUI !== 0
                    ? <Button
                        disabled={isDisabledButton}
                        onClick={onClickHandler}
                    >{isDisabledButton ? 'Loading...' : 'Buy now'}
                    </Button>
                    : <ButtonMailto/>
                }
            </div>
        </div>
    );
}

type PlanCardPropsType = IPlan & {
    isDisabledButton: boolean
    onBuyClick: (item: { price: string, quantity: number }) => void
}

export default PlanCard;