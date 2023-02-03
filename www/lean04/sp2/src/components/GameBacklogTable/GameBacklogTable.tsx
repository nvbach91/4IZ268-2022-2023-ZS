import { notification, Table } from 'antd';
import { string } from 'fp-ts';
import { useContext } from 'react';
import { DataSourceContext, TableFilterContext } from '../../contexts';
import { normalizeString } from '../../utils';
import { createColumnMapping } from './createColumnMapping';

export const GameBacklogTable = () => {
    const [notificationInstance, contextHolder] = notification.useNotification();
    const { tableFilterValue } = useContext(TableFilterContext);
    const { dataSource, setDataSource } = useContext(DataSourceContext);

    return (
        <>
            {contextHolder}
            <Table
                rowKey="slug"
                columns={createColumnMapping({ dataSource, setDataSource, notificationInstance })}
                dataSource={
                    tableFilterValue === string.empty
                        ? dataSource
                        : dataSource.filter(({ name }) =>
                              normalizeString(name).includes(normalizeString(tableFilterValue))
                          )
                }
                pagination={{ position: ['topRight', 'bottomRight'] }}
            />
        </>
    );
};
