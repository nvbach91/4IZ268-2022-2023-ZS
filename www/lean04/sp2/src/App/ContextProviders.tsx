import { string } from 'fp-ts';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { DataSourceContext, TableFilterContext } from '../contexts';
import { RowData } from '../types';

const gameDataSourceKey = 'gameDataSource';

export const ContextProviders = ({ children }: { children: ReactNode }) => {
    const persistedDataSource = window.localStorage.getItem(gameDataSourceKey);
    const [dataSource, setDataSource] = useState<Array<RowData>>(
        persistedDataSource ? JSON.parse(persistedDataSource) : []
    );

    const [tableFilterValue, setTableFilterValue] = useState(string.empty);

    useEffect(() => {
        window.localStorage.setItem(gameDataSourceKey, JSON.stringify(dataSource));
    }, [dataSource]);

    const memoizedDataSourceContextValue = useMemo(() => ({ dataSource, setDataSource }), [dataSource, setDataSource]);
    const memoizedTableFilterContextValue = useMemo(
        () => ({ tableFilterValue, setTableFilterValue }),
        [tableFilterValue, setTableFilterValue]
    );

    return (
        <DataSourceContext.Provider value={memoizedDataSourceContextValue}>
            <TableFilterContext.Provider value={memoizedTableFilterContextValue}>
                {children}
            </TableFilterContext.Provider>
        </DataSourceContext.Provider>
    );
};
