import Div from '@jumbo/shared/Div/Div'
import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from "react-router-dom";
import useJumboAuth from "@jumbo/hooks/useJumboAuth";
import SideBarButton from 'app/layouts/shared/headers/Header/SideBarButton';
import LocalizationOptions from 'app/shared/JumboCustomizer/LocalizationOptions';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

const HeaderLayout = () => {
    const { t } = useTranslation()
    const navigate = useNavigate();
    const { setAuthToken } = useJumboAuth();

    const userProfile = JSON.parse(localStorage.getItem('user'))
    const user = localStorage.getItem("farm")
    const fontStyle = { fontWeight: 600, fontSize: '22px', color: '#90cc4f', verticalAlign: 'middle' }

    if (user == null) { return <></> }

    const logoutAction = () => { navigate("/login"); localStorage.clear(); setAuthToken(null); };

    return (
        <Div sx={{
            width: '100%',
            backgroundColor: "black",
            justifyContent: "space-between",
            alignItems: "center",
            paddingX: '20px',
            display: "flex",
            height: '60px',
            zIndex: '10',
            position: 'fixed',
            top: 0
        }}>
            <div style={{ display: "flex", color: '#90cc4f', }}>
                <SideBarButton />
                <Typography variant={"h6"} sx={fontStyle}>
                    <img src={'/images/SeedlingLogo.png'} alt='logo' width={40} />
                    <span > {t("SEEDLING")} </span>
                </Typography>
            </div>
            <Box sx={{ display: "flex" }}>
                <div style={{ marginRight: "1rem" }}> <LocalizationOptions /> </div>
                <Button variant='contained' onClick={logoutAction} > {t("LOG_OUT")} </Button>
            </Box>
        </Div>
    )
}

export default HeaderLayout
