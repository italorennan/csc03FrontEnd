import React from 'react';
import { Section, TextSection, Text } from '../../pages/Local/styles';

function InputData() {
    // Puxar do DB
    const data = {
        storeName: "Loja Fortaleza",
        storeNumber: 8001
    };

    return (
        <>
        <Text><span>Informações da loja:</span></Text>
        <Section>
            <TextSection><span>Nome:</span></TextSection>
            <TextSection>{data.storeName}</TextSection>
        </Section>
        <Section>
            <TextSection><span>Número:</span></TextSection>
            <TextSection>{data.storeNumber}</TextSection>
        </Section>
        </>
    );
}

export default InputData;