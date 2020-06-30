import styled from 'styled-components';

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

    select {
        font-family: Montserrat;
        background-color: white;
        color: ${standardGray};
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