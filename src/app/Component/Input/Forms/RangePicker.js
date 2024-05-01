import React, { useState } from 'react';
import { DatePicker, Button } from 'antd';
import dayjs from 'dayjs';

const RangePickerComponent = ({ callBack, disabled }) => {
    const { RangePicker } = DatePicker;
    const dateFormat = 'YYYY-MM-DD';
    const startOfMonth = dayjs().startOf('month');
    const endOfMonth = dayjs().endOf('day'); // Adjusted to end of day

    const [selectedRange, setSelectedRange] = useState([startOfMonth, endOfMonth]);
    const handleSelectThisWeek = () => {
        const startOfWeek = dayjs().startOf('week');
        const endOfWeek = dayjs().endOf('week');
        setSelectedRange([startOfWeek, endOfWeek]);
        callBack([startOfWeek, endOfWeek])
    };

    const handleSelectThisMonth = () => {
        const startOfMonth = dayjs().startOf('month');
        const endOfMonth = dayjs().endOf('month');
        setSelectedRange([startOfMonth, endOfMonth]);
        callBack([startOfMonth, endOfMonth])
    };

    const handleRangeChange = (dates) => {
        setSelectedRange(dates);
        callBack(dates)
    };

    const renderExtraFooter = () => (
        <div>
            <Button type="primary" size='small' style={{ margin: 2 }} onClick={handleSelectThisWeek}>This Week</Button>
            <Button type="primary" size='small' onClick={handleSelectThisMonth}>This Month</Button>
        </div>
    );

    return (
        <div>
            <RangePicker
                disabled={disabled}
                size='large'
                value={selectedRange}
                onChange={handleRangeChange}
                format={dateFormat}
                renderExtraFooter={renderExtraFooter}
            />
        </div>
    );
};

export default RangePickerComponent;
