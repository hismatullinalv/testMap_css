import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { gStyle, theme } from "../../styles/style";

export const RegistrationScreen = ({}) => {
    const [securePass, changeSecurePass] = useState(true);
    const toggleSecurePass = () => {
        changeSecurePass(!securePass);
    };
    return (
        <ScrollView>
            <View style={gStyle.registrationContent}>
                <TextInput label='Новое имя'/>
                <TextInput 
                    label='Новый пароль'
                    secureTextEntry={securePass} 
                    right={
                        <TextInput.Icon icon='eye-off-outline' onPress={toggleSecurePass}/>
                    }/>
                <TextInput 
                    label='Повторите пароль' 
                    secureTextEntry={securePass} 
                    right={
                        <TextInput.Icon icon='eye-off-outline' onPress={toggleSecurePass}/>
                    }/>
                <Button mode='contained' style={gStyle.registrationButton}>Применить</Button>
            </View>
        </ScrollView>
    );
}

export default RegistrationScreen;