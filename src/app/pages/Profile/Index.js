import React from 'react'
import { Avatar, Badge, Box, Button, FormLabel, Grid, IconButton, TextField, DialogTitle, DialogContent, Dialog, } from '@mui/material'
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { profileEdit, fetchSingleUserAPI, themeEdit } from 'app/services/user-services'
import { useDispatch } from 'react-redux';
import MainCard from 'app/Component/Cards/MainCard';
import Div from '@jumbo/shared/Div';
import JumboTextField from '@jumbo/components/JumboFormik/JumboTextField';
import { changePasswordAPI } from 'app/services/auth-services';
import { SketchPicker } from 'react-color'

import useJumboTheme from "@jumbo/hooks/useJumboTheme";

import { useJumboSidebarTheme } from '@jumbo/hooks';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { customSetThemeColors } from 'app/config/colorChange';
import { useTranslation } from 'react-i18next';




const UserProfile = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const fileInputRef = useRef(null);
  const [image, setImage] = useState();
  const [color, setColor] = useState();
  const [OpenSketch, setOpenSketch] = useState(false);
  const { sidebarTheme, setSidebarTheme } = useJumboSidebarTheme();
  const { theme, setTheme } = useJumboTheme();

  const handleOpen = () => {
    setOpenSketch(true);
  };

  const handleClose = () => {
    setOpenSketch(false);
  };
  let ThemeColor = localStorage.getItem('ThemeColor');



  const validationSchema = yup.object({
    fullName: yup
      .string()
      .required(t('fullNameisrequired')),
    email: yup
      .string()
      .email(t('enteravalidemail'))
      .required(t('emailisrequired')),
    mobile: yup
      .string()
      .matches(/^\d+$/, t('mobilenumbermustcontainonlydigits'))
      .min(10, t('minimum10digits'))
      .max(11, t('maximum11digits'))
      .required('phonenumberisrequired'),
  });
  const handleFileChange = (event) => {
    setImage(event.target.files[0])
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    dispatch(fetchSingleUserAPI(user.id, (res) => {
      formik.setValues({
        fullName: res.fullName || "",
        textSize: res.textSize || "",
        profileImage: res.profileImage || "",
        email: res.email || "",
        mobile: res.mobile || "",
        userTypeId: res.UserType.userTypeName,
      });
    }))

  }, [])

  const formik = useFormik({
    initialValues: {
      fullName: "",
      textSize: "",
      profileImage: "",
      email: "",
      mobile: "",
      userTypeId: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      values.id = user.id

      let formData = new FormData();
      formData.append('fileName', image);
      formData.append('body', JSON.stringify(values));

      dispatch(profileEdit(formData, (res) => {
        navigate('/seedling/dashboard')
      }))
    },
  });

  const handleSubmitFormodel = (values) => {
    values.email = user.email
    dispatch(changePasswordAPI(values, (res) => {
      navigate('/seedling/dashboard')
    }))
  }

  const handleColorChange = (newColor) => {
    let hexColor = newColor.hex

    const selectedColor = hexColor;
    setColor(selectedColor);
    formik.setFieldValue('color', selectedColor);
  };

  const handleSaveTheme = () => {
    const themeData = {
      "themeColor": color,
      "id": user.id
    }
    localStorage.setItem('ThemeColor', color);
    dispatch(themeEdit(themeData, async (res) => {
      setOpenSketch(false);

      setSidebarTheme({
        ...sidebarTheme,

        overlay: {
          bgColor: localStorage.getItem("ThemeColor"),
          opacity: 0.85
        },
        // palette: {
        //   ...sidebarTheme.palette,
        //   "text": {
        //     "primary": textColor,
        //     "secondary": textColor
        //   }
        // }
      })

      let UiChanges = await customSetThemeColors(ThemeColor, theme)
      setTheme({
        ...theme,
        ...UiChanges
      })


      navigate('/seedling/dashboard')
    }))
  };

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
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={6}>
          <MainCard title="profile">
            <form onSubmit={formik.handleSubmit} novalidate>

              <Grid container spacing={2.5}>

                <Grid item xs={12} md={6}  >
                  <Grid container spacing={2.5}>
                    <Grid item xs={12} sx={{ textAlignLast: "center", alignSelf: "center" }}>
                      <input
                        type="file"
                        accept="image/png, image/jpeg"
                        ref={fileInputRef}
                        id="profileImage"
                        name="profileImage"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          handleFileChange(e);
                          formik.handleChange(e);
                          formik.setFieldValue('profileImage', URL.createObjectURL(e.target.files[0]))
                        }}
                      />
                      <Badge style={{ position: 'relative' }}>
                        <Avatar sx={{ width: 200, height: 200 }} onClick={handleButtonClick} src={formik.values.profileImage} />
                        <IconButton aria-label="delete" onClick={handleButtonClick} style={{ position: 'absolute', top: '170px', left: '-10px' }}>
                          <CameraAltIcon color="info" />
                        </IconButton>
                      </Badge>
                    </Grid>

                  </Grid>
                </Grid>

                <Grid item xs={12} md={6} >
                  <Grid container spacing={2.5}>
                    <Grid item xs={12}  >
                      <TextField
                        fullWidth
                        id="fullName"
                        name="fullName"
                        label={t("fullname")}
                        required
                        variant="outlined"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                        helperText={formik.touched.fullName && formik.errors.fullName}
                      />
                    </Grid>

                    <Grid item xs={12}  >
                      <TextField
                        fullWidth
                        id="email"
                        name="email"
                        required
                        label={t("email")}
                        variant="outlined"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                      />
                    </Grid>

                    <Grid item xs={12}  >
                      <TextField
                        fullWidth
                        id="mobile"
                        name="mobile"
                        required
                        label={t("phone")}
                        variant="outlined"
                        value={formik.values.mobile}
                        onChange={formik.handleChange}
                        error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                        helperText={formik.touched.mobile && formik.errors.mobile}
                      />
                    </Grid>

                    <Grid item xs={12} >
                      <TextField
                        disabled
                        label={t("usertype")}
                        id="userTypeId"
                        name="userTypeId"
                        fullWidth
                        // onBlur={formik.handleBlur}
                        value={formik.values.userTypeId}
                      // onChange={formik.handleChange}
                      // error={formik.touched.userTypeId && Boolean(formik.errors.userTypeId)}
                      // helperText={formik.touched.userTypeId && formik.errors.userTypeId}
                      >
                      </TextField>
                    </Grid>

                    <Grid item xs={12} >

                    </Grid>
                  </Grid>
                </Grid>
              </Grid>


              <Grid item xs={12}>
                <Box sx={{ textAlignLast: "right" }}>
                  <Button type="submit" variant='contained' sx={{ textTransform: "capitalize", marginX: "5px", backgroundColor: ThemeColor ? ThemeColor : "" }}  >{t('save')}</Button>
                  <Link to={"/seedling/dashboard"} >
                    <Button variant='contained' sx={{ textTransform: "capitalize", marginX: "5px", backgroundColor: ThemeColor ? ThemeColor : "" }}>{t('cancel')}</Button>
                  </Link>
                </Box>
              </Grid>
            </form>
          </MainCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <MainCard title="changepassword" >
            <Formik
              // enableReinitialize
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
              onSubmit={handleSubmitFormodel}
            >
              {(props) => {
                const { values, touched, errors, setFieldValue, handleBlur, handleChange, handleSubmit } = props;
                return (

                  <Form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2.5}>

                      <Grid item xs={12} sm={12} >
                        <Div sx={{ mb: 2, mt: 1 }}>
                          <JumboTextField
                            required
                            fullWidth
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
                            required
                            fullWidth
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
                      </Grid>

                      <Grid item xs={12}>
                        <Box sx={{ textAlignLast: "right" }}>
                          <Button variant="contained" type='submit' sx={{ textTransform: "none", marginX: "5px", backgroundColor: ThemeColor ? ThemeColor : '#92d050' }} > {t("submit")} </Button>
                          <Link to={"/seedling/dashboard"} >
                            <Button variant='contained' sx={{ textTransform: "none", marginX: "5px", backgroundColor: ThemeColor ? ThemeColor : '#92d050' }}  >{t("cancel")}</Button>
                          </Link>
                        </Box>
                      </Grid>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </MainCard>


        </Grid>
        <Grid item xs={12} md={12}>
          <MainCard title="uiconfiguration">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FormLabel>{t("themecolor")}:</FormLabel>
                  <Box
                    style={{
                      width: '20px',
                      height: '20px',
                      backgroundColor: ThemeColor || '#92d050',
                      marginLeft: '10px',
                    }}
                  ></Box>
                  <Button variant='contained' onClick={handleOpen} sx={{ textTransform: "none", marginX: "5px", backgroundColor: ThemeColor ? ThemeColor : '#92d050' }} > {t("changecolor")}</Button>
                </div>
              </div>
            </div>
          </MainCard>
        </Grid>
      </Grid>

      <Dialog
        open={OpenSketch}
        // TransitionComponent={Transition}
        fullWidth
        maxWidth={'xs'}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{ sx: { display: 'flex', flexDirection: 'column', alignItems: 'center' } }}
      >
        <DialogTitle sx={{ textAlign: "center" }}>{t("themecolor")}</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlignLast: "center" }}>
            <SketchPicker
              color={color}
              onChange={handleColorChange}
            />
          </Box>
          <Grid item xs={12} sx={{ mt: 2, }}>
            <Button type="button" variant='contained' sx={{ textTransform: "capitalize", marginX: "5px", backgroundColor: ThemeColor ? ThemeColor : '#92d050' }} onClick={handleSaveTheme}>{t('save')}</Button>
            <Button type="button" variant='contained' sx={{ textTransform: "capitalize", marginX: "5px", backgroundColor: ThemeColor ? ThemeColor : '#92d050' }} onClick={handleClose}>{t('cancel')}</Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default UserProfile
