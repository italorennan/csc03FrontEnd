import React, { useState, useContext } from 'react';
import GlobalContext from '../../pages/Global/context';
import { Section, TextSection, Button, LoginContainer } from '../../pages/Global/styles';
import api from '../../services/api';

function InputData() {
    const { storesData } = useContext(GlobalContext);

    const [state, setState] = useState({section: 0,
                                        storesData: storesData,
                                        updateStore: undefined,
                                        newName: '',
                                        newAccessCode: ''});

    // Salvar no DB
    async function handleUpdate() {
        if (state.newName !== '' && state.newAccessCode !== '') {
            const newStore = {
                storeName: state.newName,
                storeNumber: state.updateStore.storeNumber,
                accessCode: state.newAccessCode
            };

            await api.put('/store/update',
                JSON.stringify(newStore), { headers: { 'Content-Type': 'application/json' }}
            );

            var newStoresData = await api.get('/store/getAll');

            setState({...state, storesData: newStoresData.data.storeList, updateStore: undefined, newName: '', newAcessCode: '', section: 0});
        }
    }

    // Salvar no DB
    async function handleCreate() {
        if (state.newName !== '' && state.newAccessCode !== '') {
            const newStore = {
                storeName: state.newName,
                accessCode: state.newAccessCode
            };

            await api.post('/store/create',
                JSON.stringify(newStore), { headers: { 'Content-Type': 'application/json' }}
            );

            var newStoresData = await api.get('/store/getAll');

            setState({...state, storesData: newStoresData.data.storeList, newName: '', newAcessCode: '', section: 0});
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
            {console.log(state.storesData)}
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