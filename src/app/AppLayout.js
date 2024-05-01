import React from 'react';
import JumboLayoutProvider from "@jumbo/components/JumboLayout/JumboLayoutProvider";
import JumboContentLayoutProvider from "@jumbo/components/JumboContentLayout/JumboContentLayoutProvider";
import useJumboApp from "@jumbo/hooks/useJumboApp";
import { LAYOUTS } from "./utils/constants/layouts";
import { config } from "./config/main";
import useJumboAuth from "@jumbo/hooks/useJumboAuth";
import { NotificationContainer } from 'react-notifications';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useTheme } from '@emotion/react';
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import { useJumboSidebarTheme } from '@jumbo/hooks';
import { useEffect } from 'react';
import { alpha } from '@mui/material';
import { lightenColor, customSetThemeColors } from 'app/config/colorChange';
import { GET_USER } from '@jumbo/constants/ActionTypes';

const AppLayout = (props) => {
    const { activeLayout } = useJumboApp();
    const { isLoading } = useJumboAuth();
    const { error, message, loading } = useSelector((state) => state.ApiReducer)
    const theme = useTheme();
    const dispatch = useDispatch()
    const userData = JSON.parse(localStorage.getItem("user"))
    if (userData !== null && userData !== undefined) {
        if (userData?.role) {
            let tempObject = {
                role: userData?.role
            }
            dispatch({ type: GET_USER, payload: tempObject });
        }
    }

    const { sidebarTheme, setSidebarTheme } = useJumboSidebarTheme();
    const { themes, setTheme } = useJumboTheme();

    if (!activeLayout) {
        throw Error("AppLayout > No activeLayout is set.");
    }

    const sweetAlerts = (icon, message) => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });

        Toast.fire({
            icon: icon,
            title: message,
            background: theme.palette.background.paper,
        });
    };


    const LayoutComponent = React.useMemo(() => {
        const layoutIndex = LAYOUTS.findIndex(layout => layout.name === activeLayout);

        if (layoutIndex >= 0) {
            return LAYOUTS[layoutIndex].component;
        }

        throw Error("No activeLayout is set yet.");
    }, [activeLayout]);

    let ThemeColor = (localStorage.getItem("ThemeColor")) || "#92d050";

    useEffect(async () => {
        if (ThemeColor !== null && ThemeColor !== undefined) {
            setSidebarTheme({
                ...sidebarTheme,
                overlay: {
                    bgColor: ThemeColor,
                    opacity: 0.85
                },
            })

            let UiChanges = await customSetThemeColors(ThemeColor, theme)
            setTheme({
                ...theme,
                ...UiChanges
            })
        }

    }, [])

    return (
        <JumboLayoutProvider activeLayout={activeLayout}>
            {
                isLoading
                    ?
                    <div className="loader">
                        <svg className="circular-loader" viewBox="25 25 50 50">
                            <circle className="loader-path" cx="50" cy="50" r="20" />
                        </svg>
                    </div>
                    :
                    <LayoutComponent>
                        <NotificationContainer />
                        {error
                            ?
                            sweetAlerts('error', error)
                            : ''}
                        {message
                            ?
                            sweetAlerts('success', message)
                            : ''}
                        <JumboContentLayoutProvider
                            layoutOptions={config.defaultContentLayout}
                        >
                            {props.children}
                            {loading &&
                                <div className="loader overlay w-100 h-100">
                                    <svg className="circular-loader" viewBox="25 25 50 50" style={{ width: '10%', stroke: ThemeColor, position: 'fixed', top: '45%', left: '45%' }}>
                                        <circle className="loader-path" cx="50" cy="50" r="20" />
                                    </svg>
                                </div>
                            }
                        </JumboContentLayoutProvider>
                    </LayoutComponent>
            }

        </JumboLayoutProvider>
    );
};

export default AppLayout;
