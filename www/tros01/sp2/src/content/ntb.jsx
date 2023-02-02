import { useEffect, useState } from 'react'
import { Button } from '@blueprintjs/core';

import {CallG} from '../scripts/GS'
import { useAppContext } from '../Conext';



export default function Ntbks(props) {

    /* const cntx = useAppContext();
    const ejj = async () => {
        
        cntx.notebooks.map((i) => console.log(i.displayName));
    }
    ejj(); */
    const graphPath = '/me/onenote/notebooks/1-5119d42c-94f1-4a90-b906-a553311a0afe/';
    const cc = () => CallG(graphPath);
return (<Button onClick={cc}>callG</Button>);
}

