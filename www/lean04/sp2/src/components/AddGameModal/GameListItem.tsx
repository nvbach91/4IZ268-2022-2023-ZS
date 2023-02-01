import { List, Skeleton } from 'antd';
import { GameInfo } from '../../types';
import { AddGameButton } from './AddGameButton';
import { GameDescription } from './GameDescription';

interface Loading {
    loading?: boolean;
}

export const GameListItem = ({ loading, ...gameInfo }: GameInfo & Loading) => (
    <List.Item actions={[<AddGameButton key={`add-${gameInfo.name}-button`} gameInfo={gameInfo} loading={loading} />]}>
        {loading ? (
            <Skeleton loading active />
        ) : (
            <List.Item.Meta title={gameInfo.name} description={<GameDescription {...gameInfo} />} />
        )}
    </List.Item>
);
