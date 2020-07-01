import React, { useState } from 'react';
import LocalContext from './context';
import { Container, PageButtonSet, PageButton } from './styles';
import Login from '../../sections/Local/Login';
import Home from '../../sections/Local/Home';
import Statistics from '../../sections/Local/Statistics';
import InputData from '../../sections/Local/InputData';

function Local() {
    const [actualSection, setActualSection] = useState(0);
    const [loginData, setLoginData] = useState({logged: false, errors: ''});
    const [storeNumber, setStoreNumber] = useState(0);

    const [store, setStore] = useState("Loja Fortaleza");

    const sections = [
        <Login />,
        <Home store={store}/>,
        <Statistics />,
        <InputData />
    ];

    function handleAccess() {
        setActualSection(1);
    }

    return (
        <LocalContext.Provider value={{ actualSection, loginData, setLoginData, handleAccess, setStoreNumber }}>
            <Container>
                {actualSection !== 0 ?
                <><h1>{store} - Fluxo de clientes</h1>
                <PageButtonSet>
                    <PageButton className="home" onClick={() => {setActualSection(1)}} thispage={actualSection === 1 ? "true" : "false"}>Início</PageButton>
                    <PageButton className="home" onClick={() => {setActualSection(2)}} thispage={actualSection === 2 ? "true" : "false"}>Estatísticas</PageButton>
                    <PageButton className="home" onClick={() => {setActualSection(3)}} thispage={actualSection === 3 ? "true" : "false"}>Dados</PageButton>
                </PageButtonSet>
                </> :
                <></>}
                {sections[actualSection]}
            </Container>
        </LocalContext.Provider>
    );
}

export default Local;