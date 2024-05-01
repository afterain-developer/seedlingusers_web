import React from 'react';
import Autocomplete from "@mui/material/Autocomplete";
import { FormControl, MenuItem, OutlinedInput } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useTranslation } from 'react-i18next';

const FilterSelectFarm = ({ title, MenuList, callAction, width, defaultValues = [], labelKey, valueKey }) => {
    const { t } = useTranslation()
    const theme = useTheme();
    const [selectedValue, setSelectedValue] = React.useState(defaultValues);

    const handleChange = (event, newValue) => {
        setSelectedValue(newValue ? [newValue] : []);
        callAction(newValue ? newValue[valueKey] : []);
    };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            },
        },
    };

    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    };

    return (
        <>
            <FormControl
                sx={{
                    width: width,
                    border: "none"
                }}
                size="small">
                <Autocomplete
                    sx={{
                        // width: width,
                        border: "none"
                    }}
                    placeholder={title}
                    value={selectedValue[0] || null}
                    onChange={handleChange}
                    options={MenuList}
                    getOptionLabel={(option) => option[labelKey] || ''}
                    renderInput={(params) => (
                        <OutlinedInput
                            {...params.InputProps}
                            className='filter-menu'
                            sx={{ backgroundColor: localStorage.getItem('ThemeColor') ? localStorage.getItem('ThemeColor') : "#92d050", border: "none" }}
                            inputProps={{ ...params.inputProps, 'aria-label': 'Without label', placeholder: title }}
                        />
                    )}
                    renderOption={(props, option) => (
                        <MenuItem
                            sx={{
                                // width: width,
                                border: "none"
                            }}
                            key={option}
                            {...props} style={getStyles(option[labelKey], selectedValue, theme)}>
                            {option[labelKey]}
                        </MenuItem>
                    )}
                    isOptionEqualToValue={(option, value) => option[valueKey] === value[valueKey]}
                    freeSolo />
            </FormControl>
        </>
    )
}

export default FilterSelectFarm;
