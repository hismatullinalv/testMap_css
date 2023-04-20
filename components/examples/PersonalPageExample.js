import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PersonalPage from '../pages/PersonalPage';

const PersonalPageExample = () => {
return (
<View style={styles.container}>
    <PersonalPage
        imgUri='https://sun9-22.userapi.com/impf/c855028/v855028839/cf38b/TOQ5sQ175mw.jpg?size=1620x2160&quality=96&sign=237f0e326daf7805f5f37b3417730b5d&type=album'
        profileName="Пачачи"
        isOnline={true}
    >
        <Text>Это персональная информейшн как Children</Text>
    </PersonalPage>
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

export default PersonalPageExample;