import { Button, Grid } from '@mui/material'
import AutoCompleteSelectMenu from 'app/Component/Input/Forms/AutoCompleteSelectMenu'
import SelectMenu from 'app/Component/Input/Forms/SelectMenu'
import SelectMenuArray from 'app/Component/Input/Forms/SelectMenuArray'
import { WorkLogGraphAPI, fetchWorklogData, workLogTypeBaseManufacturesAPI } from 'app/services/worklog-services'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import * as yup from 'yup';
import LineCharts from './LineCharts'
import NoDataPlaceholder from 'app/shared/NoDataPlaceholder'

const WorkLogGraph = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const [fieldList, setFieldList] = useState([]);
    const [graphList, setGraphList] = useState([]);
    const [manufactures, setManufactures] = useState([]);

    useEffect(() => {
        dispatch(fetchWorklogData({ farmId: localStorage.getItem('farmId') }, (res) => {
            setFieldList(res?.fieldList);
        }))
    }, [])

    const handleSubmit = (values) => {
        if (values?.worklogType == 'FERTILIZER' || values?.worklogType == 'PESTICIDE') {
            values.manufacturerId = manufactures.filter(item => item.typeId == values.typeId)[0]?.manufacturer;
        }
        let tempArray = {
            label: [],
            values: []
        }
        dispatch(WorkLogGraphAPI(values, res => {
            res.map(temp => {
                tempArray.label.push(temp?.label)
                tempArray.values.push(temp?.value)
            })
            setGraphList(tempArray)
        }))
    };

    const manufactureAction = (event) => {
        const Type = event?.target?.value
        console.log(Type, "event");
        if (Type === 'FERTILIZER' || Type === 'PESTICIDE') {
            dispatch(workLogTypeBaseManufacturesAPI({ worklogType: Type }, res => {
                const temp = []
                res?.map((item) => {
                    temp.push({
                        typeId: item?.id,
                        name: `${item?.Manufacturer?.manufacturerName} ${item?.name}`,
                        manufacturer: item?.Manufacturer?.manufacturerId
                    })
                })
                setManufactures(temp);
            }))
        }
    };

    const timeRangesList = [
        { value: 'WEEK', label: t("ONE_WEEK") },
        { value: 'MONTH', label: t("ONE_MONTH") },
        { value: 'SIXMONTH', label: t("SIX_MONTH") },
        { value: 'YEAR', label: t("ONE_YEAR") },
    ];

    const array = [
        { value: 'FERTILIZER', label: t("FERTILIZER") },
        { value: 'PESTICIDE', label: t("PESTICIDE") },
        { value: 'WATERING', label: t("WATERING") },
        { value: 'DISEASE', label: t("DISEASE") },
    ];

    return (
        <>
            <Formik
                initialValues={{
                    duration: 'WEEK',
                    fieldId: '',
                    worklogType: '',
                    typeId: '',
                }}
                validationSchema={yup.object().shape({
                    duration: yup
                        .string()
                        .required('durationisrequired'),
                    fieldId: yup
                        .string()
                        .required('ERROR_WORKLOG_FEILD'),
                    worklogType: yup
                        .string()
                        .required(t('ERROR_WORKLOG_JOB')),
                    typeId: yup
                        .string()
                        .when('worklogType', {
                            is: (type) => type && type === 'FERTILIZER' || type === 'PESTICIDE',
                            then: yup
                                .string()
                                .required('ERROR_WORKLOG_MANUFACTURER'),
                            otherwise: yup.string(),
                        }),
                })}
                onSubmit={handleSubmit}>

                {(formik) => (
                    <Form noValidate>
                        <Grid container spacing={2} sx={{ mt: 0 }}>
                            <Grid item xs={12} >
                                <SelectMenu
                                    formik={formik}
                                    label={"SELECT_TIME"}
                                    field={"duration"}
                                    menuList={timeRangesList}
                                    valueKey={'value'}
                                    labelKey={'label'}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <SelectMenu
                                    formik={formik}
                                    label={"SELECT_FIELD"}
                                    field={"fieldId"}
                                    menuList={fieldList}
                                    valueKey={'fieldId'}
                                    labelKey={'fieldName'}
                                />
                            </Grid>
                            <Grid item xs={12} >

                                <SelectMenu
                                    formik={formik}
                                    menuList={array}
                                    field="worklogType"
                                    label="SELECT_JOB"
                                    valueKey={'value'}
                                    labelKey={'label'}
                                    callBackAction={manufactureAction}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                {
                                    formik.values.worklogType && (formik.values.worklogType === "FERTILIZER" || formik.values.worklogType === "PESTICIDE") &&
                                    <Grid item xs={12} sm={12}>
                                        <AutoCompleteSelectMenu
                                            formik={formik}
                                            menuList={manufactures}
                                            field="typeId"
                                            label="SELECT_NAME_AND_MANUFACTURER"
                                            labelKey={'name'}
                                            valueKey={'typeId'}
                                        />
                                    </Grid>
                                }
                            </Grid>

                            <Grid item xs={12} sm={12} textAlign={"end"} >
                                <Button
                                    fullWidth
                                    type='submit'
                                    variant="contained"
                                    // onClick={() => setValue(0)}
                                    sx={{ textTransform: "none" }}>
                                    {t('SHOW_CHART')}
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
            {
                graphList?.values.length > 0 ?
                    <LineCharts
                        values={graphList?.values}
                        categories={graphList?.label}
                        title={t("WORKLOG_CHART_TITLE")}
                        titleValue=' '
                    /> :
                    <NoDataPlaceholder />
            }
        </>
    )
}

export default WorkLogGraph