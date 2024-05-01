import { FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material'
import MainCard from 'app/Component/Cards/MainCard'
import AntdDateTime from 'app/Component/Input/Forms/AntdDateTime'
import React from 'react'
import * as yup from 'yup';
import { ErrorMessage, Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import PageHeaderButton from 'app/Component/Buttons/PageHeaderButton'
import TextFieldForm from 'app/Component/Input/Forms/TextFieldForm'
import SubmitButton from 'app/Component/Input/Forms/SubmitButton';
import { DesktopTimePicker, LocalizationProvider, MobileDateTimePicker, MobileTimePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setReminderModifyAPI } from 'app/services/preferences/set-reminder-services';
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;
const ModifyReminder = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { farmId } = useSelector(redux => redux.FarmReducer);

    const handleSubmit = (values) => {

        const getNext30MinuteInterval = (date) => ({
            formattedDate: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
            formattedTime: `${date.getHours().toString().padStart(2, '0')}:${(Math.ceil(date.getMinutes() / 30) * 30).toString().padStart(2, '0')}`
        });
        const { formattedDate, formattedTime } = getNext30MinuteInterval(values.dateValue);

        values.date = formattedDate
        values.time = formattedTime
        delete values.dateValue;

        dispatch(setReminderModifyAPI(values, res => { navigate("/seedling/preferences/set-reminder") }))
    }
    const range = (start, end) => {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    };

    const disabledDate = (current) => {
        return current && current < dayjs().startOf('day');
    };

    const disabledDateTime = (current) => {
        if (current && current.isSame(dayjs(), 'day')) {
            return {
                disabledHours: () => range(0, dayjs().hour()),
                disabledMinutes: () => range(0, dayjs().minute()),
                disabledSeconds: () => [],
            };
        }
        return {};
    };

    return (
        <MainCard
            title="SET_REMINDER"
            button={<PageHeaderButton
                title="BACK"
                to={"/seedling/preferences/set-reminder"}
            />}
        >
            <Formik
                initialValues={{
                    dateValue: new Date(Math.ceil(new Date().getTime() / (15 * 60 * 1000)) * (15 * 60 * 1000)),
                    description: '',
                    times: 'once',
                    farmId: farmId,
                }}
                validationSchema={yup.object().shape({
                    description: yup
                        .string()
                        .required('ENTER_MESSAGE'),
                    dateValue: yup
                        .string()
                        .required('SELECT_VALID_TIME'),
                    times: yup
                        .string()
                        .required('selectdateisrequired'),
                })}
                onSubmit={handleSubmit}>

                {(formik) => {
                    return (
                        <Form noValidate>
                            <Grid container spacing={2}>
                                <Grid item sm={12}>
                                    <TextFieldForm
                                        formik={formik}
                                        field={'description'}
                                        label={'ENTER_MESSAGE'}
                                    />
                                </Grid>
                                <Grid item sm={12}>
                                    <DatePicker
                                        multiple={true}
                                        minuteStep={15}
                                        showWeek
                                        showTime
                                        defaultValue={dayjs(formik.values.dateValue)}
                                        onChange={(e) => { formik.setFieldValue('dateValue', new Date(e)) }}
                                        format={'DD-MM-YYYY - HH:mm'}
                                        size='large'
                                        style={{ width: '100%' }}

                                        disabledDate={disabledDate}
                                        disabledTime={disabledDateTime} />
                                </Grid>

                                <Grid item xs={12} >
                                    <FormLabel> {t("HOW_MANY_TIMES_WILL_THE_PUSH_BE_SENT")} {t("IT_WILL_BE_SENT")} {t("EVERY_1_HOUR")}  </FormLabel>
                                    <RadioGroup
                                        row
                                        name="times"
                                        value={formik.values.times}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={Boolean(formik.errors.times) && formik.touched.times}
                                        helperText={Boolean(formik.errors.times) && formik.touched.times ? t(formik.errors.times) : ''}

                                    >
                                        <FormControlLabel value={'once'} control={<Radio color='info' size="small" />} label={t('ONCE')} />
                                        <FormControlLabel value={'twice'} control={<Radio color='info' size="small" />} label={t('TWICE')} />
                                        <FormControlLabel value={'thrice'} control={<Radio color='info' size="small" />} label={t('THREE_TIMES')} />
                                    </RadioGroup>
                                    <ErrorMessage name={'times'}>
                                        {(msg) => <div style={{ color: '#d32f2f', fontSize: "12px", marginLeft: '15px' }}>{msg}</div>}
                                    </ErrorMessage>
                                </Grid>
                                <Grid item sm={12}>
                                    <SubmitButton />
                                </Grid>
                            </Grid>
                        </Form>
                    );
                }}
            </Formik>
        </MainCard >
    )
}

export default ModifyReminder