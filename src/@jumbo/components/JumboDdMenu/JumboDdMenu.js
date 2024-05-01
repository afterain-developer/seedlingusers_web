import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { MoreHorizOutlined } from "@mui/icons-material";
import { useTranslation } from 'react-i18next';

const JumboDdMenu = ({ icon, menuItems, id }) => {
    const { t } = useTranslation()
    const [menuEl, setMenuEl] = React.useState(null);
    const openMenu = Boolean(menuEl);

    const handleMenuItemClick = (option) => {
        setMenuEl(null);
        const { onClickCallback } = option;
        if (typeof onClickCallback === "function")
            onClickCallback(option, id);
    };

    return (
        <>
            <IconButton
                sx={{
                    color: 'inherit'
                }}
                onClick={(e) => {
                    setMenuEl(e.currentTarget);
                    e.stopPropagation();
                }}
            >
                {
                    icon ? icon : <MoreHorizOutlined />
                }
            </IconButton>
            <Menu open={openMenu}
                anchorEl={menuEl}
                onClose={() => setMenuEl(null)}

                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                {menuItems.map((option, index) => (
                    <MenuItem key={index} selected={option.title === 'Refresh'}
                        onClick={(e) => {
                            handleMenuItemClick(option);
                            e.stopPropagation();
                        }}
                    >
                        {
                            option.icon &&
                            <ListItemIcon sx={{ color: option.title === "delete" ? 'red' : "#92d050" }}>{option.icon}</ListItemIcon>
                        }
                        <ListItemText>{t(option.title)}</ListItemText>
                    </MenuItem>
                ))}
            </Menu>
        </>

    );
};

JumboDdMenu.propTypes = {
    icon: PropTypes.node,
    menuItems: PropTypes.array,
    onClickCallback: PropTypes.func,
};

export default React.memo(JumboDdMenu);
