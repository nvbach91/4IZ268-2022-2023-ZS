import { Breadcrumb, Icon } from "@blueprintjs/core";
import { Breadcrumbs2 } from "@blueprintjs/popover2";
import * as React from "react";

const BREADCRUMBS = [
    { href: "/users", icon: "folder-close", text: "Users" },
    { href: "/users/me", icon: "folder-close", text: "Janet" },
    { icon: "document", text: "image.jpg" },
];


function SectionSelect() {
    return (
        <Breadcrumbs2
            currentBreadcrumbRenderer={renderCurrentBreadcrumb}
            items={BREADCRUMBS}
        />
    );
    function renderCurrentBreadcrumb({ text, ...restProps }) {
        // customize rendering of last breadcrumb
        return <Breadcrumb {...restProps}>{text} <Icon icon="star" /></Breadcrumb>;
    };
}

export default SectionSelect;