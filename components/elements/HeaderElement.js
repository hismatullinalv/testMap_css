import React from "react";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export const HeaderElement = (props) => {
    
    const navigation = useNavigation();

    return (
        <Appbar.Header>
                <Appbar.BackAction onPress={() => {
                    if (typeof props.onCloseRequest === 'function') {
                        props.onCloseRequest();
                    } else {
                        navigation.goBack();
                    }
                }}/>
                <Appbar.Content title={props.title}/>
        </Appbar.Header>
    );
}

export default HeaderElement;
