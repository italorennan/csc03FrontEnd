import React from 'react';
import { Text } from '../../pages/Local/styles';

function Home({ store }) {
    return (
        <>
        <Text>Bem-vindo ao sistema de fluxo de clientes da <span>{store}</span>!</Text>
        <Text>Descrição da navegação no sistema:</Text>
        <Text><span>- Estatísticas:</span> Analise as informações de fluxo de clientes na loja em diferentes períodos de tempo, além dos indicadores gerados a partir desses dados.</Text>
        <Text><span>- Dados:</span> Atualize os dados da loja e as informações estratégicas para cálculo dos indicadores.</Text>
        </>
    );
}

export default Home;