import { Grid } from '@mui/material'
import MainCard from 'app/Component/Cards/MainCard'
import { Form, Formik } from 'formik'
import React from 'react'
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom'
import TextFieldForm from 'app/Component/Input/Forms/TextFieldForm'
import PageHeaderButton from 'app/Component/Buttons/PageHeaderButton'
import { useTranslation } from 'react-i18next';
import SubmitButton from 'app/Component/Input/Forms/SubmitButton';
import { useDispatch } from 'react-redux';
import { ModifyNoticeAPI } from 'app/services/preferences/notice-manager-services';

const ModifyNotice = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSubmit = (values) => {
    dispatch(ModifyNoticeAPI(values, res => {
      navigate("/seedling/preferences/notice-manager");
    }))
  }
  return (
    <MainCard
      title={"ADD_NOTICE"}
      button={
        <PageHeaderButton
          title={"BACK"}
          to={"/seedling/preferences/notice-manager"}
        />}>

      <Formik
        initialValues={{
          title: '',
          discription: '',
        }}
        validationSchema={yup.object().shape({
          title: yup
            .string()
            .required('ENTER_TITLE'),
          discription: yup
            .string()
            .required('ENTER_DESCRIPTION'),
        })}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          return (
            <Form noValidate>
              <Grid container spacing={2} >

                <Grid item sm={12}>
                  <TextFieldForm
                    formik={formik}
                    label={"ENTER_TITLE"}
                    field={"title"}
                  />
                </Grid>

                <Grid item sm={12}>
                  <TextFieldForm
                    formik={formik}
                    label={"ENTER_DESCRIPTION"}
                    field={"discription"}
                    multiline
                    rows={10}
                    maxRows={10}
                  />
                </Grid>
                <Grid item sm={12}>
                  <SubmitButton />
                </Grid>
              </Grid>
            </Form>
          )
        }}
      </Formik>

    </MainCard>
  )
}

export default ModifyNotice