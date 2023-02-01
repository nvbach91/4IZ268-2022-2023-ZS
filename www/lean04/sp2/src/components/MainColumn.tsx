import { Col } from 'antd';
import { ReactNode } from 'react';

const mainColProps = {
    xs: { span: 22, offset: 1 },
    xl: { span: 20, offset: 2 },
    xxl: { span: 16, offset: 4 },
};

interface MainColumnProps {
    className?: string;
    children: ReactNode;
}

export const MainColumn = ({ className, children }: MainColumnProps) => (
    <Col className={className} {...mainColProps}>
        {children}
    </Col>
);
