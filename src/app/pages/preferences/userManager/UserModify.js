import PageHeaderButton from 'app/Component/Buttons/PageHeaderButton'
import MainCard from 'app/Component/Cards/MainCard'
import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { Grid, TextField } from '@mui/material';
import InputMask from 'react-input-mask';
import { useTranslation } from 'react-i18next';
import TextFieldForm from 'app/Component/Input/Forms/TextFieldForm';
import SubmitButton from 'app/Component/Input/Forms/SubmitButton';
import CloseButton from 'app/Component/Input/Forms/CloseButton';
import { userModifyAPi } from 'app/services/preferences/user-manager-services';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserModify = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const navigator = useNavigate()

    const handleSubmit = (values) => {
        values.mobile = values.mobile.split('-').join('')
        dispatch(userModifyAPi(values, () => {
            navigator("/seedling/preferences/user-manager")
        }))
    }
    return (
        <MainCard
            title={"TITLE_ADD_USER"}
            button={
                <PageHeaderButton
                    title={"BACK"}
                    icon={<ArrowBackIcon />}
                    to={"/seedling/preferences/user-manager"}
                />}>
            <Formik
                initialValues={{
                    fullName: '',
                    mobile: '',
                }}
                validationSchema={yup.object().shape({
                    fullName: yup
                        .string()
                        .required('ENTER_THE_PHONE_NUMBER_OF_USER'),
                    mobile: yup
                        .string()
                        .required('ENTER_VALID_MOBILE_NUMBER'),
                })}
                onSubmit={handleSubmit}>

                {(props) => {
                    const { values, errors, touched, setFieldValue } = props
                    return (

                        <Form noValidate>
                            <Grid container spacing={2.5} >
                                <Grid item xs={12}>
                                    <TextFieldForm
                                        formik={props}
                                        field={"fullName"}
                                        label={"ENTER_FIRST_NAME"}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <InputMask mask="010-9999-9999" name="mobile" value={values.mobile} onChange={(e) => { setFieldValue('mobile', e.target.value) }}>
                                        {() =>
                                            <TextField
                                                fullWidth
                                                required
                                                onKeyDown={e => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()}
                                                error={Boolean(errors.mobile) && touched.mobile}
                                                helperText={(Boolean(errors.mobile) && touched.mobile) ? t(errors.mobile) : ''}
                                                label={t('ENTER_THE_PHONE_NUMBER_OF_USER')}
                                            />
                                        }
                                    </InputMask>
                                </Grid>
                                <Grid item xs={12} textAlign={"end"} >
                                    <SubmitButton />
                                    <CloseButton to={"/seedling/preferences/user-manager"} />
                                </Grid>
                            </Grid>

                        </Form>
                    )
                }}
            </Formik>
        </MainCard>
    )
}

export default UserModify