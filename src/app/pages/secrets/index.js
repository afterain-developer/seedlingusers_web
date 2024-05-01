import { Box, Button, Divider, Stack, Tab, Tabs, Tooltip, Typography, } from '@mui/material'
import MainCard from 'app/Component/Cards/MainCard'
import { fetchFavSecretAPI, fetchSecretAPI } from 'app/services/secrets-services'
import NoDataPlaceholder from 'app/shared/NoDataPlaceholder'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeFavouriteAPI } from 'app/services/worklog-services'
import { sweetAlertDelete } from 'app/config/sweetAlertsActions';
import { useLocation, useNavigate } from 'react-router-dom'



const Index = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const state = location?.state
    const [value, setValue] = useState(state?.value || 1);
    const [flag, setFlag] = useState(0);
    const [favorite, setFavorite] = useState([]);
    const [secrets, setSecrets] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        dispatch(fetchFavSecretAPI(res => {
            setFavorite(res.reverse())
        }))
        dispatch(fetchSecretAPI(res => {
            setSecrets(res.reverse())
        }))
    }, [i18n?.language, flag])


    const removeAction = (favSecretId) => {
        sweetAlertDelete().then((result) => {
            if (result === 'deleted') {
                dispatch(removeFavouriteAPI({ favSecretId: favSecretId }, res => {
                    setFlag(flag + 1)
                }))
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <MainCard title={"SEEDLING_SECRETS"}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label={t("SECRETS")} value={1} />
                    <Tab label={t("MY_FAV_SEC")} value={2} />
                </Tabs>

            </Box>
            {
                value === 1 && secrets && secrets.length > 0 ?
                    secrets.map((item, key) => {
                        let tempColor = item?.secretType === "FERTILIZER" ? "#ffba0b"
                            : item?.secretType === "PESTICIDE" ? "#c00000"
                                : item?.secretType === "DISEASE" ? "#cdc1d6"
                                    : item?.secretType === "WATERING" ? "#00b0f0" : '#3672c0'

                        const string = "Alternatives"
                        const alternatives = item?.alternative;
                        if (alternatives && alternatives.length > 0) {
                            const formattedAlternatives = alternatives.map((alternative, i) => {
                                return `${i + 1}. ${alternative.Pesticide.pesticideName} manufacturing company: ${alternative.Manufacturer.manufacturerName}`;
                            });

                            const result = `${string}\n${formattedAlternatives.join('\n')}`;
                            item.detail = result
                        } else {
                        }
                        console.log(string)
                        return (
                            <Box
                                key={key} sx={{
                                    border: `solid 2px ${tempColor}`,
                                    borderRadius: 1.5,
                                    margin: "10px 0px",
                                    position: "relative"
                                }}>

                                <div onClick={() => { navigate('/seedling/worklog/create', { state: { ...item, worklogType: item?.secretType, value: value } }) }} >
                                    <Typography variant={"h6"} sx={{
                                        background: tempColor,
                                        borderTopLeftRadius: 3,
                                        borderTopRightRadius: 3,
                                        padding: 0.5,
                                        color: "#fff"
                                    }}>

                                        {t(item?.secretType) || ''}
                                    </Typography>
                                    <Stack
                                        direction="row"
                                        divider={<Divider orientation="vertical" flexItem />}
                                        spacing={1}
                                        sx={{ margin: "0px 10px", }}>
                                        <img src='/images/SeedlingLogo.png' style={{ width: '20px', height: '20px' }} />
                                        {/* <StarIcon sx={{ color: "#ffba0b" }} /> */}

                                        <div>
                                            <Typography variant={"h6"}
                                                sx={{
                                                    fontSize: "13px",
                                                }}>{t("MY_FAV_SEC")}
                                            </Typography>
                                            {item?.secretType == "FERTILIZER" &&
                                                <>
                                                    <Typography variant={"h6"} sx={{ fontSize: "13px" }}>
                                                        {`${item?.Manufacturer?.manufacturerName} ${item?.Fertilizer?.fertilizerName}`}
                                                    </Typography>
                                                    <Typography variant={"h6"} sx={{ fontSize: "10px" }}>
                                                        {`${item?.ratio} ${t("TIMES")} & ${item?.amount} t`}
                                                    </Typography>
                                                </>
                                            }
                                            {item?.secretType == "WATERING" &&
                                                <>
                                                    <Typography variant={"h6"} sx={{ fontSize: "10px" }}>
                                                        {` ${item?.amount} t`}
                                                    </Typography>
                                                </>
                                            }
                                            {item?.secretType == "PESTICIDE" &&
                                                <>
                                                    <Typography variant={"h6"} sx={{ fontSize: "13px" }}>
                                                        {`${item?.Manufacturer?.manufacturerName} ${item?.Pesticide?.pesticideName}`}
                                                    </Typography>
                                                    <Typography variant={"h6"} sx={{ fontSize: "10px" }}>
                                                        {` ${item?.amount} t`}
                                                    </Typography>
                                                </>
                                            }
                                        </div>
                                    </Stack>
                                </div>


                                <div style={{ position: "absolute", top: -7, right: -15 }}>

                                    {/* <Tooltip title={t("delete")} >
                                        <Button onClick={() => removeAction(item?.favSecretId)}>

                                            <DeleteIcon
                                                sx={{ color: "#fff" }} />
                                        </Button>
                                    </Tooltip> */}
                                </div>
                            </Box>
                        )

                    })
                    : value === 2 && favorite && favorite.length > 0 ?
                        favorite.map((item, key) => {
                            let tempColor = item?.secretType === "FERTILIZER" ? "#ffba0b"
                                : item?.secretType === "PESTICIDE" ? "#c00000"
                                    : item?.secretType === "DISEASE" ? "#cdc1d6"
                                        : item?.secretType === "WATERING" ? "#00b0f0" : '#3672c0'
                            return (
                                <Box
                                    key={key} sx={{
                                        border: `solid 2px ${tempColor}`,
                                        borderRadius: 1.5,
                                        margin: "10px 0px",
                                        position: "relative"
                                    }}>

                                    <div onClick={() => { navigate('/seedling/worklog/create', { state: { ...item, worklogType: item?.secretType, value: value } }) }} >
                                        <Typography variant={"h6"} sx={{
                                            background: tempColor,
                                            borderTopLeftRadius: 3,
                                            borderTopRightRadius: 3,
                                            padding: 0.5,
                                            color: "#fff"
                                        }}>

                                            {t(item?.secretType) || ''}
                                        </Typography>
                                        <Stack
                                            direction="row"
                                            divider={<Divider orientation="vertical" flexItem />}
                                            spacing={1}
                                            sx={{ margin: "0px 10px", }}>
                                            <StarIcon sx={{ color: "#ffba0b" }} />

                                            <div>
                                                <Typography variant={"h6"}
                                                    sx={{
                                                        fontSize: "13px",
                                                    }}>{t("MY_FAV_SEC")}
                                                </Typography>
                                                {item?.secretType == "FERTILIZER" &&
                                                    <>
                                                        <Typography variant={"h6"} sx={{ fontSize: "13px" }}>
                                                            {`${item?.Manufacturer?.manufacturerName} ${item?.Fertilizer?.fertilizerName}`}
                                                        </Typography>
                                                        <Typography variant={"h6"} sx={{ fontSize: "10px" }}>
                                                            {`${item?.ratio} ${t("TIMES")} & ${item?.amount} t`}
                                                        </Typography>
                                                    </>
                                                }
                                                {item?.secretType == "WATERING" &&
                                                    <>
                                                        <Typography variant={"h6"} sx={{ fontSize: "10px" }}>
                                                            {` ${item?.amount} t`}
                                                        </Typography>
                                                    </>
                                                }
                                                {item?.secretType == "PESTICIDE" &&
                                                    <>
                                                        <Typography variant={"h6"} sx={{ fontSize: "13px" }}>
                                                            {`${item?.Manufacturer?.manufacturerName} ${item?.Pesticide?.pesticideName}`}
                                                        </Typography>
                                                        <Typography variant={"h6"} sx={{ fontSize: "10px" }}>
                                                            {` ${item?.amount} t`}
                                                        </Typography>
                                                    </>
                                                }
                                            </div>
                                        </Stack>
                                    </div>


                                    <div style={{ position: "absolute", top: -7, right: -15 }}>

                                        <Tooltip title={t("DELETE")} >
                                            <Button onClick={() => removeAction(item?.favSecretId)}>

                                                <DeleteIcon
                                                    sx={{ color: "#fff" }} />
                                            </Button>
                                        </Tooltip>
                                    </div>
                                </Box>
                            )
                        }) : <NoDataPlaceholder />
            }
        </MainCard >
    )
}
export default Index
