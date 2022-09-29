import React from 'react';
import successIco from '../../assets/successIco.svg'
import s from './SuccessPage.module.css';

function SuccessPage() {
    return (
        <div className={s.SuccessPage}>
            <img src={successIco} alt="success" className={s.SuccessIco}/>
            <h2 className={s.SuccessHeader}>Payment successful!</h2>
            <p className={s.SuccessInfo}>Thanks for your purchase. Invoice has been sent to your email.</p>
            <button className={s.SuccessBtn}>Go back</button>
        </div>
    );
}

export default SuccessPage;