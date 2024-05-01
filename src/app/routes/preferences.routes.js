import React from "react";
import Page from "@jumbo/shared/Page";
import FarmManager from "app/pages/preferences/farmManager/index";
import FarmModify from "app/pages/preferences/farmManager/FarmModify";
import NoticeManager from "app/pages/preferences/noticeManager/index";
import ModifyNotice from "app/pages/preferences/noticeManager/ModifyNotice";
import PushNotification from "app/pages/preferences/pushNotification";
import SetReminder from "app/pages/preferences/setReminder/index";
import ModifyReminder from "app/pages/preferences/setReminder/ModifyReminder";
import UserManager from "app/pages/preferences/userManager/index";
import UserModify from "app/pages/preferences/userManager/UserModify";
const Routes = [
    {
        path: "/seedling/preferences/farm-manager",
        element: <Page component={FarmManager} />
    },
    {
        path: ["/seedling/preferences/farm-manager/create", "/seedling/preferences/farm-manager/edit"],
        element: <Page component={FarmModify} />
    },
    {
        path: "/seedling/preferences/user-manager",
        element: <Page component={UserManager} />
    },
    {
        path: ["/seedling/preferences/user-manager/create", "/seedling/preferences/user-manager/edit"],
        element: <Page component={UserModify} />
    },
    {
        path: "/seedling/preferences/notice-manager",
        element: <Page component={NoticeManager} />
    },
    {
        path: ["/seedling/preferences/notice-manager/create"],
        element: <Page component={ModifyNotice} />
    },
    {
        path: "/seedling/preferences/set-reminder",
        element: <Page component={SetReminder} />
    },
    {
        path: "/seedling/preferences/set-reminder/create",
        element: <Page component={ModifyReminder} />
    },
    {
        path: "/seedling/preferences/push-notification",
        element: <Page component={PushNotification} />
    },
];

export default Routes;