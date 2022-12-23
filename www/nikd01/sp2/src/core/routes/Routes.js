import { lazy } from 'react';
import { REACT_URL_CONTACT, REACT_URL_HOME } from './constants';

const Homepage = lazy(() => import('../../screens/Homepage'));
const Contact = lazy(() => import('../../screens/Contact'));

const routes = [
    {
        path: REACT_URL_HOME,
        Component: Homepage,
    },
    {
        path: REACT_URL_CONTACT,
        Component: Contact,
    },
];

export default routes;
