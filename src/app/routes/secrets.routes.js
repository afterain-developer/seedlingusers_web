import React from "react";
import Page from "@jumbo/shared/Page";
import Secrets from "app/pages/secrets/index";
const Routes = [
    {
        path: "/seedling/secrets",
        element: <Page component={Secrets} />
    },
];

export default Routes;