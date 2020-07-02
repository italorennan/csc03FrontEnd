import React, { useContext } from 'react';
import { Section, TextSection, Text } from '../../pages/Local/styles';
import LocalContext from '../../pages/Local/context';

function InputData() {
    const { storeData } = useContext(LocalContext);

    return (
        <>
        <Text><span>Informações da loja:</span></Text>
        <Section>
            <TextSection><span>Nome:</span></TextSection>
            <TextSection>{storeData.storeName}</TextSection>
        </Section>
        <Section>
            <TextSection><span>Número:</span></TextSection>
            <TextSection>{storeData.storeNumber}</TextSection>
        </Section>
        </>
    );
}

export default InputData;