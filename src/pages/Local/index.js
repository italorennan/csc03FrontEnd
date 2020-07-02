import React, { useState } from 'react';
import LocalContext from './context';
import { Container, PageButtonSet, PageButton, Button } from './styles';
import Login from '../../sections/Local/Login';
import Home from '../../sections/Local/Home';
import Statistics from '../../sections/Local/Statistics';
import InputData from '../../sections/Local/InputData';
import api from '../../services/api';

function Local() {
    const [actualSection, setActualSection] = useState(0);
    const [loginData, setLoginData] = useState({logged: false, errors: ''});
    const [storeData, setStoreData] = useState({});

    const sections = [
        <Login />,
        <Home />,
        <Statistics />,
        <InputData />
    ];

    async function handleAccess() {
        setActualSection(1);
    }

    return (
        <LocalContext.Provider value={{ actualSection, loginData, setLoginData, handleAccess, storeData, setStoreData }}>
            <Container>
                {actualSection !== 0 ?
                <><h1>{storeData.storeName} - Fluxo de clientes</h1>
                <PageButtonSet>
                    <PageButton className="home" onClick={() => {setActualSection(1)}} thispage={actualSection === 1 ? "true" : "false"}>Início</PageButton>
                    <PageButton className="home" onClick={() => {setActualSection(2)}} thispage={actualSection === 2 ? "true" : "false"}>Estatísticas</PageButton>
                    <PageButton className="home" onClick={() => {setActualSection(3)}} thispage={actualSection === 3 ? "true" : "false"}>Dados</PageButton>
                </PageButtonSet>
                </> :
                <></>}
                {sections[actualSection]}
                {actualSection !== 0 ?
                <Button onClick={() => {setActualSection(0)}}>Sair</Button>
                : <></>}
            </Container>
        </LocalContext.Provider>
    );
}

export default Local;