import JumboScrollbar from '@jumbo/components/JumboScrollbar'
import { ListItemButton, ListItemText, Stack, Typography, alpha } from '@mui/material'
import NoDataPlaceholder from 'app/shared/NoDataPlaceholder'
import React from 'react'
import { useTranslation } from 'react-i18next'

const EventsList = ({ state, event }) => {
  const { t } = useTranslation()
  return (
    <JumboScrollbar
      autoHeight
      autoHeightMin={550}
      autoHide
      autoHideDuration={200}
      autoHideTimeout={500}
    >

      {event && event.length > 0 ? event.map((item, key) => {
        if (item.eventType === 'MONITORING') {
          return null;
        }
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
            }}
          >
            <ListItemText>
              <Stack
                direction={"row"}
                sx={{ justifyContent: "space-between" }}>

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
                        item?.eventType === "SOWING" ? "#94d25c"
                          : item?.eventType === "TRANSPLANT" ? "#ba8e25"
                            : item?.eventType === "MOVING" ? "#3d3d3d"
                              : item?.eventType === "RELEASE" ? "#27b257"
                                : item?.eventType === "RETRANSPLANT" ? "#7b5e15" : '#3672c0'
                    }}>
                    {t(item?.eventType) || ''}
                  </Typography>
                </Typography>



                {item.treeWidth ?
                  <Typography
                    variant={"p"}
                    sx={{ fontSize: "small", margin: 0 }}>
                  </Typography> : <></>
                }
                <Typography variant={"p"} sx={{
                  fontSize: "small", margin: 0,
                  color:
                    item?.eventType === "SOWING" ? "#94d25c"
                      : item?.eventType === "TRANSPLANT" ? "#ba8e25"
                        : item?.eventType === "MOVING" ? "#3d3d3d"
                          : item?.eventType === "RELEASE" ? "#27b257"
                            : item?.eventType === "RETRANSPLANT" ? "#7b5e15" : '#3672c0'
                }}>
                  {item?.eventType === "SOWING" || item?.eventType === "RELEASE" ? "+" : "-"}{item?.port * item?.tray}</Typography>
              </Stack>

              <Stack
                key={key}
                direction={"row"}
                sx={{
                  // marginX: 5,
                  justifyContent: "space-between"
                }}>

                <Typography
                  variant={"p"}
                  sx={{ fontSize: "small", margin: 0 }}>
                  {item?.eventDate}
                </Typography>
                < Typography variant={"p"} sx={{ fontSize: "small", margin: 0 }}>{t("BALANCE")} {item?.noOfTree}</Typography>
              </Stack>
            </ListItemText>
          </ListItemButton>
        )
      }) :
        <NoDataPlaceholder />
      }
    </JumboScrollbar >
  )
}

export default EventsList