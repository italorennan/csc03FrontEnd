import React, { useState } from 'react';
import { Section, TextSection, Button, LoginContainer } from '../../pages/Global/styles';

function InputData() {
    // Puxar do DB
    const store1 = {
        storeName: "Loja Fortaleza",
        storeNumber: 8001,
        accessCode: "temp"
    };
    const store2 = {
        storeName: "Loja São Paulo",
        storeNumber: 8002,
        accessCode: "temp"
    };
    const storesData = [store1, store2];

    const [state, setState] = useState({section: 0,
                                        storesData: storesData,
                                        updateStore: undefined,
                                        newName: '',
                                        newAccessCode: ''});

    // Salvar no DB
    function handleUpdate() {
        if (state.newName !== '' && state.newAccessCode !== '') {
            const newStore = {
                storeName: state.newName,
                storeNumber: state.updateStore.storeNumber,
                accessCode: state.newAccessCode
            };

            setState({...state, updateStore: undefined, newName: '', newAcessCode: '', section: 0});
        }
    }

    // Salvar no DB
    function handleCreate() {
        if (state.newName !== '' && state.newAccessCode !== '') {
            const newStore = {
                storeName: state.newName,
                accessCode: state.newAccessCode,
                storeNumber: 8000 + state.storesData.length + 1
            };

            var storesData = state.storesData;
            storesData.push(newStore);
            setState({...state, storesData: storesData, newName: '', newAcessCode: '', section: 0});
        }
    }

    function mainData() {
        return (
            <>
            {state.storesData.map((store) => (
                <Section key={store.storeNumber}>
                    <TextSection><span>Loja {store.storeNumber}:</span></TextSection>
                    <TextSection>{store.storeName}</TextSection>
                    <Button className="updateStore" onClick={() => {setState({...state, updateStore: store, section: 1})}}>Atualizar</Button>
                </Section>
            ))}
            <Button className="createStore" onClick={() => {setState({...state, section: 2})}}>Nova loja</Button>
            </>
        );
    }

    function updateStore() {
        return (
            <LoginContainer>
                <h2>Atualizar dados</h2>
                <TextSection><span>Nome da loja</span></TextSection>
                <input required type="text" onChange={e => {setState({...state, newName: e.target.value})}} placeholder={state.updateStore.storeName}/>
                <TextSection><span>Código de acesso local</span></TextSection>
                <input required type="password" onChange={e => {setState({...state, newAccessCode: e.target.value})}}/>
                <Button className="saveStoreUpdate" onClick={handleUpdate}>Salvar</Button>
            </LoginContainer>
        );
    }

    function createStore() {
        return (
            <LoginContainer>
                <h2>Adicionar nova loja</h2>
                <TextSection><span>Nome da loja</span></TextSection>
                <input required type="text" onChange={e => {setState({...state, newName: e.target.value})}} />
                <TextSection><span>Código de acesso local</span></TextSection>
                <input required type="password" onChange={e => {setState({...state, newAccessCode: e.target.value})}} />
                <Button className="saveNewStore" onClick={handleCreate}>Salvar</Button>
            </LoginContainer>
        );
    }

    return (
        <>
        {state.section === 0 ? mainData()
        : (state.section === 1 ? updateStore()
        : createStore())}
        </>
    );
}

export default InputData;