import React from 'react';
import Div from "@jumbo/shared/Div";

const Logo = ({ mini, mode, sx }) => {
    return (
        <Div sx={{ display: "inline-flex", ...sx }}>
            {/* <h5 className="sidebarLogo">Seedling</h5> */}
        </Div>
    );
};

Logo.defaultProps = {
    mode: "light"
};

export default Logo;
