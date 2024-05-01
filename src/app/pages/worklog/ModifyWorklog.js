import { Form, Formik } from 'formik'
import * as yup from 'yup';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Button, Grid, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useDispatch, useSelector } from 'react-redux';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Service 
import { fetchWorklogData, modifyFavouriteAPI, modifyWorkLog, removeFavouriteAPI, removeWorkLogAPI } from 'app/services/worklog-services';

// Custom completed
import MainCard from 'app/Component/Cards/MainCard'
import PageHeaderButton from 'app/Component/Buttons/PageHeaderButton';
import ImageForm from 'app/Component/Input/Forms/ImageForm'
import SelectMenuArray from 'app/Component/Input/Forms/SelectMenuArray'
import MultipleSelect from 'app/Component/Input/Forms/MultipleSelect';
import TextFieldForm from 'app/Component/Input/Forms/TextFieldForm'
import AutoCompleteSelectMenu from 'app/Component/Input/Forms/AutoCompleteSelectMenu'
import Textarea from 'app/Component/Input/Forms/Textarea'
import SubmitButton from 'app/Component/Input/Forms/SubmitButton';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useLocation, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { sweetAlertDelete } from 'app/config/sweetAlertsActions';
import SelectMenu from 'app/Component/Input/Forms/SelectMenu';


