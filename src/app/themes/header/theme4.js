import {alpha} from "@mui/material/styles";

export const headerTheme = {
    type: "dark",
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    color: '#FFFFFF',
                    background: '#222D45'
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    background: alpha('#FFFFFF', .25)
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: 'inherit',
                    background: alpha('#FFFFFF', .25),
                    '&:hover': {
                        background: alpha('#FFFFFF', .125),
                    }
                }
            }
        }
    },
    palette: {
        primary: {
            main: '#92d050',
            light: '#b9e18e',
            dark: '#7fc435',
            contrastText: '#FFF'
        },
        secondary: {
            main: '#E44A77',
            light: '#FF7EA6',
            dark: '#DF295E',
            contrastText: '#FFF'
        },
        error: {
            main: '#E73145',
            light: '#FF6A70',
            dark: '#AD001E',
            contrastText: '#FFF'
        },
        warning: {
            main: '#F39711',
            light: '#FFC84C',
            dark: '#BB6900',
            contrastText: '#FFF'
        },
        info: {
            main: '#2EB5C9',
            light: '#6FE7FC',
            dark: '#008598',
            contrastText: '#FFF'
        },
        success: {
            main: '#3BD2A2',
            light: '#78FFD3',
            dark: '#00A073',
            contrastText: '#FFF'
        },
        text: {
            primary: '#475259',
            secondary: '#8595A6',
            disabled: '#A2B2C3',
        },
        divider : '#DEE2E6',
        background: {
            paper: '#FFFFFF',
            default: '#222d45',
        },
        action: {
            active: '#475259',
            hover: '#F5F7FA',
        },
    },
};