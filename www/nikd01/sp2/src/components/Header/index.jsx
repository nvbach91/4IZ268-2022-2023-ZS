import React from 'react';
import { REACT_URL_CONTACT, REACT_URL_HOME } from '../../core/routes/constants';
import logoIcon from '../../assets/icons/logo-icon.svg';

const Header = () => {
    const location = window.location.pathname;
    return (
        <header className="z-50 w-screen flex flex-row fixed justify-between bg-zinc-700 py-3.5 px-10">
            <a href={REACT_URL_HOME} className="flex flex-row items-center">
                <img src={logoIcon} alt="Logo" />
            </a>
            <ul className="flex flex-row gap-10">
                <li>
                    <a
                        href={REACT_URL_HOME}
                        className={location === REACT_URL_HOME ? 'text-amber-300' : 'hover:text-amber-100'}
                    >
                        Home
                    </a>
                </li>
                <li>
                    <a
                        href={REACT_URL_CONTACT}
                        className={location === REACT_URL_CONTACT ? 'text-amber-300' : 'hover:text-amber-100'}
                    >
                        Contact
                    </a>
                </li>
            </ul>
        </header>
    );
};

export default Header;
