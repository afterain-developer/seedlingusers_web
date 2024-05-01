import React from "react";
import Page from "@jumbo/shared/Page";
import Home from "app/pages/home/index";
const Routes = [
    {
        path: "/seedling/home",
        element: <Page component={Home} />
    },
];

export default Routes;