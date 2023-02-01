import { Layout, Row } from 'antd';
import { GameBacklogStatistics, GameBacklogTable, MainColumn } from '../components';

export const AppContent = () => (
    <Layout.Content>
        <Row gutter={[0, 12]}>
            <MainColumn>
                <GameBacklogStatistics />
            </MainColumn>
            <MainColumn>
                <GameBacklogTable />
            </MainColumn>
        </Row>
    </Layout.Content>
);
