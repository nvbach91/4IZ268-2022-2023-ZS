import { Button, notification } from 'antd';
import { array } from 'fp-ts';
import { useContext } from 'react';
import { DataSourceContext } from '../../contexts';
import { GameInfo } from '../../types';

interface AddGameButtonProps {
    loading?: boolean;
    gameInfo: GameInfo;
}

// eslint-disable-next-line camelcase
const filterGameInfoFields = ({ background_image, genres, metacritic, name, platforms, released, slug }: GameInfo) => ({
    // eslint-disable-next-line camelcase
    background_image,
    genres,
    metacritic,
    name,
    platforms,
    released,
    slug,
});

export const AddGameButton = ({ gameInfo, loading }: AddGameButtonProps) => {
    const [notificationApi, contextHolder] = notification.useNotification();
    const { dataSource, setDataSource } = useContext(DataSourceContext);

    const handleClick = () => {
        setDataSource(array.prepend(filterGameInfoFields(gameInfo)));
        notificationApi.success({ message: `${gameInfo.name} added to backlog` });
    };

    return (
        <>
            {contextHolder}
            <Button
                disabled={loading || dataSource.some((data) => data.slug === gameInfo.slug)}
                type="primary"
                onClick={handleClick}
            >
                Add
            </Button>
        </>
    );
};
