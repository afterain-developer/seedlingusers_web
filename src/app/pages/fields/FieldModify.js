import { Grid } from '@mui/material';
import ImageForm from 'app/Component/Input/Forms/ImageForm';
import SubmitButton from 'app/Component/Input/Forms/SubmitButton';
import TextFieldForm from 'app/Component/Input/Forms/TextFieldForm';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { modifyFieldAPI } from 'app/services/fields-services';

const FieldModify = ({ state, callBack }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState()
  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("fieldId", state?.fieldId)
    formData.append("fieldName", values?.fieldName)
    if (image)
      formData.append('fileName', image)

    dispatch(modifyFieldAPI(formData, (res) => {
      callBack()
    }))
  }
  return (
    <Formik
      initialValues={{
        image: state?.fieldImagePath || '',
        fieldName: state?.fieldName || ''
      }}
      validationSchema={yup.object().shape({
        fieldName: yup
          .string()
          .required('ENTER_NAME_OF_YOUR_FIELD'),
      })}
      onSubmit={handleSubmit}
    >
      {(props) => {
        return (
          <Form noValidate>
            <Grid container spacing={2.5} sx={{ mt: 2, mb: 2 }}>
              <Grid item xs={12} sm={12} sx={{ position: "relative" }} >
                <ImageForm
                  heightWidth={250}
                  variant="square"
                  formik={props}
                  field={'image'}
                  color='#017C07'
                  imageReturn={(item) => setImage(item)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextFieldForm
                  formik={props}
                  label={"ENTER_NAME_OF_YOUR_FIELD"}
                  field={"fieldName"}
                />
              </Grid>

              <Grid item xs={12} sm={12} textAlign={"end"} >
                <SubmitButton />
                {/* <CloseButton /> */}
                <Grid />
              </Grid>
            </Grid>
          </Form>

        );
      }}
    </Formik >
  )
}

export default FieldModify
