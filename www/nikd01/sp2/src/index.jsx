import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './core/Root';
import './assets/styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
);
