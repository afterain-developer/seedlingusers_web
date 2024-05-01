import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MainCard from 'app/Component/Cards/MainCard'
import PageHeaderButton from 'app/Component/Buttons/PageHeaderButton'
import AgricultureIcon from '@mui/icons-material/Agriculture';
import { useDispatch } from 'react-redux';
import { farmFetchListAPI } from 'app/services/preferences/farm-manager-services';
import { Avatar, Card, CardContent, Grid, ListItemAvatar, ListItemButton, ListItemText, Tab, Tabs, Typography, alpha } from '@mui/material';
import AppsIcon from '@mui/icons-material/Apps';
import ListIcon from '@mui/icons-material/List';
import NoDataPlaceholder from 'app/shared/NoDataPlaceholder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ForestIcon from '@mui/icons-material/Forest';

import { useTranslation } from 'react-i18next';
import { FETCH_FARM_RECORDS } from '@jumbo/constants/ActionTypes';

const Index = () => {
    const dispatch = useDispatch()
    const navigator = useNavigate()
    const { t } = useTranslation()
    const [farmList, setFarmList] = useState([])
    const [value, setValue] = useState(0)
    useEffect(() => {
        dispatch(farmFetchListAPI((res) => {
            dispatch({ type: FETCH_FARM_RECORDS, payload: res });
            setFarmList(res)
        }))
    }, [])
    return (
        <MainCard
            headerStyle={{
                padding: "10px 24px"
            }}
            title={"FARMS"}
            button={
                <PageHeaderButton
                    title={"BUTTON_ADD_FARM"}
                    to={"/seedling/preferences/farm-manager/create"}
                    icon={<AgricultureIcon />} />}
            tabs={
                <Tabs value={value} onChange={(event, newValue) => { setValue(newValue) }}
                    sx={{
                        display: 'inline-flex !important',
                        indicatorColor: '#FFF',
                        textColor: '#aaa',
                    }}  >
                    <Tab icon={<AppsIcon />} aria-label={1} />
                    <Tab icon={<ListIcon />} aria-label={0} />
                </Tabs>
            }
        >
            {
                value === 0 && farmList && farmList.length > 0 ?
                    <Grid container spacing={2} padding={2}>
                        {farmList.map((item, key) => {
                            return (
                                <Grid item xs={12} md={6} xl={4} key={key}>
                                    <Card
                                        onClick={() => navigator("/seedling/preferences/farm-manager/edit", { state: item })}
                                        sx={{
                                            cursor: 'auto',
                                            transition: 'all 0.2s',
                                            borderBottom: 1,
                                            borderBottomColor: 'divider',

                                            '&:hover ': {
                                                boxShadow: `0 3px 10px 0 ${alpha('#000', 0.2)}`,
                                                cursor: 'auto',
                                                borderBottomColor: 'transparent',

                                            }
                                        }}
                                    >

                                        <CardContent sx={{ position: "relative" }}>
                                            <Avatar
                                                variant={"rounded"}
                                                sx={{
                                                    background: "",
                                                    width: '100%',
                                                    height: 250,
                                                }}>
                                                {item?.farmImage ? (
                                                    <img
                                                        src={item?.farmImage}
                                                        alt={t('tree')}
                                                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                                    />
                                                ) : (
                                                    <ForestIcon sx={{ width: 50, height: 50, color: "" }} />
                                                )}

                                            </Avatar>
                                            {
                                                item["FarmUsers.isMain"] && item["FarmUsers.isMain"] == 1 ?
                                                    <span style={{
                                                        position: "absolute",
                                                        background: "rgb(113, 190, 61)",
                                                        top: "12px",
                                                        left: "10px",
                                                        fontSize: "14px",
                                                        padding: "0px 7px",
                                                        borderRadius: "5px",
                                                        color: "white",
                                                        border: "solid white 1px",
                                                    }}>
                                                        {t("MAIN")}
                                                    </span>
                                                    : <></>
                                            }
                                            <Typography component={"div"}>
                                                <Typography variant={"h3"} sx={{ marginY: 1, textAlign: "center" }}>{item?.farmName || ""}</Typography>
                                                <Typography variant={"h5"} sx={{ textAlign: "center" }}> <span style={{ color: "rgb(113, 190, 61)", fontWeight: 900 }}> {item?.numberOfField || 0} </span> Fields</Typography>

                                                <Typography variant={"body1"} mb={2} sx={{ marginY: 1, textAlign: "center" }}>
                                                    <LocationOnIcon fontSize={"small"} sx={{ verticalAlign: 'middle', mt: '-4px', mr: 1 }} />
                                                    {item?.address || ""}
                                                </Typography>

                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                    : value === 1 && farmList && farmList.length > 0 ?
                        <>
                            {
                                farmList.map((item, key) => {
                                    return (
                                        <ListItemButton
                                            onClick={() => navigator("/seedling/preferences/farm-manager/edit", { state: item })}
                                            disableRipple
                                            key={key}
                                            alignItems="flex-start"
                                            sx={{
                                                p: 3,
                                                cursor: 'auto',
                                                // ,
                                                borderBottom: 1,
                                                borderBottomColor: 'divider',
                                                '&:hover .update-task': {
                                                    boxShadow: `0 3px 10px 0 ${alpha('#000', 0.2)}`,

                                                    cursor: 'auto',
                                                    borderBottomColor: 'transparent',
                                                    opacity: 1,

                                                }
                                            }}
                                        >
                                            <ListItemAvatar
                                                sx={{
                                                    width: 220,
                                                    mt: 0,
                                                    mr: 3,
                                                    position: "relative"
                                                }}
                                            >
                                                <Avatar
                                                    src={item?.farmImage}
                                                    variant={"rounded"}
                                                    sx={{
                                                        width: '100%',
                                                        height: 146,
                                                    }}
                                                />
                                                {
                                                    item["FarmUsers.isMain"] && item["FarmUsers.isMain"] == 1 ?
                                                        <span style={{
                                                            position: "absolute",
                                                            background: "rgb(113, 190, 61)",
                                                            top: "-12px",
                                                            left: "-16px",
                                                            fontSize: "14px",
                                                            padding: "0px 7px",
                                                            borderRadius: "5px",
                                                            color: "white",
                                                            border: "solid white 1px",
                                                        }}>
                                                            {t("MAIN")}
                                                        </span>
                                                        : <></>
                                                }
                                            </ListItemAvatar>
                                            <ListItemText>
                                                <Typography component={"div"}>
                                                    <Typography variant={"h4"}>{item?.farmName || ""}</Typography>
                                                </Typography>
                                                <Typography variant={"body1"} mb={2}>
                                                    <LocationOnIcon fontSize={"small"} sx={{ verticalAlign: 'middle', mt: '-4px', mr: 1 }} />
                                                    {item?.address || ""}
                                                </Typography>
                                            </ListItemText>
                                        </ListItemButton>
                                    )
                                })
                            }
                        </>
                        :
                        <NoDataPlaceholder />
            }
        </MainCard >
    )
}

export default Index