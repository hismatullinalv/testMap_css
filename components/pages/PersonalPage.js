import React from 'react';
import { View,
        Image, 
        Text, 
        StyleSheet,
        TouchableOpacity } from 'react-native';

const PersonalPage = ({ imgUri, profileName, isOnline, children }) => {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: imgUri }}
                style={styles.profileImage}
            />
            <Text style={styles.profileName}>{profileName}</Text>
            <View style={styles.onlineStatusContainer}>
                {isOnline && (
                <View style={styles.onlineStatusIndicator} />
                )}
                <Text style={styles.onlineStatusText}>{isOnline ? 'Online' : ''}</Text>
            </View>
            <View style={styles.personalInfoContainer}>
                <Text>Персональная информация</Text>
            </View>
            <TouchableOpacity style={styles.settingButton} activeOpacity={0.5}>
                <Text style={styles.settingButtonText}>Редактировать профиль</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
        height: '100%',
        width: '100%'
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
    },
    onlineStatusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    onlineStatusIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'green',
        marginRight: 8,
    },
    onlineStatusText: {
        fontSize: 16,
    },
    personalInfoContainer: {
        marginTop: 16,
    },  
    settingButton: {
        backgroundColor: '#1e90ff',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginTop: 16,
    },
    settingButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PersonalPage;