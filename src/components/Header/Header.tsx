import React from 'react';
import styleScanLogo from '../../assets/styleScanIco.png'
import s from './Header.module.css';
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../../app/authReducer";
import {Link} from "react-router-dom";

function Header() {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <div className={s.Header}>
            <div>
                <Link to={'/'}>
                    <img src={styleScanLogo} alt="StyleScan Logo" className={s.Header_StyleScanIco}/>
                </Link>
            </div>
            <div className={s.Header_Account}>
                {isLoggedIn
                    ? <Link to={'account'}>Account</Link>
                    : <Link to={'login'}>Login</Link>
                }
            </div>
        </div>
    );
}

export default Header;