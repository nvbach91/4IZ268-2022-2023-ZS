import React from 'react';
import PropTypes from 'prop-types';

const CurrencyList = ({ activeId, handleActiveId }) => {
    const currencyList = [
        {
            id: 1,
            name: 'USD',
        },
        {
            id: 2,
            name: 'EUR',
        },
        {
            id: 3,
            name: 'GBP',
        },
        {
            id: 4,
            name: 'AED',
        },
        {
            id: 5,
            name: 'CZK',
        },
        {
            id: 6,
            name: 'PLN',
        },
    ];

    return (
        <div className="flex flex-row gap-7 align-middle">
            <ul className="flex flex-col gap-4 justify-center">
                {currencyList.slice(0, 3).map(item => (
                    <li
                        key={item.id}
                        className={`cursor-pointer ${activeId === item.id ? 'text-red-400 text-2xl' : ''}`}
                        onClick={() => handleActiveId(item.id)}
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
            <ul className="flex flex-col gap-4 justify-center">
                {currencyList.slice(3, 6).map(item => (
                    <li
                        key={item.id}
                        className={`cursor-pointer ${activeId === item.id ? 'text-red-400 text-2xl' : ''}`}
                        onClick={() => handleActiveId(item.id)}
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

CurrencyList.propTypes = {
    activeId: PropTypes.number,
    handleActiveId: PropTypes.func,
};

CurrencyList.defaultProps = {
    activeId: 0,
    handleActiveId: () => {},
};

export default CurrencyList;
