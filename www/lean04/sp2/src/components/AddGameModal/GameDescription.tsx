import { Descriptions } from 'antd';
import { array } from 'fp-ts';
import { pipe } from 'fp-ts/function';
import { Fragment } from 'react';
import { GameInfo } from '../../types';

export const GameDescription = ({ name, released, platforms, genres, metacritic }: GameInfo) => (
    <Descriptions>
        {released ? <Descriptions.Item label="Released on">{released}</Descriptions.Item> : null}
        {platforms ? (
            <Descriptions.Item label="Platforms">
                {pipe(
                    platforms,
                    array.mapWithIndex((index, { platform }) =>
                        index === 0
                            ? [<Fragment key={platform.name}>{platform.name}</Fragment>]
                            : [
                                  <br key={`${name}-platform-br-${index}`} />,
                                  <Fragment key={platform.name}>{platform.name}</Fragment>,
                              ]
                    )
                )}
            </Descriptions.Item>
        ) : null}
        {genres ? (
            <Descriptions.Item label="Genres">
                {pipe(
                    genres,
                    array.chainWithIndex((index, { name: genre }) =>
                        index === 0
                            ? [<Fragment key={genre}>{genre}</Fragment>]
                            : [<br key={`${name}-genre-br-${index}`} />, <Fragment key={genre}>{genre}</Fragment>]
                    )
                )}
            </Descriptions.Item>
        ) : null}
        {metacritic ? <Descriptions.Item label="Metacritic">{metacritic}</Descriptions.Item> : null}
    </Descriptions>
);
