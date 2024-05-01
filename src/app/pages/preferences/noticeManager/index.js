import { IconButton, ListItemButton, ListItemText, Tooltip, Typography, alpha } from '@mui/material'
import PageHeaderButton from 'app/Component/Buttons/PageHeaderButton'
import MainCard from 'app/Component/Cards/MainCard'
import { FetchListNoticeAPI, RemoveNoticeAPI } from 'app/services/preferences/notice-manager-services'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import NoDataPlaceholder from 'app/shared/NoDataPlaceholder'
import { useTranslation } from 'react-i18next'
import { sweetAlertDelete } from 'app/config/sweetAlertsActions'
const Index = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const navigator = useNavigate()
    const [noticeList, setNoticeList] = useState([])

    useEffect(() => {
        dispatch(FetchListNoticeAPI(res => {
            setNoticeList(res);
        }))
    }, [])


    const handleRemove = (noticeId) => {
        sweetAlertDelete().then((result) => {
            if (result === 'deleted') {
                dispatch(RemoveNoticeAPI({ noticeId: noticeId }, () => {
                    dispatch(FetchListNoticeAPI(res => setNoticeList(res)))
                }))
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <MainCard
            title={"NOTICE_TAB"}
            button={
                <PageHeaderButton
                    title={"BUTTON_ADD_NOTICE"}
                    to={"/seedling/preferences/notice-manager/create"}
                />}>
            {
                noticeList && noticeList.length > 0 ? noticeList.map((item, key) => {
                    return (
                        <ListItemButton
                            disableRipple
                            key={key}
                            alignItems="flex-start"
                            sx={{
                                // p: 3,
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
                            <ListItemText>
                                <Typography variant={"h4"} sx={{ fontWeight: 600 }}>{item?.title || ""}</Typography>
                                <Typography variant={"h6"} sx={{ fontSize: "13px" }}>{item?.discription || ""}</Typography>
                            </ListItemText>
                            <Tooltip title={t("DELETE")}>
                                <IconButton
                                    onClick={() => handleRemove(item?.noticeId)}
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
                                    }}
                                >
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