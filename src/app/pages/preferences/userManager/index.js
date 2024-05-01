import PageHeaderButton from 'app/Component/Buttons/PageHeaderButton'
import MainCard from 'app/Component/Cards/MainCard'
import React, { useEffect, useState } from 'react'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useDispatch } from 'react-redux';
import { userFetchListAPI, userRemoveAPI } from 'app/services/preferences/user-manager-services';
import NoDataPlaceholder from 'app/shared/NoDataPlaceholder';
import { IconButton, ListItemButton, ListItemText, Tooltip, Typography, alpha } from '@mui/material';
import { sweetAlertDelete } from 'app/config/sweetAlertsActions';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useTranslation } from 'react-i18next';

const Index = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [userList, setUserList] = useState([])
    useEffect(() => {
        dispatch(userFetchListAPI(res => setUserList(res)))
    }, [])
    const handleRemove = (userId) => {
        sweetAlertDelete().then((result) => {
            if (result === 'deleted') {
                dispatch(userRemoveAPI({ userId: userId }, () => {
                    dispatch(userFetchListAPI(res => setUserList(res)))
                }))
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    return (
        <MainCard
            title={"TITLE_ADDED_USERS"}
            button={<PageHeaderButton
                title={"TITLE_ADD_USER"}
                icon={<PersonAddIcon />}
                to={"/seedling/preferences/user-manager/create"} />}
        >
            {
                userList && userList.length > 0 ? userList.map((item, key) => {
                    return (
                        <ListItemButton
                            onClick={() => navigator("/seedling/preferences/farm-manager/edit", { state: item })}
                            disableRipple
                            key={key}
                            alignItems="flex-start"
                            sx={{

                                borderBottom: 1,
                                borderBottomColor: 'divider',
                                '&:hover .update-task': {
                                    boxShadow: `0 3px 10px 0 ${alpha('#000', 0.2)}`,
                                    // cursor: 'auto',
                                    borderBottomColor: 'transparent',
                                    opacity: 1,
                                }
                            }}
                        >
                            <ListItemText>
                                <Typography variant={"h4"} sx={{ fontWeight: 600 }}>{item?.fullName || ""}</Typography>
                                <Typography variant={"h6"} sx={{ fontSize: "13px", }}>{item?.mobile || ""}</Typography>
                            </ListItemText>
                            <Tooltip title={t("DELETE")}>
                                <IconButton
                                    onClick={() => handleRemove(item?.userId)}
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
                                    <PersonRemoveIcon fontSize={"small"} />
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