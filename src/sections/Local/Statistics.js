import React, { useState } from 'react';
import { Text } from '../../pages/Local/styles';
import { XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';

function Statistics() {
    const [dates, setDates] = useState({minDate: new Date((new Date(Date.now())).getFullYear(), (new Date(Date.now())).getMonth(), (new Date(Date.now())).getDate(), 0, 0, 0, 0),
                                        maxDate: new Date((new Date(Date.now())).getFullYear(), (new Date(Date.now())).getMonth(), (new Date(Date.now())).getDate(), 23, 59, 59, 999)});
    const [events, setEvents] = useState([]);
    const [data, setData] = useState([]);

    const data2 = [
        {x: 0, y: 8},
        {x: 1, y: 5},
        {x: 2, y: 4},
        {x: 3, y: 9},
        {x: 4, y: 1},
        {x: 5, y: 7},
        {x: 6, y: 6},
        {x: 7, y: 3},
        {x: 8, y: 2},
        {x: 9, y: 5}
    ];

    const handleMinDate = (date: Date | null) => {
        const timeDif = dates.maxDate - date;
        if (timeDif > 0) {
            setDates({...dates, minDate: date});
            getData(date, dates.maxDate);
        }
    }

    const handleMaxDate = (date: Date | null) => {
        const timeDif = date - dates.minDate;
        if (timeDif > 0) {
            setDates({...dates, maxDate: date});
            getData(dates.minDate, date);
        }
    }

    const getData = (minDate, maxDate) => {
        // Puxar dados do DB
        const newEvents = [
            {eventType: "entry",
             createdAt: new Date(2020, 6, 2)},
            {eventType: "exit",
             createdAt: new Date(2020, 6, 2)},
            {eventType: "exit",
             createdAt: new Date(2020, 5, 30)},
            {eventType: "exit",
             createdAt: new Date(2020, 4, 30)},
            {eventType: "entry",
             createdAt: new Date(2020, 4, 30)},
            {eventType: "exit",
             createdAt: new Date(2020, 4, 15)},
            {eventType: "exit",
             createdAt: new Date(2020, 4, 7)}
        ];
        setEvents(newEvents);

        const timeDif = maxDate - minDate;
        if (timeDif <= 7200000) filterMinutesData(minDate, maxDate);
        else if (timeDif <= 172800000) filterHoursData(minDate, maxDate);
        else if (timeDif <= 5259600000) filterDaysData(minDate, maxDate);
        else filterMonthsData(minDate, maxDate);
    }

    const filterMinutesData = (minDate, maxDate) => {
        const initialData = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate(), minDate.getHours(), minDate.getMinutes(), 0, 0);
        const finalData = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate(), maxDate.getHours(), maxDate.getMinutes(), 0, 0);

        const periods = Math.ceil((finalData - initialData) / 600000);

        console.log(periods);
    }

    const filterHoursData = (minDate, maxDate) => {
        const initialData = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate(), minDate.getHours(), 0, 0, 0);
        const finalData = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate(), maxDate.getHours(), 1, 0, 0);

        const periods = Math.ceil((finalData - initialData) / 3600000);

        console.log(periods);
    }

    const filterDaysData = (minDate, maxDate) => {
        const initialData = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate(), 0, 0, 0, 0);
        const finalData = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate(), 1, 0, 0, 0);

        const periods = Math.ceil((finalData - initialData) / 86400000);

        console.log(periods);
    }

    const filterMonthsData = (minDate, maxDate) => {
        const periods = (maxDate.getFullYear() - minDate.getFullYear()) * 12 + (maxDate.getMonth() - minDate.getMonth()) + 1;

        console.log(periods);
        console.log(events);
    }

    return (
        <>
        <Text><span>Selecionar período de visualização:</span></Text>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker 
                variant="inline" ampm={false}
                label="Limite inferior"
                value={dates.minDate} format="dd/MM/yyyy HH:mm"
                onChange={handleMinDate} disableFuture
            />
            <KeyboardDateTimePicker 
                variant="inline" ampm={false}
                label="Limite superior"
                value={dates.maxDate} format="dd/MM/yyyy HH:mm"
                onChange={handleMaxDate} disableFuture minDate={dates.minDate}
            />
        </MuiPickersUtilsProvider>

        <Text><span>Gráficos</span></Text>


        <Text><span>Tabelas</span></Text>


        <Text><span>Indicadores</span></Text>

        <XYPlot width={300} height={300}>
            <LineSeries data={data2} />
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
        </XYPlot>
        {console.log(dates)}
        </>
    );
}

export default Statistics;