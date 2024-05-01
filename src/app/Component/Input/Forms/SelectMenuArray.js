import { Autocomplete, FormControl, MenuItem, TextField } from '@mui/material';
import React from 'react'
import { useTranslation } from 'react-i18next';

const SelectMenuArray = ({ formik, label, field, menuList, information, callBackAction, ...props }) => {
    const { t } = useTranslation();
    return (
        <FormControl fullWidth>
            <TextField
                required
                fullWidth
                select
                multiple
                label={t(label)}
                id={field}
                name={field}
                onBlur={formik.handleBlur}
                value={formik.values[field]}
                onChange={formik.handleChange}
                error={formik.touched[field] && Boolean(formik.errors[field])}
                helperText={formik.touched[field] && formik.errors[field] ? t(formik.errors[field]) : ""}
                {...props}
            >
                {menuList.length > 0 && menuList.map((item, key) => (
                    <MenuItem key={key} value={`${item}`} >
                        {item} {information}
                    </MenuItem>
                ))}

                {menuList.length <= 0 &&
                    <MenuItem disabled>
                        {t('NO_DATA')}
                    </MenuItem>
                }

            </TextField>
        </FormControl>
    )
}

export default SelectMenuArray