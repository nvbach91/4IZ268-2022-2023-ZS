import { List, Skeleton } from 'antd';
import { array, option } from 'fp-ts';
import { constUndefined, flow, pipe } from 'fp-ts/lib/function';
import { GameInfo } from '../../types';
import { AddGameButton } from './AddGameButton';
import { GameDescription } from './GameDescription';

interface Loading {
    loading?: boolean;
}

const getOptimizedImageUrl = flow(
    (url: string) => url.split('/'),
    array.insertAt(4, 'resize/420/-'),
    option.map((urlParts) => urlParts.join('/'))
);

export const GameListItem = ({ loading, ...gameInfo }: GameInfo & Loading) => (
    <List.Item actions={[<AddGameButton key={`add-${gameInfo.name}-button`} gameInfo={gameInfo} loading={loading} />]}>
        {loading ? (
            <Skeleton loading active />
        ) : (
            <List.Item.Meta
                avatar={pipe(
                    option.fromNullable(gameInfo.background_image),
                    option.chain(getOptimizedImageUrl),
                    option.map((optimizedImageUrl) => (
                        <img key={optimizedImageUrl} className="game-img" src={optimizedImageUrl} alt={gameInfo.name} />
                    )),
                    option.getOrElseW(constUndefined)
                )}
                title={gameInfo.name}
                description={<GameDescription {...gameInfo} />}
            />
        )}
    </List.Item>
);
