import { Avatar, Grid, ListItemAvatar, ListItemButton, ListItemText, Typography, alpha } from '@mui/material'
import PageHeaderButton from 'app/Component/Buttons/PageHeaderButton'
import MainCard from 'app/Component/Cards/MainCard'
import { fetchFieldAPI, modifyFieldAPI } from 'app/services/fields-services'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import NoDataPlaceholder from 'app/shared/NoDataPlaceholder'
import GrassIcon from '@mui/icons-material/Grass';
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'


const Index = () => {
    const { i18n } = useTranslation()
    const dispatch = useDispatch()
    const navigator = useNavigate()

    const [value, setValue] = useState(false)
    const [fieldsRecord, setFieldsRecord] = useState([])

    useEffect(() => {
        dispatch(fetchFieldAPI(res => setFieldsRecord(res)))
        setValue(false)
    }, [value, i18n?.language])

    const modifyAction = () => {
        dispatch(modifyFieldAPI({ fieldName: 'New field' }, (res) => {
            setValue(true)
        }))
    }

    return (
        <MainCard
            title={"FIELDSTab"}
            button={<PageHeaderButton title={"ADD_FIELD"} onClick={modifyAction} />}
            headerStyle={{ padding: "15px 25px" }}>

            {
                fieldsRecord && fieldsRecord.length > 0 ? fieldsRecord.map((item, key) => {
                    return (
                        <ListItemButton
                            onClick={() => navigator("/seedling/field/detail", { state: item?.fieldId })}
                            disableRipple
                            key={key}
                            alignItems="flex-start"
                            sx={{
                                p: 3,
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
                            <Grid container spacing={1}>
                                <Grid item sm={12} md={3}>
                                    <ListItemAvatar sx={{ width: '150px', position: "relative", margin: "auto" }}>
                                        <Avatar
                                            src={item?.fieldImagePath}
                                            variant={"rounded"}
                                            sx={{
                                                width: '100%',
                                                height: 146,
                                                background: "#e6f2e6"
                                            }}>
                                            <GrassIcon sx={{ width: 100, height: 100, color: "#017C07" }} />
                                        </Avatar>
                                        <div style={{
                                            bottom: 0,
                                            zIndex: 10,
                                            position: "absolute",
                                            width: '100%',
                                            background: "#0000004d",
                                            marginBottom: 10
                                        }}>
                                            <Typography
                                                sx={{
                                                    marginY: 0.1,
                                                    padding: 0,
                                                    textAlign: "center",
                                                    color: "#fff"
                                                }}
                                                variant={"h6"}>
                                                {item?.fieldName || ""}
                                            </Typography>
                                        </div>
                                    </ListItemAvatar>
                                </Grid>
                                <Grid item sm={12} md={9}>
                                    <ListItemText>
                                        {
                                            item?.fieldTree?.map((tree, key) => {
                                                return (
                                                    <Grid container key={key} spacing={0.5} sx={{ mx: 2 }}>
                                                        <Grid item sm={4}>
                                                            <Typography
                                                                variant={"p"}
                                                                sx={{ fontSize: "small", marginBottom: 0.1 }}>
                                                                {tree['Tree.treeType']} - {tree?.tag}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item sm={4}>
                                                            {tree.treeWidth ?
                                                                <Typography
                                                                    sx={{ fontSize: "small", marginBottom: 0.1, textAlign: "center" }}>
                                                                    {tree?.treeWidth} x {tree?.treeHeight}
                                                                    <span style={{ fontSize: "11px" }}>mm</span>
                                                                </Typography> : <></>
                                                            }

                                                        </Grid>
                                                        <Grid item sm={4}>
                                                            <Typography
                                                                sx={{
                                                                    fontSize: "small",
                                                                    marginBottom: 0.1,
                                                                    color: "#70b329",
                                                                    textAlign: "end"
                                                                }}>
                                                                {tree?.noOfTree}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                )
                                            })
                                        }
                                    </ListItemText>
                                </Grid>
                            </Grid>



                        </ListItemButton>
                    )
                }) :
                    <NoDataPlaceholder />
            }
        </MainCard>
    )
}

export default Index