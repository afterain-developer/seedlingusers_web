import React, { useEffect } from 'react';
import Stack from "@mui/material/Stack";
import useJumboLayoutSidebar from "@jumbo/hooks/useJumboLayoutSidebar";
import SearchGlobal from "../../../../shared/SearchGlobal";
import { Button, IconButton, Slide, Typography, useMediaQuery } from "@mui/material";
import Div from "@jumbo/shared/Div";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import JumboIconButton from "@jumbo/components/JumboIconButton";
import PinchSharpIcon from '@mui/icons-material/PinchSharp';
import { useLocation } from 'react-router-dom';



const Header = () => {
    const location = useLocation();
    const { sidebarOptions, setSidebarOptions } = useJumboLayoutSidebar();
    const [dropdownSearchVisibility, setDropdownSearchVisibility] = React.useState(false);

    const showDropdownSearch = useMediaQuery('(max-width:575px)');
    let themeColor = localStorage.getItem('ThemeColor')

    useEffect(() => {
        setSidebarOptions({ open: true })
    }, [])

    return (
        <>
            {
                showDropdownSearch &&
                <Slide in={dropdownSearchVisibility}>
                    <Div
                        sx={{
                            zIndex: 5,
                            left: 0,
                            right: 0,
                            position: 'absolute',
                            height: '100%',

                        }}
                    >
                        <SearchGlobal
                            sx={{
                                maxWidth: 'none',
                                height: '100%',
                                display: 'flex',
                                background: '#fff',
                                '& .MuiInputBase-root': {
                                    flex: 1,
                                    borderRadius: 0,
                                    background: theme => theme.palette.background.default,
                                },
                                '& .MuiInputBase-input': {
                                    pr: 6,
                                }
                            }}
                        />
                        <IconButton
                            sx={{
                                position: 'absolute',
                                right: 15,
                                top: '50%',
                                color: 'inherit',
                                transform: 'translateY(-50%)',
                            }}
                            onClick={() => setDropdownSearchVisibility(false)}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Div>
                </Slide>
            }

            {/* This is Header */}
            {
                location.pathname == '/dashboard' || location.pathname == '/map' ?
                    <Button
                        sx={{
                            borderRadius: "50px",
                            textTransform: "none",
                            backgroundColor: '#4ac7e8',
                            width: "30%",
                            '&:hover': {
                                backgroundColor: themeColor ? themeColor : '#4ac7e8',
                            }
                        }}
                        variant={"contained"}
                    >
                        <Div sx={{ textAlign: "right" }}>
                            <Typography component={"span"}>
                                Full Screen
                            </Typography>
                            <Typography component={"span"}>
                                <PinchSharpIcon />
                            </Typography>
                        </Div>
                    </Button>
                    :
                    !showDropdownSearch &&
                    <SearchGlobal
                        sx={{
                            maxWidth: { xs: 240, md: 320 },
                        }}
                    />
            }



            <Stack direction="row" alignItems="center" spacing={1.25} sx={{ ml: "auto" }}>
                {
                    showDropdownSearch &&
                    <JumboIconButton elevation={25} onClick={() => setDropdownSearchVisibility(true)}>
                        <SearchIcon fontSize={"small"} />
                    </JumboIconButton>
                }
            </Stack>
        </>
    );
};

export default Header;
