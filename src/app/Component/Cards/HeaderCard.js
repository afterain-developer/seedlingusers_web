import React from 'react'
import { Box, Button, Typography } from '@mui/material'

const HeaderCard = ({ title, button, btn, sx }) => {
    return (
        <Box sx={{
            background: "#fff",
            padding: 2,
            borderRadius: "8px",
            boxShadow: "rgba(17, 17, 26, 0.05) 0px 4px 10px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
            // display: 'flex',
            // justifyContent: 'space-between',
            justifyContent: { md: 'space-between' },
            display: { xs: "block", sm: "flex" },
            alignItems: 'center',
            ...sx,
        }}>
            <Typography variant={"h3"} mb={0} sx={{ fontWeight: 500, }}>{title}</Typography>
            {button}
        </Box >
    )


}
HeaderCard.defaultProps = {
    btn: false
}

export default HeaderCard