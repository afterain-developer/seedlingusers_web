import React from "react";
import PropTypes from 'prop-types';
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import Div from "@jumbo/shared/Div/Div";
import { useTranslation } from 'react-i18next';
const MainCard = ({ title, tabs, subheader, children, demoCode, noWrapper, wrapperSx, sx, button, headerStyle }) => {
    const { t } = useTranslation()
    return (
        <React.Fragment>
            <Card sx={sx}>
                <CardHeader
                    title={
                        title && (
                            <Box sx={{
                                justifyContent: { sm: 'space-between' },
                                alignItems: 'center',
                                display: { xs: "block", sm: "flex" },
                                textAlign: { xs: "center", }
                            }}>
                                <Typography variant={"h2"} mb={0} sx={{ fontWeight: 500, color: "#000" }}>
                                    {t(title)}   {tabs}
                                </Typography>
                                {button}
                            </Box >
                        )
                    }
                    subheader={
                        subheader && (
                            <Typography sx={{ mt: 1, color: "text.secondary" }}>{subheader}</Typography>
                        )
                    }
                    sx={{ borderBottom: "1px solid #ebebeb", ...headerStyle }}

                />

                {
                    noWrapper ? children :
                        <CardContent
                            sx={{
                                // display: 'flex',
                                minWidth: 0,
                                // alignItems: 'center',
                                // justifyContent: 'center',
                                // backgroundColor: theme => theme.palette.action.hover,
                                ...wrapperSx,
                            }}
                        >
                            {children}
                        </CardContent>
                }
            </Card>
        </React.Fragment >
    )
};

MainCard.propTypes = {
    title: PropTypes.node,
    subheader: PropTypes.node,
    children: PropTypes.node,
    demoCodeFile: PropTypes.string,
};

export default MainCard;
