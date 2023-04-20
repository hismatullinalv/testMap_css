import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const LoadingScreen = ( {loadingIsComplete} ) => {
    return (
        <View style={styles.container}>
            <Text style={styles.loadingText}>Loading...</Text>
            <Button title="Done" onPress={loadingIsComplete} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 24,
        marginBottom: 16,
    },
});

export default LoadingScreen;