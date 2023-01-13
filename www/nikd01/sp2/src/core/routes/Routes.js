import { lazy } from 'react';
import { REACT_URL_CONTACT, REACT_URL_HOME, REACT_URL_NOT_FOUND } from './constants';

const Homepage = lazy(() => import('../../screens/Homepage'));
const Contact = lazy(() => import('../../screens/Contact'));
const NotFound = lazy(() => import('../../screens/NotFound'));

const routes = [
    {
        path: REACT_URL_HOME,
        Component: Homepage,
    },
    {
        path: REACT_URL_CONTACT,
        Component: Contact,
    },
    {
        path: REACT_URL_NOT_FOUND,
        Component: NotFound,
    },
];

export default routes;
