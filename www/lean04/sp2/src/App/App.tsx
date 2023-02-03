import { Layout } from 'antd';
import { AppContent } from './AppContent';
import { AppHeader } from './AppHeader';
import { ContextProviders } from './ContextProviders';

const App = () => (
    <ContextProviders>
        <Layout className="layout">
            <AppHeader />
            <AppContent />
            <Layout.Footer className="text-align-center">
                Backlog Manager ©2023 Created by Le Anh Viet Linh
            </Layout.Footer>
        </Layout>
    </ContextProviders>
);

export default App;
