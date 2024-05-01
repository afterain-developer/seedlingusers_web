import { Autocomplete, TextField } from '@mui/material';
import React from 'react'
import { useTranslation } from 'react-i18next';

const AutoCompleteSelectMenu = ({ formik, label, field, menuList, valueKey, labelKey, required = true }) => {
    const { t } = useTranslation();
    return (
        <Autocomplete
            fullWidth
            id={field}
            name={field}
            options={menuList}
            getOptionLabel={(option) => option?.[labelKey] || " "}
            value={menuList.find((option) => option[valueKey] === formik.values[field]) || null}
            onChange={(e, value) => {
                const selectedPesticideId = value?.[field] || '';
                formik.setFieldValue(field, selectedPesticideId);
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={t(label)}
                    required={required}
                    onBlur={formik.handleBlur}
                    error={formik.touched[field] && Boolean(formik.errors[field])}
                    helperText={formik.touched[field] && formik.errors[field] ? t(formik.errors[field]) : ""}
                />
            )}
            noOptionsText={t('NO_DATA')}
            disableClearable={true}
        />
    )
}

export default AutoCompleteSelectMenu