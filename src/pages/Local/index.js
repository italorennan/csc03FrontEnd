import React, { useState } from 'react';
import LocalContext from './context';
import { Container, PageButtonSet, PageButton } from './styles';
import Home from '../../sections/Local/Home';
import Statistics from '../../sections/Local/Statistics';
import InputData from '../../sections/Local/InputData';

function Local() {
    const [actualSection, setActualSection] = useState(1);
    const [store, setStore] = useState("Loja Fortaleza");

    const sections = [
        <Home store={store}/>,
        <Statistics />,
        <InputData />
    ];

    return (
        <LocalContext.Provider value ={{ actualSection }}>
            <Container>
                <h1>{store} - Fluxo de clientes</h1>
                <PageButtonSet>
                    <PageButton className="home" onClick={() => {setActualSection(0)}} thispage={actualSection === 0 ? "true" : "false"}>Início</PageButton>
                    <PageButton className="home" onClick={() => {setActualSection(1)}} thispage={actualSection === 1 ? "true" : "false"}>Estatísticas</PageButton>
                    <PageButton className="home" onClick={() => {setActualSection(2)}} thispage={actualSection === 2 ? "true" : "false"}>Dados</PageButton>
                </PageButtonSet>
                {sections[actualSection]}
            </Container>
        </LocalContext.Provider>
    );
}

export default Local;