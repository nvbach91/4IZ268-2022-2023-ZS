import * as React from "react";
import Prep from './Login'
import NtbSelect from "./NtbSelect";
import SectionSelect from './SectionSelect'
import { useAppContext } from '../Conext';

import {
    Button,
    Navbar,
    NavbarDivider,
    NavbarGroup,
} from "@blueprintjs/core";



function TopBar() {

    const cntx = useAppContext();
    const ntbs = cntx.notebooks;

    return (<div>
        <Navbar>
            <NavbarGroup>
                <Prep />
                <NavbarDivider />
                <NtbSelect notebooks={ntbs} />
                <NavbarDivider />
                <SectionSelect />
            </NavbarGroup>
        </Navbar>
    </div>)
}

export default TopBar;