import React, { useReducer } from 'react';
import axios from 'axios';
import CurrencyList from '../CurrencyList';
import { normalizeNumber } from '../../core/utils/normalizer';
import { GET_CONVERTED_CURRENCY } from '../../core/config/api';
import { API_KEY } from '../../core/config/config';
import { CURRENCY_LIST } from '../../core/utils/constants';

const Converter = () => {
    const [state, setState] = useReducer((state, newState) => ({ ...state, ...newState }), {
        fromActiveId: 1,
        toActiveId: 2,
        fromValue: '',
        toValue: '',
        isLoading: false,
        error: null,
    });
    const { fromActiveId, toActiveId, fromValue, toValue, isLoading, error } = state;

    const handleFromActiveId = id => {
        setState({ fromActiveId: id });
        if (toValue) {
            setState({
                toValue: '',
                fromValue: '',
            });
        }
    };

    const handleToActiveId = id => {
        setState({ toActiveId: id });
        if (toValue) {
            setState({
                toValue: '',
                fromValue: '',
            });
        }
    };

    const getCurrencyById = id => {
        return CURRENCY_LIST.find(item => item.id === id).name;
    };

    const getConvertedValue = () => {
        setState({
            isLoading: true,
        });
        axios
            .get(GET_CONVERTED_CURRENCY, {
                headers: {
                    apikey: API_KEY,
                },
                params: {
                    amount: fromValue,
                    from: getCurrencyById(fromActiveId),
                    to: getCurrencyById(toActiveId),
                },
            })
            .then(res => {
                const { result } = res.data;
                setState({
                    toValue: result,
                    isLoading: false,
                    error: null,
                });
            })
            .catch(err => {
                setState({
                    error: err.message,
                    isLoading: false,
                });
            });
    };

    return (
        <div className="flex flex-col justify-center items-center gap-8">
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
                    className="border border-gray-300 rounded-md p-2 max-h-10 cursor-not-allowed"
                    value={toValue ? toValue.toFixed(2) : ''}
                    readOnly
                />
                <CurrencyList activeId={toActiveId} handleActiveId={handleToActiveId} />
            </div>
            <button
                className="bg-red-400 hover:bg-red-500 text-white text-xl px-6 py-1.5
                rounded disabled:bg-gray-400 disabled:hover:bg-gray-400"
                onClick={getConvertedValue}
                disabled={isLoading || !fromValue || fromValue === '0'}
            >
                {isLoading ? 'Loading...' : 'Convert'}
            </button>
            {error && <p className="text-red-400">{error}</p>}
        </div>
    );
};

export default Converter;
