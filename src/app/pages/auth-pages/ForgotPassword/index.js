import React from 'react';
import { Card, CardContent, TextField, Typography } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { alpha } from "@mui/material/styles";
import Div from "@jumbo/shared/Div";
import { ASSET_IMAGES } from "../../../utils/constants/paths";
import { getAssetPath } from "../../../utils/appHelpers";
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
// import Auth from 'app/redux/reducers/Auth';
import { forgotPasswordAPI } from "app/services/auth-services";
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const ForgotPassword = () => {
    const navigate = useNavigate();
    const flag = false;
    const dispatch = useDispatch()
    // const { send_forget_password_email } = useSelector(({ auth }) => Auth);


    const onSubmitData = (data) => {
        dispatch(forgotPasswordAPI({ "userEmail": data.email }, (res) => {
            setTimeout(() => {
                localStorage.setItem("email", data.email);
                navigate('/reset-password');
            }, 1000);
        }))
    }

    const handleCancle = () => {
        navigate('/login');
    }
    return (
        <Div sx={{
            flex: 1,
            flexWrap: 'wrap',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: theme => theme.spacing(4),
        }}>
            <Card sx={{ maxWidth: '100%', width: 360, mb: 3 }}>
                <Div sx={{ position: 'relative', height: '200px' }}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="200"
                        image={getAssetPath(`${ASSET_IMAGES}/colin-watts.jpg`)}
                    />
                    <Div sx={{
                        flex: 1,
                        inset: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'top',
                        zIndex: 2,
                        // backgroundColor: theme => alpha(theme.palette.common.black, .5),
                        p: theme => theme.spacing(3),
                    }}>
                        <ArrowBackIcon sx={{ cursor: "pointer", color: "white" }} onClick={() => navigate('/login')} />
                    </Div>
                    <Div sx={{
                        flex: 1,
                        inset: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: theme => alpha(theme.palette.common.black, .5),
                        p: theme => theme.spacing(3),
                    }}>
                        <Typography
                            variant={"h2"}
                            sx={{
                                color: 'common.white',
                                fontSize: '1.5rem',
                                mb: 0
                            }}>
                            Forgot password
                        </Typography>
                    </Div>
                </Div>
                <CardContent>
                    {!flag && <Formik
                        initialValues={{
                            email: '',
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().email('Enter a valid email').required('Email is Required'),
                        })}
                        onSubmit={onSubmitData}
                    >
                        {(props) => {
                            const { values, touched, errors, handleChange, handleSubmit } = props;
                            return (
                                <>
                                    <Div sx={{ mb: 3, mt: 1 }}>
                                        <TextField
                                            fullWidth
                                            id="email"
                                            label="Email"
                                            name='email'
                                            value={values.email}
                                            onChange={handleChange}
                                            defaultValue="demo@example.com"
                                            error={Boolean(errors.email) && touched.email}
                                            helperText={Boolean(errors.email) && touched.email ? errors.email : ''}
                                        />
                                    </Div>

                                    <Button type='submit' fullWidth variant="contained" size="large" sx={{ mb: 3 }} onClick={handleSubmit}>Reset Password</Button>
                                    <Button type='submit' fullWidth variant="contained" size="large" sx={{ mb: 3 }} onClick={handleCancle}>Cancel</Button>
                                </>
                            );
                        }}
                    </Formik>}

                </CardContent>
            </Card>
        </Div>
    );
};

export default ForgotPassword;
