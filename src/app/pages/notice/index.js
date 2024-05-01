import { IconButton, ListItemButton, ListItemText, Typography, alpha } from '@mui/material'
import MainCard from 'app/Component/Cards/MainCard'
import { noticeFetchAPI } from 'app/services/notice-services'
import NoDataPlaceholder from 'app/shared/NoDataPlaceholder'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const Index = () => {
    const dispatch = useDispatch()
    const [noticeList, setNoticeList] = useState()

    useEffect(() => {
        dispatch(noticeFetchAPI(res => setNoticeList(res)))
    }, [])
    return (
        <MainCard
            title='NOTICE_TAB'>
            {
                noticeList && noticeList.length > 0 ? noticeList.map((item, key) => {
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
                                <Typography variant={"h5"} sx={{
                                    fontWeight: 600
                                }}>
                                    {item?.title || ""} <span style={{ fontWeight: 100 ,fontSize : '14px' }}> {new Date(item?.createdAt).toISOString().split('T')[0] || ""} </span>
                                </Typography>
                                <Typography variant={"h6"}
                                    sx={{
                                        fontSize: "13px",
                                    }}>{item?.discription || ""}
                                </Typography>
                            </ListItemText>
                        </ListItemButton>
                    )
                }) :
                    <NoDataPlaceholder />
            }
        </MainCard>

    )
}

export default Index