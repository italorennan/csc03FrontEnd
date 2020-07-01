import styled from 'styled-components';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';

const standardGray = "#dcdcdc";
const standardDarkBlue = "#000066";
const standardLightBlue = "#009999";

export const Container = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
    
    width: 100%;
    height: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 5vw;
    background-color: ${standardGray};
    font-family: Montserrat;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    h1 {
        font-family: Montserrat;
        color: ${standardDarkBlue};
        margin-block-start: 0.5em;
        margin-block-end: 0.5em;
        font-size: 2em;
        font-weight: 900;
        text-align: center;
    }

    h2 {
        color: ${standardDarkBlue};
        margin-block-start: 0.5em;
        margin-block-end: 0.5em;
        font-size: 1.5em;
        font-weight: 800;
        text-align: center;
    }

    h3 {
        color: ${standardDarkBlue};
        margin-block-start: 0.5em;
        margin-block-end: 0.5em;
        font-size: 1.2em;
        font-weight: 500;
        text-align: center;
    }

    h4 {
        color: ${standardLightBlue};
        margin-block-start: 0.5em;
        margin-block-end: 0.5em;
        font-size: 1em;
        font-weight: 400;
        text-align: center;
    }

    select {
        font-family: Montserrat;
        background-color: white;
        color: #323232;
        margin-block-start: 0.5em;
        margin-block-end: 0.5em;
        padding: 0.5em;
        font-size: 1em;
    }

    input {
        color: #323232;
        margin-block-start: 0.5em;
        margin-block-end: 0.5em;
        padding: 0.5em;
        font-size: 1em;
    }
`;

export const Section = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-block-start: 0em;
    margin-block-end: 0em;
    align-items: center;

    button {
        background-color: #eeeeee ;
        color: ${standardDarkBlue};
        border: #999999;
        cursor: pointer;
        border-radius: 50%;
        font-size: 0.8em;
        margin-left: 0.1em;
        width: 1em;
        height: 1em;
    }
`;

export const AllGraphSection = styled(Section)`
    justify-content: space-around;
`;

export const GraphSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-block-start: 0em;
    margin-block-end: 0em;
    align-items: center;
`;

export const PageButtonSet = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-left: 0vw;
    margin-right: 0vw;
    margin-block-end: 0.5em;
    height: 2em;
`;

export const PageButton = styled.button`
    color: ${standardDarkBlue};
    font-size: 1em;
    flex-grow: 1;
    background-color: ${standardGray};
    font-weight: ${props => props.thispage === "true" ? 900 : 0};
    border-color: ${standardDarkBlue};
    cursor: pointer;
`;

export const Text = styled.div`
    color: ${standardLightBlue};
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
    font-size: 1em;
    text-align: justify;
    
    span {
        font-weight: 900;
    }

    a {
        font-weight: 900;
        color: ${standardDarkBlue};
    }
`;

export const TextSection = styled(Text)`
    margin-right: 0.5em;
`;

export const SubText = styled(Text)`
    font-size: 0.8em;
`;

export const Button = styled.button`
    cursor: ${props => props.checkDisabled ? "default" : "pointer"};
    border-color: white;
    border-radius: 0.5em;
    color: #555555;
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
    padding: 0em;
    font-size: 1em;
    width: ${props => props.fullWidth ? "100%" : "5em"};
    height: 2em;

    &:hover {
        background: white;
    }

    opacity: ${props => props.checkDisabled ? 0.6 : 1};
`;

export const HintDiv = styled.div`
    background-color: #555555;
    color: #dddddd;
    border: #777777;
    border-radius: 0.5em;
    padding: 0.2em;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    p {
        font-size: 0.8em;
    }

    span {
        font-weight: 900;
    }
`;

export const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5vw;
`;

export const ErrorLoginMessage = styled.div`
    color: red;
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
    font-size: 0.8em;
    text-align: justify;
`;

export const MainHeaderTableCell = styled(TableCell)`
    background-color: #989898 !important;
    font-family: Montserrat !important;
    font-weight: 900 !important;
`;

export const SubHeaderTableCell = styled(TableCell)`
    background-color: #f5f5f5 !important;
    font-family: Montserrat !important;
    font-weight: 900 !important;
`;

export const BodyTableCell = styled(TableCell)`
    background-color: #ededed !important;
    font-family: Montserrat !important;
`;

export const StyledTablePagination = styled(TablePagination)`
    .MuiTablePagination-toolbar {
        background-color: #989898 !important;
    }

    .MuiTablePagination-caption {
        font-family: Montserrat !important;
        color: black !important;
    }

    .MuiTablePagination-select {
        font-family: Montserrat !important;
        color: black !important;
    }
`;

export const Title = styled.div`
    font-family: Montserrat !important;
    font-size: 15px;
    font-weight: 900 !important;
    margin-block-end: 10px;
`;