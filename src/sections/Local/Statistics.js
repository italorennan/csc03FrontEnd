import React, { useState, useEffect, useContext } from 'react';
import { Section, Text, SubText, TextSection, Button, AllGraphSection, GraphSection, HintDiv, MainHeaderTableCell, BodyTableCell, StyledTablePagination } from '../../pages/Local/styles';
import { XYPlot, LineMarkSeries, XAxis, YAxis, Hint } from 'react-vis';
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
import LocalContext from '../../pages/Local/context';
import api from '../../services/api';

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
    const { storeData } = useContext(LocalContext);
    const [state, setState] = useState({minDate: new Date((new Date(Date.now())).getFullYear(), (new Date(Date.now())).getMonth(), (new Date(Date.now())).getDate(), 0, 0, 0, 0),
                                        maxDate: new Date((new Date(Date.now())).getFullYear(), (new Date(Date.now())).getMonth(), (new Date(Date.now())).getDate(), 23, 59, 59, 999),
                                        clicked: false,
                                        timeScale: "hours",
                                        events: [],
                                        firstData: [],
                                        secondData: [],
                                        labels: [],
                                        firstMaxY: 0,
                                        secondMaxY: 0,
                                        overFirstGraph: false,
                                        overSecondGraph: false,
                                        graphsExplanation: false,
                                        tablesExplanation: false,
                                        page: 0,
                                        rowsPerPage: 10,
                                        rows: [],
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

    async function getData(minDate, maxDate) {
        const eventsData = await api.get(`/event/getQueryData?storeNumber=${storeData.storeNumber}&startDate=${minDate.toISOString()}&finishDate=${maxDate.toISOString()}`);
        const newEvents = eventsData.data.eventList;
        newEvents.map((event) => {
            event.createdAt = new Date(Date.parse(event.createdAt));
        });

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

        var newFirstData = [];
        var newSecondData = [];
        var newLabels = [];
        var newFirstMaxY = 0;
        var total = 0;
        var newRows = [];

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
            newFirstData.push({ x: i, y: numberEvents });
            newRows.push({ period: label, quantity: numberEvents });
            
            total = entrys.length;
            newSecondData.push({ x: i, y: total });

            if (numberEvents > newFirstMaxY) newFirstMaxY = numberEvents;
        }

        setState({...state, firstData: newFirstData, secondData: newSecondData, labels: newLabels, firstMaxY: newFirstMaxY + 1, secondMaxY: total + 1, rows: newRows});
    }

    const filterHoursData = () => {
        const initialData = new Date(state.minDate.getFullYear(), state.minDate.getMonth(), state.minDate.getDate(), state.minDate.getHours(), 0, 0, 0);
        const finalData = new Date(state.maxDate.getFullYear(), state.maxDate.getMonth(), state.maxDate.getDate(), state.maxDate.getHours(), 1, 0, 0);

        const periods = Math.ceil((finalData - initialData) / 3600000);

        var newFirstData = [];
        var newSecondData = [];
        var newLabels = [];
        var newFirstMaxY = 0;
        var total = 0;
        var newRows = [];
        
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
            newFirstData.push({ x: i, y: numberEvents });
            var hourString = hour.toString();
            if (hour < 10)
                hourString = "0" + hourString;
            const label = hourString + ":00";
            newLabels.push(label);
            newRows.push({ period: label, quantity: numberEvents });

            total = entrys.length;
            newSecondData.push({ x: i, y: total });

            if (numberEvents > newFirstMaxY) newFirstMaxY = numberEvents;
        }

        setState({...state, firstData: newFirstData, secondData: newSecondData, labels: newLabels, firstMaxY: newFirstMaxY + 1, secondMaxY: total + 1, rows: newRows});
    }

    const filterDaysData = () => {
        const initialData = new Date(state.minDate.getFullYear(), state.minDate.getMonth(), state.minDate.getDate(), 0, 0, 0, 0);
        const finalData = new Date(state.maxDate.getFullYear(), state.maxDate.getMonth(), state.maxDate.getDate(), 1, 0, 0, 0);

        const periods = Math.ceil((finalData - initialData) / 86400000);

        var newFirstData = [];
        var newSecondData = [];
        var newLabels = [];
        var newFirstMaxY = 0;
        var total = 0;
        var newRows = [];

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
            newFirstData.push({ x: i, y: numberEvents });
            var dayString = day.toString();
            if (day < 10)
                dayString = "0" + dayString;
            const label = dayString + " de " + monthName[month];
            newLabels.push(label);
            newRows.push({ period: label, quantity: numberEvents });
            
            total += numberEvents;
            newSecondData.push({ x: i, y: total });

            if (numberEvents > newFirstMaxY) newFirstMaxY = numberEvents;
        }

        setState({...state, firstData: newFirstData, secondData: newSecondData, labels: newLabels, firstMaxY: newFirstMaxY + 1, secondMaxY: total + 1, rows: newRows});
    }

    const filterMonthsData = () => {
        const periods = (state.maxDate.getFullYear() - state.minDate.getFullYear()) * 12 + (state.maxDate.getMonth() - state.minDate.getMonth()) + 1;

        var newFirstData = [];
        var newSecondData = [];
        var newLabels = [];
        var newFirstMaxY = 0;
        var total = 0;
        var newRows = [];

        const filter = (year, month) => {
            return state.events.filter(el => (el.eventType === "entry" && el.createdAt.getFullYear() === year && el.createdAt.getMonth() === month));
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
            newFirstData.push({ x: i, y: numberEvents });
            const label = monthName[month] + " de " + year.toString();
            newLabels.push(label);
            newRows.push({ period: label, quantity: numberEvents });

            total += numberEvents;
            newSecondData.push({ x: i, y: total });

            if (numberEvents > newFirstMaxY) newFirstMaxY = numberEvents;
        }

        setState({...state, firstData: newFirstData, secondData: newSecondData, labels: newLabels, firstMaxY: newFirstMaxY + 1, secondMaxY: total + 1, rows: newRows});
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
        
        <><SubText>O primeiro gráfico mostra a quantidade de clientes em cada período de tempo, enquanto o segundo mostra o acumulado dessa quantidade ao longo do tempo.</SubText>
        <SubText>O tamanho dos períodos é calculado automaticamente a partir do intervalo de visualização definido. Para intervalos de até 2 horas, os períodos são de 10 minutos; para até 1 dia, são de 1 hora. Nesses casos, o primeiro gráfico mostra a quantidade de clientes dentro da loja em cada momento. Para intervalos de até 2 meses, os períodos são de 1 dia; para intervalos maiores, são de 1 mês. Nesses casos, o primeiro gráfico mostra a quantidade de clientes que passaram pela loja no período.</SubText></>
    
        : <></>}

        <AllGraphSection>
            <GraphSection>
                <Text>Quantidade de clientes por período</Text>
                <XYPlot
                    width={550} height={400} margin={{ left: 80, bottom: 100 }}
                    yDomain={[0, state.firstMaxY]}
                >
                    <XAxis 
                        title={'Período'} on0={true}
                        tickTotal={state.firstData.length} tickLabelAngle={-45}
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
                        className="series" data={state.firstData} 
                        style={{ strokeWidth: '3px' }} size={2}
                        lineStyle={{ stroke: '#000066' }} markStyle={{ stroke: '#009999' }}
                        onValueMouseOver={d => setState({...state, overFirstGraph: d})}
                        onValueMouseOut={d => setState({...state, overFirstGraph: false})}
                    />
                    {state.overFirstGraph && 
                    <Hint value={state.overFirstGraph}>
                        <HintDiv>
                            <p><span>Período:</span> {state.labels[state.overFirstGraph.x]}</p>
                            <p><span>Total de clientes:</span> {state.overFirstGraph.y}</p>
                        </HintDiv>
                    </Hint>}
                </XYPlot>
            </GraphSection>

            <GraphSection>
                <Text>Quantidade acumulada de clientes</Text>
                <XYPlot 
                    width={550} height={400} margin={{ left: 80, bottom: 100 }}
                    yDomain={[0, state.secondMaxY]}
                >
                    <XAxis 
                        title={'Período'} on0={true}
                        tickTotal={state.secondData.length} tickLabelAngle={-45}
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
                        className="series" data={state.secondData} 
                        style={{ strokeWidth: '3px' }} size={2}
                        lineStyle={{ stroke: '#000066' }} markStyle={{ stroke: '#009999' }}
                        onValueMouseOver={d => setState({...state, overSecondGraph: d})}
                        onValueMouseOut={d => setState({...state, overSecondGraph: false})}
                    />
                    {state.overSecondGraph && 
                    <Hint value={state.overSecondGraph}>
                        <HintDiv>
                            <p><span>Período:</span> {state.labels[state.overSecondGraph.x]}</p>
                            <p><span>Total de clientes acumulado:</span> {state.overSecondGraph.y}</p>
                        </HintDiv>
                    </Hint>}
                </XYPlot>
            </GraphSection>
        </AllGraphSection>

        <Section>
            <TextSection><span>Tabela</span></TextSection>
            <button onClick={() => {setState({...state, tablesExplanation: !state.tablesExplanation})}}>?</button>
        </Section>

        {state.tablesExplanation ?
        
        <SubText>A tabela exibe os mesmos dados que o gráfico, permitindo ordenar os dados no tempo e, principalmente, em relação à quantidade de clientes em cada período.</SubText>
    
        : <></>}

        <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <MainHeaderTableCell />
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
                    {stableSort(state.rows, getComparator(state.order, state.orderBy)).slice(state.page * state.rowsPerPage, (state.page + 1) * state.rowsPerPage).map((row) => (
                        <TableRow className={classes.root}>
                            <BodyTableCell />
                            {columns.map((column) => (
                                <BodyTableCell key={column.label} align={column.align}>{row[column.id]}</BodyTableCell>
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
            count={state.rows.length}
            rowsPerPage={state.rowsPerPage}
            page={state.page}
            onChangePage={(e, newPage) => {setState({...state, page: newPage})}}
            onChangeRowsPerPage={e => {setState({...state, rowsPerPage: e.target.value, page: 0})}}
        />
        </>
    );
}

export default Statistics;