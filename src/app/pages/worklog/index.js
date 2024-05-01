import PageHeaderButton from 'app/Component/Buttons/PageHeaderButton'
import MainCard from 'app/Component/Cards/MainCard'
import NoDataPlaceholder from 'app/shared/NoDataPlaceholder'
import React, { useState } from 'react'
import ListIcon from '@mui/icons-material/List';
import TimelineIcon from '@mui/icons-material/Timeline';
import { Button, Tab, Tabs } from '@mui/material'
import WorkLogList from './WorklogList';
import WorkLogGraph from './WorkLogGraph';
import RangePicker from 'app/Component/Input/Forms/RangePicker';
import dayjs from 'dayjs';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
const Index = () => {
    const [flag, setFlag] = useState(false)
    const [value, setValue] = useState(0)
    const startOfMonth = dayjs().startOf('month');
    const endOfMonth = dayjs().endOf('day');

    const [filterValue, setFilterValue] = useState([])
    const [filter, setFilter] = useState({ fromDate: startOfMonth, toDate: endOfMonth })
    const filterAction = () => {
        setFilter({ fromDate: filterValue[0], toDate: filterValue[1] })
    }
    return (
        <>
            <div style={{ marginBottom: 15, display: "flex" }}>
                <RangePicker
                    disabled={value === 0 ? false : true}
                    callBack={(value) => { setFilterValue(value); setFlag(true) }} />
                <Button
                    variant="contained"
                    disabled={flag && value === 0 ? false : true}
                    onClick={filterAction}
                    sx={{ marginX: 2 }}>
                    <FilterAltIcon />
                </Button>
            </div >
            <MainCard
                title={"WORKLOG_TAB"}
                headerStyle={{
                    padding: "10px 24px"
                }}

                button={<PageHeaderButton
                    to={"/seedling/worklog/create"}
                    title={"WRITE_WORKLOG"} />}

                tabs={
                    <Tabs value={value} onChange={(event, newValue) => { setValue(newValue) }}
                        sx={{
                            display: 'inline-flex !important',
                            indicatorColor: '#FFF', // Change this to your desired color
                            textColor: '#aaa', // Change this to your desired color
                        }}  >
                        <Tab icon={<ListIcon />} aria-label={1} />
                        <Tab icon={<TimelineIcon />} aria-label={0} />
                    </Tabs>
                }> {value === 0 ? <WorkLogList filter={filter} /> : <WorkLogGraph />}
            </MainCard>
        </>
    )
}

export default Index