import { IconButton, ListItemButton, ListItemText, Tooltip, Typography, alpha } from '@mui/material'
import PageHeaderButton from 'app/Component/Buttons/PageHeaderButton'
import MainCard from 'app/Component/Cards/MainCard'
import { removeReminderAPI, setReminderListAPI } from 'app/services/preferences/set-reminder-services'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import NoDataPlaceholder from 'app/shared/NoDataPlaceholder'
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';
import { useTranslation } from 'react-i18next'
import { sweetAlertDelete } from 'app/config/sweetAlertsActions'

const Index = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [reminderList, setReminderList] = useState()

    useEffect(() => {
        dispatch(setReminderListAPI(res => setReminderList(res)))
    }, [])


    const handleRemove = (reminderId) => {
        sweetAlertDelete().then((result) => {
            if (result === 'deleted') {
                dispatch(removeReminderAPI({ reminderId: reminderId }, () => {
                    dispatch(setReminderListAPI(res => setReminderList(res)))
                }))
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <MainCard
            title={"SET_REMINDER"}
            button={<PageHeaderButton
                to={'/seedling/preferences/set-reminder/create'}
                title={"ADD_REMINDER"} />}>
            {
                reminderList && reminderList.length > 0 ? reminderList.map((item, key) => {
                    return (
                        <ListItemButton
                            disableRipple
                            key={key}
                            alignItems="flex-start"
                            sx={{
                                cursor: 'auto',
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
                            <ListItemText>
                                <Typography variant={"h4"} sx={{
                                    fontWeight: 600
                                }}>
                                    {item?.description || ""}
                                </Typography>
                                <Typography variant={"h6"}
                                    sx={{
                                        fontSize: "13px",
                                    }}>{item?.date || ""} {item?.time || ""}
                                    <Typography
                                        variant={"p"}
                                        sx={{
                                            marginLeft: 2,
                                            textAlign: "center",
                                            padding: "2px 15px",
                                            borderRadius: "4px",
                                            color: "#FFf",
                                            fontSize: "12px",
                                            backgroundColor:
                                                item?.times == "once" ? "#71be3d"
                                                    : item?.times == "twice" ? "#c00000"
                                                        : item?.times == "thrice" ? "#4e72c0" : "#71be3d"
                                        }}>
                                        {t(item?.times) || ""}
                                    </Typography>
                                </Typography>
                            </ListItemText>
                            <Tooltip title={t("delete")}>
                                <IconButton
                                    onClick={() => handleRemove(item?.reminderId)}
                                    sx={{
                                        transition: 'all 0.3s',
                                        boxShadow: 1,
                                        color: '#fff',
                                        alignItems: "center",
                                        backgroundColor: 'red',
                                        '&:hover ': {
                                            color: 'red',
                                            backgroundColor: '#fff',
                                        }
                                    }}>
                                    <DoDisturbAltIcon fontSize={"small"} />
                                </IconButton>
                            </Tooltip>
                        </ListItemButton>
                    )
                }) :
                    <NoDataPlaceholder />
            }
        </MainCard>
    )
}

export default Index