import { Grid, InputAdornment, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider, } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import SelectMenu from 'app/Component/Input/Forms/SelectMenu';
import SubmitButton from 'app/Component/Input/Forms/SubmitButton';
import TextFieldForm from 'app/Component/Input/Forms/TextFieldForm';
import { fetchEventAPI, modifyEventAPI } from 'app/services/fields-services';
import { Form, Formik } from 'formik';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

const MonitoringModify = ({ state, data, callBack, flag }) => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [eventList, setEventList] = useState([]);
    const [selectDateList, setSelectDateList] = useState([]);

    const treeList = [];
    const array = state && state?.fieldTree?.length > 0 ? state?.fieldTree.map(item => ({ treeTypeId: item?.treeTypeId, age: item?.tag, fieldTreeId: item?.fieldTreeId })) : [];
    array && array?.length > 0 && array.forEach(arrayItem => {
        const item = data && data?.Tree?.length > 0 ? data?.Tree.find(item => item.treeTypeId === arrayItem.treeTypeId) : ''
        treeList.push({
            fieldTreeId: arrayItem?.fieldTreeId,
            treeTypeId: item?.treeTypeId,
            treeType: `${item?.treeType} ${arrayItem?.age}`,
            age: arrayItem?.age
        });
    });

    const handleSubmit = (values) => {
        values.fieldTreeId = values?.treeTypeId
        values.treeTypeId = treeList.filter(item => item.fieldTreeId == values.fieldTreeId)[0]?.treeTypeId

        dispatch(modifyEventAPI(values, (res) => {
            setSelectDateList([])
            callBack()
            EventListFetchAction()
        }))
    }

    const EventListFetchAction = () => {
        dispatch(fetchEventAPI({
            fieldId: state?.fieldId,
            eventType: "MONITORING"
        }, (res) => {
            setSelectDateList([])
            setEventList(res)
        }))
    }

    useEffect(() => {
        EventListFetchAction()
    }, [flag])

    const customDates = [
        { date: new Date('2024-03-01'), },
        { date: new Date('2024-04-01'), },
        { date: new Date('2024-07-04'), },
        { date: new Date('2024-12-25'), },
    ];

    function isSameDay(date1, date2) {
        return (
            date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()
        );
    }

    function isSameMonth(date1, date2) {
        return (
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()
        );
    }
    const style = {
        margin: "0 2px",
        borderRadius: "50%",
        width: "36px",
        height: "36px",
        border: "none",
        backgroundColor: "#FFf",
        fontSize: "12px"
    }


    const renderDay = (date, _value, dayProps, value, formik) => {
        const currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const isSelected = isSameDay(dayProps?.day, _value[0]);

        const isCustomDate = selectDateList.some((customDate) =>
            isSameDay(currentDate, customDate.date)

        );

        const isToday = isSameDay(currentDate, new Date());

        const defaultStyles = {
            cursor: 'pointer',
            ...style

        };

        if (isToday) {
            defaultStyles.border = '1px solid gray';
        }

        if (isCustomDate) {
            defaultStyles.backgroundColor = '#97dcef';
            defaultStyles.border = "none"
        }


        if (isSelected) {
            defaultStyles.backgroundColor = '#92d050'
            defaultStyles.border = "none"
        }



        return (
            <button
                {...dayProps}
                style={{
                    ...defaultStyles,
                }}
                onClick={() => handleDateClick(currentDate, formik)}
            >
                {date.getDate()}
            </button>
        );
    };

    const handleDateClick = (selectedDate, formik) => {
        const formattedDate = selectedDate ? new Date(selectedDate.getTime() + (24 * 60 * 60 * 1000)).toISOString().split('T')[0] : '';
        setIsDatePickerOpen(false)
        formik.setFieldValue("eventDate", formattedDate);
    };

    const TreeAction = (treeId) => {
        const temp = treeId
        const selectTree = treeList.filter(item => item.fieldTreeId == temp)[0]
        const array = eventList.filter(item => item?.treeTypeId == selectTree?.treeTypeId && item?.treeAge == selectTree?.age)
        const tempArray = []
        array.map(item => {
            tempArray.push({ date: new Date(item?.eventDate) })
        })
        setSelectDateList(tempArray)
    }
    return (
        <>
            <Formik
                initialValues={{
                    eventType: 'MONITORING',
                    eventDate: new Date(),
                    fieldId: state?.fieldId,
                    treeTypeId: "",
                    treeHeight: "",
                    treeWidth: "",

                }}
                validationSchema={yup.object().shape({
                    treeTypeId: yup
                        .string()
                        .required('ERROR_TREE_SELECT_MESSAGE'),
                    eventDate: yup
                        .string()
                        .required('ERROR_WORKLOG_DATE'),
                    treeHeight: yup
                        .string()
                        .required('PLEASE_ENTER_HEIGHT'),
                    treeWidth: yup
                        .string()
                        .required('PLEASE_ENTER_WIDTH'),
                })}
                onSubmit={handleSubmit}>

                {(formik) => {
                    return (
                        <Form noValidate>
                            <Grid container spacing={2} sx={{ mb: 2 }}>

                                <Grid item xs={12} md={6}>
                                    <SelectMenu
                                        formik={formik}
                                        label={"DROPDOWN_LABEL_TREETYPE"}
                                        field={"treeTypeId"}
                                        menuList={treeList}
                                        valueKey={'fieldTreeId'}
                                        labelKey={'treeType'}
                                        callBackAction={(event) => { TreeAction(event?.target?.value) }}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                                        <DatePicker
                                            open={isDatePickerOpen}
                                            onOpen={() => setIsDatePickerOpen(true)}
                                            onClose={() => setIsDatePickerOpen(false)}
                                            label={t('SELECT_DATE')}
                                            id={"eventDate"}
                                            name={"eventDate"}
                                            value={formik.values.eventDate}
                                            renderInput={(params) => <TextField required sx={{ width: '100%' }}{...params} />}
                                            onChange={(value) => {
                                                const formattedDate = value ? new Date(value).toISOString().split('T')[0] : '';
                                                formik.setFieldValue("eventDate", formattedDate);
                                            }}
                                            slotProps={{
                                                day: {
                                                    sx: {
                                                        "&.MuiPickersDay-root.Mui-selected": {
                                                            backgroundColor: "red",
                                                        },
                                                    },
                                                },
                                            }}
                                            renderDay={(date, _value, dayProps, value) => renderDay(date, _value, dayProps, value, formik)}
                                            onBlur={() => formik.setFieldTouched('eventDate', true)}
                                            helperText={
                                                formik.touched.eventDate && formik.errors.eventDate ? formik.errors.eventDate : null
                                            }
                                            maxDate={new Date()}
                                        />
                                    </LocalizationProvider>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextFieldForm
                                        type={"number"}
                                        formik={formik}
                                        label={"DROPDOWN_LABEL_HEIGHT"}
                                        field={"treeHeight"}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">{t("MM")}</InputAdornment>,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextFieldForm
                                        type={"number"}
                                        formik={formik}
                                        label={"DROPDOWN_LABEL_WIDTH"}
                                        field={"treeWidth"}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">{t("MM")}</InputAdornment>,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} textAlign={"end"} >
                                    <SubmitButton />
                                    <Grid />
                                </Grid>
                            </Grid>
                        </Form>

                    );
                }}
            </Formik >
        </>
    )
}

export default MonitoringModify