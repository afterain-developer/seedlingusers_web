import React from 'react';
import Div from "@jumbo/shared/Div";
import { Typography } from "@mui/material";
import { ASSET_IMAGES } from "../../utils/constants/paths";
import { useTranslation } from 'react-i18next';

const NoDataPlaceholderForDashboard = ({ children }) => {
    const { t } = useTranslation()
    if (children)
        return children;

    return (
        <Div sx={{ textAlign: 'center', p: 3, m: 'auto' }}>
            <img alt={'Not Found'} src={`${ASSET_IMAGES}/pages/not_found.svg`} width="50%" style={{ verticalAlign: 'middle' }} />
            <Typography variant={"h3"} color={"text.secondary"} mt={2}>{t("NO_DATA")}</Typography>
        </Div>
    );
};

export default NoDataPlaceholderForDashboard;
