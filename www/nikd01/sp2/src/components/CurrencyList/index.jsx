import React from 'react';
import PropTypes from 'prop-types';
import { CURRENCY_LIST } from '../../core/utils/constants';

const CurrencyList = ({ activeId, handleActiveId }) => {
    const currencyList = CURRENCY_LIST;

    return (
        <div className="flex flex-row gap-7 align-middle">
            <ul className="flex flex-col gap-4 justify-center">
                {currencyList.slice(0, 3).map(item => (
                    <li
                        key={item.id}
                        className={`cursor-pointer ${
                            activeId === item.id ? 'text-red-400 text-2xl' : ''
                        } hover:text-red-300`}
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
                        className={`cursor-pointer ${
                            activeId === item.id ? 'text-red-400 text-2xl' : ''
                        } hover:text-red-300`}
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
