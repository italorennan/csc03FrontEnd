import React, { useState, useContext } from 'react';
import { LoginContainer, Button, ErrorLoginMessage } from '../../pages/Local/styles';
import LoginContext from '../../pages/Local/context';
import api from '../../services/api';

function Login() {
    const [state, setState] = useState({storeNumber: 0,
                                        accessCode: "",
                                        loginError: false});
    const { handleAccess, setStoreData } = useContext(LoginContext);

    async function handleLogin() {
        const tryAccess = {
            storeNumber: state.storeNumber,
            accessCode: state.accessCode
        }

        var storeData = await api.post('/store/login',
            JSON.stringify(tryAccess), { headers: { 'Content-Type': 'application/json' }}
        );
        if (storeData.data.authorization === true) {
            setStoreData(storeData.data.store);
            handleAccess();
        }

        else setState({...state, loginError: true});
    }

    return (
        <LoginContainer>
            <h1>Fluxo de clientes</h1>
            <h2>Lojas Brasil</h2>
            <h3>Login</h3>
            <h4>Número da loja</h4>
            <input className="inputStore" type="number" onChange={e => setState({...state, storeNumber: e.target.value})}/>
            <h4>Código de acesso</h4>
            <input className="inputCode" type="password" onChange={e => setState({...state, accessCode: e.target.value})} />

            <Button className="enter" onClick={handleLogin}>Entrar</Button>
            {state.loginError ?
            <ErrorLoginMessage>Acesso inválido.</ErrorLoginMessage>
            : <></>}
        </LoginContainer>
    );
}

export default Login;