import { Avatar, CardContent, Grid, Typography } from '@mui/material'
import GrassIcon from '@mui/icons-material/Grass';
import React from 'react'

const Fields = ({ state }) => {
    return (
        <>
            <CardContent sx={{ borderBottom: "1px solid #ebebeb", }}>
                <div style={{ width: 250, position: "relative", margin: 'auto' }}>
                    <Avatar
                        variant='square'
                        src={state?.fieldImagePath}
                        sx={{
                            width: 250,
                            height: 250,
                            margin: "auto",
                            background: "#e6f2e6",
                            // borderRadius: 5
                        }}>
                        <GrassIcon sx={{ width: 200, height: 200, color: "#017C07" }} />
                    </Avatar>
                    <div style={{
                        bottom: 15,
                        zIndex: 10,
                        position: "absolute",
                        width: '100%',
                        background: "#00000080",
                        // borderRadius: 20
                        // marginBottom: 10
                    }}>
                        <Typography
                            sx={{
                                marginY: 0.1,
                                padding: 0,
                                textAlign: "center",
                                color: "#fff",
                            }}
                            variant={"h4"}>
                            {state?.fieldName || ""}
                        </Typography>
                    </div>
                </div>
            </CardContent>
            {
                state?.fieldTree && <CardContent CardContent sx={{ borderBottom: "1px solid #ebebeb", }}>
                    {
                        state?.fieldTree?.map((tree, key) => {
                            return (
                                <Grid container key={key} spacing={0.5}>
                                    <Grid item sm={4.4}>
                                        <Typography
                                            variant={"p"}
                                            sx={{ fontSize: "small", marginBottom: 0.1 }}>
                                            {tree['Tree.treeType']} - {tree?.tag}
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={4.4}>
                                        {tree.treeWidth ?
                                            <Typography
                                                sx={{ fontSize: "small", marginBottom: 0.1, textAlign: "center" }}>
                                                {tree?.treeWidth} x {tree?.treeHeight}
                                                <span style={{ fontSize: "11px" }}>mm</span>
                                            </Typography> : <></>
                                        }

                                    </Grid>
                                    <Grid item sm={3}>
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
                </CardContent>
            }
        </>
    )
}

export default Fields