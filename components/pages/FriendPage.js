import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

const FriendPage = ({ imgUri, profileName, isOnline, children }) => {
    const [isFriend, setIsFriend] = useState(false);

    const handleAddFriend = () => {
        setIsFriend(true);
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: imgUri }} style={styles.profileImage} />
            <Text style={styles.profileName}>{profileName}</Text>
            <View style={styles.onlineStatusContainer}>
                {isOnline && <View style={styles.onlineStatusIndicator} />}
                <Text style={styles.onlineStatusText}>
                {isOnline ? 'Online' : ''}
                </Text>
            </View>
            <View style={styles.personalInfoContainer}>
                <Text>Персональная информация</Text>
            </View>
            {!isFriend ? (
                <TouchableOpacity style={styles.addButton} onPress={handleAddFriend}>
                <Text style={styles.addButtonText}>Add to Friends</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.friendButton}>
                <Text style={styles.friendButtonText}>Friends</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
        height: '100%',
        width: '100%',
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
    addButton: {
        backgroundColor: '#1e90ff',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginTop: 16,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    friendButton: {
        backgroundColor: '#8bc34a',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginTop: 16,
    },
    friendButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default FriendPage;