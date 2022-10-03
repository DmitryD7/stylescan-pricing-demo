import React from 'react';
import styleScanLogo from '../../assets/styleScanIco.png'
import s from './Header.module.css';

function Header() {
    return (
        <div className={s.Header}>
            <a href={'https://stylescan.com/'}>
                <img src={styleScanLogo} alt="StyleScan Logo" className={s.HeaderImg}/>
            </a>
        </div>
    );
}

export default Header;