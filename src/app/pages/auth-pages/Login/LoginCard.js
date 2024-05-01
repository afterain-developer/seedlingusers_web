import React from 'react';
import { Card, CardContent, Typography } from "@mui/material";
import Div from "@jumbo/shared/Div";
import { alpha } from "@mui/material/styles";
import { ASSET_IMAGES } from "../../../utils/constants/paths";
import { getAssetPath } from "../../../utils/appHelpers";
const LoginCard = ({ children }) => {
    return (
        <Div sx={{ width: 720, maxWidth: '100%', margin: 'auto', p: 4 }}>
            <Card
                sx={{ display: 'flex', minWidth: 0, flexDirection: { xs: 'column', md: 'row' } }} >
                <CardContent
                    sx={{
                        flex: '0 1 300px',
                        position: 'relative',
                        background: `#0267a0 url(${getAssetPath(`${ASSET_IMAGES}/widgets/keith-luke.jpg`, "640x428")}) no-repeat center`,
                        backgroundSize: 'cover',

                        '&::after': {
                            display: 'inline-block',
                            position: 'absolute',
                            content: `''`,
                            inset: 0,
                            backgroundColor: alpha('#0267a0', .65)
                        }
                    }}
                >
                    <Div
                        sx={{
                            display: 'flex',
                            minWidth: 0,
                            flex: 1,
                            flexDirection: 'column',
                            color: 'common.white',
                            position: 'relative',
                            zIndex: 1,
                            height: '100%'
                        }}
                    >
                        <Div sx={{ mb: 2 }}>
                            <Typography variant={"h3"} color={"inherit"} fontWeight={500} mb={3}>Sign In</Typography>
                            <Typography variant={"body1"} mb={2}>
                                Taking Control of Agri need
                            </Typography>
                        </Div>

                        <Div sx={{ mt: 'auto' }}>
                            <h2>Seedling</h2>
                        </Div>
                    </Div>
                </CardContent>
                <CardContent sx={{ flex: 1, p: 4 }}>
                    {children}
                </CardContent>
            </Card>
        </Div>
    );
};

export default LoginCard;
