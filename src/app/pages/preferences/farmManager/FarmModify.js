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
import { farmModifyAPi, farmRemoveAPI, farmMainSelectApi, farmFetchListAPI } from 'app/services/preferences/farm-manager-services';
import { useLocation, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { sweetAlertDelete } from 'app/config/sweetAlertsActions';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { FETCH_FARM, FETCH_FARM_RECORDS } from '@jumbo/constants/ActionTypes';

const FarmModify = () => {
    const { t } = useTranslation()
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
        dispatch(farmModifyAPi(formData, (res) => {
            if (state?.backToHome) {
                dispatch(farmFetchListAPI((res) => {
                    dispatch({ type: FETCH_FARM_RECORDS, payload: res });
                    let Select = res.filter((farm) => farm?.farmId === state?.farmId)[0]
                    localStorage.setItem('farm', JSON.stringify(Select))
                    dispatch({
                        type: FETCH_FARM,
                        farmId: Select?.farmId,
                        farmName: Select?.farmName || '',
                        farmAddress: Select?.address || '',
                        isMain: Select["FarmUsers.isMain"],
                        payload: Select
                    })
                    navigator("/seedling/home")
                }))
            } else {
                navigator("/seedling/preferences/farm-manager")
            }
        }))
    }
    const handleRemove = () => {
        sweetAlertDelete().then((result) => {
            if (result === 'deleted') {
                dispatch(farmRemoveAPI({ farmId: state?.farmId }, () => {
                    if (state?.backToHome) {
                        dispatch(farmFetchListAPI((res) => {
                            dispatch({ type: FETCH_FARM_RECORDS, payload: res });
                            let Select = res.filter((farm) => farm['FarmUsers.isMain'] == 1)[0]
                            localStorage.setItem('farm', JSON.stringify(Select))
                            dispatch({
                                type: FETCH_FARM,
                                farmId: Select?.farmId,
                                farmName: Select?.farmName || '',
                                farmAddress: Select?.address || '',
                                isMain: Select["FarmUsers.isMain"],
                                payload: Select
                            })
                            navigator("/seedling/home")
                        }))
                    } else {
                        navigator("/seedling/preferences/farm-manager")
                    }
                }))
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    const handleSetMain = () => {
        dispatch(farmMainSelectApi({ farmId: state?.farmId }, () => {
            if (state?.backToHome) {
                dispatch(farmFetchListAPI((res) => {
                    dispatch({ type: FETCH_FARM_RECORDS, payload: res });
                    let Select = res.filter((farm) => farm?.farmId === state?.farmId)[0]
                    localStorage.setItem('farm', JSON.stringify(Select))
                    dispatch({
                        type: FETCH_FARM,
                        farmId: Select?.farmId,
                        farmName: Select?.farmName || '',
                        farmAddress: Select?.address || '',
                        isMain: Select["FarmUsers.isMain"],
                        payload: Select
                    })
                    navigator("/seedling/home")
                }))
            } else {
                navigator("/seedling/preferences/farm-manager")
            }
        }))
    }
    return (

        <MainCard title={state?.farmId ? "BUTTON_EDIT_FARM" : "BUTTON_ADD_FARM"}
            button={< PageHeaderButton
                title={"BACK"}
                icon={< ArrowBackIcon />}
                to={state?.backToHome == true ? '/seedling/home' : "/seedling/preferences/farm-manager"} />}>
            {
                state ?
                    <>
                        {
                            state["FarmUsers.isMain"] == 0 ?
                                <>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Button
                                            onClick={handleSetMain}
                                            variant="contained" >
                                            {t("BUTTON_ENABLE_MAIN")}
                                        </Button>
                                        <Button
                                            style={{ marginInlineStart: "auto" }}
                                            onClick={handleRemove}
                                            variant="contained" color='error' startIcon={<DeleteIcon />}>
                                            {t("DELETE_FARM")}
                                        </Button>
                                    </div>
                                </>
                                : <></>
                        }

                        <Formik
                            initialValues={{
                                image: state?.farmImage || '',
                                farmName: state?.farmName || '',
                                numberOfField: state?.numberOfField || 0,
                                address: state?.address || ''
                            }}
                            validationSchema={yup.object().shape({
                                image: yup
                                    .string()
                                    .required('LOG_ADD_IMAGE'),
                                farmName: yup
                                    .string()
                                    .required('LOG_ADD_FARMNAME'),

                            })}
                            onSubmit={handleSubmit}
                        >
                            {(props) => {
                                return (
                                    <Form noValidate>
                                        <Grid container spacing={2.5} sx={{ mt: 2, mb: 2 }}>
                                            <Grid item xs={12} sm={12} sx={{ position: "relative" }} >
                                                <ImageForm
                                                    heightWidth={300}
                                                    variant="square"
                                                    formik={props}
                                                    field={'image'}
                                                    imageReturn={(item) => setImage(item)}
                                                    main={
                                                        state["FarmUsers.isMain"] && state["FarmUsers.isMain"] == 1 ?
                                                            <span style={{
                                                                position: "absolute",
                                                                background: "rgb(113, 190, 61)",
                                                                top: "-20px",
                                                                left: "-40px",
                                                                fontSize: "16px",
                                                                padding: "0px 7px",
                                                                borderRadius: "5px",
                                                                color: "white",
                                                                zIndex: 50000,
                                                                border: "solid white 1px",
                                                            }}>
                                                                {t("MAIN")}
                                                            </span>
                                                            : <></>
                                                    }
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
                                                    disabled
                                                    formik={props}
                                                    label={"ENTER_THE_NUMBER_OF_FIELDS"}
                                                    field={"numberOfField"}
                                                    type="number"
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={12}>
                                                <GoogleAddress
                                                    formik={props}
                                                    label={"SEARCH_YOUR_LOCATION"}
                                                    field={"numberOfField"} callBackAction={(item) => setAddress(item)} />
                                            </Grid>

                                            <Grid item xs={12} sm={12} textAlign={"end"} >
                                                <SubmitButton />
                                                <CloseButton to={"/seedling/preferences/farm-manager"} />
                                                <Grid />
                                            </Grid>
                                        </Grid>
                                    </Form>

                                );
                            }}
                        </Formik >
                    </>
                    :
                    <Formik
                        initialValues={{
                            image: "",
                            farmName: "",
                            numberOfField: "",
                            addressIsRequired: "",
                        }}
                        validationSchema={yup.object().shape({
                            image: yup
                                .string()
                                .required('LOG_ADD_IMAGE'),
                            farmName: yup
                                .string()
                                .required('LOG_ADD_FARMNAME'),
                            addressIsRequired: yup
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
                                            <GoogleAddress
                                                required={true}
                                                formik={props} label={"SEARCH_YOUR_LOCATION"} field={"addressIsRequired"} callBackAction={(item) => setAddress(item)} />
                                        </Grid>

                                        <Grid item xs={12} sm={12} textAlign={"end"} >
                                            <SubmitButton />
                                            <CloseButton to={"/seedling/preferences/farm-manager"} />
                                            <Grid />
                                        </Grid>
                                    </Grid>
                                </Form>

                            );
                        }}
                    </Formik >
            }

        </MainCard >
    )
}

export default FarmModify