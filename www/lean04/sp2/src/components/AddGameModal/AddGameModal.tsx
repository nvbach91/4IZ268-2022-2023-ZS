import { Button, Form, List, message, Modal, ModalProps } from 'antd';
import { array } from 'fp-ts';
import { useState } from 'react';
import { rawg } from '../../api';
import { GameInfo } from '../../types';
import { GameListItem } from './GameListItem';
import { SearchGamesForm } from './SearchGamesForm';

interface Loading {
    loading?: boolean;
}

export const AddGameModal = (props: ModalProps) => {
    const [results, setResults] = useState<Array<GameInfo & Loading>>([]);
    const [nextSearchUrl, setNextSearchUrl] = useState<string | null>(null);

    const [isFetching, setIsFetching] = useState(false);
    const [isFetchingMore, setIsFetchingMore] = useState(false);

    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const handleSearch = (searchValue: string) => {
        setIsFetching(true);
        rawg({ search: searchValue, page: 1, pageSize: 10 })
            .then(({ data }) => {
                setResults(data.results);
                setNextSearchUrl(data.next);
            })
            .catch((error) => {
                messageApi.open({
                    type: 'error',
                    content: error.message,
                });
            })
            .finally(() => {
                setIsFetching(false);
            });
    };

    const createSearchMoreHandler = (url: string) => () => {
        setIsFetchingMore(true);
        setResults((currentGames) => [
            ...currentGames,
            ...array.replicate(10, {
                loading: true,
            } as GameInfo & Loading),
        ]);
        rawg(url)
            .then(({ data }) => {
                setResults((currentGames) => [...currentGames.slice(0, -10), ...data.results]);
                setNextSearchUrl(data.next);
            })
            .catch((error) => {
                messageApi.open({
                    type: 'error',
                    content: error.message,
                });
            })
            .finally(() => {
                setIsFetchingMore(false);
            });
    };

    const loadMore =
        nextSearchUrl && !isFetchingMore ? (
            <div className="margin-top-small text-align-center">
                <Button onClick={createSearchMoreHandler(nextSearchUrl)}>Load more</Button>
            </div>
        ) : null;

    return (
        <>
            {contextHolder}
            <Modal
                title="Add games"
                width={1024}
                footer={null}
                open={props.open}
                onCancel={(event) => {
                    if (props.onCancel) {
                        props.onCancel(event);
                    }
                    form.resetFields();
                    setResults([]);
                    setNextSearchUrl(null);
                }}
            >
                <SearchGamesForm form={form} isFetching={isFetching} handleSearch={handleSearch} />
                <List
                    size="small"
                    loading={isFetching}
                    loadMore={loadMore}
                    itemLayout="horizontal"
                    dataSource={results}
                    renderItem={GameListItem}
                />
            </Modal>
        </>
    );
};
