import React, { Suspense, useState } from 'react';
import { Box, IconButton } from "@mui/material";
import menus from "./menus";
import JumboVerticalNavbar from "@jumbo/components/JumboVerticalNavbar/JumboVerticalNavbar";
import { DrawerHeader } from "@jumbo/components/JumboLayout/style";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import useJumboLayoutSidebar from "@jumbo/hooks/useJumboLayoutSidebar";
import useJumboSidebarTheme from "@jumbo/hooks/useJumboSidebarTheme";
import { SIDEBAR_STYLES, SIDEBAR_VIEWS } from "@jumbo/utils/constants/layout";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Zoom from "@mui/material/Zoom";
import Div from "@jumbo/shared/Div";
import SidebarSkeleton from "./SidebarSkeleton";
import Logo from 'app/shared/Logo';
import AdsComponent from './AdsComponent';

const Sidebar = () => {
    return (
        <React.Fragment>
            <JumboScrollbar
                autoHide
                autoHideDuration={200}
                autoHideTimeout={500}
                ads={<AdsComponent />}
            >
                <Suspense
                    fallback={
                        <Div
                            sx={{
                                display: 'flex',
                                minWidth: 0,
                                alignItems: 'center',
                                alignContent: 'center',
                                px: 3,
                                mt: 2
                            }}
                        >
                            <SidebarSkeleton />
                        </Div>
                    }
                >
                    <JumboVerticalNavbar translate items={menus} />
                </Suspense>
            </JumboScrollbar>
        </React.Fragment>
    );
};

const SidebarHeader = () => {
    const { sidebarOptions, setSidebarOptions } = useJumboLayoutSidebar();
    const { sidebarTheme } = useJumboSidebarTheme();

    const isMiniAndClosed = React.useMemo(() => {
        return sidebarOptions?.view === SIDEBAR_VIEWS.MINI && !sidebarOptions?.open;
    }, [sidebarOptions.view, sidebarOptions.open]);


    return (
        <React.Fragment>
            {
                sidebarOptions?.style !== SIDEBAR_STYLES.CLIPPED_UNDER_HEADER &&
                <DrawerHeader>
                    <Logo mini={isMiniAndClosed} mode={sidebarTheme.type} />
                    {
                        sidebarOptions?.view !== SIDEBAR_VIEWS.MINI &&
                        <Zoom in={sidebarOptions?.open}>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{ ml: 0, }}
                                onClick={() => setSidebarOptions({ open: false })}
                            >
                                <MenuOpenIcon />
                            </IconButton>
                        </Zoom>
                    }
                </DrawerHeader>
            }
        </React.Fragment>
    )
};

export default Sidebar;
