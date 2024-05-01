import React, { useEffect } from 'react';
import { enUS, koKR } from '@mui/material/locale';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import { useDispatch } from 'react-redux';

const languages = [
    {
        label: "LABAl_ENGLISH",
        locale: "en",
        muiLocale: enUS
    },
    {
        label: "LABAl_KOREAN",
        locale: "ko",
        muiLocale: koKR
    }
];

const LocalizationOptions = () => {
    const { i18n, t } = useTranslation();
    const dispatch = useDispatch()
    let userLanguage = localStorage.getItem('language') ? localStorage.getItem('language') : null
    const defaultrenderLang = languages.findIndex(language => language.locale === userLanguage);

    useEffect(() => {
        if (defaultrenderLang !== -1) {
            i18n.changeLanguage(languages[defaultrenderLang].locale).then(() => {
                setActiveLocale(languages[defaultrenderLang]);
                setMuiLocale(languages[defaultrenderLang].muiLocale);
            });
        }
    }, [defaultrenderLang])
    const { setMuiLocale } = useJumboTheme();
    const [activeLocale, setActiveLocale] = React.useState(defaultrenderLang ? languages[defaultrenderLang] : languages[0]);


    const handleChange = (event) => {
        const localeIndex = languages.findIndex(language => language.locale === event.target.value);
        if (localeIndex !== -1) {
            i18n.changeLanguage(languages[localeIndex].locale).then(() => {
                setActiveLocale(languages[localeIndex]);
                setMuiLocale(languages[localeIndex].muiLocale);
            });
        }

        localStorage.setItem('language', event.target.value)
    };

    return (
        <FormControl fullWidth
            sx={{
                '& .MuiOutlinedInput-notchedOutline,& .MuiSelect-icon': {
                    borderColor: "#fff !important",
                    color: "#fff !important"
                }
            }}>
            <Select
                sx={{ color: "#ffff" }}
                size={"small"}
                labelId="select-locale"
                id="customizer-select-locale"
                value={activeLocale && activeLocale.locale ? activeLocale.locale : 'en'}
                onChange={handleChange}
            >
                {
                    languages.map(language => (
                        <MenuItem key={language.locale}
                            value={language.locale}>{t(language.label)}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    );
};

export default LocalizationOptions;
