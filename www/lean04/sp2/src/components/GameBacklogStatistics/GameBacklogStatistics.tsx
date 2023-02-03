import { Collapse, Grid, Row, Statistic } from 'antd';
import { useContext } from 'react';
import { DataSourceContext } from '../../contexts';
import { StatisticsColumn } from './StatisticsColumn';
import { getCountOf } from './utils';

export const GameBacklogStatistics = () => {
    const { dataSource } = useContext(DataSourceContext);
    const breakpoints = Grid.useBreakpoint();

    return (
        <Collapse defaultActiveKey={breakpoints.xs ? undefined : 'statistics'}>
            <Collapse.Panel header="Statistics" key="statistics">
                <Row gutter={[0, 16]}>
                    <StatisticsColumn>
                        <Statistic
                            title="Total hours in backlog"
                            value={`${getCountOf('estimatedLength', dataSource)}`}
                        />
                    </StatisticsColumn>
                    <StatisticsColumn>
                        <Statistic
                            title="Games owned"
                            value={`${getCountOf('owned', dataSource)}/${dataSource.length}`}
                        />
                    </StatisticsColumn>
                    <StatisticsColumn>
                        <Statistic
                            title="Games playing"
                            value={`${getCountOf('playing', dataSource)}/${dataSource.length}`}
                        />
                    </StatisticsColumn>
                    <StatisticsColumn>
                        <Statistic
                            title="Games finished"
                            value={`${getCountOf('finished', dataSource)}/${dataSource.length}`}
                        />
                    </StatisticsColumn>
                </Row>
            </Collapse.Panel>
        </Collapse>
    );
};
