import { Avatar, CardContent, Grid, TextField } from '@mui/material';
import CloseButton from 'app/Component/Input/Forms/CloseButton';
import SubmitButton from 'app/Component/Input/Forms/SubmitButton';
import TextFieldForm from 'app/Component/Input/Forms/TextFieldForm';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import SelectMenu from 'app/Component/Input/Forms/SelectMenu';
import AutoCompleteSelectMenu from 'app/Component/Input/Forms/AutoCompleteSelectMenu';
import SelectMenuArray from 'app/Component/Input/Forms/SelectMenuArray';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { modifyEventAPI } from 'app/services/fields-services';
import { useDispatch } from 'react-redux';
import GrassIcon from '@mui/icons-material/Grass';

const EventModify = ({ state, data, callBack }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const treeList = [];
  const array = state.fieldTree.map(item => ({
    treeTypeId: item?.treeTypeId,
    age: item?.tag,
    fieldTreeId: item?.fieldTreeId,
    showDate: item?.showDate,
    transPlanspantDate: item?.transPlanspantDate,
  }));

  array.forEach(arrayItem => {
    const item = data?.Tree.find(item => item.treeTypeId === arrayItem.treeTypeId);
    // it revise
    treeList.push({
      treeTypeId: arrayItem?.fieldTreeId,
      fieldTreeId: item?.treeTypeId,
      treeType: `${item?.treeType} ${arrayItem?.age}`,
      showDate: arrayItem?.showDate,
      transPlanspantDate: arrayItem?.transPlanspantDate,
      treeImage: arrayItem?.treeImage,
    });
  });

  const handleSubmit = (values) => {
    if (values.toFieldId == '')
      values.toFieldId = null

    if (values.eventType !== 'SOWING') {
      const temp = values?.treeTypeId
      values.fieldTreeId = temp
      const object = treeList.filter(item => item.treeTypeId == temp)[0]
      values.treeTypeId = object?.fieldTreeId
      if (values.eventType == 'TRANSPLANT') {
        values.sowingDate = object?.showDate
        values.showDate = null
        values.transplantDate = null
        values.transPlanspantDate = null
        if (object.transPlanspantDate) {
          values.transplantDate = object?.transPlanspantDate
          values.eventType = 'RETRANSPLANT'
        }
      }
    }

    dispatch(modifyEventAPI(values, (res) => {
      callBack()
    }))
  }

  const arrayEventTypes = [
    { value: 'SOWING', label: t('SOWING') },
    { value: 'TRANSPLANT', label: t('TRANSPLANT') },
    { value: 'MOVING', label: t('MOVING') },
    { value: 'RELEASE', label: t('RELEASE') },
  ]

  const findImagePath = (values) => {
    if (values?.eventType == 'SOWING') {
      return data?.Tree.find(item => item.treeTypeId === values.treeTypeId)?.treeImage
    } else {
      const temp = values?.treeTypeId
      const object = treeList.filter(item => item.treeTypeId == temp)[0]
      return data?.Tree.find(item => item.treeTypeId === object?.fieldTreeId)?.treeImage
    }
  }

  const findFind = (values) => {
    if (values?.eventType == 'SOWING') {
      return data?.Tree.find(item => item.treeTypeId === values.treeTypeId)?.treeType
    } else {
      const temp = values?.treeTypeId
      const object = treeList.filter(item => item.treeTypeId == temp)[0]
      return data?.Tree.find(item => item.treeTypeId === object?.fieldTreeId)?.treeType
    }
  }


  return (
    <Formik
      initialValues={{
        eventType: '',
        eventDate: new Date().toISOString().split('T')[0],
        fieldId: state?.fieldId, // Static
        port: '',
        // sowingDate: "",
        showDate: '',
        toFieldId: '',
        transPlanspantDate: '',
        tray: '',
        treeTypeId: '',
      }}
      validationSchema={yup.object().shape({
        eventType: yup
          .string()
          .required('SELECT_EVENT'),
        toFieldId: yup
          .string()
          .when('eventType', {
            is: (eventType) => eventType && eventType !== 'SOWING',
            then: yup
              .string()
              .required('SELECT_DESTINATION'),
            otherwise: yup.string(),
          }),
        treeTypeId: yup
          .string()
          .required('SELECT_TREE'),
        eventDate: yup
          .string()
          .required('SELECT_DATE'),
        port: yup
          .string()
          .required('SELECT_PORT'),
        tray: yup
          .string()
          .required('SELECT_TRAY'),
      })}
      onSubmit={handleSubmit}>

      {(formik) => {
        return (
          <Form noValidate>
            <Grid container spacing={2} sx={{ mb: 2 }}>

              <Grid item xs={12} md={12}>
                <CardContent sx={{ borderBottom: "1px solid #ebebeb" }}>
                  <Avatar
                    variant='square'
                    src={findImagePath(formik.values)}
                    sx={{
                      width: 180,
                      height: 180,
                      margin: "auto",
                      background: "#e6f2e6"
                    }}>
                    <GrassIcon sx={{ width: 150, height: 150, color: "#017C07" }} />
                  </Avatar>
                  <h6 style={{ textAlignLast: "center", marginTop: 10, marginBottom: 0, padding: 0 }}>
                    {findFind(formik?.values) || ''} <span style={{ color: "#017C07", fontWeight: 600 }}> +{formik?.values?.port * formik?.values?.tray} </span>
                  </h6>

                </CardContent>
              </Grid>
              <Grid item xs={12} md={6}>
                <SelectMenu
                  formik={formik}
                  label={"DROPDOWN_LABEL_EVENT"}
                  field={"eventType"}
                  menuList={arrayEventTypes}
                  valueKey={'value'}
                  labelKey={'label'}
                />

              </Grid>

              <Grid item xs={12} md={6}>
                <SelectMenu
                  disabled={formik.values.eventType == 'SOWING' ? true : false}
                  required={formik.values.eventType != 'SOWING' ? true : false}
                  formik={formik}
                  label={"DROPDOWN_LABEL_DESTINATION"}
                  field={"toFieldId"}
                  menuList={data?.Field}
                  valueKey={'fieldId'}
                  labelKey={'fieldName'}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <AutoCompleteSelectMenu
                  formik={formik}
                  label={"DROPDOWN_LABEL_TREETYPE"}
                  field={"treeTypeId"}
                  menuList={formik.values.eventType != 'SOWING' ? treeList : data?.Tree}
                  valueKey={'treeTypeId'}
                  labelKey={'treeType'}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns} >
                  <DatePicker
                    label={t("SELECT_DATE")}
                    id={"eventDate"}
                    name={"eventDate"}
                    value={formik.values.eventDate}
                    renderInput={(params) => <TextField required sx={{ width: '100%' }}{...params} />}
                    onChange={(value) => {
                      const formattedDate = value ? new Date(value).toISOString().split('T')[0] : '';
                      formik.setFieldValue("eventDate", formattedDate);
                    }}
                    onBlur={() => formik.setFieldTouched('eventDate', true)}
                    helperText={
                      formik.touched.eventDate && formik.errors.eventDate ? t(formik.errors.eventDate) : null
                    }
                    maxDate={new Date()}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} md={6}>

                <SelectMenuArray
                  formik={formik}
                  label={"DROPDOWN_LABEL_PORTTYPE"}
                  field={"port"}
                  information={t("DROPDOWN_LABEL_PORTTYPE")}
                  menuList={data?.Port}
                />
              </Grid>


              <Grid item xs={12} md={6}>
                <TextFieldForm
                  type={"number"}
                  formik={formik}
                  label={"TRAYS"}
                  field={"tray"}
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

export default EventModify