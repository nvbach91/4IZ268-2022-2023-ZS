import { string } from 'fp-ts';
import { createContext } from 'react';

export const TableFilterContext = createContext<{
    tableFilterValue: string;
    setTableFilterValue: React.Dispatch<React.SetStateAction<string>>;
}>({
    tableFilterValue: string.empty,
    setTableFilterValue: () => undefined,
});
