import React from 'react'
import { gStyle, theme } from '../../styles/style';
import { Provider as PaperProvider, TextInput, Button } from 'react-native-paper';


import LoginScreen from './LoginScreen';
import RegistrationScreen from './RegistrationScreen';
import Map from './Map';
import HeaderElement from '../elements/HeaderElement';

export default function Main({ navigation }) {
    const loadRegistration = () => {
        navigation.navigate('Registration');
    }
    const loadLogin = () => {
        navigation.navigate('Login');
    }
    const loadMap = () => {
        navigation.navigate('Map')
    }
    const loadPopupPage = () => {
        navigation.navigate('PopupPageExample')
    }


    return (
        <PaperProvider theme={theme} style={{}}>
            
        </PaperProvider>
    );
}

