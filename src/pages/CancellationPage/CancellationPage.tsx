import React from 'react';
import s from './CancellationPage.module.css';
import cancelIco from "../../assets/errorIco.svg";
import {Link} from "react-router-dom";

function CancellationPage() {
    return (
        <div className={s.CancellationPage}>
            <img src={cancelIco} alt="success" className={s.CancelIco}/>
            <h2 className={s.CancelHeader}>Payment was canceled.</h2>
            <p className={s.CancelInfo}>Try again or contact info@stylescan.com for help.</p>
            <Link to={'/'}>
                <button className={s.CancelBtn}>Go back</button>
            </Link>
        </div>
    );
}

export default CancellationPage;