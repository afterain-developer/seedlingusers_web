import React, { useState } from 'react'
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik'
import { Box, Button, Grid } from '@mui/material'
import MainCard from 'app/Component/Cards/MainCard'
import GoogleAddress from 'app/Component/Google/GoogleAddress'
import ImageForm from 'app/Component/Input/Forms/ImageForm'
import PageHeaderButton from 'app/Component/Buttons/PageHeaderButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SubmitButton from 'app/Component/Input/Forms/SubmitButton';
import CloseButton from 'app/Component/Input/Forms/CloseButton';
import TextFieldForm from 'app/Component/Input/Forms/TextFieldForm';
import { useDispatch } from 'react-redux';
import { farmModifyAPi, farmRemoveAPI, farmMainSelectApi } from 'app/services/preferences/farm-manager-services';
import { useLocation, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { sweetAlertDelete } from 'app/config/sweetAlertsActions';
import { FETCH_FARM } from '@jumbo/constants/ActionTypes';
import LocationOnIcon from '@mui/icons-material/LocationOn';


const FarmModify = () => {
    const { state } = useLocation()
    const dispatch = useDispatch()
    const navigator = useNavigate()

    const [address, setAddress] = useState()
    const [image, setImage] = useState()

    const handleSubmit = (values) => {
        const formData = new FormData();
        if (state?.farmId)
            formData.append("farmId", state?.farmId)
        formData.append("lat", address?.latitude || state?.lat)
        formData.append("long", address?.longitude || state?.long)
        formData.append("province", address?.state || state?.province)
        formData.append("city", address?.city || state?.city)
        formData.append("appCity", address?.city || state?.appCity)
        formData.append("Zipcode", address?.pinCode || state?.Zipcode)
        formData.append("address", address?.address || state?.address)
        formData.append("kakaoAddress", JSON.stringify(address?.place) || state?.kakaoAddress)
        formData.append('farmName', values.farmName || state?.farmName);
        formData.append('numberOfField', values.numberOfField);

        if (image)
            formData.append('fileName', image)

        dispatch(farmModifyAPi(formData, (response) => {
            dispatch({
                type: FETCH_FARM,
                farmId: response?.farmId,
                farmName: response?.farmName || '',
                farmAddress: response?.address || '',
                isMain: response["FarmUsers.isMain"],
                payload: response
            });
            localStorage.setItem('farmId', response?.farmId)
            localStorage.setItem('farm', JSON.stringify(response))
            navigator("/seedling/home")
        }))
    }
    const handleRemove = () => {
        sweetAlertDelete().then((result) => {
            if (result === 'deleted') {
                dispatch(farmRemoveAPI({ farmId: state?.farmId }, () => {
                    navigator("/seedling/preferences/farm-manager")
                }))
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    const handleSetMain = () => {
        dispatch(farmMainSelectApi({ farmId: state?.farmId }, () => {
            navigator("/seedling/preferences/farm-manager")
        }))
    }
    return (
        <MainCard title={"TELL_ME_ABOUT_YOUR_FARM"}>
            <Formik
                initialValues={{
                    image: "",
                    farmName: "",
                    numberOfField: "",
                    address: ''
                }}
                validationSchema={yup.object().shape({
                    image: yup
                        .string()
                        .required('LOG_ADD_IMAGE'),
                    farmName: yup
                        .string()
                        .required('LOG_ADD_FARMNAME'),
                    address: yup
                        .string()
                        .required('LOG_ADD_LOCATION'),
                    numberOfField: yup
                        .number()
                        .max(100, 'NUMBEROFFIELDVALIDATION')
                        .required('LOG_ADD_FARMFILED'),
                })}
                onSubmit={handleSubmit}

            >
                {(props) => {
                    // const { values, touched, errors, setFieldValue, handleBlur, handleChange, handleSubmit } = props;
                    return (
                        <Form noValidate >
                            <Grid container spacing={2.5}>
                                <Grid item xs={12} sm={12} >
                                    <ImageForm
                                        heightWidth={300}
                                        formik={props}
                                        field={'image'}
                                        imageReturn={(item) => setImage(item)}
                                    />
                                    <Box sx={{ textAlign: 'center', marginTop: 2 }} >
                                        <LocationOnIcon sx={{ color: '#92d050' }} /> {address?.address || state?.address || '---'}
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextFieldForm
                                        formik={props}
                                        label={"ENTER_NAME_OF_YOUR_FARM"}
                                        field={"farmName"}
                                    />

                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextFieldForm
                                        formik={props}
                                        label={"ENTER_THE_NUMBER_OF_FIELDS"}
                                        field={"numberOfField"}
                                        type="number"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <GoogleAddress formik={props} label={"address"} field={"address"} callBackAction={(item) => setAddress(item)} />
                                </Grid>
                                {/* <GoogleAddress callBackAction={(item) => setAddress(item)} /> */}

                                <Grid item xs={12} sm={12} textAlign={"end"} >
                                    <SubmitButton />
                                    <CloseButton to={"/login"} />
                                    <Grid />
                                </Grid>
                            </Grid>
                        </Form>

                    );
                }}
            </Formik>
        </MainCard >
    )
}

export default FarmModify