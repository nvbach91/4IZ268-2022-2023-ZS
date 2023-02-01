import { createContext } from 'react';
import { RowData } from '../types';

export const DataSourceContext = createContext<{
    dataSource: Array<RowData>;
    setDataSource: React.Dispatch<React.SetStateAction<RowData[]>>;
}>({
    dataSource: [],
    setDataSource: () => undefined,
});
