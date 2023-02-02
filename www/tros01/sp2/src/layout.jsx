import { Button } from '@blueprintjs/core';

import PagesView from './content/PagesView';
import TopBar from "./navigace/NavBar";
import Config from './Config';
import { useIsSignedIn } from "./scripts/func";


function Layout() {
    const [isSignedIn] = useIsSignedIn();
    return (
        <>
            <TopBar />
            {isSignedIn && <div><PagesView /> </div>}
            {!isSignedIn && <><Button text=":)" /><Config /></>}
        </>)
}

export default Layout;