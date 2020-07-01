import React, { useState, useContext } from 'react';
import { LoginContainer, Button, ErrorLoginMessage } from '../../pages/Global/styles';
import LoginContext from '../../pages/Global/context';

function Login() {
    const [state, setState] = useState({accessCode: "",
                                        loginError: false});
    const { handleAccess } = useContext(LoginContext);
    const globalCode = "CSC03";

    function handleLogin() {
        if (state.accessCode === globalCode) handleAccess();
        else setState({...state, loginError: true});
    }

    return (
        <LoginContainer>
            <h1>Fluxo de clientes</h1>
            <h2>Lojas Brasil</h2>
            <h3>Login global</h3>
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