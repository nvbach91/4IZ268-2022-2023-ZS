import React, { useEffect, useReducer } from 'react';
import { CURRENCY_LIST } from '../../core/utils/constants';
import { formatAmount, normalizeNumber } from '../../core/utils/normalizer';
import { VictoryPie } from 'victory-pie';

const CountYourBudget = () => {
    const [state, setState] = useReducer((state, newState) => ({ ...state, ...newState }), {
        activeId: 1,
        incomes: [
            {
                id: 1,
                source: '',
                amount: '',
            },
        ],
        expenses: [
            {
                id: 1,
                source: '',
                amount: '',
            },
        ],
    });
    const { activeId, incomes, expenses } = state;

    useEffect(() => {
        const activeId = localStorage.getItem('activeId');
        const incomes = localStorage.getItem('incomes');
        const expenses = localStorage.getItem('expenses');
        if (activeId) {
            setState({ activeId: Number(activeId) });
        }
        if (incomes) {
            setState({ incomes: JSON.parse(incomes) });
        }
        if (expenses) {
            setState({ expenses: JSON.parse(expenses) });
        }
    }, []);

    const getCurrencyById = id => {
        return CURRENCY_LIST.find(item => item.id === id).name;
    };

    const handleIncomesSourceChange = (e, index) => {
        const { value } = e.target;
        const newIncomes = [...incomes];
        newIncomes[index].source = value;
        setState({ incomes: newIncomes });
        localStorage.setItem('incomes', JSON.stringify(newIncomes));
    };

    const handleIncomesAmountChange = (e, index) => {
        const { value } = e.target;
        const newIncomes = [...incomes];
        newIncomes[index].amount = normalizeNumber(value);
        setState({ incomes: newIncomes });
        localStorage.setItem('incomes', JSON.stringify(newIncomes));
    };

    const handleExpensesSourceChange = (e, index) => {
        const { value } = e.target;
        const newExpenses = [...expenses];
        newExpenses[index].source = value;
        setState({ expenses: newExpenses });
        localStorage.setItem('expenses', JSON.stringify(newExpenses));
    };

    const handleExpensesAmountChange = (e, index) => {
        const { value } = e.target;
        const newExpenses = [...expenses];
        newExpenses[index].amount = normalizeNumber(value);
        setState({ expenses: newExpenses });
        localStorage.setItem('expenses', JSON.stringify(newExpenses));
    };

    const getTotalIncome = () => {
        return incomes.reduce((acc, item) => {
            return acc + Number(item.amount);
        }, 0);
    };

    const getTotalExpenses = () => {
        return expenses.reduce((acc, item) => {
            return acc + Number(item.amount);
        }, 0);
    };

    const getGrandTotal = () => {
        return getTotalIncome() - getTotalExpenses();
    };

    useEffect(() => {
        const addNewIncome = () => {
            const newIncomes = [...incomes];
            newIncomes.push({
                id: incomes.length + 1,
                source: '',
                amount: '',
            });
            setState({ incomes: newIncomes });
            localStorage.setItem('incomes', JSON.stringify(newIncomes));
        };
        const removeIncome = () => {
            const newIncomes = [...incomes];
            newIncomes.pop();
            setState({ incomes: newIncomes });
            localStorage.setItem('incomes', JSON.stringify(newIncomes));
        };
        const getLastIncome = () => {
            return incomes[incomes.length - 1];
        };
        const getIncomeBeforeLast = () => {
            return incomes[incomes.length - 2];
        };
        if (getLastIncome().source && getLastIncome().amount) {
            addNewIncome();
        }
        if (
            incomes.length > 2 &&
            !getLastIncome().source &&
            !getLastIncome().amount &&
            !getIncomeBeforeLast().source &&
            !getIncomeBeforeLast().amount
        ) {
            removeIncome();
        }
    }, [incomes]);

    useEffect(() => {
        const addNewExpense = () => {
            const newExpenses = [...expenses];
            newExpenses.push({
                id: expenses.length + 1,
                source: '',
                amount: '',
            });
            setState({ expenses: newExpenses });
            localStorage.setItem('expenses', JSON.stringify(newExpenses));
        };
        const removeExpense = () => {
            const newExpenses = [...expenses];
            newExpenses.pop();
            setState({ expenses: newExpenses });
            localStorage.setItem('expenses', JSON.stringify(newExpenses));
        };
        const getLastExpense = () => {
            return expenses[expenses.length - 1];
        };
        const getExpenseBeforeLast = () => {
            return expenses[expenses.length - 2];
        };
        if (getLastExpense().source && getLastExpense().amount) {
            addNewExpense();
        }
        if (
            expenses.length > 2 &&
            !getLastExpense().source &&
            !getLastExpense().amount &&
            !getExpenseBeforeLast().source &&
            !getExpenseBeforeLast().amount
        ) {
            removeExpense();
        }
    }, [expenses]);

    return (
        <section className="mt-16 flex flex-row gap-14 justify-center items-center">
            <div className="bg-zinc-700 px-8 py-6 rounded flex flex-col justify-center items-center h-full">
                <h2 className="text-xl font-bold">Count your budget here</h2>
                <h3 className="mt-5 font-bold self-start">Choose your currency</h3>
                <ul className="mt-4 flex flex-row justify-center items-center gap-20">
                    {CURRENCY_LIST.map(item => {
                        return (
                            <li
                                key={item.id}
                                className={`cursor-pointer ${
                                    activeId === item.id ? 'text-red-400 text-xl font-bold pb-0.5' : ''
                                } hover:text-red-300`}
                                onClick={() => {
                                    setState({ activeId: item.id });
                                    localStorage.setItem('activeId', item.id);
                                }}
                            >
                                {item.name}
                            </li>
                        );
                    })}
                </ul>
                <h3 className="mt-6 font-bold self-start text-green-400">Incomes</h3>
                <div className="mt-3 px-5 py-3 bg-zinc-200 text-black rounded w-full">
                    <div className="grid grid-cols-2 text-center font-bold">
                        <span>Source</span>
                        <span>Amount</span>
                    </div>
                    <div className="mt-2 w-full bg-zinc-50 rounded">
                        <table className="w-full">
                            <tbody>
                                {incomes.map((item, index) => (
                                    <tr key={item.id} className="last:border-none border-b border-zinc-400">
                                        <td className="py-2 px-4 border-r border-zinc-400">
                                            <input
                                                type="text"
                                                className="w-full bg-zinc-50 text-black"
                                                value={item.source}
                                                onChange={e => handleIncomesSourceChange(e, index)}
                                            />
                                        </td>
                                        <td className="py-2 px-4">
                                            <input
                                                type="text"
                                                className="w-full bg-zinc-50 text-black text-right"
                                                value={item.amount}
                                                onChange={e => handleIncomesAmountChange(e, index)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {getTotalIncome() !== 0 && (
                        <div className="float-right mt-3 pr-2">
                            <span className="font-bold">Total: </span>
                            <span className="font-bold">{`${formatAmount(
                                getTotalIncome().toString(),
                            )} ${getCurrencyById(activeId)}`}</span>
                        </div>
                    )}
                </div>
                <h3 className="mt-6 font-bold self-start text-red-400">Expenses</h3>
                <div className="mt-3 px-5 py-3 bg-zinc-200 text-black rounded w-full">
                    <div className="grid grid-cols-2 text-center font-bold">
                        <span>Source</span>
                        <span>Amount</span>
                    </div>
                    <div className="mt-2 w-full bg-zinc-50 rounded">
                        <table className="w-full">
                            <tbody>
                                {expenses.map((item, index) => (
                                    <tr key={item.id} className="last:border-none border-b border-zinc-400">
                                        <td className="py-2 px-4 border-r border-zinc-400">
                                            <input
                                                type="text"
                                                className="w-full bg-zinc-50 text-black"
                                                value={item.source}
                                                onChange={e => handleExpensesSourceChange(e, index)}
                                            />
                                        </td>
                                        <td className="py-2 px-4">
                                            <input
                                                type="text"
                                                className="w-full bg-zinc-50 text-black text-right"
                                                value={item.amount}
                                                onChange={e => handleExpensesAmountChange(e, index)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {getTotalExpenses() !== 0 && (
                        <div className="float-right mt-3 pr-2">
                            <span className="font-bold">Total: </span>
                            <span className="font-bold">{`${formatAmount(
                                getTotalExpenses().toString(),
                            )} ${getCurrencyById(activeId)}`}</span>
                        </div>
                    )}
                </div>
                <div className="mt-6 self-end flex flex-row items-center">
                    <span className="font-bold">Grand Total: </span>
                    <div
                        className={`ml-2 bg-zinc-50 rounded px-4 py-1 font-bold ${
                            getGrandTotal() >= 0 ? 'text-green-700' : 'text-red-500'
                        }`}
                    >
                        {`${formatAmount(getGrandTotal().toString())} ${getCurrencyById(activeId)}`}
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-4">
                {incomes.length > 1 && (
                    <div className="bg-zinc-700 px-8 py-6 rounded flex flex-col justify-center items-center">
                        <h2 className="text-xl font-bold">Your incomes</h2>
                        <div className="mt-3 px-5 py-3 bg-zinc-200 text-black rounded w-full">
                            {incomes.length > 1 && (
                                <VictoryPie
                                    data={incomes.slice(0, -1).map(item => {
                                        return {
                                            x: item.source || '',
                                            y: Number(item.amount) || 0,
                                        };
                                    })}
                                    animate={{
                                        duration: 1500,
                                    }}
                                    style={{
                                        parent: { maxWidth: '220px', maxHeight: '220px' },
                                        labels: {
                                            fontSize: 20,
                                            fill: 'white',
                                        },
                                    }}
                                    labelRadius={({ innerRadius }) => innerRadius + 50}
                                    colorScale="qualitative"
                                />
                            )}
                        </div>
                    </div>
                )}

                {expenses.length > 1 && (
                    <div className="bg-zinc-700 px-8 py-6 rounded flex flex-col justify-center items-center">
                        <h2 className="text-xl font-bold">Your expenses</h2>
                        <div className="mt-3 px-5 py-3 bg-zinc-200 text-black rounded w-full">
                            <VictoryPie
                                data={expenses.slice(0, -1).map(item => {
                                    return {
                                        x: item.source || '',
                                        y: Number(item.amount) || 0,
                                    };
                                })}
                                animate={{
                                    duration: 1500,
                                }}
                                style={{
                                    parent: { maxWidth: '220px', maxHeight: '220px' },
                                    labels: {
                                        fontSize: 20,
                                        fill: 'white',
                                    },
                                }}
                                labelRadius={({ innerRadius }) => innerRadius + 50}
                                colorScale="warm"
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CountYourBudget;
