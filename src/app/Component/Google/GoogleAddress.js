import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material/utils';
import { useTranslation } from 'react-i18next';
import { el } from 'date-fns/locale';
import { useEffect } from 'react';

const GOOGLE_MAPS_API_KEY = 'AIzaSyAzJrI7iGhyHIbhLXcG_n8T_19x-JdhCWk';
function loadScript(src, position, id) {
    if (!position) {
        return;
    }
    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;
    position.appendChild(script);
}
const autocompleteService = { current: null };

export default function GoogleAddress({ formik, label, field, required, callBackAction, ...props }) {
    const { i18n, t } = useTranslation();
    const language = i18n?.language == "ko" ? "&region=KR&language=ko-kr" : "&region=EN&language=en"

    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([]);
    const loaded = React.useRef(false);


    const fetch = React.useMemo(
        () =>
            debounce((request, callback) => {
                autocompleteService.current.getPlacePredictions(request, callback);
            }, 400),
        []
    );
    if (typeof window !== 'undefined' && !loaded.current) {
        loadScript(
            `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&sensor=false&${language}`,
            document.querySelector('head'),
            'google-maps'
        );
        loaded.current = true;
    }


    useEffect(() => {
        const language1 = i18n?.language == "ko" ? "&region=KR&language=ko-kr" : "&region=EN&language=en"
        loadScript(
            `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&sensor=false&${language1}`,
            document.querySelector('head'),
            'google-maps'
        );
        loaded.current = true;
    }, [i18n?.language])


    const getPlaceDetails = (placeId) => {
        const service = new window.google.maps.places.PlacesService(
            document.createElement('div')
        );
        service.getDetails({ placeId }, (place, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                let city
                const pointOfInterest = place.address_components.find((component) =>
                    component.types.includes('point_of_interest')
                )?.long_name;
                const landmark = place.address_components.find((component) =>
                    component.types.includes("landmark")
                )?.long_name;

                const check = place.address_components.find((component) =>
                    component.types.includes("locality")
                )?.long_name;
                if (check == null && check == undefined) {
                    city = place.address_components.find((component) =>
                        component.types.includes("sublocality_level_1")
                    )?.long_name;
                } else {
                    city = check
                }
                const route = place.address_components.find((component) =>
                    component.types.includes("route")
                )?.long_name;
                const premise = place.address_components.find((component) =>
                    component.types.includes("premise")
                )?.long_name;

                const state = place.address_components.find((component) =>
                    component.types.includes('administrative_area_level_1')
                )?.long_name;
                const country = place.address_components.find((component) =>
                    component.types.includes("country")
                )?.long_name;

                const pinCode = place.address_components.find((component) =>
                    component.types.includes("postal_code")
                )?.long_name;

                const temp = {
                    country,
                    state,
                    city,
                    pinCode,
                    pointOfInterest,
                    route,
                    premise,
                    landmark,
                    latitude: place?.geometry.location.lat(),
                    longitude: place?.geometry.location.lng(),
                    address: place?.formatted_address,
                    place: place?.address_components
                }
                const filteredLocationDetails = Object.fromEntries(
                    Object.entries(temp).filter(([key, value]) => value !== null && value !== undefined)
                );
                formik.setFieldValue(field, place?.formatted_address);
                callBackAction(filteredLocationDetails)
            }
        });
    };

    React.useEffect(() => {
        let active = true;

        if (!autocompleteService.current && window.google) {
            try {
                if (window.google && window.google.maps && window.google.maps.places) {
                    autocompleteService.current = new window.google.maps.places.AutocompleteService();
                }
                // autocompleteService.current = new window.google.maps.places.AutocompleteService();
            } catch (err) {
                console.log(err, "err");
            }
        }
        if (!autocompleteService.current) {
            return undefined;
        }

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch({ input: inputValue, language: i18n?.language == "ko" ? 'kr' : "en" }, (results) => {
            if (active) {
                let newOptions = [];

                if (value) {
                    newOptions = [value];
                }
                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);

    const handleOnChange = (event, newValue) => {
        setValue(newValue);

        if (newValue) {
            getPlaceDetails(newValue.place_id);
        }
    };

    return (

        <Autocomplete
            fullWidth
            id="google-map-demo"
            getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.description
            }
            filterOptions={(x) => x}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            noOptionsText="No locations"
            onChange={handleOnChange}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    required={required}
                    error={formik.touched[field] && Boolean(formik.errors[field])}
                    helperText={formik.touched[field] && formik.errors[field] ? t(formik.errors[field]) : ""}
                    label={t("SEARCH_YOUR_LOCATION")}
                    fullWidth />
            )}
            renderOption={(props, option) => {
                const matches =
                    option.structured_formatting.main_text_matched_substrings || [];

                const parts = parse(
                    option.structured_formatting.main_text,
                    matches.map((match) => [match.offset, match.offset + match.length])
                );

                return (
                    <li {...props}>
                        <Grid container alignItems="center">
                            <Grid item sx={{ display: 'flex', width: 44 }}>
                                <LocationOnIcon sx={{ color: 'text.secondary' }} />
                            </Grid>
                            <Grid
                                item
                                sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}
                            >
                                {parts.map((part, index) => (

                                    <Box
                                        key={index}
                                        component="span"
                                        sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                                    >
                                        {part.text}
                                    </Box>
                                ))}
                                <Typography variant="body2" color="text.secondary">
                                    {option.structured_formatting.secondary_text}
                                </Typography>
                            </Grid>
                        </Grid>
                    </li>
                );
            }}
        />

    );
}
