import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import EstablishmentPage from '../pages/EstablishmentPage';

const EstablishmentPageExample = () => {
return (
<View style={styles.container}>
    <EstablishmentPage
        imgUri='https://ton-ko.ru/wp-content/uploads/2021/04/NuicheTLT1.jpg'
        establishmentName="Ну и Чё?"
    >
        <Text>Это персональная информейшн как Children</Text>
    </EstablishmentPage>
</View>
);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default EstablishmentPageExample;