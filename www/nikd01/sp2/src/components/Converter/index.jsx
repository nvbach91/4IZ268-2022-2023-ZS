import React, { useReducer } from 'react';
import CurrencyList from '../CurrencyList';
import { normalizeNumber } from '../../core/utils/normalizer';

const Converter = () => {
    const [state, setState] = useReducer((state, newState) => ({ ...state, ...newState }), {
        fromActiveId: 1,
        toActiveId: 2,
        fromValue: '',
        toValue: '',
    });

    const { fromActiveId, toActiveId, fromValue, toValue } = state;

    const handleFromActiveId = id => {
        setState({ fromActiveId: id });
    };

    const handleToActiveId = id => {
        setState({ toActiveId: id });
    };

    return (
        <div className="flex flex-row justify-center items-center gap-14">
            <CurrencyList activeId={fromActiveId} handleActiveId={handleFromActiveId} />
            <input
                type="text"
                className="border border-gray-300 rounded-md p-2 max-h-10"
                value={fromValue}
                onChange={e => setState({ fromValue: normalizeNumber(e.target.value) })}
            />
            <span className="text-4xl">=</span>
            <input
                type="text"
                className="border border-gray-300 rounded-md p-2 max-h-10"
                value={toValue}
                onChange={e => setState({ toValue: normalizeNumber(e.target.value) })}
            />
            <CurrencyList activeId={toActiveId} handleActiveId={handleToActiveId} />
        </div>
    );
};

export default Converter;
