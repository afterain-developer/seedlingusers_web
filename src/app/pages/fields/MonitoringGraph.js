import { Button, Grid, IconButton, ListItemButton, ListItemText, Tooltip, Typography, alpha } from '@mui/material';
import SelectMenu from 'app/Component/Input/Forms/SelectMenu';
import { fetchEventAPI, removeEventAPI } from 'app/services/fields-services';
import NoDataPlaceholder from 'app/shared/NoDataPlaceholder';
import { Form, Formik } from 'formik';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';
import LineCharts from './LineCharts';
import JumboScrollbar from '@jumbo/components/JumboScrollbar';
import { sweetAlertDelete } from 'app/config/sweetAlertsActions';

const MonitoringGraph = ({ state, data, callBack }) => {

    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const [monitoringList, setMonitoringList] = useState([]);
    const [monitoringGraph, setMonitoringGraph] = useState({});
    const [defaultValues, setDefaultValues] = useState({});
    const [value, setValue] = useState(0);
    const [flag, setFlag] = useState(false);

    const treeList = [];
    const array = state && state?.fieldTree?.length > 0 ? state?.fieldTree.map(item => ({ treeTypeId: item?.treeTypeId, age: item?.tag, fieldTreeId: item?.fieldTreeId })) : []
    array && array?.length > 0 && array.forEach(arrayItem => {
        const item = data && data?.Tree?.length > 0 ? data?.Tree.find(item => item.treeTypeId === arrayItem.treeTypeId) : ''
        treeList.push({
            fieldTreeId: arrayItem?.fieldTreeId,
            treeTypeId: item?.treeTypeId,
            treeType: `${item?.treeType} ${arrayItem?.age}`,
            age: arrayItem?.age
        });
    });

    const timeRangesList = [
        { value: 1, label: t("ONE_WEEK") },
        { value: 2, label: t("ONE_MONTH") },
        { value: 3, label: t("SIX_MONTH") },
        { value: 4, label: t("ONE_YEAR") },
    ];



    const handleSubmit = (values, actionType) => {
        const temp = values?.treeId
        values.fieldTreeId = temp
        const selectTree = treeList.filter(item => item.fieldTreeId == temp)[0]
        values.treeTypeId = selectTree?.treeTypeId
        const currentDate = new Date();
        let fromDate, toDate;

        switch (values?.timeRanges) {
            case "1":
                fromDate = new Date(currentDate);
                fromDate.setDate(currentDate.getDate() - 7);
                break;
            case "2":
                fromDate = new Date(currentDate);
                fromDate.setMonth(currentDate.getMonth() - 1);
                break;
            case "3":
                fromDate = new Date(currentDate);
                fromDate.setMonth(currentDate.getMonth() - 6);
                break;
            case "4":
                fromDate = new Date(currentDate);
                fromDate.setFullYear(currentDate.getFullYear() - 1);
                break;
        }
        toDate = currentDate;
        values.fromDate = fromDate.toISOString().split('T')[0];
        values.toDate = toDate.toISOString().split('T')[0];

        const objectTemp = {
            date: [],
            height: [],
            width: [],
        }

        setDefaultValues(values)
        dispatch(fetchEventAPI(values, (res) => {
            const array = res.filter(item => item?.treeTypeId == selectTree?.treeTypeId && item?.treeAge == selectTree?.age)
            array.map((item) => {
                objectTemp.date.push(item.eventDate)
                objectTemp.height.push(item.treeHeight)
                objectTemp.width.push(item.treeWidth)
            })
            setMonitoringGraph(objectTemp)
            setMonitoringList(array);
        }))

        if (actionType === 'chart') {
            setValue(0)
        } else if (actionType === 'list') {
            setValue(1)
        }
    };

    const handleRemove = (selectItem) => {
        const selectTree = treeList.filter(item => item.treeTypeId == selectItem?.treeTypeId && item.age == selectItem?.treeAge)[0]
        const tempObj = {
            eventId: selectItem?.eventId,
            fieldTreeId: selectTree?.fieldTreeId
        }
        sweetAlertDelete().then((result) => {
            if (result === 'deleted') {
                dispatch(removeEventAPI(tempObj, res => {
                    callBack()
                    fetchAction()
                }))
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const fetchAction = () => {
        const objectTemp = {
            date: [],
            height: [],
            width: [],
        }

        const temp = defaultValues?.treeId
        const selectTree = treeList.filter(item => item.fieldTreeId == temp)[0]

        dispatch(fetchEventAPI(defaultValues, (res) => {
            const array = res.filter(item => item?.treeTypeId == selectTree?.treeTypeId && item?.treeAge == selectTree?.age)
            array.map((item) => {
                objectTemp.date.push(item.eventDate)
                objectTemp.height.push(item.treeHeight)
                objectTemp.width.push(item.treeWidth)
            })
            setMonitoringGraph(objectTemp)
            setMonitoringList(array);
        }))
    }

    useEffect(() => {
        if (flag) {
            fetchAction()
        } else {
            setFlag(true)
        }

    }, [i18n?.language])
    return (
        <>
            <JumboScrollbar
                autoHeight
                autoHeightMin={550}
                autoHide
                autoHideDuration={200}
                autoHideTimeout={500}>


                <Formik
                    initialValues={{
                        eventType: 'MONITORING',
                        fieldId: state?.fieldId,
                        treeId: "",
                        timeRanges: ""
                    }}
                    validationSchema={yup.object().shape({
                        timeRanges: yup
                            .string()
                            .required('SELECT_TIME'),
                        treeId: yup
                            .string()
                            .required('ERROR_TREE_SELECT_MESSAGE'),

                    })}
                    onSubmit={(values) => handleSubmit(values)}>

                    {(formik) => (
                        <Form noValidate>
                            <Grid container spacing={2} sx={{ mt: 0 }}>
                                <Grid item xs={12} >
                                    <SelectMenu
                                        formik={formik}
                                        label={"SELECT_TIME"}
                                        field={"timeRanges"}
                                        menuList={timeRangesList}
                                        valueKey={'value'}
                                        labelKey={'label'}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <SelectMenu
                                        formik={formik}
                                        label={"TREE_AGE"}
                                        field={"treeId"}
                                        menuList={treeList}
                                        valueKey={'fieldTreeId'}
                                        labelKey={'treeType'}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6} textAlign={"end"} >
                                    <Button
                                        fullWidth
                                        type='submit'
                                        variant="contained"
                                        onClick={() => setValue(0)}
                                        sx={{ textTransform: "none" }}>
                                        {t('SHOW_CHART')}
                                    </Button>
                                </Grid>

                                <Grid item xs={12} sm={6} textAlign={"end"} >
                                    <Button
                                        fullWidth
                                        type='submit'
                                        variant="contained"
                                        onClick={() => setValue(1)}
                                        sx={{ textTransform: "none" }}>
                                        {t('SHOW_LIST')}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
                {
                    value === 0 && monitoringList.length > 0 ?
                        <>
                            <LineCharts
                                values={monitoringGraph?.width}
                                categories={monitoringGraph?.date}
                                // values={chartValues}
                                title={t("DROPDOWN_LABEL_WIDTH")}
                                titleValue={`${t("DROPDOWN_LABEL_WIDTH")} ${t("MM")}`}
                            />
                            <LineCharts
                                values={monitoringGraph?.height}
                                categories={monitoringGraph?.date}
                                // values={chartValues}
                                title={t("DROPDOWN_LABEL_HEIGHT")}
                                titleValue={`${t("DROPDOWN_LABEL_HEIGHT")} ${t("MM")}`}
                            />
                        </>
                        : value === 1 && monitoringList.length > 0 ? monitoringList.map((item, key) => {
                            return (
                                <ListItemButton
                                    disableRipple
                                    key={key}
                                    alignItems="flex-start"
                                    sx={{
                                        // p: 3,
                                        cursor: 'auto',
                                        borderBottom: 1,
                                        borderBottomColor: 'divider',
                                        '&:hover .update-task': {
                                            boxShadow: `0 3px 10px 0 ${alpha('#000', 0.2)}`,
                                            cursor: 'auto',
                                            borderBottomColor: 'transparent',
                                            opacity: 1,
                                        }
                                    }}>
                                    <ListItemText>
                                        <Grid container spacing={0.5}>
                                            <Grid item sm={5.5}>
                                                <Typography
                                                    variant={"p"}
                                                    sx={{ fontSize: "small", margin: 0 }}>
                                                    {item['Tree.treeType']} {item?.treeAge ? item?.treeAge : ''}

                                                    <Typography
                                                        variant={"p"}
                                                        sx={{
                                                            fontSize: "small",
                                                            marginLeft: 3,
                                                            textAlign: "center",
                                                            padding: "2px 5px",
                                                            borderRadius: "4px",
                                                            color: "#FFf",
                                                            fontSize: "11px",
                                                            backgroundColor:
                                                                item?.eventType == "SOWING" ? "#94d25c"
                                                                    : item?.eventType == "TRANSPLANT" ? "#ba8e25"
                                                                        : item?.eventType == "MOVING" ? "#3d3d3d"
                                                                            : item?.eventType == "RELEASE" ? "#27b257"
                                                                                : item?.eventType == "RETRANSPLANT" ? "#7b5e15" : '#3672c0'
                                                        }}>
                                                        {t(item?.eventType) || ''}
                                                    </Typography>
                                                </Typography>

                                                <Typography
                                                    variant={"p"}
                                                    sx={{
                                                        display: "block",
                                                        fontSize: "11px",
                                                    }}>
                                                    {item?.eventDate || ''}
                                                </Typography>

                                            </Grid>

                                            <Grid item sm={5.5}>
                                                <Typography variant={"p"} sx={{ display: "block", fontSize: "small", }}>
                                                    {t("DROPDOWN_LABEL_HEIGHT")} {item?.treeHeight || ''}
                                                </Typography>
                                                <Typography variant={"p"} sx={{ display: "block", fontSize: "small" }}>
                                                    {t("DROPDOWN_LABEL_WIDTH")} {item?.treeWidth || ''}
                                                </Typography>
                                            </Grid>
                                            <Grid item sm={1}>
                                                <Tooltip title={t("DELETE")}>
                                                    <IconButton
                                                        onClick={() => { handleRemove(item) }}
                                                        size='small'
                                                        sx={{
                                                            transition: 'all 0.3s',
                                                            background: 'red',
                                                            '&:hover': {
                                                                background: '#fff',
                                                                '& .MuiSvgIcon-root': {
                                                                    color: 'red',
                                                                },
                                                            },
                                                        }}>
                                                        <DeleteIcon sx={{ color: "#fff" }} fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Grid>
                                        </Grid>
                                    </ListItemText>
                                </ListItemButton>
                            )
                        })
                            :
                            <NoDataPlaceholder />
                }
            </JumboScrollbar >

        </>
    );
};

export default MonitoringGraph; 