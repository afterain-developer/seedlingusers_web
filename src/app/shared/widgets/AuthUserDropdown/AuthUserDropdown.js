import React, { useState } from 'react';
import Avatar from "@mui/material/Avatar";
import { Button, Dialog, DialogContent, DialogTitle, ListItemIcon, ListItemText, IconButton, Slide, ThemeProvider, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import JumboDdPopover from "@jumbo/components/JumboDdPopover";
import Div from "@jumbo/shared/Div";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import useJumboAuth from "@jumbo/hooks/useJumboAuth";
import { useDispatch } from 'react-redux';
// import adminUserlogServices from 'app/services/AdminUserLogs-services';
import PasswordIcon from '@mui/icons-material/Password';
import { Form, Formik } from 'formik';
import JumboTextField from '@jumbo/components/JumboFormik/JumboTextField';
import * as yup from "yup";
import { forwardRef } from 'react';
import { changePasswordAPI } from 'app/services/auth-services';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { insertUserLogOut } from 'app/services/user-services';
import { useTranslation } from 'react-i18next';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const AuthUserDropdown = ({ userProfile }) => {
    const { t } = useTranslation()
    const themeColor = localStorage.getItem('ThemeColor') ? localStorage.getItem('ThemeColor') : '#92d050'
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { theme } = useJumboTheme();
    const { setAuthToken } = useJumboAuth();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let userDetail = JSON.parse(localStorage.getItem('user'))
    const logoutLogs = () => {
        let body = {
            userId: userDetail?.id
        }
        dispatch(insertUserLogOut(body, (res) => {
        }))
    }

    const onLogout = () => {
        logoutLogs()
        navigate("/login");
        localStorage.clear()
        setAuthToken(null);
        window.location.reload();
    };
    const hadleSubmit = (value) => {
        value.email = userDetail.email
        dispatch(changePasswordAPI(value))
        handleClose()
    }

    const viewProfile = () => {
        navigate("/seedling/profile");
    }

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleToggleOldPasswordVisibility = () => {
        setShowOldPassword(!showOldPassword);
    };
    const handleToggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };


    return (
        <>
            <ThemeProvider theme={theme}>
                <JumboDdPopover
                    triggerButton={
                        <Avatar
                            src={userDetail.profileImage}
                            alt={'profile picture'}
                            sizes={"small"}
                            sx={{ boxShadow: 25, cursor: 'pointer' }}
                        />
                    }
                >
                    <Div sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        width: "250px",
                        p: theme => theme.spacing(2.5),
                    }}>
                        <Avatar src={userDetail.profileImage} alt={'profile picture'} sx={{ width: 60, height: 60, mb: 2 }} />
                        <Typography variant={"h5"}>{(userProfile && userProfile.fullName && userProfile.fullName) || ''}</Typography>
                        <Typography variant={"body1"} color="text.secondary">{userProfile && userProfile.email}</Typography>
                    </Div>
                    <Divider />
                    {/* <nav>
                        <List disablePadding sx={{ pb: 1 }}>
                            <ListItemButton onClick={viewProfile}>
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                    <PersonOutlineIcon />
                                </ListItemIcon>
                                <ListItemText primary={t("profile")} sx={{ my: 0 }} />
                            </ListItemButton>
                            <ListItemButton onClick={handleOpen}>
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                    <PasswordIcon />
                                </ListItemIcon>
                                <ListItemText primary={t('changepassword')} sx={{ my: 0 }} />
                            </ListItemButton>
                            <ListItemButton onClick={onLogout}>
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary={t("logout")} sx={{ my: 0 }} />
                            </ListItemButton>
                        </List>
                    </nav> */}
                </JumboDdPopover>
            </ThemeProvider>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                fullWidth
                maxWidth={'sm'}
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={{ textAlign: "center" }}>{t('changepassword')}</DialogTitle>
                <DialogContent>
                    <Formik
                        validateOnChange={true}
                        initialValues={{
                            oldPassword: '',
                            newPassword: '',
                            confirmPassword: "",

                        }}
                        validationSchema={yup.object({
                            oldPassword: yup
                                .string()
                                .required(t('currentpasswordisrequired')),
                            newPassword: yup
                                .string()
                                .required(t('newpasswordisrequired'))
                                .min(8, t('passwordmustcontainatleast8character')),
                            confirmPassword: yup
                                .string().when('newPassword', {
                                    is: val => (val && val.length > 0 ? true : false),
                                    then: yup
                                        .string()
                                        .required(t('newpasswordisrequired'))
                                        .oneOf([yup.ref('newPassword')], t("doesntmatchwithnewpassword"))
                                })
                        })}
                        onSubmit={hadleSubmit}
                    >
                        {({
                            isSubmitting,
                            values,
                            touched,
                            errors,
                            isValid,
                            isDisabled,
                            handleChange,
                            handleSubmit,
                        }) => (
                            <Form style={{ textAlign: 'left' }} noValidate autoComplete='off'>
                                <Div sx={{ mb: 2, mt: 1 }}>
                                    <JumboTextField
                                        fullWidth
                                        required
                                        name="oldPassword"
                                        label={t("oldpassword")}
                                        value={oldPassword}
                                        type={showOldPassword ? 'text' : 'password'}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={handleToggleOldPasswordVisibility}
                                                        edge="end"
                                                    >
                                                        {showOldPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Div>
                                <Div sx={{ mb: 2 }}>
                                    <JumboTextField
                                        fullWidth
                                        required
                                        name="newPassword"
                                        label={t("newpassword")}
                                        value={newPassword}
                                        type={showNewPassword ? 'text' : 'password'}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={handleToggleNewPasswordVisibility}
                                                        edge="end"
                                                    >
                                                        {showNewPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Div>
                                <Div sx={{ mb: 2 }}>
                                    <JumboTextField
                                        fullWidth
                                        required
                                        name="confirmPassword"
                                        label={t("confirmpassword")}
                                        type="password"
                                    />
                                </Div>
                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    sx={{ mb: 3, backgroundColor: themeColor }}
                                    loading={isSubmitting}

                                >{t('changepassword')}</Button>

                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AuthUserDropdown;