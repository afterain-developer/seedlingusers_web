import React from 'react'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'

const TextFieldForm = ({ formik, field, label, ...props }) => {
    const { t } = useTranslation()
    return (
        <TextField
            required
            fullWidth
            id={label}
            label={t(label)}
            InputLabelProps={{ shrink: formik.values[field] ? true : false }}
            name={field}
            value={formik.values[field]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.errors[field]) && formik.touched[field]}
            helperText={Boolean(formik.errors[field]) && formik.touched[field] ? t(formik.errors[field]) : ''}
            {...props}
        />
    )
}

export default TextFieldForm