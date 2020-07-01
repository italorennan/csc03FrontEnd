import React from 'react';
import { Text } from '../../pages/Global/styles';

function Home() {
    return (
        <>
        <Text>Bem-vindo ao sistema de fluxo de clientes da <span>Lojas Brasil</span>!</Text>
        <Text>Descrição da navegação no sistema:</Text>
        <Text><span>- Estatísticas:</span> Analise as informações de fluxo de clientes na empresa em diferentes períodos de tempo, além dos indicadores gerados a partir desses dados. Os dados podem ser visualizados para unidades específicas e para a empresa como um todo.</Text>
        <Text><span>- Dados:</span> Atualize os dados da empresa, das lojas e as informações estratégicas para cálculo dos indicadores.</Text>
        </>
    );
}

export default Home;