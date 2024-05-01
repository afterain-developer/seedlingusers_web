import React from "react";
import Page from "@jumbo/shared/Page";
import Fields from "app/pages/fields/index";
import FieldDetails from "app/pages/fields/FieldDetails";
const Routes = [
    {
        path: "/seedling/fields",
        element: <Page component={Fields} />
    },
    {
        path: "/seedling/field/detail",
        element: <Page component={FieldDetails} />
    },
];

export default Routes;