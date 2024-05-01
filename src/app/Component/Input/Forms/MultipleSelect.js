import React from 'react';
import { Autocomplete, Checkbox, Chip, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const MultiSelectMenu = ({ formik, label, field, menuList, valueKey, labelKey, ...props }) => {
    const { t } = useTranslation();

    const handleChange = (_, newValue) => {
        const arrayOfIds = newValue.map((item) => item[valueKey]);
        formik.setFieldValue(field, arrayOfIds);
    };

    return (
        <Autocomplete
            id={field}
            fullWidth
            limitTags={5}
            multiple
            disableCloseOnSelect
            options={menuList}
            getOptionLabel={(option) => option[labelKey]}
            value={menuList.filter((option) => formik.values[field]?.includes(option[valueKey]))}
            onChange={handleChange}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={t(label)}
                    variant="outlined"
                    inputProps={{
                        ...params.inputProps,
                        'aria-label': 'Without label',
                    }}
                    required
                    onBlur={formik.handleBlur}
                    error={formik.touched[field] && Boolean(formik.errors[field])}
                    helperText={formik.touched[field] && formik.errors[field] ? t(formik.errors[field]) : ""}
                />
            )}
            // renderOption={(props, option, { selected }) => (
            //     <li {...props}>
            //         <Checkbox
            //             icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            //             checkedIcon={<CheckBoxIcon fontSize="small" />}
            //             style={{ marginRight: 8 }}
            //             checked={selected}
            //         />
            //         {option[labelKey]}
            //     </li>
            // )}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip key={index} label={option[labelKey]} {...getTagProps({ index })} />
                ))
            }
            noOptionsText={t('NO_DATA')}
            disableClearable={true}
            {...props}
        />
    );
};

export default MultiSelectMenu;
