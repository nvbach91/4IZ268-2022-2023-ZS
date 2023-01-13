import React, { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import routes from './routes/Routes';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Root = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <main className="main blocked py-32 flex-grow-1">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path="*" element={<Navigate to="/not-found" />} />
                            <Route path="/" element={<Navigate replace to="/homepage" />} />
                            {routes.map(({ path, Component }) => {
                                return <Route key={path} path={path} element={<Component />} />;
                            })}
                        </Routes>
                    </Suspense>
                </main>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default Root;
