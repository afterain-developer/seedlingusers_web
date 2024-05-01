import PageHeaderButton from 'app/Component/Buttons/PageHeaderButton';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Card, CardContent, CircularProgress, Grid, Tab, Tabs, Typography } from '@mui/material';
import HeaderCard from 'app/Component/Cards/HeaderCard';
import { useDispatch } from 'react-redux';
import { fetchEventAPI, fetchEventFieldAPI, fetchFieldAPI, removeFieldAPI } from 'app/services/fields-services';
import EventModify from './EventModify';
import EventsList from './EventsList';
import FieldModify from './FieldModify';
import Fields from './Fields';

import MonitoringGraph from './MonitoringGraph';
import MonitoringModify from './MonitoringModify';
import { sweetAlertDelete } from 'app/config/sweetAlertsActions';
import { useTranslation } from 'react-i18next';

const FieldDetails = () => {
    const { t, i18n } = useTranslation();
    const { state } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [fieldId, setFieldId] = useState(state)

    const [field, setField] = useState(0);
    const [event, setEvent] = useState(0);
    const [value, setValue] = useState(0);

    const [flag1, setFlag1] = useState(false);
    const [flag2, setFlag2] = useState(false);

    const [flagValue, setFlagValue] = useState(0)
    const [record, setRecord] = useState([]);
    const [eventList, setEventList] = useState([]);
    const [eventFieldData, setEventFieldData] = useState([]);

    const APIaction = () => {

        dispatch(fetchFieldAPI(res => {
            setRecord(res.filter(item => item.fieldId == fieldId)[0]);
            setFlag1(true)
        }))

        dispatch(fetchEventAPI({ fieldId: fieldId }, (res) => {
            setEventList(res)
        }))
    }


    useEffect(() => {
        dispatch(fetchEventFieldAPI({ fieldId: fieldId }, (res) => {
            setEventFieldData(res)
            setFlag2(true)
        }))
        APIaction()
    }, [i18n?.language])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const removeAction = () => {
        sweetAlertDelete().then((result) => {
            if (result === 'deleted') {
                dispatch(removeFieldAPI({ fieldId: fieldId }, (res) => {
                    navigate("/seedling/fields")
                }))
            }
        }).catch((error) => {
            console.error(error);
        });
    };

    const isLoading = record?.fieldTree?.length > 0 && eventFieldData?.Tree?.length > 0 || (flag1 && flag2) ? false : true;

    return (
        <>
            <HeaderCard
                title={
                    <Box sx={{ width: '100%', bgcolor: 'background.paper', display: "flex" }}>
                        <Typography variant={"h3"} sx={{ margin: 0, marginRight: 2, alignSelf: "center" }}>{t('FIELD_DETAILS')} </Typography>
                        <Tabs value={value} onChange={handleChange}>
                            <Tab label={t("EVENT_LOGS")} />
                            <Tab
                                label={
                                    isLoading ? (
                                        <CircularProgress size={24} /> // Loader component
                                    ) : (
                                        t("MONITORING") // Actual tab label
                                    )
                                }
                                disabled={isLoading}
                            />
                        </Tabs>
                    </Box>
                }
                button={
                    <div>
                        <PageHeaderButton
                            sx={{ marginX: 1, background: "red" }}
                            title={"DELETE"}
                            onClick={removeAction}
                        />
                        <PageHeaderButton
                            to={"/seedling/fields"}
                            title={"BACK"} />
                    </div>
                }
                sx={{ mb: 3, paddingY: 1.5, paddingX: 3 }} />

            {value == 0 ?
                <Grid container spacing={3}>
                    <Grid item xs={12} md={5}>
                        <Card>
                            <CardContent sx={{ borderBottom: "1px solid #ebebeb", display: "flex", justifyContent: "space-between" }}>
                                <Typography variant={"h4"} sx={{ margin: 0, alignSelf: "center" }}> {field == 0 ? t('FIELD_MANAGER') : t('HEADER_EDIT_FIELD')} </Typography>
                                <PageHeaderButton
                                    onClick={() => { field == 0 ? setField(1) : setField(0) }}
                                    sx={{ margin: 0 }}
                                    title={field == 0 ? "HEADER_EDIT_FIELD" : "BACK"} />
                            </CardContent>
                            <CardContent >
                                {
                                    field == 0 ? <Fields state={record} /> : <FieldModify state={record} callBack={() => { setField(0); APIaction() }} />
                                }
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={7}>
                        <Card>
                            <CardContent sx={{ borderBottom: "1px solid #ebebeb", display: "flex", justifyContent: "space-between" }}>
                                <Typography variant={"h4"} sx={{ margin: 0, alignSelf: "center" }}> {event != 0 ? t('EVENT_LOGS') : `${t('EVENT_LOGS')} ( ${t("TREE_INVENTORY")})`}  </Typography>
                                <PageHeaderButton
                                    onClick={() => { event == 0 ? setEvent(1) : setEvent(0) }}
                                    sx={{ margin: 0 }}
                                    title={event == 0 ? "HEADER_ADD_EVENT" : "BACK"} />
                            </CardContent>
                            <CardContent >
                                {
                                    event == 0 ? <EventsList state={record} event={eventList} /> : <EventModify data={eventFieldData} state={record} callBack={() => { APIaction(); setEvent(0) }} />
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid >
                :
                <Grid container spacing={3}>
                    <Grid item xs={12} md={5}>
                        <Card>
                            <CardContent sx={{ borderBottom: "1px solid #ebebeb", display: "flex", justifyContent: "space-between" }}>
                                <Typography variant={"h4"} sx={{ margin: 0, alignSelf: "center" }}>{t("MONITORING_ADD")}</Typography>
                            </CardContent>
                            <CardContent>
                                <MonitoringModify data={eventFieldData} state={record} callBack={() => { APIaction() }} flag={flagValue} />
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={7}>
                        <Card>
                            <CardContent sx={{ borderBottom: "1px solid #ebebeb", display: "flex", justifyContent: "space-between" }}>
                                <Typography variant={"h4"} sx={{ margin: 0, alignSelf: "center" }}>{t("MONITORING_CHART")} </Typography>
                            </CardContent>
                            <CardContent>
                                <MonitoringGraph state={record} data={eventFieldData} callBack={() => { setFlagValue(flagValue + 1) }} />
                            </CardContent>

                        </Card>
                    </Grid>
                </Grid >
            }

        </>
    )
}

export default FieldDetails