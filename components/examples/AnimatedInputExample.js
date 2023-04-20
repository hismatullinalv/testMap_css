import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import AnimatedInput from '../elements/AnimatedInput';

export default function AnimatedInputExample() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <AnimatedInput value={name} onChange={setName} placeholder="Name" />
            <AnimatedInput value={email} onChange={setEmail} placeholder="Email" />
            <AnimatedInput
                value={address}
                onChange={setAddress}
                placeholder="Address"
                multiline
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});
