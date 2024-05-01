import { fetchWorkLogRecord } from 'app/services/worklog-services'
import NoDataPlaceholder from 'app/shared/NoDataPlaceholder'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

import TimelineOppositeContent, {
    timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const monthArray = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

const WorklogList = ({ filter }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [workLogList, setWorkLogList] = useState([])

    useEffect(() => {
        dispatch(fetchWorkLogRecord({ ...filter }, res => {
            const dates = [... new Set(res.map(record => record.fromDate))];
            const yearMonthList = [];

            dates.forEach(dateStr => {
                const dateObject = new Date(dateStr);
                const year = dateObject.getFullYear();
                const month = dateObject.getMonth() + 1;
                const yearString = year
                const monthString = monthArray[dateObject.getMonth()]

                const yearAndMonth = `${year}-${month.toString().padStart(2, '0')}`;
                const existingEntry = yearMonthList.find(entry => entry.YearAndMonth === yearAndMonth);

                if (existingEntry) {
                    existingEntry.data.push(dateStr);
                } else {
                    yearMonthList.push({
                        YearAndMonth: yearAndMonth,
                        yearString: yearString,
                        monthString: monthString,
                        data: [dateStr]
                    });
                }
            });


            yearMonthList.map((yearMonth, i) => {

                const tempArray = [];
                yearMonth?.data.map(item => {
                    tempArray.push(
                        {
                            fullDate: item,
                            dateSting: new Date(item).getDate(),
                            daySting: week[new Date(item).getDay()],
                            monthString: monthArray[new Date(item).getMonth()],
                            arrayData: res.filter((filterItem) => filterItem?.fromDate == item)
                        })

                })
                yearMonthList[i].main = tempArray
            })

            setWorkLogList(yearMonthList)
        }))
    }, [filter])

    return (
        <>
            {
                workLogList && workLogList.length > 0 ?
                    <Timeline sx={{
                        [`& .${timelineOppositeContentClasses.root}`]: {
                            flex: 0.2,
                        },
                    }} >

                        {
                            workLogList.map((yearAndMonth, key) => {

                                return (
                                    <>
                                        <Box
                                            sx={{
                                                width: "300px",
                                                margin: "0px auto",
                                                marginBottom: "10px",
                                                fontSize: "16px",
                                                textAlign: "center",
                                                padding: "5px 0px",
                                                borderRadius: "4px",
                                                color: "#000",
                                                backgroundColor: "#e0e0e0"
                                            }}>
                                            {`${t(yearAndMonth?.monthString)} - ${yearAndMonth?.yearString}` || ''}
                                        </Box>
                                        {
                                            yearAndMonth?.main?.map((item, iKey) => {
                                                return (
                                                    <TimelineItem>
                                                        <TimelineOppositeContent >
                                                            <Typography
                                                                sx={{
                                                                    display: "block",
                                                                    color: "#000",
                                                                    fontSize: "20px",
                                                                    fontWeight: 600,
                                                                }}>
                                                                {item?.dateSting || ''}

                                                            </Typography>
                                                            <Typography
                                                                color={item?.daySting == 'sunday' || item?.daySting == 'saturday' ? 'red' : "textSecondary"}
                                                                sx={{
                                                                    display: "block",
                                                                    fontSize: "15px",
                                                                    fontWeight: 400,
                                                                }}>
                                                                {t(item?.daySting) || ''}
                                                            </Typography>

                                                        </TimelineOppositeContent>
                                                        <TimelineSeparator>
                                                            {
                                                                item?.fullDate && new Date(item?.fullDate).toDateString() == new Date().toDateString() ?
                                                                    <TimelineDot variant={'filled'} color="primary" /> : <TimelineDot variant={'filled'} />
                                                            }
                                                            <TimelineConnector />
                                                        </TimelineSeparator>
                                                        <TimelineContent>

                                                            {item?.arrayData.length > 0 &&
                                                                item?.arrayData.map((work, key) => {
                                                                    return (
                                                                        <Box>
                                                                            <Typography
                                                                                // variant={"p"}
                                                                                sx={{ fontSize: "small", marginTop: 1.2 }}>

                                                                                <Typography
                                                                                    onClick={() => navigate("/seedling/worklog/edit", { state: work })}
                                                                                    variant={"p"}
                                                                                    sx={{
                                                                                        display: "table",
                                                                                        padding: "2px 20px",
                                                                                        borderRadius: "4px",
                                                                                        color: "#FFf",
                                                                                        fontSize: "11px",
                                                                                        fontWeight: 600,
                                                                                        backgroundColor:
                                                                                            work?.worklogType == "FERTILIZER" ? "#ffba0b "
                                                                                                : work?.worklogType == "PESTICIDE" ? "#c00000"
                                                                                                    : work?.worklogType == "WATERING" ? "#00b0f0"
                                                                                                        : work?.worklogType == "DISEASE" ? "#94d25c" : '#3672c0'
                                                                                    }}>
                                                                                    {t(work?.worklogType) || ''}
                                                                                </Typography>
                                                                                {
                                                                                    work?.WorklogFields.length > 0 &&
                                                                                    work?.WorklogFields.map((WorkLog, key) => {
                                                                                        return (

                                                                                            <Typography
                                                                                                sx={{
                                                                                                    display: "inline",
                                                                                                    fontSize: "11px",
                                                                                                    padding: "2px 5px",
                                                                                                    color: "gray"
                                                                                                }}>
                                                                                                {WorkLog?.Field?.fieldName || ''},
                                                                                            </Typography>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </Typography>
                                                                        </Box>
                                                                    )
                                                                })
                                                            }
                                                        </TimelineContent>
                                                    </TimelineItem>
                                                )
                                            })
                                        }
                                    </>
                                )
                            })
                        }

                    </Timeline>

                    : <NoDataPlaceholder />
            }
        </>
    )
}

export default WorklogList