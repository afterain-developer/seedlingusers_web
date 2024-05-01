import React from 'react';
import PropTypes from 'prop-types';

import { CssBaseline, Toolbar, } from "@mui/material";
import useJumboLayoutSidebar from "@jumbo/hooks/useJumboLayoutSidebar";
import { SIDEBAR_STYLES, SIDEBAR_VARIANTS, SIDEBAR_VIEWS } from "@jumbo/utils/constants/layout";
import JumboLayoutHeader from "./JumboLayoutHeader";
import JumboLayoutFooter from "./JumboLayoutFooter";
import JumboLayoutSidebar from "./JumboLayoutSidebar";
import Div from "@jumbo/shared/Div";
import useJumboLayoutHeader from "@jumbo/hooks/useJumboLayoutHeader";
import useJumboLayoutRoot from "@jumbo/hooks/useJumboLayoutRoot";
import useJumboLayoutContent from "@jumbo/hooks/useJumboLayoutContent";
import HeaderLayout from './JumboLayoutHeader/HeaderLayout';
import { useLocation } from 'react-router-dom';

import { useState } from 'react';
import { useEffect } from 'react';
import SideBarButton from 'app/layouts/shared/headers/Header/SideBarButton';

const JumboLayout = (props) => {
    const { sidebarOptions } = useJumboLayoutSidebar();
    const { headerOptions } = useJumboLayoutHeader();
    const { rootOptions } = useJumboLayoutRoot();
    const { contentOptions } = useJumboLayoutContent();
    const location = useLocation()

    const contentMargin = React.useMemo(() => {
        if (sidebarOptions?.variant === SIDEBAR_VARIANTS.TEMPORARY) {
            return 0;
        } else if (sidebarOptions?.view === SIDEBAR_VIEWS.MINI) {
            return sidebarOptions?.minWidth;
        }
        return sidebarOptions?.open ? sidebarOptions?.width : 0;
    }, [
        sidebarOptions?.open,
        sidebarOptions?.width,
        sidebarOptions?.minWidth,
        sidebarOptions?.view,
        sidebarOptions?.style,
        sidebarOptions?.variant,
    ]);

    const headerHeightProps = React.useMemo(() => {
        if (props?.headerSx?.height) {
            return { height: props?.headerSx?.height }
        }
        return {};
    }, [props?.headerSx]);

    var marginTop = { marginTop: '0px' }
    let user = localStorage.getItem("farm")
    if (user !== null) {
        marginTop = { marginTop: '60px' }
    }
    const token = localStorage.getItem('token')

    return (
        <>
            <Div
                sx={{
                    display: 'flex',
                    flex: 1,
                    minWidth: 0,
                    minHeight: '100%',
                    flexDirection: 'column',
                    // ...rootOptions?.sx
                }}
                className="CmtLayout-root"
            >


                <CssBaseline />
                {
                    sidebarOptions?.style === SIDEBAR_STYLES.CLIPPED_UNDER_HEADER &&
                    <JumboLayoutHeader sx={props.headerSx}>
                        {props.header}
                    </JumboLayoutHeader>
                }

                < HeaderLayout />


                <Div
                    sx={{
                        display: 'flex',
                        flex: 1,
                        minWidth: 0,
                        position: 'relative',
                    }}
                    className="CmtLayout-wrapper"
                >

                    <JumboLayoutSidebar headerHeightProps={headerHeightProps}>
                        {props.sidebar}
                    </JumboLayoutSidebar>
                    <Div
                        sx={{
                            display: 'flex',
                            minWidth: 0,
                            flex: 1,
                            flexDirection: 'column',
                            minHeight: '100%',
                            marginLeft: {
                                sm: `${contentMargin}px`
                            },
                            transition: theme => theme.transitions.create(['margin-left']),
                        }}
                        className="CmtLayout-main"
                    >


                        <>
                            <JumboLayoutHeader sx={{ ...props.headerSx, marginTop: marginTop }}>
                                {props.header}
                            </JumboLayoutHeader>
                        </>
                        {
                            !headerOptions.hide && headerOptions.fixed &&
                            <Toolbar sx={{ ...headerHeightProps }} />
                        }
                        {location.pathname == '/seedling/map-view' ?
                            <Div
                                sx={{

                                    display: 'flex',
                                    marginTop: marginTop,
                                    backgroundColor: "#F5F7FA",
                                    minWidth: 0,
                                    flex: 1,
                                    flexDirection: 'column',
                                }}
                            >
                                {props.children}
                            </Div> :
                            <Div
                                sx={{

                                    display: 'flex',
                                    marginTop: marginTop,
                                    backgroundColor: "#F5F7FA",
                                    minWidth: 0,
                                    flex: 1,
                                    flexDirection: 'column',
                                    py: 4,
                                    px: { lg: 6, xs: 4 },
                                    ...(contentOptions?.sx ?? {})
                                }}
                                className="CmtLayout-content"
                            >
                                {props.children}
                            </Div>}
                        <JumboLayoutFooter>
                            {props.footer}
                        </JumboLayoutFooter>
                    </Div>
                </Div>
            </Div >
        </>
    );
};

JumboLayout.propTypes = {
    header: PropTypes.node,
    headerSx: PropTypes.object,
    sidebar: PropTypes.node,
    footer: PropTypes.node,
    children: PropTypes.node,
};

export default JumboLayout;