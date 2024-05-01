import React from "react";
import Page from "@jumbo/shared/Page";
import Profile from "app/pages/Profile/Index";
const userRoutes = [
    {
        path: "/seedling/user/profile",
        element: <Page component={Profile} />
    },
];

export default userRoutes;
