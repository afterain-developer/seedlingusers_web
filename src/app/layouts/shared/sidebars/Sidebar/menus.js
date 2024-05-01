import React from "react";
import AutoAwesomeMosaicRoundedIcon from '@mui/icons-material/AutoAwesomeMosaicRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import GridViewIcon from '@mui/icons-material/GridView';
import HomeIcon from '@mui/icons-material/Home';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
let menus = [
    {
        role: ["Admin", "User"],
        label: 'HOME_TAB',
        type: "nav-item",
        uri: "/seedling/home",
        icon: <HomeIcon sx={{ fontSize: 20 }} />
    },
    {
        role: ["Admin",],
        label: 'FIELDSTab',
        type: "nav-item",
        uri: "/seedling/fields",
        icon: <GridViewIcon sx={{ fontSize: 20 }} />
    },
    {
        role: ["User"],
        label: 'NOTICE_TAB',
        type: "nav-item",
        uri: "/seedling/notice",
        icon: <MarkEmailUnreadIcon sx={{ fontSize: 20 }} />
    },
    {
        role: ["Admin", "User"],
        label: 'WORKLOG_TAB',
        type: "nav-item",
        uri: "/seedling/worklog",
        icon: <InsertInvitationIcon sx={{ fontSize: 20 }} />
    },
    {
        role: ["Admin", "User"],
        label: 'SECRET_TAB',
        type: "nav-item",
        uri: "/seedling/secrets",
        icon: <MapsHomeWorkIcon sx={{ fontSize: 20 }} />
    },
    {
        role: ["Admin"],
        label: 'PREFERENCES',
        type: "collapsible",

        icon: <SettingsIcon sx={{ fontSize: 20 }} />,
        children: [
            {
                role: ["Admin"],
                uri: "/seedling/preferences/farm-manager",
                label: "FARM_MANAGER",
                type: "nav-item"
            },
            {
                role: ["Admin"],
                uri: "/seedling/preferences/user-manager",
                label: "USER_MANAGER",
                type: "nav-item"
            },
            {
                role: ["Admin"],
                uri: "/seedling/preferences/notice-manager",
                label: "NOTICE_MANAGER",
                type: "nav-item"
            },
            {
                role: ["Admin"],
                uri: "/seedling/preferences/set-reminder",
                label: "SET_REMINDER",
                type: "nav-item"
            },
            // {
            //     role: ["Admin"],
            //     uri: "/seedling/preferences/push-notification",
            //     label: "pushnotification",
            //     type: "nav-item"
            // },
        ]
    }
]


export default menus;