const ModifyWorklog = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const state = location?.state
    const [fertilizerData, setFertilizerData] = useState([])
    const [pesticideData, setPesticideData] = useState([]);
    const [fieldList, setFieldList] = useState([]);
    const { farmId } = useSelector((state) => state.FarmReducer)

    // const manufacturer = state?.worklogType === "FERTILIZER" ?
    //     fertilizerData.filter(filterItem => filterItem?.id == state?.fertilizerId)[0]?.id
    //     : state?.worklogType === "PESTICIDE" ? pesticideData.filter(filterItem => filterItem?.id == state?.pesticideId)[0]?.manufacturerId : ''

    const [image, setImage] = useState();
    const [image2, setImage2] = useState();
    const [star, setStar] = useState(state?.favSecretId ? 0 : 1);
    const [favSecretId, setFavSecretId] = useState(state?.favSecretId || '');

    const array = [
        { value: 'FERTILIZER', label: t("FERTILIZER") },
        { value: 'PESTICIDE', label: t("PESTICIDE") },
        { value: 'WATERING', label: t("WATERING") },
        { value: 'DISEASE', label: t("DISEASE") },
    ];

    useEffect(() => {
        dispatch(fetchWorklogData({ farmId: localStorage.getItem('farmId') }, (res) => {
            const temp = []
            res?.FertlizerList.map((item, key) => {
                temp.push({
                    id: item?.id,
                    name: `${item?.Manufacturer?.manufacturerName} ${item?.name}`,
                    manufacturerId: item?.Manufacturer?.manufacturerId
                })
            })
            const temp2 = []
            res?.pesticedeList.map((item, key) => {
                temp2.push({
                    id: item?.id,
                    name: `${item?.Manufacturer?.manufacturerName} ${item?.name}`,
                    manufacturerId: item?.Manufacturer?.manufacturerId
                })
            })
            setFieldList(res?.fieldList);
            setFertilizerData(temp)
            setPesticideData(temp2)
        }))
    }, [])

    const handleSubmit = (values) => {
        const formData = new FormData();
        let find = ''
        switch (values?.worklogType) {
            case 'FERTILIZER':
                formData.append("ratio", values?.ratio)
                formData.append("amount", values?.amount)
                formData.append("id", values?.id)
                find = fertilizerData.filter(filterItem => filterItem?.id == values?.id)[0]?.manufacturerId
                formData.append("manufacturerId", find)
                break;
            case 'PESTICIDE':
                formData.append("ratio", values?.ratio)
                formData.append("amount", values?.amount)
                formData.append("id", values?.id)
                find = pesticideData.filter(filterItem => filterItem?.id == values?.id)[0]?.manufacturerId
                formData.append("manufacturerId", find)
                break;
            case 'WATERING':
                formData.append("amount", values?.amount)
                break;
            case 'DISEASE':
                break;
        }

        if (values?.detail)
            formData.append("detail", values?.detail)
        if (state?.worklogId)
            formData.append("worklogId", state?.worklogId)
        if (image)
            formData.append("fileName", image)
        if (image2)
            formData.append("fileName", image2)


        formData.append("farmId", farmId)
        formData.append("worklogType", values?.worklogType)
        formData.append("fromDate", values?.fromDate)
        formData.append("toDate", values?.fromDate)

        values?.fieldIdArray.map((id) => { formData.append("fieldId", id) })

        dispatch(modifyWorkLog(formData, res => navigate("/seedling/worklog")))
    }

    const checkAction = (values) => {
        const formData = {
            secretType: values?.worklogType,
            detail: values?.detail
        }
        let find = ''
        switch (values?.worklogType) {
            case 'FERTILIZER':
                formData.ratio = values?.ratio
                formData.amount = values?.amount
                formData.id = values?.id
                find = fertilizerData.filter(filterItem => filterItem?.id == values?.id)[0]?.manufacturerId
                formData.manufacturerId = find
                break;
            case 'PESTICIDE':
                formData.ratio = values?.ratio
                formData.amount = values?.amount
                formData.id = values?.id
                find = pesticideData.filter(filterItem => filterItem?.id == values?.id)[0]?.manufacturerId
                formData.manufacturerId = find
                break;
            case 'WATERING':
                formData.amount = values?.amount
                break;
            case 'DISEASE':
                break;
        }
        dispatch(modifyFavouriteAPI(formData, res => {
            setFavSecretId(res?.favSecretId)
            setStar(star === 0 ? 1 : 0)
        }))
    }
    // removeFavouriteAPI

    const removeAction = () => {
        dispatch(removeFavouriteAPI({ favSecretId: favSecretId }, res => {
            setFavSecretId()
            setStar(star === 0 ? 1 : 0)
        }))
    }

    console.log(state);
    return (
        <>
            <MainCard
                title={"WRITE_WORKLOG"}
                button={
                    <div>
                        {
                            state?.worklogId &&
                            <PageHeaderButton
                                onClick={() => {
                                    sweetAlertDelete().then((result) => {
                                        if (result === 'deleted') {
                                            dispatch(removeWorkLogAPI({ worklogId: state?.worklogId }, () => {
                                                navigate("/seedling/worklog")
                                            }))
                                        }
                                    }).catch((error) => {
                                        console.error(error);
                                    });
                                }}
                                title={"DELETE"}
                                icon={<DeleteIcon />}
                                sx={{ background: "red", mx: 1.5 }} />
                        }
                        <PageHeaderButton
                            title={"BACK"}
                            icon={<ArrowBackIcon />}
                            to={state?.value ? '/seedling/secrets' : "/seedling/worklog"}
                            state={state?.value ? { value: state?.value } : ''}
                        />
                    </div>
                }>

                <Formik
                    initialValues={{
                        fromDate: state?.fromDate || new Date().toISOString().split('T')[0],
                        worklogType: state?.worklogType || '',
                        amount: state?.amount || '',
                        ratio: state?.ratio || '',
                        detail: state?.detail || '',
                        fieldIdArray: state?.worklogId ? state?.WorklogFields ? [... new Set(state?.WorklogFields.map(record => record.fieldId))] : '' : '',
                        image: state?.worklogId ? state?.WorklogImages[0]?.ImagePath || '' : '',
                        image2: state?.worklogId ? state?.WorklogImages[1]?.ImagePath || '' : '',
                        id: state?.worklogType === "FERTILIZER" ? state?.fertilizerId : state?.worklogType === "PESTICIDE" ? state?.pesticideId : ''
                    }}
                    // initialValues={{
                    //     fromDate: state?.fromDate || new Date().toISOString().split('T')[0],
                    //     worklogType: state?.worklogType || '',
                    //     amount: state?.amount || '',
                    //     ratio: state?.ratio || '',
                    //     detail: state?.detail || '',
                    //     fieldIdArray: state?.WorklogFields ? [... new Set(state?.WorklogFields.map(record => record.fieldId))] : '',
                    //     image: state?.WorklogImages[0]?.ImagePath || '',
                    //     image2: state?.WorklogImages[1]?.ImagePath || '',
                    //     id: state?.worklogType === "FERTILIZER" ? state?.fertilizerId : state?.worklogType === "PESTICIDE" ? state?.pesticideId : ''
                    // }}


                    validationSchema={yup.object().shape({
                        fromDate: yup
                            .string()
                            .required('ERROR_WORKLOG_DATE'),
                        worklogType: yup
                            .string()
                            .required('ERROR_WORKLOG_JOB'),
                        fieldIdArray: yup
                            .array()
                            .required('ERROR_WORKLOG_FEILD'),
                        id: yup
                            .string()
                            .when('worklogType', {
                                is: (type) => type && type === 'FERTILIZER' || type === 'PESTICIDE',
                                then: yup
                                    .string()
                                    .required('ERROR_WORKLOG_MANUFACTURER'),
                                otherwise: yup.string(),
                            }),
                        amount: yup
                            .string()
                            .when('worklogType', {
                                is: (type) => type && type === 'FERTILIZER' || type === 'PESTICIDE' || type === 'WATERING',
                                then: yup
                                    .string()
                                    .required('ERROR_WORKLOG_AMOUNT'),
                                otherwise: yup.string(),
                            }),
                        ratio: yup
                            .string()
                            .when('worklogType', {
                                is: (type) => type && type === 'FERTILIZER' || type === 'PESTICIDE',
                                then: yup
                                    .string()
                                    .required('ERROR_WORKLOG_RATIO'),
                                otherwise: yup.string(),
                            }),

                    })}

                    onSubmit={handleSubmit}>

                    {(formik) => {
                        return (
                            <Form noValidate >
                                {
                                    star == 0 ?
                                        <Tooltip title={t("TITLE_DELETE_FAV_SEC")}>
                                            <IconButton
                                                // onClick={item => star === 0 ? setStar(1) : setStar(0)}
                                                onClick={removeAction}
                                                aria-label="favorite"
                                                sx={{
                                                    background: '#ffba0b',
                                                    '&:hover': {
                                                        background: '#fff',
                                                        '& .MuiSvgIcon-root': {
                                                            color: '#ffba0b',
                                                        },
                                                    },
                                                    float: "right"
                                                }}
                                                size='small'
                                            >
                                                <StarIcon sx={{ color: "#fff" }} />
                                            </IconButton>
                                        </Tooltip>
                                        :
                                        <Tooltip title={t("CREATE_FAVORITE_FIELD")}>
                                            <IconButton
                                                size='small'
                                                // onClick={item => star === 0 ? setStar(1) : setStar(0)}
                                                onClick={() => {
                                                    formik.validateForm().then((errors) => {
                                                        const { fieldIdArray, ...restErrors } = errors;
                                                        if (Object.keys(restErrors).length === 0 && formik.dirty) {
                                                            checkAction(formik.values)
                                                        } else {
                                                            const touchedFields = Object.keys(formik.values).reduce((acc, key) => {
                                                                if (key !== "fieldIdArray") {
                                                                    acc[key] = true;
                                                                }
                                                                return acc;
                                                            }, {});
                                                            formik.setTouched(touchedFields);
                                                            console.log("Form is not valid except for fieldIdArray:", restErrors);
                                                        }
                                                    });
                                                }}
                                                aria-label="favorite"
                                                sx={{
                                                    background: '#d7d7d6',
                                                    '&:hover': {
                                                        background: '#d7d7d6',
                                                        '& .MuiSvgIcon-root': {
                                                            color: '#fff',
                                                        },
                                                    },
                                                    float: "right"
                                                }}>
                                                <StarBorderIcon sx={{ color: "#000000" }} />
                                            </IconButton>
                                        </Tooltip>
                                }
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} >
                                        <LocalizationProvider dateAdapter={AdapterDateFns} >
                                            <DatePicker
                                                label={t('SELECT_FIELD')}
                                                id={"fromDate"}
                                                name={"fromDate"}
                                                value={formik.values.fromDate}
                                                renderInput={(params) => <TextField required sx={{ width: '100%' }}{...params} />}
                                                onChange={(value) => {
                                                    const formattedDate = value ? new Date(value).toISOString().split('T')[0] : '';
                                                    formik.setFieldValue("fromDate", formattedDate);
                                                }}
                                                onBlur={() => formik.setFieldTouched('fromDate', true)}
                                                helperText={
                                                    formik.touched.fromDate && formik.errors.fromDate ? formik.errors.fromDate : null
                                                } maxDate={new Date()}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <MultipleSelect
                                            formik={formik}
                                            menuList={fieldList}
                                            field="fieldIdArray"
                                            label="SELECT_FIELD"
                                            labelKey={'fieldName'}
                                            valueKey={'fieldId'}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <SelectMenu
                                            formik={formik}
                                            menuList={array}
                                            valueKey={'value'}
                                            labelKey={'label'}
                                            field="worklogType"
                                            label="SELECT_JOB"
                                        />
                                    </Grid>
                                    {
                                        formik.values.worklogType && (formik.values.worklogType === "FERTILIZER" || formik.values.worklogType === "PESTICIDE") &&
                                        <Grid item xs={12} sm={12}>
                                            <AutoCompleteSelectMenu
                                                formik={formik}
                                                menuList={formik.values.worklogType === "FERTILIZER" ? fertilizerData : pesticideData}
                                                field="id"
                                                label="SELECT_NAME_AND_MANUFACTURER"
                                                labelKey={'name'}
                                                valueKey={'id'}
                                            />
                                        </Grid>
                                    }

                                    {
                                        formik.values.worklogType && (formik.values.worklogType === "WATERING" || formik.values.worklogType === "FERTILIZER" || formik.values.worklogType === "PESTICIDE") &&
                                        <Grid Grid item xs={12} sm={12}>
                                            <TextFieldForm
                                                formik={formik}
                                                field="amount"
                                                label="ENTER_AMOUNT"
                                                type="number"
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">{t("T")}</InputAdornment>,
                                                }}
                                            />
                                        </Grid>
                                    }

                                    {
                                        formik.values.worklogType && (formik.values.worklogType === "FERTILIZER" || formik.values.worklogType === "PESTICIDE") &&
                                        <Grid Grid item xs={12} sm={12}>
                                            <TextFieldForm
                                                formik={formik}
                                                field="ratio"
                                                label="RATIO"
                                                type="number"
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">{t("TIMES")}</InputAdornment>,
                                                }}
                                            />
                                        </Grid>
                                    }
                                    <Grid Grid item xs={12} sm={12} sx={{ mb: 2 }}>
                                        <TextFieldForm
                                            required={false}
                                            formik={formik}
                                            field="detail"
                                            label="ENTER_DESCRIPTION"
                                            multiline
                                            rows={5}
                                            maxRows={5}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <ImageForm
                                            formik={formik}
                                            field="image"
                                            label="image"
                                            heightWidth={270}
                                            imageReturn={(img) => { setImage(img) }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <ImageForm
                                            formik={formik}
                                            field="image2"
                                            label="image2"
                                            heightWidth={270}

                                            imageReturn={(img) => { setImage2(img) }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} textAlign={"end"} >
                                        <SubmitButton />
                                        {/* <CloseButton /> */}
                                    </Grid >
                                </Grid>
                            </Form>
                        )
                    }}
                </Formik>
            </MainCard >
        </>
    )
}
export default ModifyWorklog