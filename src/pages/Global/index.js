import React, { useState } from 'react';
import GlobalContext from './context';
import { Container, PageButtonSet, PageButton } from './styles';
import Login from '../../sections/Global/Login';
import Home from '../../sections/Global/Home';
import Statistics from '../../sections/Global/Statistics';
import InputData from '../../sections/Global/InputData';

function Global() {
    const [actualSection, setActualSection] = useState(0);
    const [loginData, setLoginData] = useState({logged: false, errors: ''});
    
    const sections = [
        <Login />,
        <Home />,
        <Statistics />,
        <InputData />
    ];

    function handleAccess() {
        setActualSection(1);
    }

    return (
        <GlobalContext.Provider value={{ actualSection, loginData, setLoginData, handleAccess }}>
            <Container>
                {actualSection !== 0 ?
                <><h1>Lojas Brasil - Fluxo de clientes</h1>
                <PageButtonSet>
                    <PageButton className="home" onClick={() => {setActualSection(1)}} thispage={actualSection === 1 ? "true" : "false"}>Início</PageButton>
                    <PageButton className="home" onClick={() => {setActualSection(2)}} thispage={actualSection === 2 ? "true" : "false"}>Estatísticas</PageButton>
                    <PageButton className="home" onClick={() => {setActualSection(3)}} thispage={actualSection === 3 ? "true" : "false"}>Dados</PageButton>
                </PageButtonSet>
                </> :
                <></>}
                {sections[actualSection]}
            </Container>
        </GlobalContext.Provider>
    );
}

export default Global;