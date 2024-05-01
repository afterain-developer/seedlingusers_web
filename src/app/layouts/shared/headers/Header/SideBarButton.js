import React, { useEffect } from 'react';
import useJumboLayoutSidebar from "@jumbo/hooks/useJumboLayoutSidebar";
import { IconButton, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Logo from "../../../../shared/Logo";
import { SIDEBAR_STYLES, SIDEBAR_VARIANTS } from "@jumbo/utils/constants";
import useJumboHeaderTheme from "@jumbo/hooks/useJumboHeaderTheme";
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const SideBarButton = () => {
    const { sidebarOptions, setSidebarOptions } = useJumboLayoutSidebar();
    const { headerTheme } = useJumboHeaderTheme();

    useEffect(() => {
        setSidebarOptions({ open: true })
    }, [])

    return (
        <>

            {
                (
                    sidebarOptions.style === SIDEBAR_STYLES.CLIPPED_UNDER_HEADER
                    || sidebarOptions.style === SIDEBAR_STYLES.FULL_HEIGHT
                    || sidebarOptions.variant === SIDEBAR_VARIANTS.TEMPORARY
                    || (sidebarOptions.variant === SIDEBAR_VARIANTS.PERSISTENT && !sidebarOptions.open)
                ) &&
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{
                        ml: sidebarOptions.style === SIDEBAR_STYLES.CLIPPED_UNDER_HEADER ? -2 : 0,
                        mr: 3,
                    }}
                    onClick={() => setSidebarOptions({ open: !sidebarOptions.open })}
                >
                    {
                        sidebarOptions?.open ? <MenuOpenIcon /> : <MenuIcon />
                    }
                </IconButton>
            }
            {
                sidebarOptions?.style === SIDEBAR_STYLES.CLIPPED_UNDER_HEADER &&
                <Logo sx={{ mr: 3 }} mode={headerTheme.type ?? "light"} />
            }

        </>
    );
};

export default SideBarButton;
