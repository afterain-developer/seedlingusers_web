import React from 'react';
import { Card, CardContent, Typography, } from "@mui/material";
import Div from "@jumbo/shared/Div";
import * as yup from "yup";
import { Form, Formik } from "formik";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { resetPasswordAPI } from "app/services/auth-services";
import { useNavigate } from "react-router-dom";
import { NotificationManager, NotificationContainer } from 'react-notifications';
// import { Data } from '@react-google-maps/api';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
const validationSchema = yup.object({
    password: yup
    .string()
    .required('Password is required'),
    cpassword: yup
    .string()
    .required('Confirm Password is required'),
    otp: yup
    .string()
    .required('OTP is required'),
});

const Index = () => {
    const { t } = useTranslation()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const email = localStorage.getItem("email")

    const onSignIn = (data) => {
        try {
            if (data.password === data.cpassword) {
                dispatch(resetPasswordAPI({ userPassword: data.password, securityCode: data.otp, userEmail: email }, (res) => {
                    localStorage.removeItem("email")
                    setTimeout(() => {
                        navigate("/login")
                    }, 1000)
                }))
            } else {
                NotificationManager.error("Password Dose Not Match", '', 1300)
            }
        } catch (error) {
            NotificationManager.error(error, '', 1300)
        }
    };
    let ThemeColor = localStorage.getItem('ThemeColor');

    return (
        <>
            <NotificationContainer />
            <Div sx={{
                width: 520,
                maxWidth: '100%',
                margin: 'auto',
                p: 4
            }}>
                <Card
                    sx={{
                        // display: 'flex',
                        minWidth: 0,
                        flexDirection: { xs: 'column', md: 'row' }
                    }}
                >
                    <CardContent sx={{ flex: 1, p: 4 }}>
                        <ArrowBackIcon sx={{ cursor: "pointer" }} onClick={() => navigate('/login')} />
                        <Typography variant={"h2"} sx={{ textAlign: "center", fontWeight: 600, pb: 3 }}> {t('changepassword')}</Typography>
                        <Formik
                            validateOnChange={true}
                            initialValues={{
                                password: '',
                                cpassword: '',
                                otp: "",

                            }}
                            validationSchema={validationSchema}
                            onSubmit={(data, { setSubmitting }) => {
                                setSubmitting(true);
                                onSignIn(data);
                                setSubmitting(false);
                            }}
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
                                    <Div sx={{ mb: 2 }}>
                                        <JumboTextField
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                        />
                                    </Div>
                                    <Div sx={{ mb: 2 }}>
                                        <JumboTextField
                                            fullWidth
                                            name="cpassword"
                                            label="Confirm Password"
                                            type="password"
                                        />
                                    </Div>
                                    <Div sx={{ mt: 1, mb: 2 }}>
                                        <JumboTextField
                                            fullWidth
                                            name="otp"
                                            label="Enter OTP"
                                            type="text"
                                        />
                                    </Div>
                                    <LoadingButton
                                        fullWidth
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        sx={{ mb: 3, backgroundColor: ThemeColor ? ThemeColor : '#92d050' }}
                                        loading={isSubmitting}

                                    >{t('changepassword')}</LoadingButton>

                                </Form>
                            )}
                        </Formik>
                    </CardContent>
                </Card>
            </Div>
        </>
    );
};

export default Index;

