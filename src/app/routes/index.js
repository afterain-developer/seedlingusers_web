import React from "react";
import Page from "@jumbo/shared/Page";

import Auth from './middleware/Auth'

import AuthMiddleware from './middleware/Admin/Auth'
import AdminMiddleware from './middleware/Admin/Admin'
import UserMiddleware from './middleware/Admin/User'
import Login from "../pages/auth-pages/Login";
import UserLogin from "../pages/auth-pages/UserLogin";
import forgotPassword from "app/pages/auth-pages/ForgotPassword";
import resetPassword from "app/pages/auth-pages/ChangePassword";
import FarmModify from "app/pages/auth-pages/Register/FarmModify";

import userRoutes from "./user.routes";
import homeRoutes from "./home.routes";
import fieldsRoutes from "./fields.routes";
import preferencesRoutes from "./preferences.routes";
import secretsRoutes from "./secrets.routes";
import worklogRoutes from "./worklog.routes";
import noticeRoutes from "./notice.routes";



/**
 routes which you want to make accessible to both authenticated and anonymous users
 **/
const routesForPublic = [
    ...userRoutes,
];

/**
 routes only accessible to authenticated users
 **/

const routesForAuthenticatedOnly = [
    {
        middleware: [
            {
                element: Auth,
                fallbackPath: "/admin/login"
            },
        ],
        routes: [
            {
                middleware: [
                    {
                        element: AuthMiddleware,
                        fallbackPath: "/admin/login"
                    }
                ],
                routes: [
                    ...homeRoutes,
                    ...worklogRoutes,
                    ...secretsRoutes,
                    {
                        path: "/admin/login",
                        element: <Page component={Login} />
                    },
                ]
            },
            {
                middleware: [
                    {
                        element: AdminMiddleware,
                        fallbackPath: "/admin/login"
                    }
                ],
                routes: [
                    ...fieldsRoutes,
                    ...preferencesRoutes,
                    {
                        path: "/admin/login",
                        element: <Page component={Login} />
                    },
                ]
            },
            {
                middleware: [
                    {
                        element: UserMiddleware,
                        fallbackPath: "/user/login"
                    }
                ],
                routes: [
                    ...noticeRoutes,
                    {
                        path: "/user/login",
                        element: <Page component={UserLogin} />
                    },
                ]
            },
        ]
    },
];

/**
 routes only accessible when user is anonymous
 **/

const routesForNotAuthenticatedOnly = [
    {
        path: "/admin/login",
        element: <Page component={Login} layout={"solo-page"} disableSmLogin={true} />
    },
    {
        path: "/user/login",
        element: <Page component={UserLogin} layout={"solo-page"} disableSmLogin={true} />
    },
    {
        path: "/register",
        element: <Page component={FarmModify} layout={"solo-page"} disableSmLogin={true} />
    },
    {
        path: "/forgot-password",
        element: <Page component={forgotPassword} layout={"solo-page"} disableSmLogin={true} />
    },
    {
        path: "/reset-password",
        element: <Page component={resetPassword} layout={"solo-page"} disableSmLogin={true} />
    },
    {
        path: "/",
        element: <Page component={Login} />
    },
    {
        path: "*",
        element: <Page component={Login} />
    },
];

const routes = [
    ...routesForPublic,
    ...routesForNotAuthenticatedOnly,
    ...routesForAuthenticatedOnly
];

export { routes as default, routesForPublic, routesForNotAuthenticatedOnly, routesForAuthenticatedOnly };
