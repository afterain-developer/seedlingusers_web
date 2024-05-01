import React from 'react';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
const onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
};
const onOk = (value) => {
    console.log('onOk: ', value);
};
const AntdDateTime = () => (
    <Space direction="vertical" size={60}>
        <DatePicker
            multiple={true}
            showWeek
            showTime
            onChange={onChange}
            format={'DD-MM-YYYY - HH:mm'}
            size='large'
            style={{ width: '100%' }}
            onOk={onOk} />
    </Space>
);
export default AntdDateTime;