import React from "react";
import Page from "@jumbo/shared/Page";
import Worklog from "app/pages/worklog/index";
import ModifyWorklog from "app/pages/worklog/ModifyWorklog";
const Routes = [
    {
        path: "/seedling/worklog",
        element: <Page component={Worklog} />
    },
    {
        path: "/seedling/worklog/create",
        element: <Page component={ModifyWorklog} />
    },
    {
        path: "/seedling/worklog/edit",
        element: <Page component={ModifyWorklog} />
    },
];

export default Routes;