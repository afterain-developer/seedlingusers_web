import React from 'react'
import { FormControl, MenuItem, OutlinedInput, Select } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Height } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
const FilterSelector = ({ title, filterMenuItems, filterCallBackFunction, width, defaultValues = [] }) => {
    const { t } = useTranslation()
    const theme = useTheme();
    const [personName, setPersonName] = React.useState(defaultValues);

    const handleChange = (event, newValue) => {
        setPersonName(newValue);
        filterCallBackFunction(newValue, title);

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
            <FormControl sx={{ width: width, mb: 1.5 }} size="small">
                <Select
                    multiple
                    displayEmpty
                    value={personName}
                    onChange={(event) => handleChange(event, event.target.value)}
                    input={<OutlinedInput className='filter-menu' sx={{
                        backgroundColor: localStorage.getItem('ThemeColor') ? localStorage.getItem('ThemeColor') : "#92d050",
                        height: "37px",
                    }} />}
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                            return <em style={{ color: '#FFFFFF' }}>{t(title)}</em>;
                        }
                        return selected.join(', ');
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem disabled value="">
                        <em>{t(title)}</em>
                    </MenuItem>
                    {filterMenuItems.map((name, i) => (
                        <MenuItem
                            key={i}
                            value={name.filter || null}
                            style={getStyles(name.filter || null, personName, theme)}
                        >
                            {name.filter}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    )
}
export default FilterSelector