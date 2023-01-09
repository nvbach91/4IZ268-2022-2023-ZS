import React, { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import routes from './routes/Routes';
import Header from '../components/Header';

const Root = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <main className="main px-10 py-24">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path="/" element={<Navigate replace to="/homepage" />} />
                            {routes.map(({ path, Component }) => {
                                return <Route key={path} path={path} element={<Component />} />;
                            })}
                        </Routes>
                    </Suspense>
                </main>
            </BrowserRouter>
        </div>
    );
};

export default Root;
