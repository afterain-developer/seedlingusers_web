import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import Div from "@jumbo/shared/Div";
import { alpha } from "@mui/material/styles";
import { ASSET_IMAGES } from "../../../utils/constants/paths";
import { getAssetPath } from "../../../utils/appHelpers";
import * as yup from "yup";
import { Form, Formik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import InputMask from 'react-input-mask';
// import Registration from './Registration';
import LoginCard from './LoginCard';
import { FETCH_ERROR, FETCH_FARM } from '@jumbo/constants/ActionTypes';
import { loginUserAPI, registerAPI, registrationOTP, getOptAPI } from "app/services/auth-services";
const Login = () => {
    localStorage.clear()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [mobileRegistration, setMobileRegistration] = useState();
    const [flag, setFlag] = useState(false);
    const [otpFlag, setOtpFlag] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [registerModel, setRegisterModel] = useState(false);
    const [registerOTP, setRegisterOTP] = useState('');
    const [countdown, setCountdown] = useState(60);
    const [canResendOTP, setCanResendOTP] = useState(true);

    //  New code


    useEffect(() => {
        let interval;

        if (!canResendOTP && countdown > 0) {
            interval = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        }

        if (countdown === 0) {
            setCanResendOTP(true);
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
    }, [canResendOTP, countdown]);

    const headerSubmit = (values) => {
        setButtonLoading(true)
        values.mobile = values.mobile.split('-').join('')
        if (values?.mobile && values?.securityCode) {
            if (!flag) {
                dispatch(loginUserAPI(values, response => {
                    setButtonLoading(false)
                    const farm = response.data.mainFarm

                    if (farm?.farmId) {
                        response.data.role = response.data?.userTypeId == 3 ? 'Admin' : 'User'
                        localStorage.setItem('language', "en")
                        localStorage.setItem('farmId', farm?.farmId)
                        localStorage.setItem('token', response.token)
                        localStorage.setItem('farm', JSON.stringify(farm))
                        localStorage.setItem('user', JSON.stringify(response.data))

                        dispatch({
                            type: FETCH_FARM,
                            farmId: farm?.farmId,
                            farmName: farm?.farmName || '',
                            farmAddress: farm?.address || '',
                            isMain: farm["FarmUsers.isMain"],
                            payload: farm
                        });
                        navigate("/seedling/home")
                    } else {
                        response.data.role = response.data?.userTypeId == 3 ? 'Admin' : 'User'
                        localStorage.setItem('language', "en")
                        localStorage.setItem('token', response.token)
                        localStorage.setItem('user', JSON.stringify(response.data))
                        navigate("/register")
                    }
                }))
                setButtonLoading(false)
            } else if (flag) {
                if (registerOTP == values?.securityCode) {
                    delete values?.securityCode
                    dispatch(registerAPI(values, response => {
                        response.data.role = response.data?.userTypeId == 3 ? 'Admin' : 'User'
                        localStorage.setItem('language', "en")
                        localStorage.setItem('token', response.token)
                        localStorage.setItem('user', JSON.stringify(response.data))
                        navigate("/register")
                    }))
                }
            }
        }
        else if (values?.mobile) {
            delete values?.securityCode
            dispatch(getOptAPI(values, res => {
                setCanResendOTP(false);
                setCountdown(60);
                if (res === 'registration') {
                    setRegisterModel(true)
                } else {
                    setOtpFlag(res)
                }
            }))
        }
    }

    const registrationAction = () => {
        setButtonLoading(true)
        dispatch(registrationOTP({ mobile: mobileRegistration }, (res) => {
            setButtonLoading(false)
            setRegisterOTP(res)
            setOtpFlag(res)
        }))
    }
    return (
        <>
            <LoginCard>
                <Formik
                    validateOnChange={true}
                    initialValues={{
                        mobile: '',
                        securityCode: '',
                    }}
                    validationSchema={yup.object().shape({
                        mobile: yup.string().required("Mobile Number is required."),
                    })}
                    onSubmit={headerSubmit}>

                    {({ isSubmitting, values, errors, touched, setFieldValue }) => {
                        return (
                            <Form style={{ textAlign: 'left' }} noValidate autoComplete='off'>
                                <Div sx={{ mt: 1, mb: 3 }}>
                                    <InputMask
                                        mask="010-9999-9999"
                                        name="mobile"
                                        value={values.mobile}
                                        onChange={(e) => {
                                            setFieldValue('mobile', e.target.value);
                                            setMobileRegistration(e.target.value.split('-').join(''));
                                        }}>
                                        {() =>
                                            <TextField
                                                required
                                                onKeyDown={e => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()}
                                                error={Boolean(errors.mobile) && touched.mobile}
                                                helperText={(Boolean(errors.mobile) && touched.mobile) ? errors.mobile : ''}
                                                fullWidth
                                                label='Mobile'
                                            />
                                        }
                                    </InputMask>
                                </Div>
                                {
                                    otpFlag && <Div sx={{ mt: 1, mb: 3 }}>
                                        <InputMask
                                            mask="999999"
                                            name="securityCode"
                                            value={values.securityCode}
                                            onChange={(e) => { setFieldValue('securityCode', e.target.value) }}>
                                            {() =>
                                                <TextField
                                                    required
                                                    onKeyDown={e => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()}
                                                    error={Boolean(errors.securityCode) && touched.securityCode}
                                                    helperText={(Boolean(errors.securityCode) && touched.securityCode) ? errors.securityCode : ''}
                                                    fullWidth
                                                    label='OTP'
                                                />
                                            }
                                        </InputMask>
                                    </Div>
                                }
                                {
                                    !otpFlag ?
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            size="large"
                                            type='submit'
                                            loading={buttonLoading}>
                                            Send One time password
                                        </Button> :
                                        <>
                                            {!canResendOTP ?
                                                <>
                                                    <Typography variant={"body1"} style={{ textAlign: 'end' }} sx={{ mb: 2 }} >
                                                        Resend OTP in {countdown} seconds
                                                    </Typography>
                                                    <Button
                                                        fullWidth
                                                        variant="contained"
                                                        size="large"
                                                        type='submit'
                                                        loading={buttonLoading}>
                                                        Verify and Login
                                                    </Button>
                                                </>
                                                :
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    size="large"
                                                    type='submit'
                                                    loading={buttonLoading}>
                                                    Resend OTP
                                                </Button>
                                            }
                                        </>
                                }
                            </Form>
                        )
                    }}
                </Formik>
            </LoginCard >
        </>
    );
};

export default Login;
