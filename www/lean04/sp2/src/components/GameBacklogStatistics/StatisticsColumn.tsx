import { Col } from 'antd';
import { ReactNode } from 'react';

export const StatisticsColumn = ({ children }: { children: ReactNode }) => (
    <Col xs={24} sm={12} md={6}>
        {children}
    </Col>
);
