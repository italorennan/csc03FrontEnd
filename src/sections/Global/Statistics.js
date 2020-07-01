import React, { useState, useEffect } from 'react';
import { Section, Text, SubText, TextSection, Button, AllGraphSection, GraphSection, HintDiv, MainHeaderTableCell, BodyTableCell, StyledTablePagination } from '../../pages/Global/styles';
import { XYPlot, LineMarkSeries, XAxis, YAxis, Hint } from 'react-vis';
import DiscreteColorLegend from 'react-vis/dist/legends/discrete-color-legend';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import 'react-vis/dist/style.css';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: '100%',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    }
});

function Statistics() {
    // Puxar do DB
    const store1 = {
        storeName: "Loja Fortaleza",
        storeNumber: 8001,
        accessCode: "temp",
        index: 0
    };
    const store2 = {
        storeName: "Loja São Paulo",
        storeNumber: 8002,
        accessCode: "temp",
        index: 1
    };
    const storesData = [store1, store2];
    const lineColors = ['#000066', '#cc0066', '#cc0000', '#b266ff', '#33ff99'];
    var legendItems = [];
    storesData.map((store) => {
        legendItems.push({title: store.storeName, color: lineColors[store.index]});
    });

    const [state, setState] = useState({minDate: new Date((new Date(Date.now())).getFullYear(), (new Date(Date.now())).getMonth(), (new Date(Date.now())).getDate(), 0, 0, 0, 0),
                                        maxDate: new Date((new Date(Date.now())).getFullYear(), (new Date(Date.now())).getMonth(), (new Date(Date.now())).getDate(), 23, 59, 59, 999),
                                        clicked: false,
                                        timeScale: 'hours',
                                        storesData: storesData,
                                        storesQuantity: storesData.length,
                                        events: [],
                                        firstGeneralData: [],
                                        secondGeneralData: [],
                                        firstPerStoreData: [[]],
                                        secondPerStoreData: [[]],
                                        labels: [],
                                        firstMaxY: 0,
                                        secondMaxY: 0,
                                        overFirstGeneralGraph: false,
                                        overSecondGeneralGraph: false,
                                        overFirstPerStoreGraph: false,
                                        overSecondPerStoreGraph: false,
                                        graphsExplanation: false,
                                        tablesExplanation: false,
                                        page: 0,
                                        rowsPerPage: 10,
                                        rows: [],
                                        rowsPerStore: [[]],
                                        selectedRows: [],
                                        order: 'asc',
                                        orderBy: 'quantity'});

    useEffect(() => {
        if (!state.clicked) getData(state.minDate, state.maxDate);
    });

    const monthName = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const classes = useStyles();

    const handleMinDate = (date: Date | null) => {
        const timeDif = state.maxDate - date;
        if (timeDif > 0) getData(date, state.maxDate);
    }

    const handleMaxDate = (date: Date | null) => {
        const timeDif = date - state.minDate;
        if (timeDif > 0) getData(state.minDate, date);
    }

    const getData = (minDate, maxDate) => {
        // Puxar dados do DB
        // Usar variável state.storeSelected
        const newEvents = [
            {storeNumber: 8001, eventType: "entry", createdAt: new Date(2020, 5, 30, 10)},
            {storeNumber: 8001, eventType: "exit", createdAt: new Date(2020, 5, 30, 10, 30)},
            {storeNumber: 8001, eventType: "entry", createdAt: new Date(2020, 5, 30, 10)},
            {storeNumber: 8001, eventType: "exit", createdAt: new Date(2020, 5, 30, 11, 30)},
            {storeNumber: 8002, eventType: "entry", createdAt: new Date(2020, 5, 30, 10)},
            {storeNumber: 8002, eventType: "exit", createdAt: new Date(2020, 5, 30, 12, 30)},
            {storeNumber: 8002, eventType: "entry", createdAt: new Date(2020, 5, 30, 10)},
            {storeNumber: 8002, eventType: "exit", createdAt: new Date(2020, 5, 30, 13, 30)},
            {storeNumber: 8002, eventType: "entry", createdAt: new Date(2020, 5, 30, 10)},
            {storeNumber: 8002, eventType: "exit", createdAt: new Date(2020, 5, 30, 10, 20)},
            {storeNumber: 8002, eventType: "entry", createdAt: new Date(2020, 5, 30, 11)},
            {storeNumber: 8002, eventType: "exit", createdAt: new Date(2020, 5, 30, 11, 20)},
            {storeNumber: 8002, eventType: "entry", createdAt: new Date(2020, 5, 30, 11)},
            {storeNumber: 8002, eventType: "exit", createdAt: new Date(2020, 5, 30, 14, 20)},
            {storeNumber: 8002, eventType: "entry", createdAt: new Date(2020, 5, 30, 12)},
            {storeNumber: 8002, eventType: "exit", createdAt: new Date(2020, 5, 30, 13, 20)},
            {storeNumber: 8001, eventType: "entry", createdAt: new Date(2020, 4, 30)},
            {storeNumber: 8001, eventType: "exit", createdAt: new Date(2020, 3, 30)},
            {storeNumber: 8001, eventType: "entry", createdAt: new Date(2020, 3, 30)},
            {storeNumber: 8001, eventType: "exit", createdAt: new Date(2020, 3, 15)},
            {storeNumber: 8001, eventType: "entry", createdAt: new Date(2020, 3, 7)},
            {storeNumber: 8001, eventType: "entry", createdAt: new Date(2020, 2, 10)},
            {storeNumber: 8001, eventType: "entry", createdAt: new Date(2020, 2, 14)},
            {storeNumber: 8002, eventType: "entry", createdAt: new Date(2020, 2, 20)},
            {storeNumber: 8002, eventType: "exit", createdAt: new Date(2020, 2, 2)},
            {storeNumber: 8002, eventType: "entry", createdAt: new Date(2020, 2, 14)},
            {storeNumber: 8002, eventType: "entry", createdAt: new Date(2020, 2, 14)},
            {storeNumber: 8002, eventType: "entry", createdAt: new Date(2020, 2, 14)},
            {storeNumber: 8002, eventType: "entry", createdAt: new Date(2020, 2, 13)},
            {storeNumber: 8002, eventType: "entry", createdAt: new Date(2020, 2, 15)},
            {storeNumber: 8002, eventType: "entry", createdAt: new Date(2020, 2, 15)},
            {storeNumber: 8002, eventType: "exit", createdAt: new Date(2020, 2, 16)}
        ];

        const timeDif = maxDate - minDate;
        if (timeDif < 7200000) setState({...state, clicked: true, minDate: minDate, maxDate: maxDate, events: newEvents, timeScale: "minutes"});
        else if (timeDif < 86400000) setState({...state, clicked: true, minDate: minDate, maxDate: maxDate, events: newEvents, timeScale: "hours"});
        else if (timeDif < 5259600000) setState({...state, clicked: true, minDate: minDate, maxDate: maxDate, events: newEvents, timeScale: "days"});
        else setState({...state, clicked: true, minDate: minDate, maxDate: maxDate, events: newEvents, timeScale: "months"});
    }

    const handleUpdate = () => {
        switch (state.timeScale) {
            case "minutes": filterMinutesData(); break;
            case "hours": filterHoursData(); break;
            case "days": filterDaysData(); break;
            case "months": filterMonthsData(); break;
            default: break;
        }
    }

    const filterMinutesData = () => {
        const initialData = new Date(state.minDate.getFullYear(), state.minDate.getMonth(), state.minDate.getDate(), state.minDate.getHours(), state.minDate.getMinutes(), 0, 0);
        const finalData = new Date(state.maxDate.getFullYear(), state.maxDate.getMonth(), state.maxDate.getDate(), state.maxDate.getHours(), state.maxDate.getMinutes(), 0, 0);

        const periods = Math.ceil((finalData - initialData) / 600000);

        var newFirstGeneralData = [];
        var newFirstPerStoreData = [];
        var newSecondGeneralData = [];
        var newSecondPerStoreData = [];
        var newLabels = [];
        var newFirstMaxY = 0;
        var total = 0;
        var newRows = [];
        var newRowsPerStore = [];

        state.storesData.map(() => {
            newFirstPerStoreData.push([]);
            newSecondPerStoreData.push([]);
            newRowsPerStore.push([]);
        });

        const filter = (value, year, month, day, hour, minute) => {
            return state.events.filter(el => (el.eventType === value && el.createdAt.getFullYear() === year && el.createdAt.getMonth() === month &&
                                              el.createdAt.getDate() === day && (el.createdAt.getHours() * 60 + el.createdAt.getMinutes() < hour * 60 + minute)));
        }

        for (var i = 0; i < periods; i++) {
            var year = state.minDate.getFullYear();
            var month = state.minDate.getMonth();
            var day = state.minDate.getDate();
            var hour = state.minDate.getHours();
            var minute = state.minDate.getMinutes() + 10 * i;
            var date = new Date(year, month, day, hour, minute, 0, 0);
            year = date.getFullYear();
            month = date.getMonth();
            day = date.getDate();
            hour = date.getHours();
            minute = date.getMinutes();

            var minuteString = minute.toString();
            if (minute < 10)
                minuteString = "0" + minuteString;
            var hourString = hour.toString();
            if (hour < 10)
                hourString = "0" + hourString;
            const label = hourString + ":" + minuteString;
            newLabels.push(label);

            const exits = filter("exit", year, month, day, hour, minute);
            minute += 10;
            if (minute >= 60) {
                hour += 1;
                minute = minute % 60;
            }
            const entrys = filter("entry", year, month, day, hour, minute);
            const numberEvents = entrys.length - exits.length;
            newFirstGeneralData.push({ x: i, y: numberEvents });
            newRows.push({ period: label, quantity: numberEvents });
            
            total = entrys.length;
            newSecondGeneralData.push({ x: i, y: total });

            if (numberEvents > newFirstMaxY) newFirstMaxY = numberEvents;

            var j = 0;
            var storeTotal = 0;
            state.storesData.map((store) => {
                const storeExits = exits.filter(el => (el.storeNumber === store.storeNumber));
                const storeEntrys = entrys.filter(el => (el.storeNumber === store.storeNumber));
                const numberStoreEvents = storeEntrys.length - storeExits.length;
                newFirstPerStoreData[j].push({ x: i, y: numberStoreEvents });
                storeTotal += storeEntrys.length;
                newSecondPerStoreData[j].push({ x: i, y: storeTotal });
                newRowsPerStore[j].push({ period: label, quantity: numberStoreEvents });
                j++;
            });
        }

        setState({...state, firstGeneralData: newFirstGeneralData, secondGeneralData: newSecondGeneralData, firstPerStoreData: newFirstPerStoreData, secondPerStoreData: newSecondPerStoreData, labels: newLabels, firstMaxY: newFirstMaxY + 1, secondMaxY: total + 1, rows: newRows, selectedRows: newRows});
    }

    const filterHoursData = () => {
        const initialData = new Date(state.minDate.getFullYear(), state.minDate.getMonth(), state.minDate.getDate(), state.minDate.getHours(), 0, 0, 0);
        const finalData = new Date(state.maxDate.getFullYear(), state.maxDate.getMonth(), state.maxDate.getDate(), state.maxDate.getHours(), 1, 0, 0);

        const periods = Math.ceil((finalData - initialData) / 3600000);

        var newFirstGeneralData = [];
        var newFirstPerStoreData = [];
        var newSecondGeneralData = [];
        var newSecondPerStoreData = [];
        var newLabels = [];
        var newFirstMaxY = 0;
        var total = 0;
        var newRows = [];
        var newRowsPerStore = [];

        state.storesData.map(() => {
            newFirstPerStoreData.push([]);
            newSecondPerStoreData.push([]);
            newRowsPerStore.push([]);
        });
        
        const filter = (value, year, month, day, hour) => {
            return state.events.filter(el => (el.eventType === value && el.createdAt.getFullYear() === year &&
                                              el.createdAt.getMonth() === month && el.createdAt.getDate() === day && el.createdAt.getHours() < hour));
        }

        for (var i = 0; i < periods; i++) {
            var year = state.minDate.getFullYear();
            var month = state.minDate.getMonth();
            var day = state.minDate.getDate();
            var hour = state.minDate.getHours() + i;
            var date = new Date(year, month, day, hour, 0, 0, 0);
            year = date.getFullYear();
            month = date.getMonth();
            day = date.getDate();
            hour = date.getHours();

            const exits = filter("exit", year, month, day, hour);
            const entrys = filter("entry", year, month, day, hour + 1);
            const numberEvents = entrys.length - exits.length;
            newFirstGeneralData.push({ x: i, y: numberEvents });
            var hourString = hour.toString();
            if (hour < 10)
                hourString = "0" + hourString;
            const label = hourString + ":00";
            newLabels.push(label);
            newRows.push({ period: label, quantity: numberEvents });

            total = entrys.length;
            newSecondGeneralData.push({ x: i, y: total });

            if (numberEvents > newFirstMaxY) newFirstMaxY = numberEvents;

            var j = 0;
            var storeTotal = 0;
            state.storesData.map((store) => {
                const storeExits = exits.filter(el => (el.storeNumber === store.storeNumber));
                const storeEntrys = entrys.filter(el => (el.storeNumber === store.storeNumber));
                const numberStoreEvents = storeEntrys.length - storeExits.length;
                newFirstPerStoreData[j].push({ x: i, y: numberStoreEvents });
                storeTotal += storeEntrys.length;
                newSecondPerStoreData[j].push({ x: i, y: storeTotal});
                newRowsPerStore[j].push({ period: label, quantity: numberStoreEvents });
                j++;
            });
        }

        setState({...state, firstGeneralData: newFirstGeneralData, secondGeneralData: newSecondGeneralData, firstPerStoreData: newFirstPerStoreData, secondPerStoreData: newSecondPerStoreData, labels: newLabels, firstMaxY: newFirstMaxY + 1, secondMaxY: total + 1, rows: newRows, rowsPerStore: newRowsPerStore, selectedRows: newRows});
    }

    const filterDaysData = () => {
        const initialData = new Date(state.minDate.getFullYear(), state.minDate.getMonth(), state.minDate.getDate(), 0, 0, 0, 0);
        const finalData = new Date(state.maxDate.getFullYear(), state.maxDate.getMonth(), state.maxDate.getDate(), 1, 0, 0, 0);

        const periods = Math.ceil((finalData - initialData) / 86400000);

        var newFirstGeneralData = [];
        var newFirstPerStoreData = [];
        var newSecondGeneralData = [];
        var newSecondPerStoreData = [];
        var newLabels = [];
        var newFirstMaxY = 0;
        var total = 0;
        var newRows = [];
        var newRowsPerStore = [];

        state.storesData.map(() => {
            newFirstPerStoreData.push([]);
            newSecondPerStoreData.push([]);
            newRowsPerStore.push([]);
        });

        const filter = (year, month, day) => {
            return state.events.filter(el => (el.eventType === "entry" && el.createdAt.getFullYear() === year && el.createdAt.getMonth() === month && el.createdAt.getDate() === day));
        }

        for (var i = 0; i < periods; i++) {
            var year = state.minDate.getFullYear();
            var month = state.minDate.getMonth();
            var day = state.minDate.getDate() + i;
            var date = new Date(year, month, day);
            year = date.getFullYear();
            month = date.getMonth();
            day = date.getDate();

            const newEvents = filter(year, month, day);
            const numberEvents = newEvents.length;
            newFirstGeneralData.push({ x: i, y: numberEvents });
            var dayString = day.toString();
            if (day < 10)
                dayString = "0" + dayString;
            const label = dayString + " de " + monthName[month];
            newLabels.push(label);
            newRows.push({ period: label, quantity: numberEvents });
            
            total += numberEvents;
            newSecondGeneralData.push({ x: i, y: total });

            if (numberEvents > newFirstMaxY) newFirstMaxY = numberEvents;

            var j = 0;
            state.storesData.map((store) => {
                const newStoreEvents = newEvents.filter(el => (el.storeNumber === store.storeNumber));
                const numberStoreEvents = newStoreEvents.length;
                newFirstPerStoreData[j].push({ x: i, y: numberStoreEvents });
                newRowsPerStore[j].push({ period: label, quantity: numberStoreEvents });
                j++;
            });
        }

        var i = 0;
        state.storesData.map(() => {
            var newTotal = 0;
            newFirstPerStoreData[i].map((data) => {
                newTotal += data.y;
                newSecondPerStoreData[i].push({ x: data.x, y: newTotal });
            });
            i++;
        })

        setState({...state, firstGeneralData: newFirstGeneralData, secondGeneralData: newSecondGeneralData, firstPerStoreData: newFirstPerStoreData, secondPerStoreData: newSecondPerStoreData, labels: newLabels, firstMaxY: newFirstMaxY + 1, secondMaxY: total + 1, rows: newRows, rowsPerStore: newRowsPerStore, selectedRows: newRows});
    }

    const filterMonthsData = () => {
        const periods = (state.maxDate.getFullYear() - state.minDate.getFullYear()) * 12 + (state.maxDate.getMonth() - state.minDate.getMonth()) + 1;

        var newFirstGeneralData = [];
        var newFirstPerStoreData = [];
        var newSecondGeneralData = [];
        var newSecondPerStoreData = [];
        var newLabels = [];
        var newFirstMaxY = 0;
        var total = 0;
        var newRows = [];
        var newRowsPerStore = [];

        state.storesData.map(() => {
            newFirstPerStoreData.push([]);
            newSecondPerStoreData.push([]);
            newRowsPerStore.push([]);
        });

        const filter = (year, month) => {
            return state.events.filter(el => (el.eventType === "entry" && el.createdAt.getFullYear() === year && el.createdAt.getMonth() === month));
        }

        const filterStore = (year, month, storeNumber) => {
            return filter(year, month).filter(el => (el.storeNumber === storeNumber));
        }

        for (var i = 0; i < periods; i++) {
            var year = state.minDate.getFullYear();
            var month = state.minDate.getMonth() + i;
            if (month >= 12) {
                year += Math.floor(month / 12);
                month = month % 12;
            }

            const newEvents = filter(year, month);
            const numberEvents = newEvents.length;
            newFirstGeneralData.push({ x: i, y: numberEvents });
            const label = monthName[month] + " de " + year.toString();
            newLabels.push(label);
            newRows.push({ period: label, quantity: numberEvents });

            total += numberEvents;
            newSecondGeneralData.push({ x: i, y: total });

            if (numberEvents > newFirstMaxY) newFirstMaxY = numberEvents;

            var j = 0;
            state.storesData.map((store) => {
                const newStoreEvents = filterStore(year, month, store.storeNumber);
                const numberStoreEvents = newStoreEvents.length;
                newFirstPerStoreData[j].push({ x: i, y: numberStoreEvents });
                newRowsPerStore[j].push({ period: label, quantity: numberStoreEvents });
                j++;
            });
        }

        var i = 0;
        state.storesData.map(() => {
            var newTotal = 0;
            newFirstPerStoreData[i].map((data) => {
                newTotal += data.y;
                newSecondPerStoreData[i].push({ x: data.x, y: newTotal });
            });
            i++;
        })

        setState({...state, firstGeneralData: newFirstGeneralData, secondGeneralData: newSecondGeneralData, firstPerStoreData: newFirstPerStoreData, secondPerStoreData: newSecondPerStoreData, labels: newLabels, firstMaxY: newFirstMaxY + 1, secondMaxY: total + 1, rows: newRows, rowsPerStore: newRowsPerStore, selectedRows: newRows});
    }

    const columns = [
        { id: 'period', label: 'Período', minWidth: 200, align: 'center'},
        { id: 'quantity', label: 'Quantidade de clientes', minWidth: 200, align: 'center'}
    ];

    const createSortHandler = (property) => (event) => {
        const isAsc = state.orderBy === property && state.order === 'asc';
        setState({...state, order: (isAsc ? 'desc' : 'asc'), orderBy: property});
    }

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) 
            return -1;
        if (b[orderBy] > a[orderBy])
            return 1;
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    function handleTableStore(e) {
        if (e.target.value === 'all')
            setState({...state, selectedRows: state.rows});
        else
            setState({...state, selectedRows: state.rowsPerStore[parseInt(e.target.value)]});
    }

    return (
        <>
        <Text><span>Selecionar período de visualização:</span></Text>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker 
                variant="inline" ampm={false}
                label="Limite inferior"
                value={state.minDate} format="dd/MM/yyyy HH:mm"
                onChange={handleMinDate} disableFuture
            />
            <KeyboardDateTimePicker 
                variant="inline" ampm={false}
                label="Limite superior"
                value={state.maxDate} format="dd/MM/yyyy HH:mm"
                onChange={handleMaxDate} disableFuture minDate={state.minDate}
            />
        </MuiPickersUtilsProvider>
        
        <Button className="updateStatistics" onClick={handleUpdate}>Atualizar</Button>

        <Section>
            <TextSection><span>Gráficos</span></TextSection>
            <button onClick={() => {setState({...state, graphsExplanation: !state.graphsExplanation})}}>?</button>
        </Section>

        {state.graphsExplanation ?
        
        <><SubText>O primeiro gráfico mostra a quantidade de clientes em cada período de tempo, enquanto o segundo mostra o acumulado dessa quantidade ao longo do tempo. Ambos os gráficos são mostrados tanto para a empresa como um todo quanto com a divisão de dados por loja.</SubText>
        <SubText>O tamanho dos períodos é calculado automaticamente a partir do intervalo de visualização definido. Para intervalos de até 2 horas, os períodos são de 10 minutos; para até 1 dia, são de 1 hora. Nesses casos, o primeiro gráfico mostra a quantidade de clientes dentro da loja em cada momento. Para intervalos de até 2 meses, os períodos são de 1 dia; para intervalos maiores, são de 1 mês. Nesses casos, o primeiro gráfico mostra a quantidade de clientes que passaram pela loja no período.</SubText></>
    
        : <></>}

        <AllGraphSection>
            <GraphSection>
                <Text>Quantidade geral de clientes por período</Text>
                <XYPlot
                    width={550} height={400} margin={{ left: 80, bottom: 100 }}
                    yDomain={[0, state.firstMaxY]}
                >
                    <XAxis 
                        title={'Período'} on0={true}
                        tickTotal={state.firstGeneralData.length} tickLabelAngle={-45}
                        tickFormat={v => state.labels[v]}
                        style={{ text: { stroke: 'none', fill: '#555555', fontWeight: 200 },
                                    line: { stroke: '#aaaaaa' } }}
                    />
                    <YAxis 
                        title={'Clientes'} on0={true}
                        style={{ text: { stroke: 'none', fill: '#555555', fontWeight: 200 },
                                    line: { stroke: '#aaaaaa' }}}
                    />
                    <LineMarkSeries 
                        className="series" data={state.firstGeneralData} 
                        style={{ strokeWidth: '3px' }} size={2}
                        lineStyle={{ stroke: '#000066' }} markStyle={{ stroke: '#009999' }}
                        onValueMouseOver={d => setState({...state, overFirstGeneralGraph: d})}
                        onValueMouseOut={d => setState({...state, overFirstGeneralGraph: false})}
                    />
                    {state.overFirstGeneralGraph && 
                    <Hint value={state.overFirstGeneralGraph}>
                        <HintDiv>
                            <p><span>Período:</span> {state.labels[state.overFirstGeneralGraph.x]}</p>
                            <p><span>Total de clientes:</span> {state.overFirstGeneralGraph.y}</p>
                        </HintDiv>
                    </Hint>}
                </XYPlot>
            </GraphSection>

            <GraphSection>
                <Text>Quantidade geral acumulada de clientes</Text>
                <XYPlot 
                    width={550} height={400} margin={{ left: 80, bottom: 100 }}
                    yDomain={[0, state.secondMaxY]}
                >
                    <XAxis 
                        title={'Período'} on0={true}
                        tickTotal={state.secondGeneralData.length} tickLabelAngle={-45}
                        tickFormat={v => state.labels[v]}
                        style={{ text: { stroke: 'none', fill: '#555555', fontWeight: 200 },
                                    line: { stroke: '#aaaaaa' } }}
                    />
                    <YAxis 
                        title={'Clientes'} on0={true}
                        style={{ text: { stroke: 'none', fill: '#555555', fontWeight: 200 },
                                    line: { stroke: '#aaaaaa' }}}
                    />
                    <LineMarkSeries 
                        className="series" data={state.secondGeneralData} 
                        style={{ strokeWidth: '3px' }} size={2}
                        lineStyle={{ stroke: '#000066' }} markStyle={{ stroke: '#009999' }}
                        onValueMouseOver={d => setState({...state, overSecondGeneralGraph: d})}
                        onValueMouseOut={d => setState({...state, overSecondGeneralGraph: false})}
                    />
                    {state.overSecondGeneralGraph && 
                    <Hint value={state.overSecondGeneralGraph}>
                        <HintDiv>
                            <p><span>Período:</span> {state.labels[state.overSecondGeneralGraph.x]}</p>
                            <p><span>Total de clientes acumulado:</span> {state.overSecondGeneralGraph.y}</p>
                        </HintDiv>
                    </Hint>}
                </XYPlot>
            </GraphSection>
        </AllGraphSection>

        <AllGraphSection>
        <GraphSection>
                <Text>Quantidade de clientes por período por loja</Text>
                <XYPlot
                    width={550} height={400} margin={{ left: 80, bottom: 100 }}
                >
                    <XAxis 
                        title={'Período'}
                        tickTotal={state.firstPerStoreData[0].length} tickLabelAngle={-45}
                        tickFormat={v => state.labels[v]}
                        style={{ text: { stroke: 'none', fill: '#555555', fontWeight: 200 },
                                    line: { stroke: '#aaaaaa' } }}
                    />
                    <YAxis 
                        title={'Clientes'} on0={true}
                        tickFormat={val => Math.round(val) === val ? val : ""}
                        style={{ text: { stroke: 'none', fill: '#555555', fontWeight: 200 },
                                    line: { stroke: '#aaaaaa' }}}
                    />
                    {state.storesData.map((store) => (
                        <LineMarkSeries 
                            key={store.storeNumber} className={"series-" + store.storeNumber}
                            data={state.firstPerStoreData[store.index]}
                            style={{ strokeWidth: '3px' }} size={2}
                            lineStyle={{ stroke: lineColors[store.index] }} markStyle={{ stroke: '#0099999' }}
                            onValueMouseOver={d => setState({...state, overFirstPerStoreGraph: d})}
                            onValueMouseOut={d => setState({...state, overFirstPerStoreGraph: false})}
                        />
                    ))}
                    {state.overFirstPerStoreGraph && 
                    <Hint value={state.overFirstPerStoreGraph}>
                        <HintDiv>
                            <p><span>Período:</span> {state.labels[state.overFirstPerStoreGraph.x]}</p>
                            <p><span>Total de clientes:</span> {state.overFirstPerStoreGraph.y}</p>
                        </HintDiv>
                    </Hint>}
                </XYPlot>
                <DiscreteColorLegend width={550} items={legendItems}/>
            </GraphSection>

            <GraphSection>
                <Text>Quantidade acumulada de clientes por loja</Text>
                <XYPlot 
                    width={550} height={400} margin={{ left: 80, bottom: 100 }}
                >
                    <XAxis 
                        title={'Período'}
                        tickTotal={state.firstPerStoreData[0].length} tickLabelAngle={-45}
                        tickFormat={v => state.labels[v]}
                        style={{ text: { stroke: 'none', fill: '#555555', fontWeight: 200 },
                                    line: { stroke: '#aaaaaa' } }}
                    />
                    <YAxis 
                        title={'Clientes'} on0={true}
                        tickFormat={val => Math.round(val) === val ? val : ""}
                        style={{ text: { stroke: 'none', fill: '#555555', fontWeight: 200 },
                                    line: { stroke: '#aaaaaa' }}}
                    />
                    {state.storesData.map((store) => (
                        <LineMarkSeries 
                            key={store.storeNumber} className={"series-" + store.storeNumber}
                            data={state.secondPerStoreData[store.index]}
                            style={{ strokeWidth: '3px' }} size={2}
                            lineStyle={{ stroke: lineColors[store.index] }} markStyle={{ stroke: '#0099999' }}
                            onValueMouseOver={d => setState({...state, overSecondPerStoreGraph: d})}
                            onValueMouseOut={d => setState({...state, overSecondPerStoreGraph: false})}
                        />
                    ))}
                    {state.overSecondPerStoreGraph && 
                    <Hint value={state.overSecondPerStoreGraph}>
                        <HintDiv>
                            <p><span>Período:</span> {state.labels[state.overSecondPerStoreGraph.x]}</p>
                            <p><span>Total de clientes acumulado:</span> {state.overSecondPerStoreGraph.y}</p>
                        </HintDiv>
                    </Hint>}
                </XYPlot>
                <DiscreteColorLegend width={550} items={legendItems}/>            
            </GraphSection>
        </AllGraphSection>

        <Section>
            <TextSection><span>Tabela</span></TextSection>
            <button onClick={() => {setState({...state, tablesExplanation: !state.tablesExplanation})}}>?</button>
        </Section>

        {state.tablesExplanation ?
        
        <SubText>A tabela exibe os mesmos dados que o gráfico, permitindo ordenar os dados no tempo e, principalmente, em relação à quantidade de clientes em cada período. Escolha se quer visualizar os dados gerais ou de uma loja específica.</SubText>
    
        : <></>}

        <Section>
            <TextSection>Selecionar loja:</TextSection>
            <select id="selectTableStore" onChange={handleTableStore}>
                <option value='all'>Todas</option>
                {state.storesData.map((store) => (
                    <option key={store.storeNumber} value={store.index}>{store.storeName}</option>
                ))}
            </select>
        </Section>

        <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <MainHeaderTableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                                sortDirection={state.orderBy === column.id ? state.order : false}
                            >
                                <TableSortLabel
                                    active={state.orderBy === column.id}
                                    direction={state.orderBy === column.id ? state.order : 'asc'}
                                    onClick={createSortHandler(column.id)}
                                >
                                    {column.label}
                                    {state.orderBy === column.id ? (
                                        <span className={classes.visuallyHidden}>
                                            {state.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </span>
                                    ) : null}
                                </TableSortLabel>
                            </MainHeaderTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stableSort(state.selectedRows, getComparator(state.order, state.orderBy)).slice(state.page * state.rowsPerPage, (state.page + 1) * state.rowsPerPage).map((row) => (
                        <TableRow className={classes.root}>
                            {columns.map((column) => (
                                <BodyTableCell align={column.align}>{row[column.id]}</BodyTableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <StyledTablePagination 
            rowsPerPageOptions={[10, 25, 50, 100]}
            labelRowsPerPage="Períodos por página:"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
            component="div"
            count={state.selectedRows.length}
            rowsPerPage={state.rowsPerPage}
            page={state.page}
            onChangePage={(e, newPage) => {setState({...state, page: newPage})}}
            onChangeRowsPerPage={e => {setState({...state, rowsPerPage: e.target.value, page: 0})}}
        />
        </>
    );
}

export default Statistics;