import { FilterOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Grid, Input, Layout, Row, Space, Typography } from 'antd';
import { useContext, useState } from 'react';
import { AddGameModal, MainColumn } from '../components';
import { TableFilterContext } from '../contexts';

const addGameButtonProps = {
    type: 'default' as const,
    icon: <PlusOutlined />,
    ghost: true,
};

export const AppHeader = () => {
    const { setTableFilterValue } = useContext(TableFilterContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                                    <Space>
                                        <Input.Search
                                            // together with Space component as a hack for vertically centering input component
                                            style={{ display: 'block' }}
                                            placeholder="Filter games"
                                            enterButton={<FilterOutlined />}
                                            onSearch={(searchValue) => {
                                                setTableFilterValue(searchValue);
                                            }}
                                            allowClear
                                        />
                                    </Space>
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
