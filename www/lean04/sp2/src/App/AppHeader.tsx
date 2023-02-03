import { FilterOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Grid, Input, Layout, Row, Space, Typography } from 'antd';
import { flow } from 'fp-ts/lib/function';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { AddGameModal, MainColumn } from '../components';
import { TableFilterContext } from '../contexts';
import { debounce } from '../utils';

const addGameButtonProps = {
    type: 'default' as const,
    icon: <PlusOutlined />,
    ghost: true,
};

export const AppHeader = () => {
    const { setTableFilterValue } = useContext(TableFilterContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const debouncedFilterHandler = debounce(
        flow(({ target }: ChangeEvent<HTMLInputElement>) => target.value, setTableFilterValue),
        500
    );

    useEffect(() => () => {
        debouncedFilterHandler.clear();
    });

    const handleAddButtonClick = () => {
        setIsModalOpen(true);
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
    };

    const breakpoints = Grid.useBreakpoint();

    return (
        <>
            <Layout.Header style={{ padding: 0 }}>
                <Row>
                    <MainColumn>
                        <Row justify="space-between">
                            <Col xs={4} sm={8}>
                                <Typography.Text className="logo" strong>
                                    {breakpoints.xs ? 'logo' : 'insert cool logo here'}
                                </Typography.Text>
                            </Col>
                            <Col className="text-align-right" xs={20} sm={16}>
                                <Space size="large">
                                    <Input
                                        placeholder="Filter games"
                                        prefix={<FilterOutlined />}
                                        onChange={debounce(
                                            flow((event) => event.target.value, setTableFilterValue),
                                            500
                                        )}
                                        allowClear
                                    />
                                    {breakpoints.sm ? (
                                        <Button {...addGameButtonProps} onClick={handleAddButtonClick}>
                                            Add games
                                        </Button>
                                    ) : (
                                        <Button {...addGameButtonProps} onClick={handleAddButtonClick} />
                                    )}
                                </Space>
                            </Col>
                        </Row>
                    </MainColumn>
                </Row>
            </Layout.Header>
            <AddGameModal open={isModalOpen} onCancel={handleModalCancel} />
        </>
    );
};
