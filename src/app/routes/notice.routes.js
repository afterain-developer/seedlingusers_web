import React from "react";
import Page from "@jumbo/shared/Page";
import Notice from "app/pages/notice";
const Routes = [
    {
        path: "/seedling/notice",
        element: <Page component={Notice} />
    },
];

export default Routes;