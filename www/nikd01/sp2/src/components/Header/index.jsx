import React, { useEffect } from 'react';
import { REACT_URL_CONTACT, REACT_URL_HOME } from '../../core/routes/constants';
import logoIcon from '../../assets/icons/logo-icon.svg';
import { Link } from 'react-router-dom';

const Header = () => {
    const [activeTab, setActiveTab] = React.useState(null);

    useEffect(() => {
        const path = window.location.pathname;
        if (path === REACT_URL_HOME) {
            setActiveTab('home');
        } else if (path === REACT_URL_CONTACT) {
            setActiveTab('contact');
        }
    }, []);

    return (
        <header className="z-50 w-screen flex flex-row fixed justify-between bg-zinc-700 py-3.5 px-10">
            <a href={REACT_URL_HOME} className="flex flex-row items-center">
                <img src={logoIcon} alt="Logo" />
            </a>
            <ul className="flex flex-row gap-10">
                <li>
                    <Link to={REACT_URL_HOME} onClick={() => setActiveTab('home')}>
                        <span className={activeTab === 'home' ? 'text-amber-300' : 'hover:text-amber-100'}>Home</span>
                    </Link>
                </li>
                <li>
                    <Link to={REACT_URL_CONTACT} onClick={() => setActiveTab('contact')}>
                        <span className={activeTab === 'contact' ? 'text-amber-300' : 'hover:text-amber-100'}>
                            Contact
                        </span>
                    </Link>
                </li>
            </ul>
        </header>
    );
};

export default Header;
