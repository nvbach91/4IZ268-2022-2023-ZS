import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Checkbox, InputNumber, Popconfirm, Space, Tooltip } from 'antd';
import { NotificationInstance } from 'antd/es/notification/interface';
import { ColumnsType } from 'antd/es/table';
import { array, boolean, number, option, string } from 'fp-ts';
import { flow } from 'fp-ts/lib/function';
import { GameInfo, RowData } from '../../types';

interface UseColumnMappingArgs {
    dataSource: Array<RowData>;
    setDataSource: React.Dispatch<React.SetStateAction<RowData[]>>;
    notificationInstance: NotificationInstance;
}

export const createColumnMapping = ({
    dataSource,
    setDataSource,
    notificationInstance,
}: UseColumnMappingArgs): ColumnsType<RowData> => {
    const updateDataSource = (slug: string, updated: RowData) =>
        setDataSource(
            flow(
                array.updateAt<RowData>(
                    dataSource.findIndex((item) => item.slug === slug),
                    updated
                ),
                option.getOrElse<Array<RowData>>(() => [])
            )
        );

    const handleDelete = (slug: GameInfo['slug']) => {
        const newData = dataSource.filter((item) => item.slug !== slug);
        const deletedData = dataSource.find((item) => item.slug === slug);
        setDataSource(newData);
        notificationInstance.info({ message: `${deletedData?.name} removed from backlog` });
    };

    return [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => string.Ord.compare(a.name, b.name),
            sortDirections: ['ascend', 'descend', 'ascend'],
        },
        {
            title: 'Est. length (hours)',
            dataIndex: 'estimatedLength',
            key: 'estimatedLength',
            align: 'center',
            sorter: (a, b) => number.Ord.compare(a.estimatedLength ?? 0, b.estimatedLength ?? 0),
            sortDirections: ['ascend', 'descend', 'ascend'],
            responsive: ['lg'],
            render: (_, { slug, name, estimatedLength, ...other }) => (
                <Space>
                    <InputNumber
                        value={estimatedLength ?? 0}
                        onChange={(value) => {
                            if (value !== null) {
                                updateDataSource(slug, { ...other, slug, name, estimatedLength: value });
                            }
                        }}
                    />
                    <Tooltip
                        title={
                            <span>
                                Find on{' '}
                                <a
                                    href={`https://howlongtobeat.com/?${new URLSearchParams({
                                        q: name,
                                    }).toString()}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    howlongtobeat.com
                                </a>
                            </span>
                        }
                    >
                        <InfoCircleOutlined />
                    </Tooltip>
                </Space>
            ),
        },
        {
            title: 'Released',
            dataIndex: 'released',
            key: 'released',
            sorter: (a, b) => string.Ord.compare(a.released ?? string.empty, b.released ?? string.empty),
            sortDirections: ['ascend', 'descend', 'ascend'],
            responsive: ['xl'],
        },
        {
            title: 'Metacritic',
            dataIndex: 'metacritic',
            key: 'metacritic',
            sorter: (a, b) => number.Ord.compare(a.metacritic ?? 0, b.metacritic ?? 0),
            sortDirections: ['descend', 'ascend', 'descend'],
            responsive: ['xl'],
        },

        {
            title: 'Owned',
            dataIndex: 'owned',
            key: 'owned',
            align: 'center',
            sorter: (a, b) => boolean.Ord.compare(a.owned ?? false, b.owned ?? false),
            sortDirections: ['ascend', 'descend', 'ascend'],
            render: (_, { slug, owned, playing, ...other }) => (
                <Checkbox
                    checked={owned}
                    onChange={(event) => {
                        updateDataSource(slug, {
                            ...other,
                            slug,
                            owned: event.target.checked,
                            playing: event.target.checked ? playing : false,
                        });
                    }}
                />
            ),
        },
        {
            title: 'Excitement',
            dataIndex: 'excitement',
            key: 'excitement',
            align: 'center',
            sorter: (a, b) => number.Ord.compare(a.excitement ?? 0, b.excitement ?? 0),
            sortDirections: ['ascend', 'descend', 'ascend'],
            responsive: ['md'],
            render: (_, { slug, excitement, ...other }) => (
                <InputNumber
                    value={excitement ?? 0}
                    onChange={(value) => {
                        if (value !== null) {
                            updateDataSource(slug, { ...other, slug, excitement: value });
                        }
                    }}
                />
            ),
        },
        {
            title: 'Playing',
            dataIndex: 'playing',
            key: 'playing',
            align: 'center',
            sorter: (a, b) => boolean.Ord.compare(a.playing ?? false, b.playing ?? false),
            sortDirections: ['ascend', 'descend', 'ascend'],
            responsive: ['md'],
            render: (_, { slug, owned, playing, ...other }) => (
                <Checkbox
                    disabled={!owned}
                    checked={playing}
                    onChange={(event) => {
                        updateDataSource(slug, {
                            ...other,
                            slug,
                            owned,
                            finished: false,
                            playing: event.target.checked,
                        });
                    }}
                />
            ),
        },
        {
            title: 'Finished',
            dataIndex: 'finished',
            key: 'finished',
            align: 'center',
            sorter: (a, b) => boolean.Ord.compare(a.finished ?? false, b.finished ?? false),
            sortDirections: ['ascend', 'descend', 'ascend'],
            render: (_, { slug, finished, ...other }) => (
                <Checkbox
                    checked={finished}
                    onChange={(event) => {
                        updateDataSource(slug, {
                            ...other,
                            slug,
                            playing: false,
                            finished: event.target.checked,
                        });
                    }}
                />
            ),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            responsive: ['lg'],
            render: (_, { name, slug }) =>
                dataSource.length >= 1 ? (
                    <Popconfirm
                        title={`Are you sure you want to delete "${name}"?`}
                        onConfirm={() => handleDelete(slug)}
                    >
                        <Button type="link">Delete</Button>
                    </Popconfirm>
                ) : null,
        },
    ];
};
