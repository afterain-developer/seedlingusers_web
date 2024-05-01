import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
// import CalendarWrapper from "./  ";
import 'react-big-calendar/lib/css/react-big-calendar.css';

import EventIcon from '@mui/icons-material/Event';
import WorkIcon from '@mui/icons-material/Work';
import HomeIcon from '@mui/icons-material/Home';
moment.updateLocale('en', {
    week: {
        dow: 1,
    },
});

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
    const today = new Date();
    const events = [
        {
            title: 'Meeting 1',
            start: new Date(2024, 2, 6, 10, 0),
            end: new Date(2024, 2, 6, 12, 0),
            type: 'meeting',
        },
        {
            title: 'Work Event',
            start: new Date(2024, 2, 6, 9, 0),
            end: new Date(2024, 2, 6, 18, 30),
            type: 'work',
        },
        {
            title: 'Home Event',
            start: new Date(2024, 2, 7, 14, 0),
            end: new Date(2024, 2, 7, 16, 0),
            type: 'home',
        },
    ];


    function eventStyleGetter(event, start, end, isSelected) {
        var style = {
            backgroundColor: event.color,
        };
        return {
            style: style
        };
    }

    const dayStyleGetter = (date) => {
        const today = new Date();
        // Reset hours, minutes, seconds, and milliseconds to compare only dates
        today.setHours(0, 0, 0, 0);
        const currentDay = new Date(date);
        currentDay.setHours(0, 0, 0, 0);

        const dayOfWeek = date.getDay();
        const isSunday = dayOfWeek === 0;
        const isSaturday = dayOfWeek === 6;
        const isToday = currentDay.getTime() === today.getTime();

        return {
            style: {
                backgroundColor: isToday ? '#75c5534d' :
                    isSunday ? '#ffc9b280' :
                        isSaturday ? '#ffe0d680' : '',
            },
        };
    };



    const CustomEvent = ({ event }) => {
        return (
            <div>
                {event.title}
            </div>
        );
    };
    const datePickerSetValue = (slotInfo) => {
        const tempObject = {
            startTime: moment(slotInfo?.start).format('DD/MM/YYYY HH:mm'),
            endTime: moment(slotInfo?.end).format('DD/MM/YYYY HH:mm'),
        }

        let timeDifferenceMs = new Date(tempObject?.endTime) - new Date(tempObject?.startTime);
        const hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60));
        tempObject.totalTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
        console.log(tempObject, "tempObject");
    }
    return (
        <div>
            {/* <CalendarWrapper> */}
            <Calendar
                localizer={localizer}
                events={events}
                selectable
                startAccessor="start"
                endAccessor="end"
                eventPropGetter={eventStyleGetter}
                // onSelectEvent={event => console.log(event, "@@@@")}
                onSelectSlot={slotInfo => {
                    if (moment(slotInfo.start).isBefore(moment(), 'minute') && moment(slotInfo.end).isBefore(moment(), 'minute')) {
                        datePickerSetValue(slotInfo);
                    } else {
                        alert("Selection of future times is not allowed.");
                    }
                }}
                step={15}
                components={{
                    event: CustomEvent,
                }}
                dayPropGetter={dayStyleGetter}
                style={{ height: 1000 }}
            />
            {/* </CalendarWrapper> */}
        </div>
    );
};

export default MyCalendar;